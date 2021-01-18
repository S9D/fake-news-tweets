const TweetsModel = require('../models/tweets.model');
const datesUtil = require('../util/dates.util');
const commonUtil = require('../util/common.util');

function reduceTweetsByTime(tweets, tweetField) {
  const reducedTweets = tweets.reduce((acc, currentTweet) => {
    const currentDate = new Date(currentTweet.created_at);
    const formattedDate = datesUtil.formatDate(currentDate);
    const addition = currentTweet[tweetField] || 1;

    if (!acc[formattedDate]) {
      acc[formattedDate] = 0;
    }

    acc[formattedDate] += addition;

    return acc;
  }, {});

  return reducedTweets;
}

function countTweetsByHour(tweets) {
  const hoursInDay = new Array(24).fill(0);
  const tweetsByTimeOfDay = tweets.reduce((acc, currentTweet) => {
    const currentDate = datesUtil.convertTimeZone(
      currentTweet.created_at,
      'America/New_York',
    );
    const hour = currentDate.getHours();

    acc[hour] += 1;

    return acc;
  }, hoursInDay);

  return tweetsByTimeOfDay;
}

function predictHourOfNextTweet(currentDate, tweetsInThisWeekday) {
  const hour = currentDate.getHours();
  const tweetsByTimeOfDay = countTweetsByHour(tweetsInThisWeekday);
  const tweetsAtTheRestOfTheDay = tweetsByTimeOfDay.slice(hour);
  const maxTweetsInNearHour = Math.max(...tweetsAtTheRestOfTheDay);
  const predictedHour = tweetsByTimeOfDay.indexOf(maxTweetsInNearHour);

  return predictedHour;
}

function predictMinuteOfNextTweet(predictedHour, tweetsInThisWeekday) {
  const tweetsInPredictedHour = tweetsInThisWeekday.filter(
    (tweet) => new Date(tweet.created_at).getHours() === predictedHour,
  );
  const relevantTweetsMinutes = tweetsInPredictedHour.map(
    (tweet) => new Date(tweet.created_at).getMinutes(),
    // eslint-disable-next-line function-paren-newline
  );
  const averageMinutes = commonUtil.average(...relevantTweetsMinutes);

  return averageMinutes;
}

module.exports.getTweetsFromDB = () => TweetsModel.find();

module.exports.tweetsOverTime = (tweets) =>
  JSON.stringify({
    title: 'Tweets over time',
    type: 'line',
    seriesName: 'tweets',
    data: reduceTweetsByTime(tweets),
  });

module.exports.retweetsOverTime = (tweets) =>
  JSON.stringify({
    title: 'Retweets over time',
    type: 'line',
    seriesName: 'retweets',
    data: reduceTweetsByTime(tweets, 'retweet_count'),
  });

module.exports.favoritesOverTime = (tweets) =>
  JSON.stringify({
    title: 'Tweets favorites over time',
    type: 'line',
    seriesName: 'favorites',
    data: reduceTweetsByTime(tweets, 'favorite_count'),
  });

module.exports.tweetsByTimeOfDay = (tweets) => {
  const tweetsByTimeOfDay = countTweetsByHour(tweets);

  return JSON.stringify({
    title: 'Tweets by time of the day',
    type: 'bar',
    seriesName: 'tweets',
    data: tweetsByTimeOfDay,
  });
};

module.exports.getNextTweet = (tweets) => {
  const currentDate = new Date(Date.now());
  const predictedHour = predictHourOfNextTweet(currentDate, tweets);
  const predictedMinute = predictMinuteOfNextTweet(predictedHour, tweets);
  const nextTweetPrediction = new Date(
    currentDate.setHours(predictedHour, predictedMinute),
  );

  return nextTweetPrediction;
};

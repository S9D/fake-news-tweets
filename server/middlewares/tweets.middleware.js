const TweetsModel = require('../models/tweets.model');

module.exports.aggregateAllTweetsByDate = async (req, res, next) => {
  req.tweets = await TweetsModel.find();

  next();
};

module.exports.getThisHourTweets = async (req, res, next) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const regExp = `(?:(${currentHour}):([0-5]?d):)?([0-5]?d)`;

  req.tweets = await TweetsModel.find({
    created_at: new RegExp(regExp),
  });

  next();
};

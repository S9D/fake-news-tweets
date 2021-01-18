const tweetsService = require('../services/tweets.service');

function createGetter(action) {
  return async function getter(req, res) {
    try {
      const jsonResult = action(req.tweets);

      res.status(200).json(jsonResult);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports.getTime = createGetter(tweetsService.tweetsOverTime);

module.exports.getRetweets = createGetter(tweetsService.retweetsOverTime);

module.exports.getFavorites = createGetter(tweetsService.favoritesOverTime);

module.exports.getDayTime = createGetter(tweetsService.tweetsByTimeOfDay);

module.exports.getNextTweet = createGetter(tweetsService.getNextTweet);

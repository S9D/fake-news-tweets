const router = require('express').Router();
const tweetsController = require('../controllers/tweets.controller');
const tweetsMiddleware = require('../middlewares/tweets.middleware');

router
  .route('/time')
  .get(tweetsMiddleware.aggregateAllTweetsByDate, tweetsController.getTime);

router
  .route('/retweets')
  .get(tweetsMiddleware.aggregateAllTweetsByDate, tweetsController.getRetweets);

router
  .route('/favorites')
  .get(
    tweetsMiddleware.aggregateAllTweetsByDate,
    tweetsController.getFavorites,
  );

router
  .route('/daytime')
  .get(tweetsMiddleware.aggregateAllTweetsByDate, tweetsController.getDayTime);

router
  .route('/next-tweet')
  .get(tweetsMiddleware.getThisHourTweets, tweetsController.getNextTweet);

module.exports = router;

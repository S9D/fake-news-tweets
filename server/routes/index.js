const router = require('express').Router();
const tweetsRoutes = require('./tweets.routes');

router.use('/tweets', tweetsRoutes);

module.exports = router;

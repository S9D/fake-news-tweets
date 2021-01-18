const mongoose = require('mongoose');
const SchemaTypes = require('../config/schemaTypes.constants');

const tweetsSchema = new mongoose.Schema({
  source: SchemaTypes.nonRequiredString,
  id_str: SchemaTypes.requiredString,
  text: SchemaTypes.requiredString,
  created_at: SchemaTypes.requiredString,
  retweet_count: SchemaTypes.requiredNumber,
  in_reply_to_user_id_str: SchemaTypes.nonRequiredString,
  favorite_count: SchemaTypes.requiredNumber,
  is_retweet: SchemaTypes.requiredBoolean,
});

module.exports = mongoose.model('Tweets', tweetsSchema);

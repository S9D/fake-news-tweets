// Strings
module.exports.requiredString = {
  type: String,
  required: true,
  trim: true,
};

module.exports.nonRequiredString = {
  type: String,
  trim: true,
};

// Numbers
module.exports.requiredNumber = { type: Number, required: true };

module.exports.nonRequiredNumber = { type: Number };

// Booleans
module.exports.requiredBoolean = { type: Boolean, required: true };

module.exports.nonRequiredBoolean = { type: Boolean };

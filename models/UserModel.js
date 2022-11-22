// Emaan Amjad
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', UserSchema);

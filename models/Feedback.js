//import mongoose from 'mongoose';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var feedbackSchema = new Schema({
  feedback: {
    type: String,
    required: true,
  },
  package: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Packages',
      required: true,
    },
  ],
});
module.exports = mongoose.model('Feedback', feedbackSchema);

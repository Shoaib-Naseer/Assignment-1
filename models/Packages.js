//import mongoose from 'mongoose';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var packagesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  feedbacks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Feedback',
    },
  ],
});

module.exports = mongoose.model('Packages', packagesSchema);

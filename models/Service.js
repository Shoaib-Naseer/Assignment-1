//import mongoose from 'mongoose';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  packages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Packages',
    },
  ],
});

module.exports = mongoose.model('Service', ServiceSchema);

// Emaan Amjad
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookServicesSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  services: {
    // multiple services
    type: [
      {
        sid: {
          type: mongoose.Types.ObjectId,
          ref: 'Book',
        },
      },
    ],
  },
});

module.exports = mongoose.model('BookService', BookServicesSchema);

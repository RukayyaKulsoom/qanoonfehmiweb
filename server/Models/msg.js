const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  
    msg: {
        type: String,
         required: true
      },

   created: {
    type: Date,
    default: Date.now
  }
});

const message = mongoose.model('message', messageSchema);

module.exports = message;
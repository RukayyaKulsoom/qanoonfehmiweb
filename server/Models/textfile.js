const mongoose = require('mongoose');

const textFileSchema = new mongoose.Schema({
  
  content: {
    type: String,

  },

});

const TextFile = mongoose.model('TextFile', textFileSchema);

module.exports = TextFile;

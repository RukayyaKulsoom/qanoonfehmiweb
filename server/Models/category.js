
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  
  category: {
    type: String,
    required: true
  
  },
  count: {
    type: Number, // Change the data type to Number
  },
});

const category = mongoose.model('category', categorySchema);

module.exports = category;


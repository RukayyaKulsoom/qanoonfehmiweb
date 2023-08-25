
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  
  category: {
    type: String,
    required: true
  
  },
  count: {
    type: Number,
   
  
  },
 
});

const category = mongoose.model('category', categorySchema);

module.exports = category;


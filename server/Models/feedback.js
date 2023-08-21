const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  
    email: {
        type: String,
         required: true
      },

    feedback: {
        type: String,
         required: true
      },

  
});

const feedback = mongoose.model('feedback', feedbackSchema);

module.exports = feedback;
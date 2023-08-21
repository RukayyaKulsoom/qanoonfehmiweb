
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true 
  },
  retypepass: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String,
},
role: {
  type: String,
  default: 'user',
},
resetPasswordExpire: Date,

createdAt: {
    type: Date,
    default: Date.now
}
    

});



userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  // const resetToken = crypto.randomBytes(20).toString('hex');
  const resetToken = resetid(10);

  // Hash token and set to resetPasswordToken field
  // this.resetPasswordToken = crypto
  //     .createHash('sha256')
  //     .update(resetToken)
  //     .digest('hex');
  this.resetPasswordToken = resetToken
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

function resetid(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const user = mongoose.model('signup', userSchema);

module.exports = user;


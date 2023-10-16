var User= require("../Models/signup")
const ErrorResponse = require('../errorResponse');
var sendEmail = require("../sendEmail")

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.json('not found')
    }
  else{

 
    // Get reset token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetUrl = `http://localhost:3001/resetpassword/${resetToken}`
   

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Paste this URL in your browser: \n\n ${resetUrl}`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message
      });
  
      return res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorResponse('Email could not be sent', 500));
    }
  

  }
 
}


// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = async (req, res, next) => {
    // Get hashed token
    // const resetPasswordToken = crypto
    //     .createHash('sha256')
    //     .update(req.params.resettoken)
    //     .digest('hex');
    const resetPasswordToken = req.params.resettoken


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }
 console.log(resetPasswordToken)
    // Set new password
    user.password = req.body.password;
    user.retypepass = req.body.retypepass;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({

      success: true,
      data: 'Password Updated Success'
});
    
}

module.exports = {
    
   forgotPassword,
   resetPassword,
    
};

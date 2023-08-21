const nodemailer = require('nodemailer');

const sendEmail = async options => {
   
    const transporter = nodemailer.createTransport({
        service: "gmail",
     

        auth: {
            user: "rukayyakulsoom@gmail.com",
            pass: "jadkeiomwwlhnuas"
        },
        tls: {
            // This allows Nodemailer to accept self-signed certificates
            rejectUnauthorized: false
          }
    });

    const message = {
        from: `Aasaan Qanoon`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    console.log(options)

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
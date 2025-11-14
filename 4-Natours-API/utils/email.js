const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: '39883234538d46',
      pass: 'd80d6fa76785a4',
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'admin <admin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

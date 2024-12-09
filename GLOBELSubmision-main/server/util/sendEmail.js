"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async function (emails, subject, content) {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof emails === "object") emails = emails.join(", ");
      
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'dhanushpvenkitesh@gmail.com', // sender address
        to: emails, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
      });

      console.log("Email sent: %s", info.messageId); // log the message ID for confirmation
      resolve(true);
    } catch (error) {
      console.log("Email sending error:", error); // log the actual error
      reject(false);
    }
  });
};

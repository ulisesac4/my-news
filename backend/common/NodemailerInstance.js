const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.GENERATED_PASSWORD,
  },
});

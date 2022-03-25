const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

exports.mailcss = {
  background: `
  style="
  background: linear-gradient(90deg, rgba(171,74,230,1) 0%, rgba(160,20,103,1) 49%);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;"`,
  body: `
  style="background: white;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: black;"`,
};

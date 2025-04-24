import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

console.log('GMAIL:', process.env.EMAIL_USER);
console.log('PASS:', process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export { transporter };

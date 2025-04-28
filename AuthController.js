import express from 'express';
import { sendOtpEmail } from './em.js'; // Assuming this file is emailConfig.js
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3030;
const otpStore = new Map();
// Middlewares
app.use(express.json());

// Generate OTP

// Endpoint to send OTP to email
const sendOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
  
    try {
      await sendOtpEmail(email, otp); // Send OTP via email
      otpStore.set(email, otp); // Store OTP temporarily
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send OTP', error });
    }
  };

const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
  
    if (!otpStore.get(email)) {
      return res.status(400).json({ message: 'No OTP sent to this email' });
    }
  
    if (otpStore.get(email)=== parseInt(otp)) {
      // OTP matched, proceed with verification
      delete otpStore[email];  // Remove OTP after successful verification
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  };

  export { sendOtp as default, verifyOtp };

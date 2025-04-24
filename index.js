import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Auth from "./routes/Auth.js"
import { transporter } from './middlewares/emailConfig.js';



const app = express();
app.use(express.json());


app.get('/test-email', async (req, res) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'smritipiplani@gmail.com', // 💡 replace with your actual email
        subject: 'Test Email from Nodemailer',
        text: 'If you received this, the email config is working! 🎉',
      });
  
      res.status(200).json({ success: true, message: 'Test email sent!' });
    } catch (error) {
      console.error('❌ Email send error:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  });
app.use('/auth', Auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import Auth from "./Auth.js"
import { transporter } from './middlewares/emailConfig.js';



const app = express();
app.use(express.json());


app.use('/auth', Auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

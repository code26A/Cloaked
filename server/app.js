import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from './models/user.js'; // Import the User model
import { connection } from './connection.js'; // Import connection function
import { error } from 'console';

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add Routes and Middleware


//For email verification
app.get('/verify', async(req, res) => {
    const {token} = req.query;

    try {
        const user = await User.findOne({ where: {verificationToken: token } });
        if(!user) {
            return res.status(400).json({message: 'Invalid or Expired Token.' });
        }

        user.verified = true;
        user.verificationToken = 'User Verified';
        await user.save();

        res.redirect('/signin');
    } catch(err) {
        console.error('Error Verifying email:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//For user signup
app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedEmail = await bcrypt.hash(email, 10);
        const verificationToken = crypto.randomBytes(10).toString('hex');

        await User.create({ username, password: hashedPassword, email: hashedEmail, verified: false, verificationToken, });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'madhavprakashsingh2003@gmail.com',
                pass: 'oiwzgcooawxonqwp',
            },
        });

        const mailOptions = {
            from: 'madhavprakashsingh2003@gmail.com',
            to: email,
            subject: 'Email Verification for Your Cloaked Account',
            html:`
                <p>Hi ${username},</p>
                <p>Thank you for signing up. Please click the following link to verify your email:</p>
                <a href="http://localhost:3000/verify?token=${verificationToken}">Verify Email</a>
            `

        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.error('Error Sending Mail:', error);
                return res.status(500).json({ message: 'Error Sending Verification email' });
            } else {
                console.log('Email Sent: ', info.response);
                res.status(200).json({message: 'Signup successful. Please Check your email to verify your account'});
            }
        });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//For User Login
app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if(!user) {
            return res.status(400).json({ message: 'Invalid Username or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Username or password' });
        }

        if(!user.verified) {
            return res.status(400).json({ message: 'Please Verify Your Email address' });
        }

        res.status(200).json({message: 'Signin Successfull'});
        console.log('maza aa gaya');
    } catch(err) {
        console.error('Error During Signin:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Establish database connection
connection();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});


//oiwzgcooawxonqwp
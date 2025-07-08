// server.js

// --- 1. Import the tools we need ---

// 'express' is for creating our server
const express = require('express');
// 'cors' allows our frontend to talk to our backend
const cors = require('cors');
// 'nodemailer' is for sending the actual email
const nodemailer = require('nodemailer');
// 'dotenv' is for loading our secret credentials from the .env file
require('dotenv').config();

// --- 2. Set up our server ---

// Create an instance of an express app
const app = express();
// Define the port number our server will run on. 3000 is common for development.
const PORT = 3000;

// --- 3. Add Middleware ---

// This tells our server to allow requests from our frontend
app.use(cors());
// This tells our server to understand JSON data, which is how our form data will be sent
app.use(express.json());

// --- 4. Create the Email Sending Logic ---

// This is the main route that will handle the form submission.
// When the frontend sends a POST request to '/send-email', this code will run.
app.post('/send-email', (req, res) => {
    // Get the form data from the request body
    const { name, email, phone, message } = req.body;

    // IMPORTANT: Set up the 'transporter'. This is like setting up the mail carrier.
    // It uses your email service (like Gmail) and your credentials to send the email.
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your email provider like 'outlook', 'yahoo', etc.
        auth: {
            // These credentials come from your .env file for security
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email app password
        },
    });

    // Define the email's content.
    const mailOptions = {
        from: `"${name}" <${email}>`, // The "from" will look like it's from the person who filled out the form
        to: process.env.EMAIL_USER, // The email will be sent TO YOU
        subject: `New Contact Form Message from ${name}`,
        // The body of the email. We make it look nice and clean.
        html: `
            <h2>You have a new message from your portfolio contact form!</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message}</p>
        `,
    };

    // Try to send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // If there was an error...
            console.error('Error sending email:', error);
            // Send a "failure" response back to the frontend
            res.status(500).json({ message: 'Failed to send email. Please try again later.' });
        } else {
            // If it was successful...
            console.log('Email sent:', info.response);
            // Send a "success" response back to the frontend
            res.status(200).json({ message: 'Email sent successfully!' });
        }
    });
});

// --- 5. Start the server ---

// This tells our server to start listening for requests on the port we defined.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('You can now open your index.html file and test the contact form.');
});

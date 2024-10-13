const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signup', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for emails
const emailSchema = new mongoose.Schema({ email: String });
const Email = mongoose.model('Email', emailSchema);

// Endpoint to handle email submissions
app.post('/signup', async (req, res) => {
    const { email } = req.body;
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).send({ message: 'Email saved successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


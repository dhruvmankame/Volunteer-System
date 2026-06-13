const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Volunteer = require('./models/Volunteer');
const Admin = require('./models/Admin');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- API Endpoints ---

// 1. Register Volunteer (Public)
app.post('/api/register', async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Admin Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// 3. Get Volunteers (Protected Route)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    next();
  });
};

app.get('/api/volunteers', verifyToken, async (req, res) => {
  const volunteers = await Volunteer.find().sort({ registeredAt: -1 });
  res.json(volunteers);
});

// Start Server
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const adminEmail = 'admin@nayepankh.org';
    const adminPassword = 'password123'; // Default password

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new Admin({
      email: adminEmail,
      password: hashedPassword
    });

    await admin.save();
    console.log(`Admin created successfully!\nEmail: ${adminEmail}\nPassword: ${adminPassword}`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

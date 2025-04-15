import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

async function createAdmin() {
  await dbConnect();

  const email = 'muddasar.23ee563@rtu.ac.in';
  const password = 'Muddasar123'; // Change if needed
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('⚠️ User already exists.');
    process.exit(0);
  }

  const adminUser = new User({
    name: 'MUDDASAR NAZAR ANSARI',
    email,
    password: hashedPassword,
    role: 'admin',
    isVerified: true, // ✅ Allow login without email OTP for now
    dob: '2003-09-13',             // Required field
    mobile: '8619771136',          // Required field
    address: 'Kota, Rajasthan, IN' // Required field
  });

  await adminUser.save();
  console.log('✅ Admin user created successfully.');
  process.exit(0);
}

createAdmin();

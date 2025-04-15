// src/app/api/auth/verify-otp/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, otp }: { email: string; otp: string } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required.' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'User is already verified.' });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP.' }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Our Restaurant App!',
        text: `Hi ${user.name || 'User'}, thank you for registering! Your account is now verified.`,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Not returning error here since the core logic (verification) succeeded
    }

    return NextResponse.json({ message: 'Account verified successfully.' });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}

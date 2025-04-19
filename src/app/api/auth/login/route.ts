import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    const { email, password } = await req.json();
    console.log('📨 Received login for:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.log('❌ Incorrect password');
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    console.log('🔐 JWT created');

    // Set cookie with token
    const response = NextResponse.json({
      message: 'Login successful',
      role: user.role,
      name: user.name,
      email: user.email,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    console.log('✅ Cookie set. Login successful.');
    return response;

  } catch (error) {
    console.error('🔥 Login API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

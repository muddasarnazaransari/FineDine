import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      console.log('❌ No token found');
      return NextResponse.json({ isLoggedIn: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    console.log('✅ Token verified:', decoded);

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    });

  } catch (err) {
    console.error('❌ Invalid token', err);
    return NextResponse.json({ isLoggedIn: false, message: 'Invalid or expired token' });
  }
}

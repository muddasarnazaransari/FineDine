import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
  }
}

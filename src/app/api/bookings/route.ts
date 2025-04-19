import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, date, startTime, duration, guests, seating, meals } = body;

    const userName = req.headers.get("x-user-name");
    const userEmail = req.headers.get("x-user-email");

    if (!userName || !userEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const newBooking = new Booking({
      name,
      date: new Date(date),
      startTime,
      duration,
      guests,
      seating,
      meals,
      status: "pending",
      user: {
        name: userName,
        email: userEmail,
      },
    });

    await newBooking.save();

    return NextResponse.json(
      { message: "Booking created", bookingId: newBooking._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BOOKINGS_POST_ERROR]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userEmail = req.headers.get("x-user-email");
    if (!userEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const type = req.nextUrl.searchParams.get("type");
    const today = new Date();

    const query: any = {
      "user.email": userEmail,
      status: "confirmed",
    };

    if (type === "upcoming") {
      query.date = { $gte: today };
    } else if (type === "history") {
      query.date = { $lt: today };
    }

    const bookings = await Booking.find(query).sort({ date: 1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (err) {
    console.error("[BOOKINGS_GET_ERROR]:", err);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

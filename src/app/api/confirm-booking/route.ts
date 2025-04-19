// src/app/api/confirm-booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { bookingId, amount, paymentMethod } = await req.json();
    const userEmail = req.headers.get("x-user-email");

    if (!userEmail) {
      return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    if (!bookingId || typeof amount !== "number") {
      return NextResponse.json({ message: "Missing or invalid booking details." }, { status: 400 });
    }

    const booking = await Booking.findById(bookingId).populate("user");

    if (!booking) {
      return NextResponse.json({ message: "Booking not found." }, { status: 404 });
    }

    if (!booking.user || booking.user.email !== userEmail) {
      return NextResponse.json({ message: "You are not authorized to confirm this booking." }, { status: 403 });
    }

    if (booking.status === "confirmed") {
      return NextResponse.json({ message: "This booking has already been confirmed." }, { status: 400 });
    }

    booking.status = "confirmed";
    booking.amount = amount;
    booking.paymentMethod = paymentMethod || "unknown";
    booking.confirmedAt = new Date();

    await booking.save();

    return NextResponse.json(
      {
        message: "Booking successfully confirmed.",
        bookingId: booking._id,
        status: booking.status,
        confirmedAt: booking.confirmedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONFIRM_BOOKING_ERROR]", error);
    return NextResponse.json(
      { message: "An unexpected error occurred while confirming the booking." },
      { status: 500 }
    );
  }
}

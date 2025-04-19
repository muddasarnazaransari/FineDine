// src/app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const userEmail = req.headers.get("x-user-email");
    if (!userEmail) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (booking.user?.email !== userEmail) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await booking.deleteOne();

    return NextResponse.json({ message: "Booking cancelled" }, { status: 200 });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

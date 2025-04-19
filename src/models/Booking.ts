import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for Booking
export interface IBooking extends Document {
  name: string;
  date: Date;
  startTime: string;
  duration: string;
  guests: number;
  seating: string;
  meals: string[];
  status: "pending" | "confirmed";
  amount?: number;
  confirmedAt?: Date;
  user: Types.ObjectId; // Reference to User document
}

const BookingSchema: Schema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    duration: { type: String, required: true },
    guests: { type: Number, required: true },
    seating: { type: String, required: true },
    meals: [{ type: String }],
    status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
    amount: { type: Number },
    confirmedAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

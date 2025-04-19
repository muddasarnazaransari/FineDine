// src/app/billing/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { seatRate, mealPrices } from "@/utils/priceMap";
import { toast } from "react-hot-toast";

type BookingData = {
  bookingId: string;
  name: string;
  date: string;
  startTime: string;
  duration: string;
  guests: number;
  seating: string;
  meals: string[];
};

const BillingPage = () => {
  const router = useRouter();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [mealCost, setMealCost] = useState(0);
  const [seatCost, setSeatCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = await res.json();

        if (res.ok && data.user?.email) {
          setUserEmail(data.user.email);
        } else {
          toast.error("Please login to continue.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user details.");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  // Load booking info from session storage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const data = sessionStorage.getItem("bookingData");

    if (data) {
      try {
        const parsed: BookingData = JSON.parse(data);
        setBooking(parsed);

        const hours = parseFloat(parsed.duration.split(" ")[0]) || 1;
        const seatCostCalc = parsed.guests * hours * seatRate;
        const mealCostCalc = parsed.meals.reduce(
          (sum: number, meal: string) => sum + (mealPrices[meal] || 0),
          0
        );

        setSeatCost(seatCostCalc);
        setMealCost(mealCostCalc);
        setTotal(seatCostCalc + mealCostCalc);
      } catch (err) {
        toast.error("Failed to load booking details.");
        console.error("Error parsing booking data:", err);
      }
    } else {
      toast.error("No booking data found.");
      router.push("/"); // redirect to homepage or booking page
    }

    setLoading(false);
  }, [router]);

  const handleConfirm = async () => {
    if (!booking || !userEmail) return;

    try {
      const res = await fetch("/api/confirm-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": userEmail,
        },
        body: JSON.stringify({
          bookingId: booking.bookingId,
          amount: total,
          paymentMethod: "cash", // placeholder for now
        }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.removeItem("bookingData");
        toast.success("Booking confirmed!");
        router.push("/my-orders");
      } else {
        toast.error(data.message || "Booking confirmation failed");
      }
    } catch (err) {
      console.error("Confirm booking error:", err);
      toast.error("Something went wrong");
    }
  };

  if (loading || !booking) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p>Loading billing details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto bg-neutral-900 rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-semibold mb-6">Billing Summary</h1>
        <div className="space-y-2">
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {booking.startTime}</p>
          <p><strong>Duration:</strong> {booking.duration}</p>
          <p><strong>Seating:</strong> {booking.seating}</p>
          {booking.meals.length > 0 && (
            <p><strong>Meals:</strong> {booking.meals.join(", ")}</p>
          )}
          <p><strong>Seat Cost:</strong> ₹{seatCost}</p>
          {mealCost > 0 && <p><strong>Meal Cost:</strong> ₹{mealCost}</p>}
          <p className="text-lg font-bold mt-4">Total: ₹{total}</p>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full text-lg py-6 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default BillingPage;

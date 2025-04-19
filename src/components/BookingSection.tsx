// src/components/BookingSection.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const menuItems = [
  {
    category: "Appetizers",
    items: ["Paneer Tikka", "Hara Bhara Kabab", "Dahi Puri", "Veg Spring Rolls"],
  },
  {
    category: "Rajasthani Specials",
    items: ["Dal Baati Churma", "Laal Maas", "Gatte ki Sabzi", "Ker Sangri"],
  },
  {
    category: "Main Course",
    items: ["Butter Chicken", "Paneer Butter Masala", "Malai Kofta", "Chole Bhature"],
  },
  {
    category: "Desserts",
    items: ["Gulab Jamun", "Moong Dal Halwa", "Malpua", "Rasmalai"],
  },
  {
    category: "Beverages",
    items: ["Masala Chai", "Lassi", "Jaljeera", "Aam Panna"],
  },
];

const meals = menuItems.flatMap((cat) => cat.items);

const seatingOptions = ["AC Indoor", "Non-AC Indoor", "Outdoor", "Terrace", "Private Dining"];

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const durationOptions = ["1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours"];

type FormData = {
  name: string;
  date: Date;
  startTime: string;
  duration: string;
  guests: number;
  seating: string;
  meals: string[];
};

export default function BookingSection() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: new Date(),
    startTime: "19:00",
    duration: "1.5 hours",
    guests: 2,
    seating: "AC Indoor",
    meals: [],
  });

  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleMealToggle = (meal: string) => {
    setFormData((prev) => ({
      ...prev,
      meals: prev.meals.includes(meal)
        ? prev.meals.filter((m) => m !== meal)
        : [...prev.meals, meal],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Get user info (assuming it's in localStorage or sessionStorage)
      const storedUser = typeof window !== "undefined" ? sessionStorage.getItem("user") : null;
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user?.name || !user?.email) {
        setError("Please log in to make a reservation.");
        return;
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-name": user.name,
          "x-user-email": user.email,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create booking");

      // Save to sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bookingData", JSON.stringify(formData));
      }

      setConfirmed(true);
      router.push("/billing");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while confirming your reservation. Please try again.");
    }
  };



  const getFilteredTimeSlots = () => {
    return timeSlots.filter((time) => {
      const today = new Date();
      const selected = formData.date;
      const isToday = today.toDateString() === selected.toDateString();

      if (!isToday) return true;

      const [hours, minutes] = time.split(":").map(Number);
      const timeSlotDate = new Date(selected);
      timeSlotDate.setHours(hours, minutes, 0, 0);

      const nowIST = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );

      return timeSlotDate > nowIST;
    });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-100" id="booking">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-red-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-red-700">Reserve Your Table</h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Date + Time + Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Date</label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData((prev) => ({ ...prev, date: date || new Date() }))}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Start Time</label>
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {getFilteredTimeSlots().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {durationOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Guests + Seating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Seating Preference</label>
              <select
                name="seating"
                value={formData.seating}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {seatingOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Meals */}
          <div>
            <label className="block mb-2 font-semibold">Pre-select Meals (Optional)</label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {meals.map((meal) => (
                <label key={meal} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.meals.includes(meal)}
                    onChange={() => handleMealToggle(meal)}
                  />
                  <span>{meal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Confirm Reservation
          </button>
        </form>

        {confirmed && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center shadow-sm">
            <p>
              🎉 Thank you, <strong>{formData.name}</strong>! Your reservation for{" "}
              <strong>{formData.guests}</strong> guest(s) on{" "}
              <strong>{formData.date.toLocaleDateString()}</strong> at{" "}
              <strong>{formData.startTime}</strong> for <strong>{formData.duration}</strong> has been confirmed.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center shadow-sm">
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const menuItems = [
  {
    category: "Appetizers",
    items: [{ name: "Paneer Tikka" }, { name: "Hara Bhara Kabab" }, { name: "Dahi Puri" }, { name: "Veg Spring Rolls" }],
  },
  {
    category: "Rajasthani Specials",
    items: [{ name: "Dal Baati Churma" }, { name: "Laal Maas" }, { name: "Gatte ki Sabzi" }, { name: "Ker Sangri" }],
  },
  {
    category: "Main Course",
    items: [{ name: "Butter Chicken" }, { name: "Paneer Butter Masala" }, { name: "Malai Kofta" }, { name: "Chole Bhature" }],
  },
  {
    category: "Desserts",
    items: [{ name: "Gulab Jamun" }, { name: "Moong Dal Halwa" }, { name: "Malpua" }, { name: "Rasmalai" }],
  },
  {
    category: "Beverages",
    items: [{ name: "Masala Chai" }, { name: "Lassi" }, { name: "Jaljeera" }, { name: "Aam Panna" }],
  },
];

const meals = menuItems.flatMap((cat) => cat.items.map((item) => item.name));
const packs = ["Birthday Special", "Anniversary Special", "Date Night Special"];

type FormData = {
  name: string;
  date: Date;
  time: string;
  guests: number;
  seating: string;
  meals: string[];
  pack: string;
};

export default function BookingSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: new Date(),
    time: "19:00",
    guests: 2,
    seating: "Indoor",
    meals: [],
    pack: "",
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMealToggle = (meal: string) => {
    setFormData((prev) => ({
      ...prev,
      meals: prev.meals.includes(meal) ? prev.meals.filter((m) => m !== meal) : [...prev.meals, meal],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-red-100" id="booking">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-red-200">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-red-700">Reserve Your Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block mb-2 font-semibold">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {["18:00", "19:00", "20:00", "21:00"].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                  <option key={n} value={n}>
                    {n}
                  </option>
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
                {["Indoor", "Outdoor", "Private"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Special Occasion Package</label>
            <select
              name="pack"
              value={formData.pack}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">-- Select a Package (optional) --</option>
              {packs.map((pack) => (
                <option key={pack} value={pack}>
                  {pack}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Pre-select Meals (Optional)</label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {meals.map((meal) => (
                <label key={meal} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" checked={formData.meals.includes(meal)} onChange={() => handleMealToggle(meal)} />
                  <span>{meal}</span>
                </label>
              ))}
            </div>
          </div>

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
              <strong>{formData.time}</strong> has been confirmed.
              {formData.pack && (
                <>
                  <br />
                  🎁 You selected the <strong>{formData.pack}</strong> package!
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const packs = [
  {
    title: "Birthday Special",
    image: "/images/birthday.png",
    description:
      "Celebrate your special day with a complimentary cake, decorated table, and personalized menu.",
    features: ["Complimentary Cake", "Decorated Table", "Custom Menu"],
  },
  {
    title: "Anniversary Special",
    image: "/images/anniversary.png",
    description:
      "Make memories with our candlelight dinner setup, roses, and a romantic playlist.",
    features: ["Candlelight Dinner", "Fresh Roses", "Romantic Playlist"],
  },
  {
    title: "Date Night",
    image: "/images/date.png",
    description:
      "A cozy setting for two, soft lighting, and a three-course meal to spark romance.",
    features: ["Cozy Ambiance", "Three-Course Meal", "Mood Lighting"],
  },
];

export default function SpecialPacksSection() {
  return (
    <section className="py-20 px-6 bg-white" id="special-packs">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Special Packs
        </h2>
        <p className="text-gray-600 mb-12">
          Enhance your dining experience with our exclusive themed packs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div
              key={pack.title}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={pack.image}
                  alt={pack.title}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {pack.title}
                </h3>
                <p className="text-gray-600 mb-4">{pack.description}</p>

                <ul className="mb-6 space-y-2">
                  {pack.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium tracking-wide">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

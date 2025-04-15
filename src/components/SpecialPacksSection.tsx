"use client";

import Image from "next/image";

const packs = [
  {
    title: "Birthday Special",
    image: "/images/birthday.png", // 📌 Add actual images in public/images folder
    description:
      "Celebrate your special day with a complimentary cake, decorated table, and personalized menu.",
  },
  {
    title: "Anniversary Special",
    image: "/images/anniversary.png",
    description:
      "Make memories with our candlelight dinner setup, roses, and a romantic playlist.",
  },
  {
    title: "Date Night",
    image: "/images/date.png",
    description:
      "A cozy setting for two, soft lighting, and a three-course meal to spark romance.",
  },
];

export default function SpecialPacksSection() {
  return (
    <section className="py-20 px-6 bg-white" id="special-packs">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Special Packs</h2>
        <p className="text-gray-600 mb-12">
          Enhance your dining experience with our exclusive themed packs.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div
              key={pack.title}
              className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={pack.image}
                  alt={pack.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {pack.title}
                </h3>
                <p className="text-gray-600 mb-4">{pack.description}</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
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

"use client";

import Image from "next/image";
import { useState } from "react";

const menuItems = [
  {
    category: "Appetizers",
    items: [
      { name: "Paneer Tikka", image: "/menu/paneer-tikka.jpg", price: "₹220" },
      { name: "Hara Bhara Kabab", image: "/menu/hara-bhara-kabab.jpg", price: "₹180" },
      { name: "Dahi Puri", image: "/menu/dahi-puri.jpg", price: "₹150" },
      { name: "Veg Spring Rolls", image: "/menu/spring-rolls.jpg", price: "₹160" },
    ],
  },
  {
    category: "Rajasthani Specials",
    items: [
      { name: "Dal Baati Churma", image: "/menu/dal-baati.jpg", price: "₹250" },
      { name: "Laal Maas", image: "/menu/laal-maas.jpg", price: "₹340" },
      { name: "Gatte ki Sabzi", image: "/menu/gatte-ki-sabzi.jpg", price: "₹210" },
      { name: "Ker Sangri", image: "/menu/ker-sangri.jpg", price: "₹200" },
    ],
  },
  {
    category: "Main Course",
    items: [
      { name: "Butter Chicken", image: "/menu/butter-chicken.jpg", price: "₹320" },
      { name: "Paneer Butter Masala", image: "/menu/paneer-butter.jpeg", price: "₹280" },
      { name: "Malai Kofta", image: "/menu/malai-kofta.jpg", price: "₹260" },
      { name: "Chole Bhature", image: "/menu/chole-bhature.jpg", price: "₹240" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Gulab Jamun", image: "/menu/gulab-jamun.jpg", price: "₹90" },
      { name: "Moong Dal Halwa", image: "/menu/moong-dal-halwa.jpg", price: "₹140" },
      { name: "Malpua", image: "/menu/malpua.jpg", price: "₹110" },
      { name: "Rasmalai", image: "/menu/rasmalai.jpg", price: "₹130" },
    ],
  },
  {
    category: "Beverages",
    items: [
      { name: "Masala Chai", image: "/menu/masala-chai.jpg", price: "₹50" },
      { name: "Lassi", image: "/menu/lassi.jpg", price: "₹70" },
      { name: "Jaljeera", image: "/menu/jaljeera.jpg", price: "₹60" },
      { name: "Aam Panna", image: "/menu/aam-panna.jpg", price: "₹65" },
    ],
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("Appetizers");
  const activeItems = menuItems.find((cat) => cat.category === activeCategory)?.items || [];

  return (
    <section className="py-20 px-6 bg-white" id="menu">
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Menu</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our curated selection of traditional Indian and Rajasthani delicacies.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {menuItems.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`px-5 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 shadow-sm hover:shadow-md ${
              activeCategory === cat.category
                ? "bg-red-600 text-white"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Centered Grid */}
      <div className="container mx-auto px-4">
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {activeItems.map((item) => (
            <div
              key={item.name}
              className="rounded-xl overflow-hidden bg-[#fefefe] shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="object-cover w-full h-56"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-red-600 font-bold text-lg">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

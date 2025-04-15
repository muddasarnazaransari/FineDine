"use client";

import Slider from "react-slick";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anjali Sharma",
    image: "/images/testimonial.png",
    quote: "The ambiance and food were absolutely amazing. Will definitely visit again!",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    image: "/images/testimonial.png",
    quote: "Perfect place for date nights. Loved the Laal Maas and the calm vibe.",
    rating: 4,
  },
  {
    name: "Neha Gupta",
    image: "/images/testimonial.png",
    quote: "Had my birthday dinner here. The staff and service were exceptional!",
    rating: 5,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
};

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          What Our Customers Say
        </h2>

        <Slider {...sliderSettings}>
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white shadow-lg rounded-2xl p-8 mx-4">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-red-500"
                />
                <p className="text-lg text-gray-700 italic">&quot;{t.quote}&quot;</p>
                <div className="flex justify-center text-yellow-500">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-2">{t.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

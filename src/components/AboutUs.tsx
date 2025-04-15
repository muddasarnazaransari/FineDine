import Image from "next/image";

export default function AboutUs() {
  return (
    <section id="about" className="bg-white dark:bg-gray-900 py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            About Our Restaurant
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            At <span className="font-semibold text-yellow-600">Golden Plate</span>, we believe fine dining is an experience, not just a meal. 
            Our chefs blend tradition and creativity to deliver a menu that celebrates flavor, freshness, and culture.
            <br /><br />
            Whether you&apos;re here for a romantic evening, a family gathering, or a business dinner, we make every moment memorable.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/about-us.png"
            alt="Restaurant ambiance"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}

'use client';

export default function Hero() {
  return (
    <section
      id="hero" // ✅ Add this for anchor linking
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/hero.png')", // Replace with your image path
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Book Your Table. Experience Fine Dining.
        </h1>
        <p className="text-lg mb-6">
          Reserve now and enjoy gourmet experiences with elegance.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#booking">
            <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded text-white text-sm font-semibold">
              Reserve Your Seat Now
            </button>
          </a>
          <a href="#menu">
            <button className="border border-white hover:bg-white hover:text-black transition px-6 py-3 rounded text-white text-sm font-semibold">
              Explore Menu
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

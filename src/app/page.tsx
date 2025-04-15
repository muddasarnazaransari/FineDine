import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import MenuSection from "@/components/MenuSection";
import BookingSection from "@/components/BookingSection";
import SpecialPacksSection from "@/components/SpecialPacksSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <MenuSection />
      <BookingSection />
      <SpecialPacksSection />
      <TestimonialSection />
    </div>
  );
}

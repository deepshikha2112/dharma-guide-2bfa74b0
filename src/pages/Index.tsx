import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DeitiesSection from "@/components/DeitiesSection";
import MeditationPreview from "@/components/MeditationPreview";
import TodaySacredMantra from "@/components/TodaySacredMantra";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const location = useLocation();

  // Scroll to top on initial load, only scroll to hash if explicitly navigating to it
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.pathname]);
  return (
    <main className="min-h-screen relative">
      <CosmicBackground />
      <Header />
      <HeroSection />
      <DeitiesSection />
      <MeditationPreview />
      <TodaySacredMantra />
      <CategoriesSection />
      <Footer />
      <BottomNavigation />
    </main>
  );
};

export default Index;

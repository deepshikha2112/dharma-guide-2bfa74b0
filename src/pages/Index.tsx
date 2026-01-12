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

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DeitiesSection from "@/components/DeitiesSection";
import MantraSection from "@/components/MantraSection";
import CategoriesSection from "@/components/CategoriesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <DeitiesSection />
      <MantraSection />
      <CategoriesSection />
      <Footer />
    </main>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-temple.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="animate-fade-in-up">
          <span className="inline-block text-6xl md:text-7xl mb-6 animate-float">ॐ</span>
        </div>
        
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up animation-delay-100">
          Divya Darshan
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-4 font-body animate-fade-in-up animation-delay-200">
          Your Spiritual Companion
        </p>
        
        <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10 font-body animate-fade-in-up animation-delay-300">
          Explore the divine wisdom of Hindu scriptures, mantras, and traditions. 
          Find peace, devotion, and enlightenment on your spiritual journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Button variant="sacred" size="xl">
            Explore Deities
          </Button>
          <Button variant="hero" size="xl">
            Daily Mantra
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/#deities", label: "Deities" },
    { href: "/panchang", label: "Panchang" },
    { href: "/aarti", label: "Aarti" },
    { href: "/vrat-guide", label: "Vrat" },
    { href: "/prayer-journal", label: "Journal" },
    { href: "/meditation", label: "Meditation" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(20, 10, 40, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(180, 140, 255, 0.15)",
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <span className="font-heading text-xl font-semibold text-cosmic-pearl">
            Divya Darshan
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href} 
              className={`transition-colors font-body text-sm ${
                isActive(link.href) 
                  ? "text-cosmic-gold font-medium" 
                  : "text-cosmic-pearl/70 hover:text-cosmic-pearl"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/meditation">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="divine-button px-5 py-2 rounded-full text-cosmic-pearl text-sm font-medium"
            >
              🧘 Meditate
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card">
              <Menu className="w-5 h-5 text-cosmic-pearl" />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-72 border-l-0"
            style={{
              background: "rgba(20, 10, 40, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col h-full py-6">
              <div className="flex items-center mb-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <span className="font-heading font-semibold text-cosmic-pearl">
                    Divya Darshan
                  </span>
                </Link>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 px-4 rounded-xl transition-all ${
                      isActive(link.href)
                        ? "glass-card-glow text-cosmic-gold"
                        : "text-cosmic-pearl/70 hover:text-cosmic-pearl hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link to="/meditation" onClick={() => setIsOpen(false)}>
                  <button className="w-full divine-button py-3 rounded-full text-cosmic-pearl font-medium">
                    🧘 Start Meditation
                  </button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

export default Header;

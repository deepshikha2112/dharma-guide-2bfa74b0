import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/home#deities", label: "Deities" },
    { href: "/sacred-stories", label: "Stories" },
    { href: "/aarti", label: "Aarti" },
    { href: "/prediction-info", label: "Astro Info" },
    { href: "/panchang", label: "Panchang" },
    { href: "/meditation", label: "Meditation" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/home#")) return location.pathname === "/home" && location.hash === href.substring(5);
    return location.pathname === href;
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255, 250, 245, 0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid hsl(35 40% 85% / 0.6)",
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-3">
          <span className="text-2xl">🙏</span>
          <span className="font-heading text-xl font-semibold text-foreground">
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
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
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
              className="divine-button px-5 py-2 rounded-full text-white text-sm font-medium"
            >
              🧘 Meditate
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-muted">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-72 border-l border-border"
            style={{
              background: "hsl(35 40% 98%)",
            }}
          >
            <div className="flex flex-col h-full py-6">
              <div className="flex items-center mb-8">
                <Link to="/home" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <span className="text-xl">🙏</span>
                  <span className="font-heading font-semibold text-foreground">
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
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link to="/meditation" onClick={() => setIsOpen(false)}>
                  <button className="w-full divine-button py-3 rounded-full text-white font-medium">
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

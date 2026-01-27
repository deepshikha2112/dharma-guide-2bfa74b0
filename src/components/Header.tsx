import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/divya-dharshan-logo.jpeg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/home", label: "Deities" },
    { href: "/sacred-stories", label: "Stories" },
    { href: "/aarti", label: "Aarti" },
    { href: "/prayer-journal", label: "Journal" },
    { href: "/vrat-guide", label: "Vrat" },
    { href: "/prediction-info", label: "Astro" },
    { href: "/panchang", label: "Panchang" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo & App Name */}
          <Link to="/home" className="flex items-center gap-2.5 shrink-0">
            <img 
              src={logo} 
              alt="Divya Dharshan" 
              className="w-9 h-9 rounded-full object-cover ring-1 ring-primary/20" 
            />
            <span className="font-heading text-lg font-semibold text-foreground tracking-tight">
              Divya Dharshan
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className={`relative px-3 py-2 text-sm font-body transition-colors rounded-lg ${
                    isActive(link.href) 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary/60 via-secondary to-primary/60 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link 
              to="/settings"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                isActive("/settings") 
                  ? "bg-primary/15 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
              aria-label="Settings"
            >
              <Settings className="w-[18px] h-[18px]" />
            </Link>
            <Link to="/meditation">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="divine-button px-4 py-2 rounded-full text-white text-sm font-medium"
              >
                🧘 Meditate
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <Link 
              to="/settings"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                isActive("/settings") 
                  ? "bg-primary/15 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
              aria-label="Settings"
            >
              <Settings className="w-[18px] h-[18px]" />
            </Link>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button 
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-muted/60 hover:bg-muted transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-72 border-l border-border/50 bg-background p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center gap-2.5 p-5 border-b border-border/40">
                    <Link to="/home" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                      <img 
                        src={logo} 
                        alt="Divya Dharshan" 
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20" 
                      />
                      <span className="font-heading font-semibold text-foreground">
                        Divya Dharshan
                      </span>
                    </Link>
                  </div>

                  {/* Mobile Menu Links */}
                  <nav className="flex-1 overflow-y-auto py-3 px-3">
                    <div className="space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center py-3 px-4 rounded-xl text-sm font-body transition-all ${
                            isActive(link.href)
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {link.label}
                          {isActive(link.href) && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t border-border/40">
                    <Link to="/meditation" onClick={() => setIsOpen(false)}>
                      <button className="w-full divine-button py-3 rounded-xl text-white font-medium">
                        🧘 Start Meditation
                      </button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

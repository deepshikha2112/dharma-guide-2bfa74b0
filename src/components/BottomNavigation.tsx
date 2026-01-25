import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BookOpen, Music, Star, Sparkles } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BookOpen, label: "Stories", path: "/sacred-stories" },
  { icon: Music, label: "Aarti", path: "/aarti" },
  { icon: Star, label: "Astro", path: "/guidance" },
  { icon: Sparkles, label: "Info", path: "/prediction-info" },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div
        className="flex items-center justify-around px-2 py-2"
        style={{
          background: "linear-gradient(180deg, rgba(255,250,245,0.95) 0%, rgba(255,248,240,1) 100%)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid hsl(35 40% 85% / 0.6)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex-1 flex flex-col items-center py-2 px-1"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-x-2 top-0 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;

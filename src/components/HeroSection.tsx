import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Home, BookOpen, Music, Calendar, Star, Sparkles, Sun } from "lucide-react";

const quickAccessItems = [
  { icon: Home, label: "Deities", path: "/home", color: "bg-orange-100 text-orange-600" },
  { icon: BookOpen, label: "Stories", path: "/sacred-stories", color: "bg-amber-100 text-amber-600" },
  { icon: Music, label: "Aarti", path: "/aarti", color: "bg-red-100 text-red-600" },
  { icon: Calendar, label: "Journal", path: "/prayer-journal", color: "bg-green-100 text-green-600" },
  { icon: Star, label: "Vrat", path: "/vrat-guide", color: "bg-purple-100 text-purple-600" },
  { icon: Sparkles, label: "Astro Info", path: "/prediction-info", color: "bg-indigo-100 text-indigo-600" },
  { icon: Sun, label: "Panchang", path: "/panchang", color: "bg-yellow-100 text-yellow-600" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Light Temple Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(40 60% 97%) 0%, hsl(35 50% 94%) 50%, hsl(30 40% 96%) 100%)",
        }}
      />

      {/* Soft glowing orbs - decorative */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, hsl(42 70% 85%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-10 w-32 h-32 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(25 60% 80%) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        {/* Om Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.span 
            className="text-7xl md:text-8xl block"
            style={{
              color: "hsl(35 50% 65%)",
              textShadow: "0 0 40px hsl(42 60% 75% / 0.4)",
            }}
            animate={{ 
              scale: [1, 1.03, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ॐ
          </motion.span>
        </motion.div>

        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide"
            style={{ color: "hsl(25 40% 30%)" }}
          >
            Divya Darshan
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl font-light mb-12 max-w-md mx-auto"
          style={{ color: "hsl(30 30% 45%)" }}
        >
          A Divine Space for Peace, Faith & Wisdom
        </motion.p>

        {/* Ask a Question Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-md mx-auto mb-12"
        >
          <div
            onClick={() => navigate("/guidance")}
            className="flex items-center gap-3 px-6 py-4 rounded-full cursor-pointer transition-all duration-300 group"
            style={{
              background: "hsl(35 40% 98%)",
              border: "1px solid hsl(35 40% 85%)",
              boxShadow: "0 4px 20px hsl(25 40% 50% / 0.1)",
            }}
          >
            <span className="text-muted-foreground flex-1 text-left group-hover:text-foreground transition-colors">
              Ask a Question...
            </span>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "hsl(25 70% 55% / 0.15)" }}
            >
              <Mic className="w-5 h-5 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Quick Access Grid - Mobile Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-4 gap-3 max-w-sm mx-auto mb-12 md:hidden"
        >
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className="flex flex-col items-center gap-1.5"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </motion.div>

        {/* Action Buttons - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden md:flex flex-row gap-4 justify-center mb-16"
        >
          <a href="#deities">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="divine-button px-8 py-4 rounded-full text-white font-medium flex items-center gap-2 justify-center min-w-[180px]"
            >
              <span>🕉️</span> Explore Deities
            </motion.button>
          </a>
          <a href="#categories">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-medium flex items-center gap-2 justify-center min-w-[180px]"
              style={{
                color: "hsl(25 50% 40%)",
                background: "transparent",
                border: "1px solid hsl(35 40% 80%)",
                boxShadow: "0 0 20px hsl(42 50% 85% / 0.4)",
              }}
            >
              <span>📿</span> Spiritual Categories
            </motion.button>
          </a>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-3 gap-6 max-w-sm mx-auto"
        >
          {[
            { value: "11+", label: "Deities" },
            { value: "50+", label: "Mantras" },
            { value: "20+", label: "Meditations" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-2xl font-heading font-semibold text-gradient-saffron">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-primary/30 rounded-full flex justify-center"
        >
          <motion.div 
            className="w-1 h-3 bg-primary/60 rounded-full mt-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

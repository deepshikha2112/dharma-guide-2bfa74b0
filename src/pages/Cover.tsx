import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/divya-dharshan-logo.jpeg";

const Cover = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background">
      {/* Light mode background */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: "linear-gradient(180deg, hsl(40 60% 97%) 0%, hsl(35 50% 94%) 50%, hsl(30 40% 96%) 100%)",
        }}
      />
      
      {/* Dark mode background */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "linear-gradient(180deg, hsl(20 20% 6%) 0%, hsl(20 18% 10%) 50%, hsl(20 15% 8%) 100%)",
        }}
      />
      
      {/* Subtle decorative frame - Light */}
      <div 
        className="absolute inset-4 md:inset-8 pointer-events-none rounded-2xl dark:hidden"
        style={{
          border: "1px solid hsl(35 40% 85% / 0.6)",
          boxShadow: "inset 0 0 60px hsl(40 50% 90% / 0.5)",
        }}
      />
      
      {/* Subtle decorative frame - Dark */}
      <div 
        className="absolute inset-4 md:inset-8 pointer-events-none rounded-2xl hidden dark:block"
        style={{
          border: "1px solid hsl(20 15% 25% / 0.6)",
          boxShadow: "inset 0 0 60px hsl(20 20% 15% / 0.3)",
        }}
      />

      {/* Soft glowing orbs - decorative */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(42 70% 85%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-25 dark:opacity-15"
        style={{
          background: "radial-gradient(circle, hsl(25 60% 88%) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.15, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Lotus/Diya glow at center-bottom */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-40 dark:opacity-25"
        style={{
          background: "radial-gradient(ellipse at bottom, hsl(42 80% 80%) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        >
          <img 
            src={logo} 
            alt="Divya Dharshan" 
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto object-cover shadow-warm"
            style={{
              boxShadow: "0 0 60px hsl(42 60% 75% / 0.5)",
            }}
          />
        </motion.div>

        {/* App Name - elegant */}
        <motion.h1
          className="font-heading text-3xl md:text-4xl font-light mb-6 tracking-wide text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Divya Darshan
        </motion.h1>

        {/* Single peaceful text line */}
        <motion.p
          className="font-body text-base md:text-lg font-light tracking-widest mb-16 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          A Moment of Peace
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnter}
          className="px-12 py-4 rounded-full font-body text-sm tracking-widest uppercase transition-all duration-500 text-foreground bg-transparent border border-border hover:border-primary/50"
          style={{
            boxShadow: "0 0 30px hsl(42 50% 85% / 0.3)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{
            boxShadow: "0 0 50px hsl(42 60% 80% / 0.5)",
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Enter
        </motion.button>
      </motion.div>

      {/* Bottom decorative element - subtle diya glow */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(35 70% 65%) 0%, hsl(42 60% 55%) 100%)",
            boxShadow: "0 0 20px hsl(42 70% 60% / 0.5), 0 0 40px hsl(35 60% 70% / 0.3)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Cover;
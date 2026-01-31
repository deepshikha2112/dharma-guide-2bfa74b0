import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { NotificationContent, NotificationTimeSlot } from "@/data/dailyNotifications";
import { useSettings } from "@/contexts/SettingsContext";

interface NotificationPopupProps {
  isVisible: boolean;
  content: NotificationContent | null;
  slot: NotificationTimeSlot | null;
  onDismiss: () => void;
}

const slotIcons: Record<NotificationTimeSlot, string> = {
  morning: "🌅",
  afternoon: "☀️",
  night: "🌙"
};

const NotificationPopup = ({ 
  isVisible, 
  content, 
  slot,
  onDismiss 
}: NotificationPopupProps) => {
  const { settings } = useSettings();
  const isHindi = settings.language === 'hi';

  if (!content || !slot) return null;

  const title = isHindi ? content.titleHi : content.title;
  const message = isHindi ? content.messageHi : content.message;
  const icon = slotIcons[slot];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={onDismiss}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100%-2rem)] max-w-sm mx-4"
          >
            <div className="bg-card border border-border/60 rounded-2xl shadow-warm overflow-hidden">
              {/* Header accent */}
              <div className="h-1 bg-gradient-to-r from-primary/60 via-secondary to-primary/60" />
              
              <div className="p-4 sm:p-5 relative">
                {/* Close button */}
                <button
                  onClick={onDismiss}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors z-10"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{icon}</div>
                
                {/* Title */}
                <h3 className={`text-base sm:text-lg font-semibold text-foreground pr-10 mb-2 ${isHindi ? 'font-hindi' : 'font-heading'}`}>
                  {title}
                </h3>
                
                {/* Message */}
                <p className={`text-muted-foreground text-sm leading-relaxed mb-4 break-words ${isHindi ? 'font-hindi' : 'font-body'}`}>
                  {message}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={onDismiss}
                    className={`flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-muted/60 text-foreground text-sm font-medium hover:bg-muted transition-colors ${isHindi ? 'font-hindi' : ''}`}
                  >
                    {isHindi ? "ठीक है" : "Dismiss"}
                  </button>
                  
                  {content.readMoreRoute && (
                    <Link
                      to={content.readMoreRoute}
                      onClick={onDismiss}
                      className={`flex-1 py-2.5 px-3 sm:px-4 rounded-xl divine-button text-white text-sm font-medium text-center ${isHindi ? 'font-hindi' : ''}`}
                    >
                      {isHindi ? "और पढ़ें" : "Read More"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Sun, Moon, Globe, Bell, Volume2, VolumeX, Type, Shield, Info, 
  MessageCircle, Mail, ChevronRight, Sunrise, Sun as SunIcon, Moon as MoonIcon, 
  BellRing, BellOff, Smartphone, LogOut
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSettings, ThemeMode, Language, TextSize } from "@/contexts/SettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { toast } from "@/hooks/use-toast";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
      {title}
    </h3>
    <div className="temple-card-warm rounded-xl overflow-hidden divide-y divide-border">
      {children}
    </div>
  </div>
);

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SettingsRow = ({ icon, label, sublabel, children, onClick, disabled }: SettingsRowProps) => (
  <div
    className={`flex items-center justify-between p-4 transition-colors ${
      onClick && !disabled ? "cursor-pointer hover:bg-muted/50" : ""
    } ${disabled ? "opacity-50" : ""}`}
    onClick={disabled ? undefined : onClick}
  >
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
        disabled ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
      }`}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-sm text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
    {children ? (
      children
    ) : onClick ? (
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    ) : null}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {
    settings,
    setThemeMode,
    setLanguage,
    setNotificationSetting,
    setBackgroundMusic,
    setVolume,
    setTextSize,
  } = useSettings();

  const { 
    isSupported: pushSupported, 
    isSubscribed: pushSubscribed, 
    isLoading: pushLoading,
    subscribe: subscribePush,
    unsubscribe: unsubscribePush 
  } = usePushNotifications();

  const { themeMode, language, notifications, backgroundMusic, volume, textSize } = settings;

  const handlePushToggle = async (checked: boolean) => {
    if (checked) {
      await subscribePush();
    } else {
      await unsubscribePush();
    }
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out. Namaste! 🙏",
      });
      navigate("/auth", { replace: true });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const textSizeOptions: { value: TextSize; label: string }[] = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-heading font-semibold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 animate-fade-in">
        {/* Theme Mode */}
        <SettingsSection title="Appearance">
          <SettingsRow
            icon={themeMode === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            label="Theme Mode"
            sublabel={themeMode === "light" ? "Light Mode" : "Dark Mode"}
          >
            <Switch
              checked={themeMode === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </SettingsRow>
        </SettingsSection>

        {/* Language */}
        <SettingsSection title="Language">
          <SettingsRow
            icon={<Globe className="w-5 h-5" />}
            label="Language"
            sublabel={language === "en" ? "English" : "हिंदी (Hindi)"}
          >
            <div className="flex items-center gap-2">
              <span className={`text-sm ${language === "en" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                EN
              </span>
              <Switch
                checked={language === "hi"}
                onCheckedChange={handleLanguageToggle}
              />
              <span className={`text-sm font-hindi ${language === "hi" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                हि
              </span>
            </div>
          </SettingsRow>
        </SettingsSection>

        {/* Notifications - Enhanced */}
        <SettingsSection title="Daily Notifications">
          {/* Master Toggle */}
          <SettingsRow
            icon={notifications.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            label="Enable Notifications"
            sublabel="Receive 3 spiritual messages daily"
          >
            <Switch
              checked={notifications.enabled}
              onCheckedChange={(checked) => setNotificationSetting("enabled", checked)}
            />
          </SettingsRow>

          {/* Time Slot Toggles */}
          <SettingsRow
            icon={<Sunrise className="w-5 h-5" />}
            label="Morning (6-8 AM)"
            sublabel="Motivation & Sankalp"
            disabled={!notifications.enabled}
          >
            <Switch
              checked={notifications.morningEnabled}
              onCheckedChange={(checked) => setNotificationSetting("morningEnabled", checked)}
              disabled={!notifications.enabled}
            />
          </SettingsRow>

          <SettingsRow
            icon={<SunIcon className="w-5 h-5" />}
            label="Afternoon (1-3 PM)"
            sublabel="Wisdom & Discipline"
            disabled={!notifications.enabled}
          >
            <Switch
              checked={notifications.afternoonEnabled}
              onCheckedChange={(checked) => setNotificationSetting("afternoonEnabled", checked)}
              disabled={!notifications.enabled}
            />
          </SettingsRow>

          <SettingsRow
            icon={<MoonIcon className="w-5 h-5" />}
            label="Night (8-10 PM)"
            sublabel="Reflection & Gratitude"
            disabled={!notifications.enabled}
          >
            <Switch
              checked={notifications.nightEnabled}
              onCheckedChange={(checked) => setNotificationSetting("nightEnabled", checked)}
              disabled={!notifications.enabled}
            />
          </SettingsRow>

          {/* Sound Toggle */}
          <SettingsRow
            icon={notifications.soundEnabled ? <BellRing className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            label="Notification Sound"
            sublabel={notifications.soundEnabled ? "Sound enabled" : "Silent mode"}
            disabled={!notifications.enabled}
          >
            <Switch
              checked={notifications.soundEnabled}
              onCheckedChange={(checked) => setNotificationSetting("soundEnabled", checked)}
              disabled={!notifications.enabled}
            />
          </SettingsRow>
        </SettingsSection>

        {/* Push Notifications */}
        {pushSupported && (
          <SettingsSection title="Push Notifications">
            <SettingsRow
              icon={<Smartphone className="w-5 h-5" />}
              label="Enable Push Notifications"
              sublabel={pushSubscribed ? "Receive reminders even when app is closed" : "Get spiritual reminders on your device"}
            >
              <Switch
                checked={pushSubscribed}
                onCheckedChange={handlePushToggle}
                disabled={pushLoading}
              />
            </SettingsRow>
            {pushSubscribed && (
              <div className="px-4 py-3 text-sm text-muted-foreground bg-muted/30">
                <p className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  You'll receive 3 spiritual messages daily at scheduled times
                </p>
              </div>
            )}
          </SettingsSection>
        )}

        {/* Audio Settings */}
        <SettingsSection title="Audio">
          <SettingsRow
            icon={backgroundMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            label="Background Music"
            sublabel={backgroundMusic ? "Enabled" : "Disabled"}
          >
            <Switch
              checked={backgroundMusic}
              onCheckedChange={setBackgroundMusic}
            />
          </SettingsRow>
          {backgroundMusic && (
            <div className="px-4 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground mb-2">Volume</p>
                <Slider
                  value={[volume]}
                  onValueChange={(val) => setVolume(val[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-muted-foreground w-10 text-right">{volume}%</span>
            </div>
          )}
        </SettingsSection>

        {/* Text Size */}
        <SettingsSection title="Text Size">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Type className="w-5 h-5" />
              </div>
              <p className="font-medium text-foreground">Reading Size</p>
            </div>
            <div className="flex gap-2">
              {textSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTextSize(option.value)}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                    textSize === option.value
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <span className={option.value === "small" ? "text-sm" : option.value === "large" ? "text-lg" : ""}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </SettingsSection>

        {/* Privacy & App Info */}
        <SettingsSection title="Privacy & App Info">
          <SettingsRow
            icon={<Shield className="w-5 h-5" />}
            label="Privacy Policy"
            onClick={() => navigate("/privacy-policy")}
          />
          <SettingsRow
            icon={<Shield className="w-5 h-5" />}
            label="Terms & Conditions"
            onClick={() => navigate("/terms-conditions")}
          />
          <SettingsRow
            icon={<Info className="w-5 h-5" />}
            label="About App"
            sublabel="Divya Darshan v1.0.0"
            onClick={() => navigate("/about")}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsRow
            icon={<Mail className="w-5 h-5" />}
            label="Contact & Support"
            sublabel="Get help with any issues"
            onClick={() => navigate("/contact")}
          />
          <SettingsRow
            icon={<MessageCircle className="w-5 h-5" />}
            label="Feedback / Report a Problem"
            sublabel="Help us improve the app"
            onClick={() => navigate("/contact")}
          />
        </SettingsSection>

        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsRow
            icon={<Mail className="w-5 h-5" />}
            label="Signed in as"
            sublabel={user?.email || "Unknown"}
          />
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-destructive/5 transition-colors"
            onClick={() => setShowLogoutDialog(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-destructive/10 text-destructive">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-destructive">Logout</p>
                <p className="text-sm text-muted-foreground">Sign out from your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-destructive/60" />
          </div>
        </SettingsSection>

        {/* App Version Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🙏 Divya Darshan
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Version 1.0.0 • Made with devotion
          </p>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <LogOut className="w-5 h-5 text-destructive" />
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You can always log back in with this account or use a different account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 sm:justify-end">
            <AlertDialogCancel disabled={isLoggingOut} className="flex-1 sm:flex-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 sm:flex-none bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoggingOut ? "Signing out..." : "Yes, Logout"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;

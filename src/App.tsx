import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationManager from "@/components/NotificationManager";
import Cover from "./pages/Cover";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DeityDetail from "./pages/DeityDetail";
import Guidance from "./pages/Guidance";
import Compatibility from "./pages/Compatibility";
import Meditation from "./pages/Meditation";
import Ramcharitmanas from "./pages/Ramcharitmanas";
import BhagavadGita from "./pages/BhagavadGita";
import VishnuPuran from "./pages/VishnuPuran";
import Panchang from "./pages/Panchang";
import PrayerJournal from "./pages/PrayerJournal";
import VratGuide from "./pages/VratGuide";
import AartiPage from "./pages/Aarti";
import SacredStories from "./pages/SacredStories";
import SaintsGurus from "./pages/SaintsGurus";
import SpiritualTechniques from "./pages/SpiritualTechniques";
import Sadhna from "./pages/Sadhna";
import Mantras from "./pages/Mantras";
import PredictionInfo from "./pages/PredictionInfo";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutApp from "./pages/AboutApp";
import ContactSupport from "./pages/ContactSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NotificationManager />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Cover />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/deity/:id" element={<ProtectedRoute><DeityDetail /></ProtectedRoute>} />
              <Route path="/guidance" element={<ProtectedRoute><Guidance /></ProtectedRoute>} />
              <Route path="/compatibility" element={<ProtectedRoute><Compatibility /></ProtectedRoute>} />
              <Route path="/meditation" element={<ProtectedRoute><Meditation /></ProtectedRoute>} />
              <Route path="/ramcharitmanas" element={<ProtectedRoute><Ramcharitmanas /></ProtectedRoute>} />
              <Route path="/bhagavad-gita" element={<ProtectedRoute><BhagavadGita /></ProtectedRoute>} />
              <Route path="/vishnu-puran" element={<ProtectedRoute><VishnuPuran /></ProtectedRoute>} />
              <Route path="/panchang" element={<ProtectedRoute><Panchang /></ProtectedRoute>} />
              <Route path="/prayer-journal" element={<ProtectedRoute><PrayerJournal /></ProtectedRoute>} />
              <Route path="/vrat-guide" element={<ProtectedRoute><VratGuide /></ProtectedRoute>} />
              <Route path="/aarti" element={<ProtectedRoute><AartiPage /></ProtectedRoute>} />
              <Route path="/sacred-stories" element={<ProtectedRoute><SacredStories /></ProtectedRoute>} />
              <Route path="/saints-gurus" element={<ProtectedRoute><SaintsGurus /></ProtectedRoute>} />
              <Route path="/spiritual-techniques" element={<ProtectedRoute><SpiritualTechniques /></ProtectedRoute>} />
              <Route path="/sadhna" element={<ProtectedRoute><Sadhna /></ProtectedRoute>} />
              <Route path="/mantras" element={<ProtectedRoute><Mantras /></ProtectedRoute>} />
              <Route path="/prediction-info" element={<ProtectedRoute><PredictionInfo /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
              <Route path="/terms-conditions" element={<ProtectedRoute><TermsConditions /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><AboutApp /></ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute><ContactSupport /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SettingsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

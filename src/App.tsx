import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cover from "./pages/Cover";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Cover />} />
            <Route path="/auth" element={<Auth />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { useState } from "react";
import { ArrowLeft, Sparkles, Clock, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";

interface SadhnaItem {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  steps: string[];
  bestTime: string;
}

const sadhnaData: SadhnaItem[] = [
  {
    id: "japa-sadhna",
    title: "Japa Sadhna",
    titleHi: "जप साधना",
    description: "The practice of repeating a mantra with focused attention. Develops concentration and divine connection.",
    duration: "15-30 mins daily",
    level: "beginner",
    benefits: [
      "Calms the mind",
      "Develops focus",
      "Creates spiritual vibrations",
      "Purifies consciousness"
    ],
    steps: [
      "Choose a quiet place",
      "Sit in comfortable position",
      "Hold mala beads if available",
      "Begin chanting your chosen mantra",
      "Focus on the sound and meaning",
      "Complete 108 repetitions (one mala)"
    ],
    bestTime: "Brahma Muhurta (4-6 AM) or Evening"
  },
  {
    id: "dhyana-sadhna",
    title: "Dhyana Sadhna",
    titleHi: "ध्यान साधना",
    description: "Deep meditation practice to achieve mental stillness and self-realization.",
    duration: "20-45 mins daily",
    level: "intermediate",
    benefits: [
      "Inner peace",
      "Reduced stress",
      "Heightened awareness",
      "Spiritual growth"
    ],
    steps: [
      "Find a peaceful environment",
      "Sit with spine erect",
      "Close eyes gently",
      "Focus on breath or inner light",
      "Let thoughts pass without attachment",
      "Gradually deepen concentration"
    ],
    bestTime: "Early morning or before sleep"
  },
  {
    id: "tratak-sadhna",
    title: "Tratak Sadhna",
    titleHi: "त्राटक साधना",
    description: "Gazing practice to develop concentration, clarity, and psychic abilities.",
    duration: "10-20 mins daily",
    level: "intermediate",
    benefits: [
      "Improves eyesight",
      "Develops concentration",
      "Calms the mind",
      "Awakens intuition"
    ],
    steps: [
      "Place a candle at eye level",
      "Sit 2-3 feet away",
      "Gaze at flame without blinking",
      "When eyes water, close them",
      "Visualize the flame internally",
      "Repeat 3-5 times"
    ],
    bestTime: "After sunset, in darkness"
  },
  {
    id: "pranayama-sadhna",
    title: "Pranayama Sadhna",
    titleHi: "प्राणायाम साधना",
    description: "Breath control practices to regulate life force energy and purify the nadis.",
    duration: "15-30 mins daily",
    level: "beginner",
    benefits: [
      "Increases energy",
      "Balances mind",
      "Purifies energy channels",
      "Prepares for meditation"
    ],
    steps: [
      "Sit in comfortable position",
      "Start with natural breathing",
      "Practice Anulom Vilom (alternate nostril)",
      "Include Kapalbhati (skull shining)",
      "Add Bhastrika if experienced",
      "End with deep relaxation"
    ],
    bestTime: "Morning on empty stomach"
  },
  {
    id: "seva-sadhna",
    title: "Seva Sadhna",
    titleHi: "सेवा साधना",
    description: "Selfless service as spiritual practice to dissolve ego and cultivate compassion.",
    duration: "As much as possible",
    level: "beginner",
    benefits: [
      "Reduces ego",
      "Develops compassion",
      "Creates good karma",
      "Brings inner joy"
    ],
    steps: [
      "Identify areas where you can serve",
      "Offer help without expectation",
      "Serve with humility",
      "Dedicate actions to the Divine",
      "Maintain consistency",
      "Reflect on the experience"
    ],
    bestTime: "Any time"
  },
  {
    id: "mauna-sadhna",
    title: "Mauna Sadhna",
    titleHi: "मौन साधना",
    description: "Practice of silence to conserve energy and develop inner awareness.",
    duration: "Few hours to full day",
    level: "advanced",
    benefits: [
      "Conserves mental energy",
      "Deepens self-awareness",
      "Reduces unnecessary speech",
      "Develops willpower"
    ],
    steps: [
      "Choose a specific time period",
      "Inform family/colleagues",
      "Avoid all verbal communication",
      "Minimize written communication",
      "Observe inner thoughts",
      "Maintain peaceful awareness"
    ],
    bestTime: "Weekly practice, one day"
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-amber-100 text-amber-800";
    case "advanced":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Sadhna = () => {
  const [selectedSadhna, setSelectedSadhna] = useState<SadhnaItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <Link to="/home" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🙏</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            साधना
          </h1>
          <p className="text-lg text-muted-foreground">Sadhna - Spiritual Practices</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Discover traditional spiritual practices for self-transformation. 
            Each sadhna is a path to inner peace and divine connection.
          </p>
        </div>

        {selectedSadhna ? (
          /* Detail View */
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedSadhna(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Sadhnas
            </Button>

            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedSadhna.titleHi}</CardTitle>
                    <p className="text-lg text-muted-foreground">{selectedSadhna.title}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedSadhna.level)}`}>
                    {selectedSadhna.level}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <p className="text-foreground">{selectedSadhna.description}</p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{selectedSadhna.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4 text-primary" />
                    <span>{selectedSadhna.bestTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedSadhna.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">How to Practice</h3>
                  <ol className="space-y-3">
                    {selectedSadhna.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Grid View */
          <Tabs defaultValue="all" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {["all", "beginner", "intermediate", "advanced"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sadhnaData
                    .filter((s) => tab === "all" || s.level === tab)
                    .map((sadhna) => (
                      <Card 
                        key={sadhna.id}
                        className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/30"
                        onClick={() => setSelectedSadhna(sadhna)}
                      >
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl">{sadhna.titleHi}</CardTitle>
                              <p className="text-sm text-muted-foreground">{sadhna.title}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(sadhna.level)}`}>
                              {sadhna.level}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {sadhna.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{sadhna.duration}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Sadhna;

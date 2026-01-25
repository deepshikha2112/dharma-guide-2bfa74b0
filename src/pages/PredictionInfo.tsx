import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Sun, Moon, Zap, MessageCircle, Star, Heart, Timer, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

interface PlanetInfo {
  id: string;
  name: string;
  nameHi: string;
  emoji: string;
  icon: React.ComponentType<any>;
  color: string;
  significance: string;
  role: string;
  meaning: string;
}

const planets: PlanetInfo[] = [
  {
    id: "sun",
    name: "Sun",
    nameHi: "सूर्य",
    emoji: "☀️",
    icon: Sun,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    significance: "Confidence and self-respect",
    role: "Leadership, authority, and vitality",
    meaning: "Shows how strong and confident a person feels. Represents your core identity and life purpose."
  },
  {
    id: "moon",
    name: "Moon",
    nameHi: "चंद्र",
    emoji: "🌙",
    icon: Moon,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    significance: "Emotions and inner peace",
    role: "Mind, feelings, and relationships",
    meaning: "Reflects your emotional nature and mental peace. Governs how you connect with others emotionally."
  },
  {
    id: "mars",
    name: "Mars",
    nameHi: "मंगल",
    emoji: "🔴",
    icon: Zap,
    color: "bg-red-100 text-red-700 border-red-200",
    significance: "Energy and courage",
    role: "Action, strength, and determination",
    meaning: "Represents your drive and fighting spirit. Shows how you take action and handle challenges."
  },
  {
    id: "mercury",
    name: "Mercury",
    nameHi: "बुध",
    emoji: "💚",
    icon: MessageCircle,
    color: "bg-green-100 text-green-700 border-green-200",
    significance: "Intelligence and communication",
    role: "Learning, speech, and business skills",
    meaning: "Governs your thinking and speaking ability. Important for education, trade, and communication."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    nameHi: "गुरु / बृहस्पति",
    emoji: "🟡",
    icon: Star,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    significance: "Wisdom and good fortune",
    role: "Knowledge, spirituality, and growth",
    meaning: "Brings blessings, wisdom, and expansion in life. Known as the great teacher and protector."
  },
  {
    id: "venus",
    name: "Venus",
    nameHi: "शुक्र",
    emoji: "💗",
    icon: Heart,
    color: "bg-pink-100 text-pink-700 border-pink-200",
    significance: "Love and beauty",
    role: "Relationships, art, and comforts",
    meaning: "Governs love, marriage, and creative talents. Brings pleasure, luxury, and harmony in relationships."
  },
  {
    id: "saturn",
    name: "Saturn",
    nameHi: "शनि",
    emoji: "⚫",
    icon: Timer,
    color: "bg-gray-100 text-gray-700 border-gray-200",
    significance: "Discipline and karma",
    role: "Hard work, patience, and life lessons",
    meaning: "Teaches through challenges and delays. Rewards sincere effort and punishes laziness or dishonesty."
  },
  {
    id: "rahu",
    name: "Rahu",
    nameHi: "राहु",
    emoji: "🌑",
    icon: ArrowUpRight,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    significance: "Desire and ambition",
    role: "Material growth and new paths",
    meaning: "Pushes a person toward big goals and worldly success. Can create confusion but also innovation."
  },
  {
    id: "ketu",
    name: "Ketu",
    nameHi: "केतु",
    emoji: "🔮",
    icon: ArrowDownRight,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    significance: "Spirituality and detachment",
    role: "Liberation, intuition, and past karma",
    meaning: "Brings spiritual insights and helps let go of material attachments. Connected to past life karma."
  }
];

const PredictionInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        <BackButton label="Back to Home" />
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-800 text-sm mb-4">
            <Info className="w-4 h-4" />
            <span>Educational Guide</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            ग्रह जानकारी
          </h1>
          <p className="text-xl text-primary mb-2">Prediction Information</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple explanations of planets, Rahu, and Ketu used in Vedic astrology. 
            Understand what each celestial body represents in your life.
          </p>
        </div>

        {/* Important Note */}
        <Card className="p-4 mb-8 bg-amber-50 border-amber-200 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-amber-900">For Educational Purpose Only</h3>
              <p className="text-sm text-amber-800">
                This guide helps you understand astrology terms used in Astro Chat. 
                These are general meanings - actual effects depend on your complete birth chart.
              </p>
            </div>
          </div>
        </Card>

        {/* Planets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {planets.map((planet, index) => {
            const IconComponent = planet.icon;
            return (
              <Card 
                key={planet.id}
                className={`p-5 border-2 hover:shadow-lg transition-all animate-fade-in-up ${planet.color}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{planet.emoji}</span>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{planet.nameHi}</h3>
                    <p className="text-sm opacity-80">{planet.name}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold uppercase opacity-70">Significance</span>
                    <p className="text-sm font-medium">{planet.significance}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold uppercase opacity-70">Role</span>
                    <p className="text-sm font-medium">{planet.role}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-semibold uppercase opacity-70">Meaning</span>
                    <p className="text-sm">{planet.meaning}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Rahu-Ketu Explanation */}
        <Card className="p-6 mt-8 max-w-3xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <h3 className="font-heading text-xl font-bold text-foreground mb-3 text-center">
            🌒 राहु और केतु क्या हैं?
          </h3>
          <p className="text-muted-foreground text-center mb-4">What are Rahu & Ketu?</p>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>राहु (Rahu)</strong> and <strong>केतु (Ketu)</strong> are not physical planets like others. 
              They are lunar nodes - mathematical points where the Moon's orbit crosses the Sun's path.
            </p>
            <p>
              In Vedic astrology, they represent the dragon's head (Rahu) and tail (Ketu). 
              Together, they show your karmic journey - where you're headed (Rahu) and what you're leaving behind (Ketu).
            </p>
            <p className="text-center text-primary font-medium">
              Think of Rahu as your worldly desires, and Ketu as your spiritual growth.
            </p>
          </div>
        </Card>

        {/* Quick Tips */}
        <div className="mt-10 max-w-4xl mx-auto">
          <h3 className="font-heading text-xl font-semibold text-center text-foreground mb-6">
            💫 Quick Tips for Understanding Your Chart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Benefic Planets</h4>
              <p className="text-sm text-green-700">
                Jupiter, Venus, Mercury (when well-placed), and Moon are generally helpful and bring positive results.
              </p>
            </Card>
            <Card className="p-4 bg-orange-50 border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">⚡ Challenging Planets</h4>
              <p className="text-sm text-orange-700">
                Saturn, Mars, Rahu, and Ketu can be challenging but teach important life lessons through difficulties.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default PredictionInfo;

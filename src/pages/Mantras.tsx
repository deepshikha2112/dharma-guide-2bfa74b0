import { useState } from "react";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";

interface Mantra {
  id: string;
  deity: string;
  deityHi: string;
  type: "beej" | "daily" | "protection" | "peace" | "success";
  title: string;
  titleHi: string;
  text: string;
  transliteration: string;
  meaning: string;
  whenToChant: string;
  count: string;
  level: "beginner" | "advanced";
}

const mantrasData: Mantra[] = [
  // Ganesha Mantras
  {
    id: "ganesh-beej",
    deity: "Ganesha",
    deityHi: "गणेश",
    type: "beej",
    title: "Ganesha Beej Mantra",
    titleHi: "गणेश बीज मंत्र",
    text: "ॐ गं गणपतये नमः",
    transliteration: "Om Gam Ganapataye Namaha",
    meaning: "I bow to Lord Ganesha, the remover of obstacles",
    whenToChant: "Morning, before starting any new work",
    count: "108 times",
    level: "beginner"
  },
  {
    id: "ganesh-vakratunda",
    deity: "Ganesha",
    deityHi: "गणेश",
    type: "daily",
    title: "Vakratunda Mahakaya",
    titleHi: "वक्रतुण्ड महाकाय",
    text: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    transliteration: "Vakratunda Mahakaya Suryakoti Samaprabha\nNirvighnam Kuru Me Deva Sarva-Kaaryeshu Sarvada",
    meaning: "O Lord with curved trunk, large body, whose brilliance equals a billion suns, please make all my work free of obstacles, always",
    whenToChant: "Before any important work or exam",
    count: "11 times",
    level: "beginner"
  },
  // Shiva Mantras
  {
    id: "shiva-panchakshari",
    deity: "Shiva",
    deityHi: "शिव",
    type: "beej",
    title: "Panchakshari Mantra",
    titleHi: "पंचाक्षरी मंत्र",
    text: "ॐ नमः शिवाय",
    transliteration: "Om Namah Shivaya",
    meaning: "I bow to Lord Shiva, the auspicious one",
    whenToChant: "Any time, especially Monday",
    count: "108 times",
    level: "beginner"
  },
  {
    id: "shiva-mahamrityunjaya",
    deity: "Shiva",
    deityHi: "शिव",
    type: "protection",
    title: "Mahamrityunjaya Mantra",
    titleHi: "महामृत्युंजय मंत्र",
    text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
    transliteration: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam\nUrvarukamiva Bandhanan Mrityor Mukshiya Maamritat",
    meaning: "We worship the three-eyed one who nourishes all. May he liberate us from death for immortality, as a cucumber is freed from its stem",
    whenToChant: "For health, protection from illness",
    count: "108 times",
    level: "advanced"
  },
  // Lakshmi Mantras
  {
    id: "lakshmi-beej",
    deity: "Lakshmi",
    deityHi: "लक्ष्मी",
    type: "beej",
    title: "Lakshmi Beej Mantra",
    titleHi: "लक्ष्मी बीज मंत्र",
    text: "ॐ श्रीं महालक्ष्म्यै नमः",
    transliteration: "Om Shreem Mahalakshmyai Namaha",
    meaning: "I bow to Goddess Lakshmi, the goddess of wealth",
    whenToChant: "Friday, Diwali, for prosperity",
    count: "108 times",
    level: "beginner"
  },
  {
    id: "lakshmi-peace",
    deity: "Lakshmi",
    deityHi: "लक्ष्मी",
    type: "peace",
    title: "Lakshmi Gayatri",
    titleHi: "लक्ष्मी गायत्री",
    text: "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि।\nतन्नो लक्ष्मीः प्रचोदयात्॥",
    transliteration: "Om Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi\nTanno Lakshmi Prachodayat",
    meaning: "May we meditate on Goddess Lakshmi, the consort of Vishnu. May she inspire and illuminate us",
    whenToChant: "Morning and evening",
    count: "21 times",
    level: "beginner"
  },
  // Hanuman Mantras
  {
    id: "hanuman-beej",
    deity: "Hanuman",
    deityHi: "हनुमान",
    type: "beej",
    title: "Hanuman Beej Mantra",
    titleHi: "हनुमान बीज मंत्र",
    text: "ॐ ऐं भ्रीं हनुमते श्री राम दूताय नमः",
    transliteration: "Om Aim Bhreem Hanumate Shri Ram Dutaya Namaha",
    meaning: "I bow to Lord Hanuman, the messenger of Lord Rama",
    whenToChant: "Tuesday and Saturday",
    count: "108 times",
    level: "beginner"
  },
  {
    id: "hanuman-protection",
    deity: "Hanuman",
    deityHi: "हनुमान",
    type: "protection",
    title: "Hanuman Raksha Mantra",
    titleHi: "हनुमान रक्षा मंत्र",
    text: "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥",
    transliteration: "Manojavam Marutatulya Vegam Jitendriyam Buddhimatam Varishtham\nVatatmajam Vanar Yuth Mukhyam Shriram Dutam Sharanam Prapadye",
    meaning: "I take refuge in Hanuman, swift as the mind, fast as the wind, master of senses, foremost among the wise",
    whenToChant: "For courage and protection",
    count: "11 times",
    level: "beginner"
  },
  // Durga Mantras
  {
    id: "durga-beej",
    deity: "Durga",
    deityHi: "दुर्गा",
    type: "beej",
    title: "Durga Beej Mantra",
    titleHi: "दुर्गा बीज मंत्र",
    text: "ॐ दुं दुर्गायै नमः",
    transliteration: "Om Dum Durgayai Namaha",
    meaning: "I bow to Goddess Durga",
    whenToChant: "Navratri, Tuesday, Friday",
    count: "108 times",
    level: "beginner"
  },
  // Krishna Mantras
  {
    id: "krishna-beej",
    deity: "Krishna",
    deityHi: "कृष्ण",
    type: "beej",
    title: "Krishna Beej Mantra",
    titleHi: "कृष्ण बीज मंत्र",
    text: "ॐ क्लीं कृष्णाय नमः",
    transliteration: "Om Kleem Krishnaya Namaha",
    meaning: "I bow to Lord Krishna",
    whenToChant: "Janmashtami, Wednesday",
    count: "108 times",
    level: "beginner"
  },
  {
    id: "krishna-peace",
    deity: "Krishna",
    deityHi: "कृष्ण",
    type: "peace",
    title: "Hare Krishna Mahamantra",
    titleHi: "हरे कृष्ण महामंत्र",
    text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।\nहरे राम हरे राम राम राम हरे हरे॥",
    transliteration: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\nHare Rama Hare Rama Rama Rama Hare Hare",
    meaning: "O Lord Krishna, O Lord Rama, please engage me in Your service",
    whenToChant: "Any time, for peace and devotion",
    count: "108 times or more",
    level: "beginner"
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case "beej": return "बीज मंत्र";
    case "daily": return "दैनिक मंत्र";
    case "protection": return "रक्षा मंत्र";
    case "peace": return "शांति मंत्र";
    case "success": return "सफलता मंत्र";
    default: return type;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "beej": return "bg-amber-100 text-amber-800";
    case "daily": return "bg-blue-100 text-blue-800";
    case "protection": return "bg-red-100 text-red-800";
    case "peace": return "bg-green-100 text-green-800";
    case "success": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Mantras = () => {
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);
  const [selectedDeity, setSelectedDeity] = useState<string>("all");

  const deities = ["all", ...Array.from(new Set(mantrasData.map(m => m.deity)))];
  const filteredMantras = selectedDeity === "all" 
    ? mantrasData 
    : mantrasData.filter(m => m.deity === selectedDeity);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <BackButton label="Back to Home" />

        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🕉️</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            मंत्र और स्तोत्र
          </h1>
          <p className="text-lg text-muted-foreground">Mantra & Stotram</p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Sacred mantras for each deity with meaning, pronunciation, and chanting guidelines.
            Traditional mantras passed down through generations.
          </p>
        </div>

        {selectedMantra ? (
          /* Detail View */
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedMantra(null)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Mantras
            </Button>

            <Card className="border-primary/20 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">{selectedMantra.deityHi} • {selectedMantra.deity}</span>
                    <CardTitle className="text-2xl mt-1">{selectedMantra.titleHi}</CardTitle>
                    <p className="text-lg text-muted-foreground">{selectedMantra.title}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedMantra.type)}`}>
                    {getTypeLabel(selectedMantra.type)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Mantra Text */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg text-center">
                  <p className="text-2xl font-heading text-foreground whitespace-pre-line leading-relaxed">
                    {selectedMantra.text}
                  </p>
                </div>

                {/* Transliteration */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Transliteration</h3>
                  <p className="text-muted-foreground italic whitespace-pre-line">
                    {selectedMantra.transliteration}
                  </p>
                </div>

                {/* Meaning */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Meaning</h3>
                  <p className="text-muted-foreground">
                    {selectedMantra.meaning}
                  </p>
                </div>

                {/* Guidelines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">When to Chant</h4>
                      <p className="text-sm text-muted-foreground">{selectedMantra.whenToChant}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Repetitions</h4>
                      <p className="text-sm text-muted-foreground">{selectedMantra.count}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded-full ${selectedMantra.level === 'beginner' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                    {selectedMantra.level === 'beginner' ? 'For Beginners' : 'Advanced'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* List View */
          <div className="max-w-5xl mx-auto">
            {/* Deity Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {deities.map((deity) => (
                <Button
                  key={deity}
                  variant={selectedDeity === deity ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDeity(deity)}
                >
                  {deity === "all" ? "All Deities" : deity}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMantras.map((mantra) => (
                <Card 
                  key={mantra.id}
                  className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/30"
                  onClick={() => setSelectedMantra(mantra)}
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs text-muted-foreground">{mantra.deityHi}</span>
                        <h3 className="font-semibold text-lg">{mantra.titleHi}</h3>
                        <p className="text-sm text-muted-foreground">{mantra.title}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(mantra.type)}`}>
                        {getTypeLabel(mantra.type)}
                      </span>
                    </div>
                    <p className="text-primary font-heading text-lg mb-3 line-clamp-1">
                      {mantra.text.split('\n')[0]}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {mantra.count}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded ${mantra.level === 'beginner' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                        {mantra.level}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Mantras;

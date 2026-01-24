import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Clock, Calendar, CheckCircle, AlertCircle, Sparkles, Heart, ChevronRight } from "lucide-react";

interface Technique {
  id: string;
  problem: string;
  problemHindi: string;
  emoji: string;
  deity: string;
  deityHindi: string;
  principle: string;
  technique: string;
  techniqueHindi: string;
  steps: string[];
  timePerDay: string;
  duration: string;
  expectedBenefit: string;
  whoShouldAvoid?: string;
  mantra?: string;
}

const techniques: Technique[] = [
  {
    id: "anxiety",
    problem: "Anxiety & Fear",
    problemHindi: "चिंता और डर",
    emoji: "😰",
    deity: "Lord Hanuman",
    deityHindi: "हनुमान जी",
    principle: "वीरता और निर्भयता का आह्वान",
    technique: "Hanuman Dhyan Sadhana",
    techniqueHindi: "हनुमान ध्यान साधना",
    steps: [
      "सुबह 5-6 बजे उठें, स्नान करें",
      "लाल रंग का आसन बिछाएं, पूर्व दिशा में बैठें",
      "हनुमान जी की तस्वीर या मूर्ति के सामने दीपक जलाएं",
      "3 बार गहरी सांस लें, मन शांत करें",
      "'ॐ हं हनुमते नमः' मंत्र का 108 बार जप करें",
      "हनुमान जी को अपने सामने खड़ा कल्पना करें",
      "उनसे मन ही मन कहें: 'मुझे निर्भय बनाइए'",
      "5-10 मिनट शांत बैठें, फिर प्रणाम करें"
    ],
    timePerDay: "20-30 मिनट",
    duration: "21 दिन",
    expectedBenefit: "डर कम होगा, आत्मविश्वास बढ़ेगा, मन में शांति आएगी",
    mantra: "ॐ हं हनुमते नमः"
  },
  {
    id: "overthinking",
    problem: "Overthinking & Stress",
    problemHindi: "ज्यादा सोचना और तनाव",
    emoji: "🤯",
    deity: "Lord Shiva",
    deityHindi: "भगवान शिव",
    principle: "मन की स्थिरता और शून्यता",
    technique: "Shiva Trataka Meditation",
    techniqueHindi: "शिव त्राटक ध्यान",
    steps: [
      "रात को सोने से पहले या सुबह का समय चुनें",
      "शांत कमरे में बैठें, रोशनी कम रखें",
      "शिव लिंग या शिव जी की आंखों पर ध्यान केंद्रित करें",
      "बिना पलक झपकाए 2-3 मिनट देखें",
      "आंखों में पानी आए तो बंद करें",
      "'ॐ नमः शिवाय' का मन में जप करें",
      "सभी विचारों को जाने दें, शून्यता में रहें",
      "10-15 मिनट बाद धीरे-धीरे आंखें खोलें"
    ],
    timePerDay: "15-20 मिनट",
    duration: "40 दिन",
    expectedBenefit: "विचारों की भीड़ कम होगी, एकाग्रता बढ़ेगी, नींद अच्छी आएगी",
    mantra: "ॐ नमः शिवाय"
  },
  {
    id: "financial",
    problem: "Financial Blockage",
    problemHindi: "आर्थिक रुकावट",
    emoji: "💰",
    deity: "Goddess Lakshmi",
    deityHindi: "माँ लक्ष्मी",
    principle: "समृद्धि और प्रवाह का आह्वान",
    technique: "Lakshmi Dhan Prapti Sadhana",
    techniqueHindi: "लक्ष्मी धन प्राप्ति साधना",
    steps: [
      "शुक्रवार से शुरू करें",
      "सुबह या शाम, स्नान के बाद पूर्व या उत्तर दिशा में बैठें",
      "लाल या गुलाबी कपड़े पहनें",
      "माँ लक्ष्मी की तस्वीर के सामने घी का दीपक और धूप जलाएं",
      "एक कटोरी में चावल और हल्दी रखें",
      "'ॐ श्रीं महालक्ष्म्यै नमः' का 108 बार जप करें",
      "जप के बाद 5 मिनट आंखें बंद करके धन की प्राप्ति की कल्पना करें",
      "चावल को तिजोरी या पर्स में रखें"
    ],
    timePerDay: "20-25 मिनट",
    duration: "21 दिन (शुक्रवार से शुक्रवार)",
    expectedBenefit: "आर्थिक अवसर बढ़ेंगे, रुका हुआ पैसा आएगा, खर्च पर नियंत्रण होगा",
    whoShouldAvoid: "गर्भवती महिलाएं रात को न करें",
    mantra: "ॐ श्रीं महालक्ष्म्यै नमः"
  },
  {
    id: "relationship",
    problem: "Relationship Problems",
    problemHindi: "रिश्तों की समस्या",
    emoji: "💔",
    deity: "Lord Krishna & Radha",
    deityHindi: "राधा-कृष्ण",
    principle: "प्रेम और सामंजस्य",
    technique: "Radha Krishna Prem Sadhana",
    techniqueHindi: "राधा कृष्ण प्रेम साधना",
    steps: [
      "सुबह या शाम का समय चुनें",
      "राधा-कृष्ण की तस्वीर के सामने बैठें",
      "मक्खन और तुलसी का भोग लगाएं",
      "'राधे राधे' या 'हरे कृष्ण' मंत्र का जप करें",
      "अपने रिश्ते की समस्या मन में कहें",
      "कृष्ण जी से प्रेम और समझ की प्रार्थना करें",
      "जिससे समस्या है, उनके लिए शुभकामना करें",
      "10 मिनट शांत बैठें, फिर आरती करें"
    ],
    timePerDay: "20 मिनट",
    duration: "7 दिन (प्रेम सप्ताह)",
    expectedBenefit: "मन में कड़वाहट कम होगी, संवाद बेहतर होगा, प्रेम बढ़ेगा",
    mantra: "हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे"
  },
  {
    id: "career",
    problem: "Career Confusion",
    problemHindi: "करियर में भ्रम",
    emoji: "💼",
    deity: "Goddess Saraswati",
    deityHindi: "माँ सरस्वती",
    principle: "बुद्धि और स्पष्टता",
    technique: "Saraswati Vidya Sadhana",
    techniqueHindi: "सरस्वती विद्या साधना",
    steps: [
      "सुबह जल्दी उठें (ब्रह्म मुहूर्त में)",
      "सफेद कपड़े पहनें, पूर्व दिशा में बैठें",
      "सरस्वती माँ की तस्वीर या मूर्ति रखें",
      "सफेद फूल और मिठाई का भोग लगाएं",
      "'ॐ ऐं सरस्वत्यै नमः' का 108 बार जप करें",
      "अपनी करियर समस्या कागज पर लिखें",
      "माँ से स्पष्टता और सही मार्ग की प्रार्थना करें",
      "जप के बाद 5 मिनट मौन रहें, उत्तर अंदर से आएगा"
    ],
    timePerDay: "25-30 मिनट",
    duration: "21 दिन",
    expectedBenefit: "सोच स्पष्ट होगी, सही निर्णय ले पाएंगे, नए अवसर दिखेंगे",
    mantra: "ॐ ऐं सरस्वत्यै नमः"
  },
  {
    id: "confidence",
    problem: "Lack of Confidence",
    problemHindi: "आत्मविश्वास की कमी",
    emoji: "😔",
    deity: "Lord Rama",
    deityHindi: "भगवान राम",
    principle: "मर्यादा और आत्मबल",
    technique: "Ram Naam Shakti Sadhana",
    techniqueHindi: "राम नाम शक्ति साधना",
    steps: [
      "सुबह सूर्योदय के समय उठें",
      "स्नान के बाद साफ कपड़े पहनें",
      "राम जी की तस्वीर के सामने बैठें",
      "11 बार 'जय श्री राम' बोलें जोर से",
      "फिर 'श्री राम जय राम जय जय राम' माला करें",
      "राम जी को देखते हुए सोचें: 'मैं भी राम जैसा साहसी हूं'",
      "उनके गुणों को अपने में आने की कल्पना करें",
      "हनुमान चालीसा पढ़ें (वैकल्पिक)"
    ],
    timePerDay: "20-25 मिनट",
    duration: "40 दिन",
    expectedBenefit: "आत्मविश्वास बढ़ेगा, डर कम होगा, बोलने में हिचक नहीं होगी",
    mantra: "श्री राम जय राम जय जय राम"
  },
  {
    id: "negativity",
    problem: "Negative Thoughts",
    problemHindi: "नकारात्मक विचार",
    emoji: "😞",
    deity: "Lord Ganesha",
    deityHindi: "गणेश जी",
    principle: "विघ्न हरण और सकारात्मकता",
    technique: "Ganesha Vighna Nashak Sadhana",
    techniqueHindi: "गणेश विघ्न नाशक साधना",
    steps: [
      "सुबह या शाम, दोनों समय कर सकते हैं",
      "गणेश जी की तस्वीर के सामने बैठें",
      "लाल फूल और मोदक/लड्डू का भोग लगाएं",
      "'ॐ गं गणपतये नमः' का 108 बार जप करें",
      "हर नकारात्मक विचार को गणेश जी के पास छोड़ें",
      "सोचें: 'मेरे सारे विघ्न गणेश जी ले रहे हैं'",
      "गहरी सांस लें, सकारात्मक ऊर्जा अंदर भरें",
      "प्रसाद ग्रहण करें"
    ],
    timePerDay: "15-20 मिनट",
    duration: "21 दिन",
    expectedBenefit: "मन हल्का होगा, सकारात्मक सोच आएगी, नई शुरुआत होगी",
    mantra: "ॐ गं गणपतये नमः"
  },
  {
    id: "sleep",
    problem: "Sleep Problems",
    problemHindi: "नींद की समस्या",
    emoji: "😴",
    deity: "Lord Vishnu",
    deityHindi: "भगवान विष्णु",
    principle: "विश्राम और समर्पण",
    technique: "Vishnu Nidra Sadhana",
    techniqueHindi: "विष्णु निद्रा साधना",
    steps: [
      "सोने से 30 मिनट पहले शुरू करें",
      "फोन और TV बंद करें",
      "बिस्तर पर लेटें, आंखें बंद करें",
      "विष्णु जी को शेषनाग पर लेटा कल्पना करें",
      "'ॐ नमो नारायणाय' धीरे-धीरे मन में दोहराएं",
      "शरीर के हर अंग को ढीला छोड़ें",
      "सोचें: 'जैसे विष्णु जी शांत हैं, मैं भी शांत हूं'",
      "सांसों पर ध्यान दें, धीरे-धीरे नींद आ जाएगी"
    ],
    timePerDay: "15-20 मिनट (सोने से पहले)",
    duration: "7 दिन",
    expectedBenefit: "जल्दी नींद आएगी, गहरी नींद होगी, सुबह ताजगी रहेगी",
    mantra: "ॐ नमो नारायणाय"
  },
  {
    id: "anger",
    problem: "Anger & Emotional Pain",
    problemHindi: "गुस्सा और भावनात्मक दर्द",
    emoji: "😤",
    deity: "Goddess Durga",
    deityHindi: "माँ दुर्गा",
    principle: "शक्ति का सही उपयोग",
    technique: "Durga Shakti Shaman Sadhana",
    techniqueHindi: "दुर्गा शक्ति शमन साधना",
    steps: [
      "जब गुस्सा आए, तुरंत एकांत में जाएं",
      "10 बार गहरी सांस लें",
      "माँ दुर्गा को याद करें",
      "'ॐ दुं दुर्गायै नमः' 21 बार जपें",
      "सोचें: 'मेरा गुस्सा माँ को समर्पित है'",
      "माँ से प्रार्थना करें: 'मुझे शांत करो'",
      "5 मिनट आंखें बंद रखें",
      "पानी पिएं, शांत होकर ही बाहर आएं"
    ],
    timePerDay: "10-15 मिनट (जब जरूरत हो)",
    duration: "जब भी गुस्सा आए + रोज 21 दिन",
    expectedBenefit: "गुस्से पर नियंत्रण होगा, भावनात्मक संतुलन आएगा",
    whoShouldAvoid: "गंभीर मानसिक रोगियों को डॉक्टर से भी सलाह लेनी चाहिए",
    mantra: "ॐ दुं दुर्गायै नमः"
  }
];

const SpiritualTechniques = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <BackButton label="Back to Home" />
          <div className="text-center">
          <Brain className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            आध्यात्मिक तकनीकें
          </h1>
          <p className="text-xl text-primary mb-2">Spiritual Techniques</p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            जीवन की समस्याओं के लिए व्यावहारिक आध्यात्मिक उपाय। 
            अनुशासन, स्पष्टता और निरंतरता पर आधारित।
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-muted rounded-full text-sm">✅ कोई चमत्कार का दावा नहीं</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm">✅ वैज्ञानिक दृष्टिकोण</span>
            <span className="px-3 py-1 bg-muted rounded-full text-sm">✅ सरल विधि</span>
          </div>
          </div>
        </div>
      </section>

      {/* Techniques Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techniques.map((tech, index) => (
              <Card 
                key={tech.id}
                className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedTechnique(tech)}
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{tech.emoji}</span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tech.problemHindi}
                      </h3>
                      <p className="text-sm text-muted-foreground">{tech.problem}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{tech.deityHindi}</span>
                  </div>

                  <p className="text-sm text-foreground font-medium">
                    {tech.techniqueHindi}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tech.timePerDay}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {tech.duration}
                    </span>
                  </div>

                  <div className="flex items-center text-primary text-sm font-medium pt-2 group-hover:translate-x-1 transition-transform">
                    <span>पूरी विधि देखें</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Technique Detail Modal */}
      {selectedTechnique && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 min-h-screen">
            <Card className="max-w-3xl mx-auto p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedTechnique.emoji}</span>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      {selectedTechnique.problemHindi}
                    </h2>
                    <p className="text-muted-foreground">{selectedTechnique.problem}</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedTechnique(null)}>✕</Button>
              </div>

              <div className="space-y-6">
                {/* Deity & Principle */}
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">{selectedTechnique.techniqueHindi}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>देवता:</strong> {selectedTechnique.deityHindi} ({selectedTechnique.deity})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>सिद्धांत:</strong> {selectedTechnique.principle}
                  </p>
                </Card>

                {/* Steps */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    कदम-दर-कदम विधि
                  </h3>
                  <ol className="space-y-2">
                    {selectedTechnique.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Mantra */}
                {selectedTechnique.mantra && (
                  <Card className="p-4 bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground mb-1">मंत्र</p>
                    <p className="text-xl font-semibold text-primary">{selectedTechnique.mantra}</p>
                  </Card>
                )}

                {/* Time & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">रोज़ समय</p>
                    <p className="font-semibold text-foreground">{selectedTechnique.timePerDay}</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <Calendar className="w-6 h-6 mx-auto text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">अवधि</p>
                    <p className="font-semibold text-foreground">{selectedTechnique.duration}</p>
                  </Card>
                </div>

                {/* Expected Benefit */}
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    अपेक्षित लाभ
                  </h3>
                  <p className="text-muted-foreground">{selectedTechnique.expectedBenefit}</p>
                </div>

                {/* Warning */}
                {selectedTechnique.whoShouldAvoid && (
                  <Card className="p-4 bg-destructive/10 border-destructive/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">सावधानी</p>
                        <p className="text-sm text-muted-foreground">{selectedTechnique.whoShouldAvoid}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <Button className="w-full" onClick={() => { setSelectedTechnique(null); navigate("/guidance"); }}>
                  व्यक्तिगत मार्गदर्शन लें
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default SpiritualTechniques;

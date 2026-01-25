import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Star, Calendar, Heart, ChevronRight, Sparkles } from "lucide-react";
import { deities } from "@/data/deities";

// Extended deity data for Sacred Stories
const deityCategories = [
  {
    id: "trimurti",
    name: "त्रिमूर्ति",
    nameEn: "Trimurti",
    description: "ब्रह्मा, विष्णु, महेश - सृष्टि के निर्माता, पालक और संहारक",
    deities: ["vishnu", "shiva"]
  },
  {
    id: "avatars",
    name: "विष्णु अवतार",
    nameEn: "Vishnu Avatars",
    description: "भगवान विष्णु के दशावतार",
    deities: ["rama", "krishna"]
  },
  {
    id: "shakti",
    name: "शक्ति रूप",
    nameEn: "Shakti Forms",
    description: "आदि शक्ति के विभिन्न रूप",
    deities: ["durga", "lakshmi"]
  },
  {
    id: "popular",
    name: "लोकप्रिय देवता",
    nameEn: "Popular Deities",
    description: "सर्वाधिक पूजित देवी-देवता",
    deities: ["ganesha", "hanuman", "murugan"]
  },
  {
    id: "saints",
    name: "संत और गुरु",
    nameEn: "Saints & Gurus",
    description: "महान संतों की जीवन गाथा",
    deities: ["saibaba", "gurunanak"]
  }
];

// Additional deities not in main data
const additionalDeities = [
  {
    id: "brahma",
    name: "Lord Brahma",
    sanskrit: "ब्रह्मा जी",
    description: "सृष्टि के रचयिता, चार वेदों के ज्ञाता। ब्रह्मा जी ने इस संसार की रचना की और वेदों का ज्ञान दिया।",
    emoji: "🪷",
    image: null,
    stories: [
      { title: "सृष्टि की रचना", lesson: "सृजनात्मकता और ज्ञान का महत्व" },
      { title: "सरस्वती की उत्पत्ति", lesson: "विद्या और कला का सम्मान" },
      { title: "ब्रह्मा का अभिमान", lesson: "अहंकार का त्याग" }
    ],
    festivals: ["ब्रह्मा पूजा (पुष्कर)"]
  },
  {
    id: "kali",
    name: "Goddess Kali",
    sanskrit: "माँ काली",
    description: "समय और परिवर्तन की देवी, बुराई का नाश करने वाली। माँ काली का रूप भयंकर है पर भक्तों के लिए करुणामयी।",
    emoji: "🔥",
    image: null,
    stories: [
      { title: "रक्तबीज का वध", lesson: "बुराई को जड़ से मिटाना" },
      { title: "शिव पर पैर", lesson: "शक्ति और शांति का संतुलन" },
      { title: "काली की उत्पत्ति", lesson: "क्रोध का सही उपयोग" }
    ],
    festivals: ["काली पूजा", "नवरात्रि"]
  },
  {
    id: "saraswati",
    name: "Goddess Saraswati",
    sanskrit: "माँ सरस्वती",
    description: "विद्या, संगीत और कला की देवी। माँ सरस्वती छात्रों और कलाकारों की आराध्य देवी हैं।",
    emoji: "📚",
    image: null,
    stories: [
      { title: "वीणा की उत्पत्ति", lesson: "संगीत से आत्मशांति" },
      { title: "ब्रह्मा की सहचरी", lesson: "ज्ञान और सृजन का मेल" },
      { title: "सरस्वती नदी", lesson: "पवित्रता और प्रवाह" }
    ],
    festivals: ["वसंत पंचमी", "सरस्वती पूजा"]
  },
  {
    id: "surya",
    name: "Lord Surya",
    sanskrit: "सूर्य देव",
    description: "प्रकाश, ऊर्जा और जीवन के देवता। सूर्य देव सभी जीवों को प्राण शक्ति देते हैं।",
    emoji: "☀️",
    image: null,
    stories: [
      { title: "कर्ण को कवच-कुंडल", lesson: "पिता का प्रेम और बलिदान" },
      { title: "सूर्य और संज्ञा", lesson: "प्रेम में समर्पण" },
      { title: "हनुमान द्वारा सूर्य निगलना", lesson: "शक्ति और विनम्रता" }
    ],
    festivals: ["छठ पूजा", "मकर संक्रांति", "रथ सप्तमी"]
  },
  {
    id: "shani",
    name: "Lord Shani",
    sanskrit: "शनि देव",
    description: "कर्मों के न्यायाधीश, धैर्य और अनुशासन के देवता। शनि देव सत्य और न्याय के प्रतीक हैं।",
    emoji: "⚫",
    image: null,
    stories: [
      { title: "शनि की दृष्टि", lesson: "कर्मों का फल अवश्य मिलता है" },
      { title: "शनि और हनुमान", lesson: "भक्ति की शक्ति" },
      { title: "शनि की साढ़े साती", lesson: "धैर्य और आत्मसुधार" }
    ],
    festivals: ["शनि अमावस्या", "शनि जयंती"]
  }
];

// Epic stories collection
const epicStories = [
  {
    id: "ramayan",
    title: "रामायण",
    titleEn: "Ramayana",
    description: "भगवान राम की दिव्य कथा - मर्यादा पुरुषोत्तम की जीवन यात्रा",
    emoji: "🏹",
    chapters: 7,
    keyLessons: ["धर्म का पालन", "पति-पत्नी का प्रेम", "भाई का त्याग"],
    path: "/ramcharitmanas"
  },
  {
    id: "mahabharat",
    title: "महाभारत",
    titleEn: "Mahabharata",
    description: "धर्म और अधर्म की महागाथा - पांडवों और कौरवों की कहानी",
    emoji: "⚔️",
    chapters: 18,
    keyLessons: ["कर्म का सिद्धांत", "धर्म की रक्षा", "सत्य की विजय"],
    path: "/bhagavad-gita"
  },
  {
    id: "shivpuran",
    title: "शिव पुराण",
    titleEn: "Shiva Purana",
    description: "भगवान शिव की दिव्य लीलाएं और महिमा",
    emoji: "🔱",
    chapters: 12,
    keyLessons: ["वैराग्य", "तपस्या", "भक्ति"],
    path: "/deity/shiva"
  },
  {
    id: "vishnupuran",
    title: "विष्णु पुराण",
    titleEn: "Vishnu Purana",
    description: "भगवान विष्णु के अवतारों और लीलाओं की कथाएं",
    emoji: "🪷",
    chapters: 6,
    keyLessons: ["धर्म संस्थापन", "भक्ति", "सेवा"],
    path: "/vishnu-puran"
  },
  {
    id: "devibhagwat",
    title: "देवी भागवत",
    titleEn: "Devi Bhagwat",
    description: "आदि शक्ति माँ दुर्गा की महिमा और नवरात्रि कथाएं",
    emoji: "🦁",
    chapters: 12,
    keyLessons: ["शक्ति उपासना", "बुराई पर विजय", "नारी शक्ति"],
    path: "/deity/durga"
  },
  {
    id: "ganeshpuran",
    title: "गणेश पुराण",
    titleEn: "Ganesha Purana",
    description: "श्री गणेश जी की उत्पत्ति और दिव्य लीलाएं",
    emoji: "🐘",
    chapters: 8,
    keyLessons: ["विघ्न हरण", "बुद्धि", "विनम्रता"],
    path: "/deity/ganesha"
  }
];

const SacredStories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("epics");

  // Combine main deities with additional ones
  const allDeities = [
    ...deities,
    ...additionalDeities.map(d => ({
      ...d,
      color: "bg-primary/10",
      introduction: d.description,
      chapters: d.stories.map((s, i) => ({ id: i + 1, title: s.title, content: s.lesson })),
      mantras: [],
      lifeLesson: d.stories[0]?.lesson || ""
    }))
  ];

  const filteredDeities = allDeities.filter(deity => 
    deity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deity.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDeityByCategory = (categoryId: string) => {
    const category = deityCategories.find(c => c.id === categoryId);
    if (!category) return filteredDeities;
    return filteredDeities.filter(d => category.deities.includes(d.id));
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <BackButton label="Back to Home" />
          <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            पवित्र कथाएं
          </h1>
          <p className="text-xl text-primary mb-2">Sacred Stories</p>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            पुराणों और इतिहास से देवी-देवताओं की दिव्य कथाएं। 
            धर्म, कर्म और जीवन के मूल्यों पर आधारित शिक्षाप्रद कहानियां।
          </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="देवता खोजें... Search deity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-8">
              <TabsTrigger value="epics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                महाकाव्य
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                सभी देवता
              </TabsTrigger>
              {deityCategories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Epic Stories Tab */}
            <TabsContent value="epics" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-semibold text-foreground">महाकाव्य और पुराण</h2>
                <p className="text-muted-foreground">Epic Stories & Puranas</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {epicStories.map((story, index) => (
                  <Card 
                    key={story.id}
                    className="group overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => navigate(story.path)}
                  >
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-6xl">{story.emoji}</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{story.titleEn}</p>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {story.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {story.keyLessons.map((lesson, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {lesson}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">{story.chapters} अध्याय</span>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                          <span>पढ़ें</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeities.map((deity, index) => (
                  <DeityStoryCard 
                    key={deity.id} 
                    deity={deity} 
                    delay={index * 50}
                    onClick={() => {
                      if (deities.find(d => d.id === deity.id)) {
                        navigate(`/deity/${deity.id}`);
                      }
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            {deityCategories.map(cat => (
              <TabsContent key={cat.id} value={cat.id} className="mt-0">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl font-semibold text-foreground">{cat.name}</h2>
                  <p className="text-muted-foreground">{cat.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getDeityByCategory(cat.id).map((deity, index) => (
                    <DeityStoryCard 
                      key={deity.id} 
                      deity={deity} 
                      delay={index * 50}
                      onClick={() => {
                        if (deities.find(d => d.id === deity.id)) {
                          navigate(`/deity/${deity.id}`);
                        }
                      }}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-center text-foreground mb-8">
            प्रत्येक कथा में क्या मिलेगा?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Star, title: "उत्पत्ति और महत्व", desc: "Origin & Significance" },
              { icon: BookOpen, title: "3-5 मुख्य कथाएं", desc: "Important Stories" },
              { icon: Heart, title: "जीवन की शिक्षा", desc: "Moral Lessons" },
              { icon: Calendar, title: "त्योहार और व्रत", desc: "Festivals & Vrats" }
            ].map((item, i) => (
              <Card key={i} className="p-4 text-center">
                <item.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                <h3 className="font-medium text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BottomNavigation />
    </main>
  );
};

interface DeityStoryCardProps {
  deity: any;
  delay: number;
  onClick: () => void;
}

const DeityStoryCard = ({ deity, delay, onClick }: DeityStoryCardProps) => {
  const hasFullDetails = deity.chapters && deity.chapters.length > 2;

  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {/* Image or Emoji Header */}
      <div className={`h-32 ${deity.color} flex items-center justify-center relative overflow-hidden`}>
        {deity.image ? (
          <img 
            src={deity.image} 
            alt={deity.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-6xl">{deity.emoji}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <span className="text-xs bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full">
            {deity.chapters?.length || 3}+ कथाएं
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {deity.sanskrit}
          </h3>
          <p className="text-sm text-muted-foreground">{deity.name}</p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {deity.description}
        </p>

        {/* Story Previews */}
        {deity.chapters && deity.chapters.length > 0 && (
          <div className="space-y-1">
            {deity.chapters.slice(0, 2).map((ch: any) => (
              <div key={ch.id} className="flex items-center text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 mr-1.5 text-primary/60" />
                <span className="line-clamp-1">{ch.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Festivals */}
        {deity.festivals && deity.festivals.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {deity.festivals.slice(0, 2).map((fest: string, i: number) => (
              <span key={i} className="text-[10px] px-2 py-0.5 bg-muted rounded-full">
                {fest}
              </span>
            ))}
          </div>
        )}

        {/* Action */}
        {hasFullDetails && (
          <div className="flex items-center text-primary text-sm font-medium pt-2 group-hover:translate-x-1 transition-transform">
            <span>पूरी कथा पढ़ें</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default SacredStories;

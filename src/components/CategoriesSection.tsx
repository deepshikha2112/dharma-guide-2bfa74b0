import { BookOpen, Music, Calendar, Heart, Sparkles, Users, Brain, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    id: "sacred-stories",
    title: "पवित्र कथाएं",
    titleEn: "Sacred Stories",
    description: "ब्रह्मा, विष्णु, शिव, राम, कृष्ण, हनुमान, दुर्गा, गणेश की दिव्य कथाएं",
    descriptionEn: "Divine tales of Brahma, Vishnu, Shiva, Ram, Krishna, Hanuman, Durga, Ganesh",
    icon: BookOpen,
    count: "100+ कथाएं",
    route: "/sacred-stories",
    features: ["Origin & Significance", "Life Stories", "Moral Lessons", "Festival Links"]
  },
  {
    id: "mantras",
    title: "मंत्र और स्तोत्र",
    titleEn: "Mantra & Stotram",
    description: "बीज मंत्र, दैनिक मंत्र, रक्षा मंत्र, शांति मंत्र और प्रमुख स्तोत्र",
    descriptionEn: "Beej Mantra, Daily Mantra, Protection Mantra, Peace Mantra & Major Stotrams",
    icon: Music,
    count: "200+ मंत्र",
    route: "/deity/ganesha",
    features: ["Text + Transliteration", "Meaning", "When & How", "Audio Format"]
  },
  {
    id: "aarti-chalisa",
    title: "आरती और चालीसा",
    titleEn: "Aarti & Chalisa",
    description: "सभी देवी-देवताओं और संतों की पूर्ण आरती और चालीसा",
    descriptionEn: "Complete Aarti & Chalisa for all deities and saints",
    icon: Heart,
    count: "75+ आरती",
    route: "/aarti",
    features: ["Full Text", "Meaning", "Best Time", "Festival Relevance"]
  },
  {
    id: "festivals-vrats",
    title: "त्योहार और व्रत",
    titleEn: "Festivals & Vrats",
    description: "व्रत विधि, नियम, क्या करें-क्या न करें और आध्यात्मिक लाभ",
    descriptionEn: "Vrat rules, do's & don'ts, and spiritual benefits",
    icon: Calendar,
    count: "50+ व्रत",
    route: "/vrat-guide",
    features: ["Why Celebrated", "Simple Rules", "Do's & Don'ts", "Spiritual Benefits"]
  },
  {
    id: "saints-gurus",
    title: "संत और गुरु",
    titleEn: "Saints & Gurus",
    description: "साई बाबा, गुरु नानक, कबीर, आदि शंकराचार्य, मीराबाई, तुलसीदास",
    descriptionEn: "Sai Baba, Guru Nanak, Kabir, Adi Shankaracharya, Mirabai, Tulsidas",
    icon: Users,
    count: "40+ संत",
    route: "/deity/saibaba",
    features: ["Life Summary", "Core Teachings", "Powerful Quote", "Modern Application"]
  },
  {
    id: "spiritual-techniques",
    title: "आध्यात्मिक तकनीक",
    titleEn: "Spiritual Techniques",
    description: "चिंता, तनाव, आर्थिक समस्या, रिश्तों की समस्या के लिए व्यावहारिक उपाय",
    descriptionEn: "Practical remedies for anxiety, stress, financial & relationship problems",
    icon: Brain,
    count: "50+ तकनीक",
    route: "/guidance",
    features: ["Step-by-step Method", "Time & Duration", "Expected Benefits", "Who Should Do"]
  },
  {
    id: "problem-remedy",
    title: "समस्या → उपाय",
    titleEn: "Problem → Remedy",
    description: "अपनी समस्या बताएं और पाएं आध्यात्मिक मार्गदर्शन",
    descriptionEn: "Share your problem, get spiritual guidance",
    icon: HelpCircle,
    count: "AI Powered",
    route: "/guidance",
    features: ["Root Cause", "Best Technique", "Mantra", "Duration", "Expected Change"]
  },
  {
    id: "meditation",
    title: "ध्यान साधना",
    titleEn: "Meditation",
    description: "शांति, एकाग्रता और आत्म-ज्ञान के लिए ध्यान विधियां",
    descriptionEn: "Meditation practices for peace, focus and self-realization",
    icon: Sparkles,
    count: "20+ विधियां",
    route: "/meditation",
    features: ["Guided Sessions", "Mood-based", "Divine Audio", "Daily Practice"]
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            सनातन धर्म ज्ञान
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            आध्यात्मिक श्रेणियां
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            पवित्र कथाओं, मंत्रों, व्रत विधि और आध्यात्मिक तकनीकों का संपूर्ण संग्रह। 
            धर्म, कर्म और जीवन के मूल्यों पर आधारित।
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Explore sacred stories, mantras, vrat guides & spiritual techniques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              titleEn={category.titleEn}
              description={category.description}
              icon={category.icon}
              count={category.count}
              features={category.features}
              delay={index * 100}
              onClick={() => navigate(category.route)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

// Spiritual Categories - Independent data module for spiritual content
// This is completely separate from Home Quick Access
// NO auto-linking, NO mirroring, NO shared IDs with home sections

import { BookOpen, Music, Calendar, Heart, Users, Brain, HelpCircle, Sparkles } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SpiritualCategory {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
  count: string;
  route: string;
  features: string[];
}

// Spiritual Categories - Actual content logic holders
// These operate independently and should NOT affect Home sections
export const spiritualCategories: SpiritualCategory[] = [
  {
    id: "cat-sacred-stories",
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
    id: "cat-mantras",
    title: "मंत्र और स्तोत्र",
    titleEn: "Mantra & Stotram",
    description: "बीज मंत्र, दैनिक मंत्र, रक्षा मंत्र, शांति मंत्र और प्रमुख स्तोत्र",
    descriptionEn: "Beej Mantra, Daily Mantra, Protection Mantra, Peace Mantra & Major Stotrams",
    icon: Music,
    count: "200+ मंत्र",
    route: "/mantras",
    features: ["Text + Transliteration", "Meaning", "When & How", "Audio Format"]
  },
  {
    id: "cat-aarti-chalisa",
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
    id: "cat-festivals-vrats",
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
    id: "cat-saints-gurus",
    title: "संत और गुरु",
    titleEn: "Saints & Gurus",
    description: "साई बाबा, गुरु नानक, कबीर, आदि शंकराचार्य, मीराबाई, तुलसीदास",
    descriptionEn: "Sai Baba, Guru Nanak, Kabir, Adi Shankaracharya, Mirabai, Tulsidas",
    icon: Users,
    count: "40+ संत",
    route: "/saints-gurus",
    features: ["Life Summary", "Core Teachings", "Powerful Quote", "Modern Application"]
  },
  {
    id: "cat-sadhna",
    title: "साधना",
    titleEn: "Sadhna",
    description: "ध्यान, जप, तप और आध्यात्मिक अभ्यास की विधियां",
    descriptionEn: "Meditation, chanting, penance and spiritual practice methods",
    icon: Sparkles,
    count: "30+ साधनाएं",
    route: "/sadhna",
    features: ["Daily Practice", "Japa Methods", "Tapasya", "Spiritual Discipline"]
  },
  {
    id: "cat-spiritual-techniques",
    title: "आध्यात्मिक तकनीक",
    titleEn: "Spiritual Techniques",
    description: "चिंता, तनाव, आर्थिक समस्या, रिश्तों की समस्या के लिए व्यावहारिक उपाय",
    descriptionEn: "Practical remedies for anxiety, stress, financial & relationship problems",
    icon: Brain,
    count: "50+ तकनीक",
    route: "/spiritual-techniques",
    features: ["Step-by-step Method", "Time & Duration", "Expected Benefits", "Who Should Do"]
  },
  {
    id: "cat-problem-remedy",
    title: "समस्या → उपाय",
    titleEn: "Problem → Remedy",
    description: "अपनी समस्या बताएं और पाएं आध्यात्मिक मार्गदर्शन",
    descriptionEn: "Share your problem, get spiritual guidance",
    icon: HelpCircle,
    count: "AI Powered",
    route: "/guidance",
    features: ["Root Cause", "Best Technique", "Mantra", "Duration", "Expected Change"]
  }
];

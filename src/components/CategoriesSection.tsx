import { BookOpen, Music, Calendar, Heart, Sparkles, Users } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Sacred Stories",
    description: "Divine tales from Puranas, Itihasas, and ancient scriptures",
    icon: BookOpen,
    count: "100+ Stories",
  },
  {
    title: "Mantras & Stotras",
    description: "Powerful chants and hymns for meditation and worship",
    icon: Music,
    count: "200+ Mantras",
  },
  {
    title: "Festivals & Vrats",
    description: "Significance and rituals of Hindu festivals",
    icon: Calendar,
    count: "50+ Festivals",
  },
  {
    title: "Aartis & Chalisas",
    description: "Devotional songs and prayers for daily worship",
    icon: Heart,
    count: "75+ Aartis",
  },
  {
    title: "Spiritual Teachings",
    description: "Wisdom from Vedas, Upanishads, and Bhagavad Gita",
    icon: Sparkles,
    count: "300+ Teachings",
  },
  {
    title: "Saints & Gurus",
    description: "Lives and teachings of enlightened masters",
    icon: Users,
    count: "40+ Saints",
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Explore
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Spiritual Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the ocean of Hindu wisdom with our curated collection 
            of sacred texts, practices, and traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              {...category}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

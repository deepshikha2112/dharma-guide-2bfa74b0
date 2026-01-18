import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { spiritualCategories } from "@/data/spiritualCategories";

// CategoriesSection uses its own independent data module
// NO connection to Home sections, NO shared routing logic

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
          {spiritualCategories.map((category, index) => (
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

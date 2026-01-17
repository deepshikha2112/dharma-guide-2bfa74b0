import { Card } from "@/components/ui/card";
import { LucideIcon, ChevronRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  titleEn?: string;
  description: string;
  icon: LucideIcon;
  count: string;
  features?: string[];
  delay?: number;
  onClick?: () => void;
}

const CategoryCard = ({ 
  title, 
  titleEn,
  description, 
  icon: Icon, 
  count, 
  features,
  delay = 0,
  onClick 
}: CategoryCardProps) => {
  return (
    <Card 
      className="group p-5 cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 animate-fade-in-up transition-all duration-300 bg-card/80 backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Icon & Count Header */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {count}
          </span>
        </div>
        
        {/* Title */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {titleEn && (
            <p className="text-xs text-muted-foreground/70">{titleEn}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Features Tags */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {features.slice(0, 3).map((feature, idx) => (
              <span 
                key={idx}
                className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                +{features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action */}
        <div className="flex items-center text-primary text-sm font-medium pt-2 group-hover:translate-x-1 transition-transform">
          <span>देखें</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;

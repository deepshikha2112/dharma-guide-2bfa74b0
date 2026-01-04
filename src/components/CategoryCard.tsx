import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count: string;
  delay?: number;
}

const CategoryCard = ({ title, description, icon: Icon, count, delay = 0 }: CategoryCardProps) => {
  return (
    <Card 
      className="group p-6 cursor-pointer hover:border-primary/30 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {description}
          </p>
          <span className="text-xs text-primary font-medium">
            {count}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;

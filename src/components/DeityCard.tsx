import { Card } from "@/components/ui/card";

interface DeityCardProps {
  name: string;
  sanskrit: string;
  description: string;
  emoji: string;
  color: string;
  delay?: number;
}

const DeityCard = ({ name, sanskrit, description, emoji, color, delay = 0 }: DeityCardProps) => {
  return (
    <Card 
      className="group p-6 cursor-pointer border-border/50 hover:border-primary/30 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-center">
        <div 
          className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110 ${color}`}
        >
          {emoji}
        </div>
        
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
          {name}
        </h3>
        
        <p className="text-sm text-primary font-medium mb-3">
          {sanskrit}
        </p>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default DeityCard;

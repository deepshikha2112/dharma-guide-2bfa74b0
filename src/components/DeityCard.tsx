import { Card } from "@/components/ui/card";

interface DeityCardProps {
  name: string;
  sanskrit: string;
  description: string;
  image?: string;
  color: string;
  delay?: number;
}

const DeityCard = ({ name, sanskrit, description, image, color, delay = 0 }: DeityCardProps) => {
  return (
    <Card 
      className="group p-6 cursor-pointer animate-fade-in-up overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-card border-border/50 hover:border-primary/30"
      style={{ 
        animationDelay: `${delay}ms`,
        boxShadow: "0 4px 20px hsl(25 40% 50% / 0.08)",
      }}
    >
      <div className="text-center">
        {/* Divine Image */}
        <div 
          className={`w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-lg ${color}`}
          style={{
            boxShadow: "0 0 20px hsl(42 60% 70% / 0.3)",
            border: "3px solid hsl(42 60% 75% / 0.5)",
          }}
        >
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-3xl">🙏</span>
            </div>
          )}
        </div>
        
        <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
          {name}
        </h3>
        
        <p className="text-sm text-primary font-medium mb-3">
          {sanskrit}
        </p>
        
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default DeityCard;

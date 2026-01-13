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
      className="group p-6 cursor-pointer animate-fade-in-up overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        animationDelay: `${delay}ms`,
        background: "linear-gradient(145deg, hsl(25 35% 18%) 0%, hsl(20 30% 12%) 100%)",
        border: "1px solid hsl(35 40% 30% / 0.4)",
        boxShadow: "0 4px 20px hsl(25 50% 10% / 0.5)",
      }}
    >
      <div className="text-center">
        {/* Divine Image */}
        <div 
          className={`w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-110 shadow-lg ${color}`}
          style={{
            boxShadow: "0 0 20px hsl(42 80% 50% / 0.3)",
            border: "3px solid hsl(42 70% 50% / 0.5)",
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
        
        <h3 className="font-heading text-xl font-semibold text-white mb-1">
          {name}
        </h3>
        
        <p className="text-sm text-temple-gold font-medium mb-3">
          {sanskrit}
        </p>
        
        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default DeityCard;

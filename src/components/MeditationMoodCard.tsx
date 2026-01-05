import { Card } from "@/components/ui/card";
import { MeditationMood } from "@/data/meditationMoods";

interface MeditationMoodCardProps {
  mood: MeditationMood;
  isSelected: boolean;
  onClick: () => void;
}

const MeditationMoodCard = ({ mood, isSelected, onClick }: MeditationMoodCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "ring-2 ring-primary shadow-glow bg-gradient-to-br " + mood.color
          : "hover:shadow-sacred bg-card"
      }`}
    >
      <div className="text-center">
        <span className="text-4xl mb-3 block">{mood.icon}</span>
        <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mb-1">
          {mood.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {mood.description}
        </p>
      </div>
    </Card>
  );
};

export default MeditationMoodCard;

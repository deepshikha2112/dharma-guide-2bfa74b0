import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { meditationMoods } from "@/data/meditationMoods";
import { Sparkles, ArrowRight } from "lucide-react";

const MeditationPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🧘‍♂️</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meditation & Stress Relief
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose music based on your mood. Find instant calm and release stress through divine sounds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {meditationMoods.map((mood) => (
            <Link key={mood.id} to="/meditation">
              <Card className={`p-4 text-center hover:scale-105 transition-all cursor-pointer bg-gradient-to-br ${mood.color} hover:shadow-glow`}>
                <span className="text-3xl mb-2 block">{mood.icon}</span>
                <p className="font-medium text-foreground text-sm">{mood.name}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/meditation">
            <Button variant="sacred" size="lg" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Explore All Meditation Music
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MeditationPreview;

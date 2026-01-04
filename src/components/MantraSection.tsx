import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MantraSection = () => {
  return (
    <section id="mantras" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Daily Wisdom
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Today's Sacred Mantra
          </h2>
        </div>

        <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center border-primary/20 bg-gradient-to-br from-card via-card to-muted/20">
          <div className="text-5xl mb-6 animate-glow inline-block">🙏</div>
          
          <p className="font-heading text-2xl md:text-3xl text-foreground mb-4 leading-relaxed">
            "ॐ सर्वे भवन्तु सुखिनः"
          </p>
          
          <p className="text-lg text-primary font-medium mb-6">
            Om Sarve Bhavantu Sukhinah
          </p>
          
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            "May all beings be happy, may all beings be free from illness, 
            may all beings see what is auspicious, may no one suffer."
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="sacred">
              Listen to Mantra
            </Button>
            <Button variant="outline">
              Learn Meaning
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              From the <span className="text-primary">Brihadaranyaka Upanishad</span>
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MantraSection;

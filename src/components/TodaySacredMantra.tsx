import { useState } from "react";
import { sacredMantras } from "@/data/sacredMantras";
import DeityMantraCard from "./DeityMantraCard";
import { Sparkles, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TodaySacredMantra = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeities = sacredMantras.filter(deity => 
    deity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deity.nameHindi.includes(searchTerm) ||
    deity.mantra.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="sacred-mantra" className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Daily Divine Wisdom</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Today's Sacred Mantra
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Begin your spiritual journey with powerful mantras and traditional aartis. 
            Tap on any deity to read their sacred texts and practice mantra jaap.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search deity or mantra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Deity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeities.map((deity) => (
            <DeityMantraCard key={deity.id} deity={deity} />
          ))}
        </div>

        {filteredDeities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No deities found matching "{searchTerm}"</p>
          </div>
        )}

        {/* Daily Blessing */}
        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-primary/5 border border-primary/20">
            <p className="text-5xl mb-4">🙏</p>
            <p className="font-heading text-xl text-foreground mb-2">
              "ॐ सर्वे भवन्तु सुखिनः"
            </p>
            <p className="text-primary text-sm mb-2">Om Sarve Bhavantu Sukhinah</p>
            <p className="text-muted-foreground text-sm max-w-md">
              May all beings be happy, may all beings be free from illness, 
              may all see what is auspicious.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaySacredMantra;

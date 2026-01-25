import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Sun, Moon, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import TempleBackground from "@/components/TempleBackground";
import BackButton from "@/components/BackButton";
import { aartis, getAartisByTiming, type Aarti } from "@/data/aartiData";

const AartiPage = () => {
  const [selectedAarti, setSelectedAarti] = useState<Aarti | null>(null);
  const [timingFilter, setTimingFilter] = useState<"all" | "morning" | "evening">("all");

  const filteredAartis = timingFilter === "all" 
    ? aartis 
    : getAartisByTiming(timingFilter);

  // Group by deity
  const groupedAartis = filteredAartis.reduce((acc, aarti) => {
    if (!acc[aarti.deity]) {
      acc[aarti.deity] = [];
    }
    acc[aarti.deity].push(aarti);
    return acc;
  }, {} as Record<string, Aarti[]>);

  return (
    <main className="min-h-screen relative pb-24">
      <TempleBackground />
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-8">
        <AnimatePresence mode="wait">
          {selectedAarti ? (
            <AartiDetail aarti={selectedAarti} onBack={() => setSelectedAarti(null)} />
          ) : (
            <AartiList
              groupedAartis={groupedAartis}
              timingFilter={timingFilter}
              onFilterChange={setTimingFilter}
              onSelect={setSelectedAarti}
            />
          )}
        </AnimatePresence>
      </div>

      <BottomNavigation />
    </main>
  );
};

interface AartiListProps {
  groupedAartis: Record<string, Aarti[]>;
  timingFilter: "all" | "morning" | "evening";
  onFilterChange: (filter: "all" | "morning" | "evening") => void;
  onSelect: (aarti: Aarti) => void;
}

const AartiList = ({ groupedAartis, timingFilter, onFilterChange, onSelect }: AartiListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Back Button */}
      <BackButton label="Back to Home" />
      
      {/* Page Header */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">🪔</span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          आरती संग्रह
        </h1>
        <p className="text-lg text-muted-foreground">Divine Aarti Collection</p>
        <p className="text-sm text-primary/80 mt-2">
          Traditional aartis for morning & evening worship
        </p>
      </div>

      {/* Timing Filter */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full p-1 bg-muted">
          <Button
            variant={timingFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("all")}
            className="rounded-full"
          >
            <Music className="w-4 h-4 mr-2" />
            All
          </Button>
          <Button
            variant={timingFilter === "morning" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("morning")}
            className="rounded-full"
          >
            <Sun className="w-4 h-4 mr-2" />
            Morning
          </Button>
          <Button
            variant={timingFilter === "evening" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange("evening")}
            className="rounded-full"
          >
            <Moon className="w-4 h-4 mr-2" />
            Evening
          </Button>
        </div>
      </div>

      {/* Aarti Groups by Deity */}
      <div className="space-y-6">
        {Object.entries(groupedAartis).map(([deity, deityAartis], groupIndex) => (
          <motion.div
            key={deity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
              <span>🙏</span>
              {deity}
            </h2>
            <div className="space-y-3">
              {deityAartis.map((aarti) => (
                <Card
                  key={aarti.id}
                  className="temple-card-warm cursor-pointer hover:shadow-temple transition-all group"
                  onClick={() => onSelect(aarti)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          {aarti.timing === "morning" ? (
                            <Sun className="w-6 h-6 text-primary" />
                          ) : aarti.timing === "evening" ? (
                            <Moon className="w-6 h-6 text-primary" />
                          ) : (
                            <Clock className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold font-hindi text-lg">{aarti.nameHindi}</h3>
                          <p className="text-sm text-muted-foreground">{aarti.name}</p>
                          <Badge
                            variant="outline"
                            className={`mt-1 ${
                              aarti.timing === "morning"
                                ? "bg-amber-50 border-amber-200 text-amber-700"
                                : aarti.timing === "evening"
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                : "bg-primary/10 border-primary/30 text-primary"
                            }`}
                          >
                            {aarti.timing === "morning"
                              ? "🌅 Morning"
                              : aarti.timing === "evening"
                              ? "🌙 Evening"
                              : "🕐 Any Time"}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="temple-card-saffron">
          <CardContent className="p-6 text-center">
            <span className="text-3xl block mb-3">🪔</span>
            <p className="font-hindi text-lg text-foreground mb-2">
              दीप ज्योति परब्रह्म
            </p>
            <p className="text-sm text-muted-foreground italic">
              "The light of the lamp is the Supreme Brahman"
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface AartiDetailProps {
  aarti: Aarti;
  onBack: () => void;
}

const AartiDetail = ({ aarti, onBack }: AartiDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* Back Button */}
      <BackButton label="Back to Aartis" />

      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🪔</span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground font-hindi">
          {aarti.nameHindi}
        </h1>
        <p className="text-lg text-muted-foreground">{aarti.name}</p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Badge variant="secondary">{aarti.deity}</Badge>
          <Badge
            variant="outline"
            className={
              aarti.timing === "morning"
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : aarti.timing === "evening"
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-primary/10 border-primary/30 text-primary"
            }
          >
            {aarti.timing === "morning" ? "🌅 Morning" : aarti.timing === "evening" ? "🌙 Evening" : "🕐 Any Time"}
          </Badge>
        </div>
      </div>

      {/* Significance */}
      <Card className="temple-card-warm mb-6">
        <CardContent className="p-4">
          <p className="text-foreground">{aarti.significance}</p>
        </CardContent>
      </Card>

      {/* Lyrics */}
      <Tabs defaultValue="hindi" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="hindi">Hindi</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>

        <TabsContent value="hindi">
          <Card className="temple-card-warm">
            <CardContent className="p-6">
              <ScrollArea className="h-[400px]">
                <pre className="font-hindi text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                  {aarti.lyricsHindi}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="english">
          <Card className="temple-card-warm">
            <CardContent className="p-6">
              <ScrollArea className="h-[400px]">
                <pre className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
                  {aarti.lyrics}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AartiPage;

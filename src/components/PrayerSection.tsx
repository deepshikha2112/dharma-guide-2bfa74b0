import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Volume2, Pause, Play, ChevronDown, ChevronUp } from "lucide-react";
import { Prayer } from "@/data/prayers";

interface PrayerSectionProps {
  prayers: Prayer[];
  deityName: string;
}

const PrayerSection = ({ prayers, deityName }: PrayerSectionProps) => {
  const [mode, setMode] = useState<"read" | "listen">("read");
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(prayers[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const toggleExpand = (prayerId: string) => {
    setExpandedPrayer(expandedPrayer === prayerId ? null : prayerId);
  };

  const togglePlay = (prayerId: string) => {
    if (isPlaying === prayerId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(prayerId);
    }
  };

  const getTypeLabel = (type: Prayer['type']) => {
    switch (type) {
      case 'aarti': return 'Aarti';
      case 'chalisa': return 'Chalisa';
      case 'stotram': return 'Stotram';
      case 'prayer': return 'Prayer';
      default: return 'Prayer';
    }
  };

  if (prayers.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Prayers for {deityName} coming soon...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Prayers & Aartis
        </h3>
        
        <Tabs value={mode} onValueChange={(v) => setMode(v as "read" | "listen")}>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="read" className="text-xs gap-1">
              <BookOpen className="w-3 h-3" />
              Read
            </TabsTrigger>
            <TabsTrigger value="listen" className="text-xs gap-1">
              <Volume2 className="w-3 h-3" />
              Listen
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {prayers.map((prayer) => (
          <Card key={prayer.id} className="overflow-hidden">
            {/* Prayer Header */}
            <button
              onClick={() => toggleExpand(prayer.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {getTypeLabel(prayer.type)}
                  </span>
                </div>
                <h4 className="font-heading font-semibold text-foreground">
                  {prayer.name}
                </h4>
                {prayer.sanskrit && (
                  <p className="text-sm text-muted-foreground">{prayer.sanskrit}</p>
                )}
              </div>
              {expandedPrayer === prayer.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedPrayer === prayer.id && (
              <div className="px-4 pb-4 animate-fade-in">
                {mode === "listen" && (
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        onClick={() => togglePlay(prayer.id)}
                        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                      >
                        {isPlaying === prayer.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </Button>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {isPlaying === prayer.id ? "Playing..." : "Tap to listen"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          High-quality audio narration
                        </p>
                      </div>
                    </div>
                    <Volume2 className="w-5 h-5 text-primary" />
                  </div>
                )}

                <ScrollArea className="max-h-80">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <pre className="whitespace-pre-wrap font-body text-foreground leading-relaxed text-sm">
                        {prayer.text}
                      </pre>
                    </div>

                    {prayer.meaning && (
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <p className="text-xs font-medium text-accent mb-2">Meaning:</p>
                        <p className="text-sm text-foreground/80 italic">
                          {prayer.meaning}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrayerSection;

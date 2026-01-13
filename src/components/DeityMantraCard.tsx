import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Music, Bell, ChevronDown, ChevronUp, BookOpen, Headphones } from "lucide-react";
import { DeityMantra } from "@/data/sacredMantras";
import MantraAudioPlayer from "./MantraAudioPlayer";
import MantraJaapCounter from "./MantraJaapCounter";

// Import deity images
import ganeshaImg from "@/assets/deities/ganesha.jpg";
import shivaImg from "@/assets/deities/shiva.jpg";
import vishnuImg from "@/assets/deities/vishnu.jpg";
import krishnaImg from "@/assets/deities/krishna.jpg";
import ramaImg from "@/assets/deities/rama.jpg";
import hanumanImg from "@/assets/deities/hanuman.jpg";
import durgaImg from "@/assets/deities/durga.jpg";
import lakshmiImg from "@/assets/deities/lakshmi.jpg";
import saibabaImg from "@/assets/deities/saibaba.jpg";
import muruganImg from "@/assets/deities/murugan.jpg";
import gurunanak from "@/assets/deities/gurunanak.jpg";

const deityImages: Record<string, string> = {
  ganesha: ganeshaImg,
  shiva: shivaImg,
  vishnu: vishnuImg,
  krishna: krishnaImg,
  rama: ramaImg,
  hanuman: hanumanImg,
  durga: durgaImg,
  lakshmi: lakshmiImg,
  saraswati: lakshmiImg, // Using lakshmi as placeholder for saraswati
  saibaba: saibabaImg,
  murugan: muruganImg,
  gurunanak: gurunanak,
};

interface DeityMantraCardProps {
  deity: DeityMantra;
}

const DeityMantraCard = ({ deity }: DeityMantraCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"listen" | "read" | "jaap">("listen");

  const deityImage = deityImages[deity.id] || lakshmiImg;

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-muted/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      {/* Header - Always visible */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          {/* Deity Image */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
            <img 
              src={deityImage} 
              alt={deity.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Deity Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-semibold text-foreground truncate">
              {deity.name}
            </h3>
            <p className="text-primary text-sm">{deity.nameHindi}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {deity.mantra.transliteration}
            </p>
          </div>

          {/* Expand/Collapse */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              <Music className="w-3 h-3 mr-1" />
              Mantra
            </Badge>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              <Bell className="w-3 h-3 mr-1" />
              Aarti
            </Badge>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === "listen" ? "sacred" : "outline"}
              size="sm"
              onClick={() => setActiveTab("listen")}
              className="flex-1"
            >
              <Headphones className="w-4 h-4 mr-2" />
              Listen
            </Button>
            <Button
              variant={activeTab === "read" ? "sacred" : "outline"}
              size="sm"
              onClick={() => setActiveTab("read")}
              className="flex-1"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read
            </Button>
            <Button
              variant={activeTab === "jaap" ? "sacred" : "outline"}
              size="sm"
              onClick={() => setActiveTab("jaap")}
              className="flex-1"
            >
              <span className="mr-2">🙏</span>
              Jaap
            </Button>
          </div>

          {activeTab === "listen" && (
            <div className="space-y-4">
              {/* Mantra Audio */}
              <MantraAudioPlayer
                deityId={deity.id}
                type="mantra"
                label="Sacred Mantra"
                icon={<Music className="w-5 h-5" />}
              />

              {/* Aarti Audio */}
              <MantraAudioPlayer
                deityId={deity.id}
                type="aarti"
                label={deity.aarti.title}
                icon={<Bell className="w-5 h-5" />}
              />
            </div>
          )}

          {activeTab === "read" && (
            <div className="space-y-4">
              {/* Mantra Text */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-primary flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Sacred Mantra
                </h4>
                <p className="text-2xl font-heading text-foreground text-center py-2">
                  {deity.mantra.sanskrit}
                </p>
                <p className="text-center text-primary font-medium">
                  {deity.mantra.transliteration}
                </p>
                <p className="text-sm text-muted-foreground text-center italic">
                  "{deity.mantra.meaning}"
                </p>
              </div>

              {/* Aarti Text - Scrollable */}
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-primary flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  {deity.aarti.title} ({deity.aarti.titleHindi})
                </h4>
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs uppercase text-muted-foreground mb-2">English (Transliteration)</h5>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                        {deity.aarti.lyrics}
                      </p>
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <h5 className="text-xs uppercase text-muted-foreground mb-2">हिंदी</h5>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                        {deity.aarti.lyricsHindi}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}

          {activeTab === "jaap" && (
            <div className="space-y-4">
              {/* Mantra display for reference */}
              <div className="bg-muted/30 rounded-lg p-4 text-center">
                <p className="text-xl font-heading text-foreground mb-1">
                  {deity.mantra.sanskrit}
                </p>
                <p className="text-sm text-primary">
                  {deity.mantra.transliteration}
                </p>
              </div>

              {/* Jaap Counter */}
              <MantraJaapCounter 
                mantra={deity.mantra.transliteration}
                deityName={deity.name}
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default DeityMantraCard;

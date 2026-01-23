import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Sun, Moon, Clock, ChevronRight, ArrowLeft, Play, Pause, Upload, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import TempleBackground from "@/components/TempleBackground";
import { aartis, getAartisByTiming, type Aarti } from "@/data/aartiData";
import { youtubeLinks, getYouTubeLinksByDeity, openYouTubeLink } from "@/data/youtubeLinks";
import YouTubeRedirectButton from "@/components/YouTubeRedirectButton";
import { toast } from "sonner";
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

      {/* YouTube Aarti Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card className="border-red-200 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <span>Watch Aarti on YouTube</span>
                <p className="text-xs font-normal text-muted-foreground mt-0.5">
                  Opens in YouTube app or browser
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {youtubeLinks.slice(0, 6).map((link) => (
              <YouTubeRedirectButton
                key={link.id}
                url={link.youtubeUrl}
                title={link.title}
                titleHindi={link.titleHindi}
                variant="aarti"
              />
            ))}
            
            {/* View More Button */}
            <Button
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                const section = document.getElementById("all-youtube-aartis");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View All {youtubeLinks.length} Aartis on YouTube
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Copyright Notice */}
            <div className="pt-3 border-t border-red-200/50">
              <p className="text-xs text-muted-foreground text-center">
                🎬 Watch on YouTube • Content © respective creators
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* All YouTube Aartis */}
      <motion.div
        id="all-youtube-aartis"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-red-600" />
          All Aartis on YouTube
        </h2>
        <div className="space-y-3">
          {youtubeLinks.map((link) => (
            <YouTubeRedirectButton
              key={link.id}
              url={link.youtubeUrl}
              title={link.title}
              titleHindi={link.titleHindi}
              variant="aarti"
            />
          ))}
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      toast.success("Audio file loaded! Click play to listen.");
    } else {
      toast.error("Please select a valid audio file");
    }
  };

  const togglePlay = () => {
    if (!audioFile) {
      toast.info("Please upload an MP3 file first");
      return;
    }

    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(URL.createObjectURL(audioFile));
      newAudio.onended = () => setIsPlaying(false);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Aartis
      </Button>

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

      {/* YouTube Watch Option */}
      {(() => {
        const deityYouTubeLinks = getYouTubeLinksByDeity(aarti.deity.toLowerCase().replace(/\s+/g, ''));
        const matchingLink = youtubeLinks.find(link => 
          link.deityId === aarti.deity.toLowerCase().replace(/\s+/g, '') ||
          aarti.nameHindi.includes(link.titleHindi.split(' ')[0])
        );
        
        if (matchingLink) {
          return (
            <Card className="temple-card-warm mb-6 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Watch on YouTube</h3>
                    <p className="text-xs text-muted-foreground">Opens in YouTube app or browser</p>
                  </div>
                </div>
                <a
                  href={matchingLink.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch Aarti on YouTube
                </a>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Content © respective creators on YouTube
                </p>
              </CardContent>
            </Card>
          );
        }
        return null;
      })()}

      {/* Audio Controls */}
      <Card className="temple-card-saffron mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              <div>
                <p className="font-medium">
                  {audioFile ? audioFile.name : "No audio file"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload your own MP3 for authentic experience
                </p>
              </div>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">Upload MP3</span>
              </div>
            </label>
          </div>
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
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                आरती (Lyrics)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
                <pre className="font-hindi text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                  {aarti.lyricsHindi}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="english">
          <Card className="temple-card-warm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                Lyrics (Transliteration)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
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
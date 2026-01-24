import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenLine, Heart, BookOpen, Calendar, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import TempleBackground from "@/components/TempleBackground";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  type: "prayer" | "gratitude" | "reflection";
  content: string;
  date: string;
  timestamp: number;
}

const PrayerJournal = () => {
  const [activeTab, setActiveTab] = useState("prayer");
  const [prayerText, setPrayerText] = useState("");
  const [gratitudeText, setGratitudeText] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [viewMode, setViewMode] = useState<"write" | "read">("write");

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("prayerJournalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  const saveToLocalStorage = (newEntries: JournalEntry[]) => {
    localStorage.setItem("prayerJournalEntries", JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleSave = (type: "prayer" | "gratitude" | "reflection") => {
    const textMap = {
      prayer: prayerText,
      gratitude: gratitudeText,
      reflection: reflectionText,
    };
    const text = textMap[type];

    if (!text.trim()) {
      toast.error("Please write something before saving");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      type,
      content: text.trim(),
      date: new Date().toLocaleDateString('hi-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      timestamp: Date.now(),
    };

    const newEntries = [newEntry, ...entries];
    saveToLocalStorage(newEntries);

    // Clear the text
    if (type === "prayer") setPrayerText("");
    if (type === "gratitude") setGratitudeText("");
    if (type === "reflection") setReflectionText("");

    toast.success("Entry saved successfully 🙏");
  };

  const handleDelete = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveToLocalStorage(newEntries);
    toast.success("Entry deleted");
  };

  const filteredEntries = entries.filter(entry => entry.type === activeTab);

  const getTypeLabel = (type: string) => {
    const labels = {
      prayer: { label: "प्रार्थना", icon: "🙏", english: "Prayer" },
      gratitude: { label: "कृतज्ञता", icon: "💖", english: "Gratitude" },
      reflection: { label: "चिंतन", icon: "📿", english: "Reflection" },
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <main className="min-h-screen relative pb-24">
      <TempleBackground />
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Back Button */}
        <BackButton label="Back to Home" />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-4xl mb-4 block">📿</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            प्रार्थना पत्रिका
          </h1>
          <p className="text-lg text-muted-foreground">Prayer & Gratitude Journal</p>
          <p className="text-sm text-primary/80 mt-2">
            Your private space for spiritual reflection
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex rounded-full p-1 bg-muted">
            <Button
              variant={viewMode === "write" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("write")}
              className="rounded-full"
            >
              <PenLine className="w-4 h-4 mr-2" />
              Write
            </Button>
            <Button
              variant={viewMode === "read" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("read")}
              className="rounded-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Read
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="prayer" className="flex items-center gap-2">
              <span>🙏</span>
              <span className="hidden sm:inline">प्रार्थना</span>
            </TabsTrigger>
            <TabsTrigger value="gratitude" className="flex items-center gap-2">
              <span>💖</span>
              <span className="hidden sm:inline">कृतज्ञता</span>
            </TabsTrigger>
            <TabsTrigger value="reflection" className="flex items-center gap-2">
              <span>📿</span>
              <span className="hidden sm:inline">चिंतन</span>
            </TabsTrigger>
          </TabsList>

          {viewMode === "write" ? (
            <>
              <TabsContent value="prayer">
                <WriteSection
                  title="अपनी प्रार्थना लिखें"
                  subtitle="Write Your Prayer"
                  placeholder="भगवान, आज मैं आपसे प्रार्थना करता/करती हूं..."
                  value={prayerText}
                  onChange={setPrayerText}
                  onSave={() => handleSave("prayer")}
                  icon="🙏"
                />
              </TabsContent>

              <TabsContent value="gratitude">
                <WriteSection
                  title="आज की कृतज्ञता"
                  subtitle="Today's Gratitude"
                  placeholder="आज मैं इन चीजों के लिए आभारी हूं..."
                  value={gratitudeText}
                  onChange={setGratitudeText}
                  onSave={() => handleSave("gratitude")}
                  icon="💖"
                />
              </TabsContent>

              <TabsContent value="reflection">
                <WriteSection
                  title="आज का चिंतन"
                  subtitle="Daily Reflection"
                  placeholder="आज मैंने जो सीखा वह है..."
                  value={reflectionText}
                  onChange={setReflectionText}
                  onSave={() => handleSave("reflection")}
                  icon="📿"
                />
              </TabsContent>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="temple-card-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-hindi">
                      {getTypeLabel(activeTab).label}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {getTypeLabel(activeTab).english}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredEntries.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <span className="text-4xl block mb-4">📖</span>
                      <p>No entries yet</p>
                      <p className="text-sm">Start writing to see your journal here</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {filteredEntries.map((entry) => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <Card className="bg-background/50">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {entry.date}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDelete(entry.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                                <p className="text-foreground whitespace-pre-wrap">
                                  {entry.content}
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Tabs>

        {/* Daily Inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="temple-card-saffron">
            <CardContent className="p-6 text-center">
              <span className="text-3xl block mb-3">🙏</span>
              <p className="font-hindi text-lg text-foreground mb-2">
                मन एव मनुष्याणां कारणं बन्धमोक्षयोः
              </p>
              <p className="text-sm text-muted-foreground italic">
                "The mind is the cause of both bondage and liberation"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                — Amritabindu Upanishad
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </main>
  );
};

interface WriteSectionProps {
  title: string;
  subtitle: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  icon: string;
}

const WriteSection = ({
  title,
  subtitle,
  placeholder,
  value,
  onChange,
  onSave,
  icon,
}: WriteSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="temple-card-warm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <div>
              <span className="font-hindi">{title}</span>
              <p className="text-sm font-normal text-muted-foreground">{subtitle}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[200px] temple-input font-hindi text-lg resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Your entries are private and stored locally
            </p>
            <Button onClick={onSave} className="divine-button">
              <Heart className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PrayerJournal;
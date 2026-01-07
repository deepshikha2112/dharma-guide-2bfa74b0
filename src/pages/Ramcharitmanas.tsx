import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ramcharitmanasKands, Kand, RamcharitmanasChapter } from "@/data/ramcharitmanas";
import ChapterAudioReader from "@/components/ChapterAudioReader";
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Music
} from "lucide-react";

const Ramcharitmanas = () => {
  const [selectedKand, setSelectedKand] = useState<Kand>(ramcharitmanasKands[0]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const currentChapter = selectedKand.chapters[currentChapterIndex];
  
  // Calculate overall progress
  const totalChapters = ramcharitmanasKands.reduce((sum, kand) => sum + kand.chapters.length, 0);
  const currentKandIndex = ramcharitmanasKands.findIndex(k => k.id === selectedKand.id);
  const chaptersBeforeCurrentKand = ramcharitmanasKands
    .slice(0, currentKandIndex)
    .reduce((sum, kand) => sum + kand.chapters.length, 0);
  const overallProgress = ((chaptersBeforeCurrentKand + currentChapterIndex + 1) / totalChapters) * 100;

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else {
      // Go to previous Kand's last chapter
      const prevKandIndex = currentKandIndex - 1;
      if (prevKandIndex >= 0) {
        const prevKand = ramcharitmanasKands[prevKandIndex];
        setSelectedKand(prevKand);
        setCurrentChapterIndex(prevKand.chapters.length - 1);
      }
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < selectedKand.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else {
      // Go to next Kand's first chapter
      const nextKandIndex = currentKandIndex + 1;
      if (nextKandIndex < ramcharitmanasKands.length) {
        setSelectedKand(ramcharitmanasKands[nextKandIndex]);
        setCurrentChapterIndex(0);
      }
    }
  };

  const hasPreviousChapter = currentChapterIndex > 0 || currentKandIndex > 0;
  const hasNextChapter = currentChapterIndex < selectedKand.chapters.length - 1 || 
                         currentKandIndex < ramcharitmanasKands.length - 1;

  // Convert chapters to format expected by ChapterAudioReader
  const chaptersForReader = selectedKand.chapters.map(chapter => ({
    id: chapter.id,
    title: chapter.title,
    subtitle: chapter.subtitle,
    content: chapter.content,
    mood: chapter.mood,
    instrument: chapter.instrument
  }));

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-6xl md:text-7xl bg-gradient-to-br from-orange-400 to-red-500 shadow-glow mb-6 animate-float">
              🙏
            </div>
            
            <p className="text-orange-600 dark:text-orange-400 font-medium text-lg mb-2">
              श्री रामचरितमानस
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Śrī Rāmacaritamānasa
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              The Holy Lake of the Acts of Rāma — By Gosvāmī Tulasīdāsa
            </p>
            
            {/* Overall Progress */}
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Reading Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Kand Selection */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-2">
              {ramcharitmanasKands.map((kand) => (
                <Button
                  key={kand.id}
                  variant={selectedKand.id === kand.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedKand(kand);
                    setCurrentChapterIndex(0);
                  }}
                  className="flex-shrink-0"
                >
                  <span className="mr-1.5">{kand.id === "bal-kand" ? "📖" : 
                    kand.id === "ayodhya-kand" ? "🏛️" :
                    kand.id === "aranya-kand" ? "🌲" :
                    kand.id === "kishkindha-kand" ? "🐒" :
                    kand.id === "sundar-kand" ? "✨" :
                    kand.id === "lanka-kand" ? "⚔️" : "👑"
                  }</span>
                  <span className="hidden sm:inline">{kand.name}</span>
                  <span className="sm:hidden">{kand.hindiName}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Current Kand Info */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-orange-500/5 to-amber-500/5 border-orange-500/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-3xl flex-shrink-0">
                {selectedKand.id === "bal-kand" ? "📖" : 
                  selectedKand.id === "ayodhya-kand" ? "🏛️" :
                  selectedKand.id === "aranya-kand" ? "🌲" :
                  selectedKand.id === "kishkindha-kand" ? "🐒" :
                  selectedKand.id === "sundar-kand" ? "✨" :
                  selectedKand.id === "lanka-kand" ? "⚔️" : "👑"
                }
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-1">
                  {selectedKand.name}
                </h2>
                <p className="text-orange-600 dark:text-orange-400 text-lg mb-2">
                  {selectedKand.hindiName}
                </p>
                <p className="text-muted-foreground">
                  {selectedKand.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {selectedKand.chapters.length} Chapters
                  </span>
                  <span className="flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    Audio Narration Available
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Chapter Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={goToPreviousChapter}
              disabled={!hasPreviousChapter}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous Chapter</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Chapter {currentChapterIndex + 1} of {selectedKand.chapters.length}
              </p>
              <Progress 
                value={((currentChapterIndex + 1) / selectedKand.chapters.length) * 100} 
                className="h-1 w-32 mt-1"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={goToNextChapter}
              disabled={!hasNextChapter}
              className="gap-2"
            >
              <span className="hidden sm:inline">Next Chapter</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Chapter Content with Audio Reader */}
          <Tabs defaultValue="read" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="read" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Read All Chapters
              </TabsTrigger>
              <TabsTrigger value="quick" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Quick Jump
              </TabsTrigger>
            </TabsList>

            <TabsContent value="read">
              <ChapterAudioReader 
                chapters={chaptersForReader} 
                deityName="Śrī Rāma" 
              />
            </TabsContent>

            <TabsContent value="quick">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {selectedKand.chapters.map((chapter, index) => (
                  <Card 
                    key={chapter.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-primary/5 ${
                      currentChapterIndex === index ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setCurrentChapterIndex(index)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                        {chapter.chapterNumber}
                      </span>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {chapter.title}
                        </h4>
                        {chapter.subtitle && (
                          <p className="text-sm text-muted-foreground">
                            {chapter.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Sacred Message */}
          <Card className="p-6 mt-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              🙏 Phala Śruti - The Fruit of Reading
            </h3>
            <p className="text-foreground/90 leading-relaxed italic">
              "Those who hear this story with faith are freed from the sins of the Kali age. 
              Those who recite it with devotion cross the ocean of worldly existence. 
              This story is the boat that carries souls across the sea of birth and death."
            </p>
            <p className="text-right text-sm text-orange-600 dark:text-orange-400 mt-3">
              — Gosvāmī Tulasīdāsa
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Ramcharitmanas;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeityById } from "@/data/deities";
import { getPrayersByDeityId } from "@/data/prayers";
import { getChaptersByDeityId } from "@/data/deityChapters";
import { meditationMoods } from "@/data/meditationMoods";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrayerSection from "@/components/PrayerSection";
import MantraJaapCounter from "@/components/MantraJaapCounter";
import MeditationPlayer from "@/components/MeditationPlayer";
import TrackList from "@/components/TrackList";
import ChapterAudioReader from "@/components/ChapterAudioReader";
import MoodSoundPlayer from "@/components/MoodSoundPlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, BookOpen, Heart, Sparkles, Music, Volume2, RotateCcw } from "lucide-react";

const DeityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const deity = getDeityById(id || "");
  const prayers = deity ? getPrayersByDeityId(deity.id) : [];
  const chapters = deity ? getChaptersByDeityId(deity.id) : [];
  const [selectedMantra, setSelectedMantra] = useState(0);
  const [selectedMood, setSelectedMood] = useState(meditationMoods[0]);
  const [selectedTrack, setSelectedTrack] = useState(meditationMoods[0].tracks[0]);

  if (!deity) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Deity Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The requested deity information could not be found.
          </p>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col items-center text-center">
            <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-7xl md:text-8xl ${deity.color} shadow-glow mb-6 animate-float`}>
              {deity.emoji}
            </div>
            
            <p className="text-primary font-medium text-lg mb-2">{deity.sanskrit}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {deity.name}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {deity.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="story" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <TabsList className="inline-flex w-auto bg-muted/50 p-1 mb-8">
                <TabsTrigger value="story" className="gap-2 px-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Life Story</span>
                  <span className="sm:hidden">Story</span>
                </TabsTrigger>
                <TabsTrigger value="prayers" className="gap-2 px-4">
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Prayers</span>
                  <span className="sm:hidden">Pray</span>
                </TabsTrigger>
                <TabsTrigger value="mantras" className="gap-2 px-4">
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">Mantra Jaap</span>
                  <span className="sm:hidden">Jaap</span>
                </TabsTrigger>
                <TabsTrigger value="meditation" className="gap-2 px-4">
                  <Music className="w-4 h-4" />
                  <span className="hidden sm:inline">Meditation</span>
                  <span className="sm:hidden">Meditate</span>
                </TabsTrigger>
              </TabsList>
            </ScrollArea>

            {/* Life Story Tab - Now with Audio Reader */}
            <TabsContent value="story" className="animate-fade-in">
              {/* Introduction */}
              <Card className="p-6 md:p-8 mb-8">
                <h2 className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-primary" />
                  Introduction
                </h2>
                <p className="text-foreground/90 leading-relaxed text-lg">
                  {deity.introduction}
                </p>
              </Card>

              {/* Chapter Audio Reader - Divine stories with ambient music */}
              {chapters.length > 0 ? (
                <ChapterAudioReader chapters={chapters} deityName={deity.name} />
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary" />
                    Divine Life Story
                  </h2>
                  
                  <Tabs defaultValue="1" className="w-full">
                    <ScrollArea className="w-full whitespace-nowrap pb-4">
                      <TabsList className="inline-flex w-auto bg-muted/50 p-1">
                        {deity.chapters.map((chapter) => (
                          <TabsTrigger 
                            key={chapter.id} 
                            value={chapter.id.toString()}
                            className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            Ch. {chapter.id}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </ScrollArea>
                    
                    {deity.chapters.map((chapter) => (
                      <TabsContent key={chapter.id} value={chapter.id.toString()}>
                        <Card className="p-6 md:p-8 animate-fade-in">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                              {chapter.id}
                            </span>
                            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                              {chapter.title}
                            </h3>
                          </div>
                          <p className="text-foreground/90 leading-relaxed text-lg whitespace-pre-line">
                            {chapter.content}
                          </p>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </>
              )}

              {/* Life Lesson */}
              <Card className="p-6 md:p-8 mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  🙏 Life Lesson from {deity.name}
                </h3>
                <p className="text-foreground/90 leading-relaxed text-lg italic">
                  "{deity.lifeLesson}"
                </p>
              </Card>
            </TabsContent>

            {/* Prayers Tab */}
            <TabsContent value="prayers" className="animate-fade-in">
              <PrayerSection prayers={prayers} deityName={deity.name} />
            </TabsContent>

            {/* Mantra Jaap Tab */}
            <TabsContent value="mantras" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5 text-primary" />
                    Select a Mantra
                  </h3>
                  <div className="space-y-3">
                    {deity.mantras.map((mantra, index) => (
                      <Card
                        key={index}
                        onClick={() => setSelectedMantra(index)}
                        className={`p-4 cursor-pointer transition-all hover:bg-primary/5 ${
                          selectedMantra === index
                            ? "ring-2 ring-primary bg-primary/5"
                            : ""
                        }`}
                      >
                        <p className="font-medium text-foreground text-center text-lg">
                          {mantra}
                        </p>
                      </Card>
                    ))}
                  </div>

                  <Card className="p-6 mt-6">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-primary" />
                      Sacred Festivals
                    </h3>
                    <ul className="space-y-2">
                      {deity.festivals.map((festival, index) => (
                        <li 
                          key={index}
                          className="p-3 bg-secondary/10 rounded-lg text-foreground border border-secondary/20"
                        >
                          {festival}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <div className="sticky top-24">
                  <MantraJaapCounter 
                    mantra={deity.mantras[selectedMantra]} 
                    deityName={deity.name}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Meditation Tab */}
            <TabsContent value="meditation" className="animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Meditation with {deity.name}
                </h3>
                <p className="text-muted-foreground">
                  Choose calming music to meditate while focusing on {deity.name}'s divine energy.
                </p>
              </div>

              {/* Mood Sound Player */}
              <div className="mb-8">
                <MoodSoundPlayer />
              </div>

              {/* Track Selection */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {meditationMoods.map((mood) => (
                  <Button
                    key={mood.id}
                    variant={selectedMood.id === mood.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedMood(mood);
                      setSelectedTrack(mood.tracks[0]);
                    }}
                    className="gap-2"
                  >
                    <span>{mood.icon}</span>
                    {mood.name}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <TrackList
                  tracks={selectedMood.tracks}
                  selectedTrack={selectedTrack}
                  onSelectTrack={setSelectedTrack}
                />

                <div className="sticky top-24">
                  <MeditationPlayer
                    track={selectedTrack}
                    moodName={`${deity.name} - ${selectedMood.name}`}
                    onNext={() => {
                      const currentIndex = selectedMood.tracks.findIndex(t => t.id === selectedTrack.id);
                      const nextIndex = (currentIndex + 1) % selectedMood.tracks.length;
                      setSelectedTrack(selectedMood.tracks[nextIndex]);
                    }}
                    onPrevious={() => {
                      const currentIndex = selectedMood.tracks.findIndex(t => t.id === selectedTrack.id);
                      const prevIndex = currentIndex === 0 ? selectedMood.tracks.length - 1 : currentIndex - 1;
                      setSelectedTrack(selectedMood.tracks[prevIndex]);
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Seek Divine Guidance
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Receive personalized spiritual guidance based on the teachings and life struggles of {deity.name}.
          </p>
          <Link to="/guidance">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Spiritual Guidance
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DeityDetail;

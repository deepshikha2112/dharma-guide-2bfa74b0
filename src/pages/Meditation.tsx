import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeditationMoodCard from "@/components/MeditationMoodCard";
import MeditationPlayer from "@/components/MeditationPlayer";
import TrackList from "@/components/TrackList";
import MoodSoundPlayer from "@/components/MoodSoundPlayer";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Heart, Music } from "lucide-react";
import { meditationMoods, MeditationMood, MeditationTrack } from "@/data/meditationMoods";

const Meditation = () => {
  const [selectedMood, setSelectedMood] = useState<MeditationMood | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<MeditationTrack | null>(null);

  const handleMoodSelect = (mood: MeditationMood) => {
    setSelectedMood(mood);
    setSelectedTrack(mood.tracks[0]);
  };

  const handleTrackSelect = (track: MeditationTrack) => {
    setSelectedTrack(track);
  };

  const handleNextTrack = () => {
    if (!selectedMood || !selectedTrack) return;
    const currentIndex = selectedMood.tracks.findIndex(t => t.id === selectedTrack.id);
    const nextIndex = (currentIndex + 1) % selectedMood.tracks.length;
    setSelectedTrack(selectedMood.tracks[nextIndex]);
  };

  const handlePreviousTrack = () => {
    if (!selectedMood || !selectedTrack) return;
    const currentIndex = selectedMood.tracks.findIndex(t => t.id === selectedTrack.id);
    const prevIndex = currentIndex === 0 ? selectedMood.tracks.length - 1 : currentIndex - 1;
    setSelectedTrack(selectedMood.tracks[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <span className="text-4xl mb-4 block">🧘‍♂️</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meditation & Mood Music
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose music based on your emotional state. Find instant calm and release stress through divine sounds.
            </p>
          </div>

          {/* Mood Selection */}
          <div className="mb-12">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              How are you feeling today?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {meditationMoods.map((mood) => (
                <MeditationMoodCard
                  key={mood.id}
                  mood={mood}
                  isSelected={selectedMood?.id === mood.id}
                  onClick={() => handleMoodSelect(mood)}
                />
              ))}
            </div>
          </div>

          {/* Player Section */}
          {selectedMood && selectedTrack && (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  {selectedMood.name} Tracks
                </h2>
                <TrackList
                  tracks={selectedMood.tracks}
                  selectedTrack={selectedTrack}
                  onSelectTrack={handleTrackSelect}
                />
              </div>

              <div className="sticky top-24">
                <MeditationPlayer
                  track={selectedTrack}
                  moodName={selectedMood.name}
                  onNext={handleNextTrack}
                  onPrevious={handlePreviousTrack}
                />
              </div>
            </div>
          )}

          {/* Quick Ambient Sounds */}
          {!selectedMood && (
            <div className="space-y-6">
              <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <span className="text-5xl mb-4 block">🕉️</span>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Select Your Mood
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Choose how you're feeling from the options above, and we'll guide you to the perfect meditation music for your state of mind.
                </p>
              </Card>

              {/* Divine Ambient Sounds Player */}
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  Quick Divine Sounds
                </h2>
                <MoodSoundPlayer />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-center text-foreground mb-8">
            Meditation Tips
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <span className="text-3xl mb-3 block">🌬️</span>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Deep Breathing
              </h3>
              <p className="text-sm text-muted-foreground">
                Take slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 6. This activates your relaxation response.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-3xl mb-3 block">🪷</span>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Find Comfort
              </h3>
              <p className="text-sm text-muted-foreground">
                Sit or lie in a comfortable position. Close your eyes gently. Let your body relax completely.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <span className="text-3xl mb-3 block">🙏</span>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                Let Go
              </h3>
              <p className="text-sm text-muted-foreground">
                Release all thoughts and worries. Focus only on the present moment and the sacred sounds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Meditation;

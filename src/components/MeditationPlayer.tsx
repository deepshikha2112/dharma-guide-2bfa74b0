import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { MeditationTrack } from "@/data/meditationMoods";
import { useAmbientSound, SoundType } from "@/hooks/useAmbientSound";

interface MeditationPlayerProps {
  track: MeditationTrack;
  moodName: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

// Map track names to sound types
const getTrackSoundType = (trackName: string): SoundType => {
  const name = trackName.toLowerCase();
  if (name.includes('om') || name.includes('drone')) return 'om';
  if (name.includes('bell') || name.includes('temple')) return 'bells';
  if (name.includes('tanpura') || name.includes('string')) return 'tanpura';
  if (name.includes('flute') || name.includes('bansuri')) return 'flute';
  if (name.includes('nature') || name.includes('rain') || name.includes('water') || name.includes('wind')) return 'nature';
  return 'meditation';
};

const MeditationPlayer = ({ track, moodName, onNext, onPrevious }: MeditationPlayerProps) => {
  const { play, stop, setVolume, isPlaying: isSoundPlaying } = useAmbientSound();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState([70]);
  const [progress, setProgress] = useState([0]);
  const [isMuted, setIsMuted] = useState(false);

  // Start/stop sound when play state changes
  useEffect(() => {
    if (isPlaying) {
      const soundType = getTrackSoundType(track.name);
      play({ type: soundType, volume: isMuted ? 0 : volume[0] / 100 });
    } else {
      stop();
    }
    
    return () => {
      stop();
    };
  }, [isPlaying, track.name]);

  // Update volume
  useEffect(() => {
    setVolume(isMuted ? 0 : volume[0] / 100);
  }, [volume, isMuted, setVolume]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const handleNext = () => {
    stop();
    setIsPlaying(false);
    setProgress([0]);
    onNext?.();
  };

  const handlePrevious = () => {
    stop();
    setIsPlaying(false);
    setProgress([0]);
    onPrevious?.();
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="text-center mb-6">
        <p className="text-sm text-primary font-medium mb-1">{moodName}</p>
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          {track.name}
        </h3>
        <p className="text-sm text-muted-foreground">{track.description}</p>
        
        {isPlaying && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-600 dark:text-green-400">Playing ambient music</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Slider
          value={progress}
          onValueChange={setProgress}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0:00</span>
          <span>{track.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="text-muted-foreground hover:text-foreground"
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <Button
          onClick={togglePlay}
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="text-muted-foreground hover:text-foreground"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-muted-foreground hover:text-foreground"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <Slider
          value={isMuted ? [0] : volume}
          onValueChange={setVolumeState}
          max={100}
          step={1}
          className="w-24"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 italic">
        Close your eyes, breathe deeply, and let the music guide you to inner peace.
      </p>
    </Card>
  );
};

export default MeditationPlayer;

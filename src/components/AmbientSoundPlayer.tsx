import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAmbientSound, SoundType } from '@/hooks/useAmbientSound';
import { cn } from '@/lib/utils';

interface SoundOption {
  type: SoundType;
  label: string;
  description: string;
  icon: string;
}

const soundOptions: SoundOption[] = [
  { type: 'om', label: 'Om Drone', description: 'Deep meditative Om frequency', icon: '🕉️' },
  { type: 'bells', label: 'Temple Bells', description: 'Gentle temple bell ambience', icon: '🔔' },
  { type: 'tanpura', label: 'Tanpura', description: 'Traditional drone instrument', icon: '🎸' },
  { type: 'flute', label: 'Bansuri Flute', description: 'Peaceful flute melodies', icon: '🎵' },
  { type: 'nature', label: 'Nature Sounds', description: 'Wind and water ambience', icon: '🌿' },
  { type: 'meditation', label: 'Deep Meditation', description: 'Binaural theta waves', icon: '🧘' },
];

interface AmbientSoundPlayerProps {
  compact?: boolean;
  defaultType?: SoundType;
  className?: string;
}

const AmbientSoundPlayer = ({ compact = false, defaultType, className }: AmbientSoundPlayerProps) => {
  const { play, stop, setVolume, isPlaying, currentType } = useAmbientSound();
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const handleSoundSelect = (type: SoundType) => {
    if (isPlaying && currentType === type) {
      stop();
    } else {
      play({ type, volume: isMuted ? 0 : volume });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    setVolume(isMuted ? 0 : newVolume);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? volume : 0);
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="flex gap-2">
          {soundOptions.slice(0, 3).map((option) => (
            <Button
              key={option.type}
              variant={currentType === option.type ? "default" : "outline"}
              size="sm"
              onClick={() => handleSoundSelect(option.type)}
              className="text-xs"
            >
              {option.icon}
              {isPlaying && currentType === option.type && (
                <span className="ml-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-20"
          />
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("bg-card/50 backdrop-blur-sm border-border/50", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-serif flex items-center gap-2">
          <span className="text-xl">🎶</span>
          Divine Ambient Sounds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {soundOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSoundSelect(option.type)}
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                "flex flex-col items-center text-center gap-2",
                currentType === option.type
                  ? "border-primary bg-primary/10 shadow-primary/20 shadow-lg"
                  : "border-border/50 bg-background/50 hover:border-primary/50"
              )}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="font-medium text-sm">{option.label}</span>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {option.description}
              </span>
              
              {isPlaying && currentType === option.type && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <Pause className="h-3 w-3 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-9 w-9"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-32"
            />
          </div>

          {isPlaying && (
            <Button
              variant="outline"
              size="sm"
              onClick={stop}
              className="gap-2"
            >
              <Pause className="h-4 w-4" />
              Stop All
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbientSoundPlayer;

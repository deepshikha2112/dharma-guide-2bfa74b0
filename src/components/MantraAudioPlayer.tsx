import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Square, Volume2, VolumeX, Loader2, Repeat, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getAudioUrl } from "@/data/sacredMantras";

interface MantraAudioPlayerProps {
  deityId: string;
  type: 'mantra' | 'aarti';
  label: string;
  icon: React.ReactNode;
  className?: string;
}

const MantraAudioPlayer = ({ deityId, type, label, icon, className = "" }: MantraAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = getAudioUrl(deityId, type);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const initAudio = () => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(audioUrl);
    audio.volume = isMuted ? 0 : volume;
    audio.loop = isLooping;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      setIsLoading(false);
      setHasError(false);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    });

    audio.addEventListener("ended", () => {
      if (!isLooping) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    });

    audio.addEventListener("error", () => {
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    });

    audio.addEventListener("canplaythrough", () => {
      setIsLoading(false);
    });

    audioRef.current = audio;
    return audio;
  };

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const audio = initAudio();
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
      toast.error("Audio not available. Please upload audio file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-card/50 rounded-xl p-4 border border-primary/10 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary">{icon}</div>
        <span className="text-foreground font-medium">{label}</span>
        {isLooping && (
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
            Looping
          </span>
        )}
      </div>

      {/* Error state */}
      {hasError && (
        <div className="mb-3 p-3 bg-muted/50 rounded-lg flex items-center gap-2 text-muted-foreground text-sm">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span>Audio not uploaded yet. Admin will add {type} audio soon.</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-3">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          disabled={!audioRef.current || hasError}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Play/Pause button */}
        <Button
          variant="sacred"
          size="sm"
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading || hasError}
          className="min-w-[90px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading
            </>
          ) : isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Play
            </>
          )}
        </Button>

        {/* Stop button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleStop}
          disabled={!isPlaying && progress === 0}
          className="h-8 w-8"
          title="Stop"
        >
          <Square className="w-4 h-4" />
        </Button>

        {/* Loop button */}
        <Button
          variant={isLooping ? "sacred" : "outline"}
          size="icon"
          onClick={toggleLoop}
          className="h-8 w-8"
          title={isLooping ? "Disable Loop" : "Enable Loop"}
        >
          <Repeat className="w-4 h-4" />
        </Button>

        {/* Volume controls */}
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="h-8 w-8"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Volume2 className="w-4 h-4 text-primary" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default MantraAudioPlayer;

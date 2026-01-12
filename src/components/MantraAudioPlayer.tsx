import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Loader2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface MantraAudioPlayerProps {
  text: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

const MantraAudioPlayer = ({ text, label, icon, className = "" }: MantraAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  const generateAudio = async (): Promise<string | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            text,
            voiceId: "JBFqnCBsd6RMkjVDRZzb", // George - calm male voice
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error("Error generating audio:", error);
      throw error;
    }
  };

  const handlePlay = async () => {
    try {
      if (audioRef.current && audioUrlRef.current) {
        // Resume existing audio
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      }

      setIsLoading(true);
      const audioUrl = await generateAudio();
      
      if (!audioUrl) {
        throw new Error("Failed to generate audio");
      }

      audioUrlRef.current = audioUrl;
      const audio = new Audio(audioUrl);
      audio.volume = isMuted ? 0 : volume;
      
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        setIsLoading(false);
        toast.error("Error playing audio");
      });

      audioRef.current = audio;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      toast.error("Unable to play audio. Please try again.");
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

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-card/50 rounded-xl p-4 border border-primary/10 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary">{icon}</div>
        <span className="text-foreground font-medium">{label}</span>
      </div>

      {/* Progress bar */}
      {(isPlaying || progress > 0) && (
        <div className="mb-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {duration > 0 && (
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <Button
          variant="sacred"
          size="sm"
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading}
          className="min-w-[100px]"
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

        {/* Restart button */}
        {(isPlaying || progress > 0) && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleRestart}
            className="h-8 w-8"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}

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

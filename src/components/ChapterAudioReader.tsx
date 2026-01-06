import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import { useDivineAudio, MoodType, InstrumentType } from '@/hooks/useDivineAudio';

interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  mood: MoodType;
  instrument: InstrumentType;
}

interface ChapterAudioReaderProps {
  chapters: Chapter[];
  deityName: string;
}

const ChapterAudioReader = ({ chapters, deityName }: ChapterAudioReaderProps) => {
  const { play, stop, setVolume, isPlaying } = useDivineAudio();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(chapters[0]?.id || null);
  const [playingChapter, setPlayingChapter] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const toggleExpand = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const togglePlay = (chapter: Chapter) => {
    if (playingChapter === chapter.id) {
      stop();
      setPlayingChapter(null);
    } else {
      play({ mood: chapter.mood, volume: isMuted ? 0 : volume });
      setPlayingChapter(chapter.id);
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

  const getMoodLabel = (mood: MoodType): string => {
    const labels: Record<MoodType, string> = {
      peaceful: '☮️ Peaceful',
      stressed: '🌊 Calming',
      sad: '💙 Emotional',
      angry: '🔥 Powerful',
      anxious: '🧘 Grounding',
      happy: '✨ Uplifting',
      devotional: '🙏 Divine',
      powerful: '⚡ Powerful',
      emotional: '💙 Emotional',
      divine: '✨ Divine',
    };
    return labels[mood] || '🎵 Ambient';
  };

  if (chapters.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Divine stories of {deityName} coming soon...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Divine Life Story
        </h3>
        <p className="text-sm text-muted-foreground">Read with ambient music</p>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <Card key={chapter.id} className="overflow-hidden">
            <button
              onClick={() => toggleExpand(chapter.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Chapter {index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getMoodLabel(chapter.mood)}
                  </span>
                  {playingChapter === chapter.id && (
                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Playing
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-foreground">
                  {chapter.title}
                </h4>
                {chapter.subtitle && (
                  <p className="text-sm text-muted-foreground">{chapter.subtitle}</p>
                )}
              </div>
              {expandedChapter === chapter.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>

            {expandedChapter === chapter.id && (
              <div className="px-4 pb-4 animate-fade-in">
                {/* Audio Controls */}
                <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        onClick={() => togglePlay(chapter)}
                        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                      >
                        {playingChapter === chapter.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </Button>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {playingChapter === chapter.id ? "Reading with music..." : "Play ambient music"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getMoodLabel(chapter.mood)} background
                        </p>
                      </div>
                    </div>
                    
                    {playingChapter === chapter.id && (
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
                    )}
                  </div>
                </div>

                {/* Chapter Content */}
                <ScrollArea className="max-h-96">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {chapter.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-foreground leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterAudioReader;

export type { Chapter };

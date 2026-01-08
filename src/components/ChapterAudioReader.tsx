import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Pause, Square, Volume2, VolumeX, ChevronDown, ChevronUp, Headphones, BookOpenText, Loader2 } from 'lucide-react';
import { useDivineAudio, MoodType, InstrumentType } from '@/hooks/useDivineAudio';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';

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
  const narration = useElevenLabsTTS();
  
  const [expandedChapter, setExpandedChapter] = useState<string | null>(chapters[0]?.id || null);
  const [playingChapter, setPlayingChapter] = useState<string | null>(null);
  const [listeningChapter, setListeningChapter] = useState<string | null>(null);
  const [mode, setMode] = useState<'read' | 'listen'>('read');
  const [volume, setVolumeState] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      stop();
      narration.stopNarration();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop narration when chapter changes
  useEffect(() => {
    if (listeningChapter && expandedChapter !== listeningChapter) {
      narration.stopNarration();
      setListeningChapter(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedChapter, listeningChapter]);

  const toggleExpand = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const toggleBackgroundMusic = (chapter: Chapter) => {
    if (playingChapter === chapter.id) {
      stop();
      setPlayingChapter(null);
    } else {
      play({ mood: chapter.mood, volume: isMuted ? 0 : volume });
      setPlayingChapter(chapter.id);
    }
  };

  const startListening = (chapter: Chapter) => {
    // Start background music
    if (playingChapter !== chapter.id) {
      play({ mood: chapter.mood, volume: isMuted ? 0 : volume * 0.3 }); // Lower volume for narration
      setPlayingChapter(chapter.id);
    } else {
      setVolume(volume * 0.3); // Lower existing music
    }
    
    // Start narration with ElevenLabs
    narration.startNarration(chapter.content);
    setListeningChapter(chapter.id);
  };

  const stopListening = () => {
    narration.stopNarration();
    setListeningChapter(null);
    // Restore music volume
    if (playingChapter) {
      setVolume(isMuted ? 0 : volume);
    }
  };

  const toggleNarrationPause = () => {
    if (narration.isPaused) {
      narration.resumeNarration();
    } else {
      narration.pauseNarration();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolumeState(newVolume);
    if (listeningChapter) {
      setVolume(isMuted ? 0 : newVolume * 0.3);
    } else {
      setVolume(isMuted ? 0 : newVolume);
    }
  };

  // Speed control removed - ElevenLabs handles this server-side

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
      sleep: '😴 Sleep',
      focus: '🧘 Focus',
      energy: '🔥 Energy',
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Divine Life Story
        </h3>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'read' | 'listen')} className="w-auto">
          <TabsList className="h-9">
            <TabsTrigger value="read" className="gap-1.5 text-xs px-3">
              <BookOpenText className="w-3.5 h-3.5" />
              Read
            </TabsTrigger>
            <TabsTrigger value="listen" className="gap-1.5 text-xs px-3">
              <Headphones className="w-3.5 h-3.5" />
              Listen
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <Card key={chapter.id} className="overflow-hidden">
            <button
              onClick={() => toggleExpand(chapter.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Chapter {index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getMoodLabel(chapter.mood)}
                  </span>
                  {playingChapter === chapter.id && (
                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Music
                    </span>
                  )}
                  {listeningChapter === chapter.id && (
                    <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      Narrating
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
                {/* Mode-specific Controls */}
                {mode === 'read' ? (
                  /* Read Mode - Background Music Only */
                  <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          onClick={() => toggleBackgroundMusic(chapter)}
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
                ) : (
                  /* Listen Mode - Narration + Background Music */
                  <div className="mb-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        {listeningChapter === chapter.id ? (
                          <>
                            {narration.isLoading ? (
                              <Button
                                size="icon"
                                disabled
                                className="w-10 h-10 rounded-full bg-blue-600"
                              >
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                onClick={toggleNarrationPause}
                                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                              >
                                {narration.isPaused ? (
                                  <Play className="w-4 h-4 ml-0.5" />
                                ) : (
                                  <Pause className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={stopListening}
                              className="w-10 h-10 rounded-full"
                            >
                              <Square className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="icon"
                            onClick={() => startListening(chapter)}
                            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                          >
                            <Headphones className="w-4 h-4" />
                          </Button>
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {listeningChapter === chapter.id 
                              ? narration.isLoading
                                ? "Loading audio..."
                                : narration.isPaused 
                                  ? "Paused" 
                                  : `Narrating paragraph ${narration.currentParagraph + 1} of ${narration.totalParagraphs}...`
                              : "Listen to this chapter"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Scripture narration with {getMoodLabel(chapter.mood).toLowerCase()} music
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Volume Controls */}
                    {listeningChapter === chapter.id && (
                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-blue-500/10">
                        {narration.isLoading && (
                          <div className="flex items-center gap-2 text-blue-600">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs">Generating audio...</span>
                          </div>
                        )}
                        {narration.error && (
                          <span className="text-xs text-red-500">{narration.error}</span>
                        )}
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="text-xs text-muted-foreground">Music</span>
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
                    )}
                  </div>
                )}

                {/* Chapter Content */}
                <ScrollArea className="max-h-96">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {chapter.content.split('\n\n').map((paragraph, i) => (
                        <p 
                          key={i} 
                          className={`text-foreground leading-relaxed mb-4 last:mb-0 transition-colors ${
                            listeningChapter === chapter.id && narration.currentParagraph === i
                              ? 'bg-blue-500/10 -mx-2 px-2 py-1 rounded border-l-2 border-blue-500'
                              : ''
                          }`}
                        >
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
}
export default ChapterAudioReader;

export type { Chapter };
export type { MoodType, InstrumentType } from '@/hooks/useDivineAudio';

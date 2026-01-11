import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Play, Pause, Square, Volume2, VolumeX, 
  Headphones, BookOpenText, Loader2, Languages,
  ChevronLeft, ChevronRight, Home
} from 'lucide-react';
import { useDivineAudio, MoodType, InstrumentType } from '@/hooks/useDivineAudio';
export type { MoodType, InstrumentType } from '@/hooks/useDivineAudio';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';
import { motion, AnimatePresence } from 'framer-motion';

export interface Chapter {
  id: string;
  title: string;
  titleEnglish?: string;
  subtitle?: string;
  subtitleEnglish?: string;
  content: string;
  contentEnglish?: string;
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
  
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [playingChapter, setPlayingChapter] = useState<string | null>(null);
  const [listeningChapter, setListeningChapter] = useState<string | null>(null);
  const [mode, setMode] = useState<'read' | 'listen'>('read');
  const [volume, setVolumeState] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const [showChapterList, setShowChapterList] = useState(false);

  const currentChapter = chapters[currentChapterIndex];

  useEffect(() => {
    return () => {
      stop();
      narration.stopNarration();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop narration when chapter changes
  useEffect(() => {
    if (listeningChapter && currentChapter?.id !== listeningChapter) {
      narration.stopNarration();
      setListeningChapter(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChapterIndex, listeningChapter]);

  const goToChapter = (index: number) => {
    if (index >= 0 && index < chapters.length) {
      // Stop current audio
      if (listeningChapter) {
        narration.stopNarration();
        setListeningChapter(null);
      }
      if (playingChapter) {
        stop();
        setPlayingChapter(null);
      }
      setCurrentChapterIndex(index);
      setShowChapterList(false);
    }
  };

  const goToNextChapter = () => goToChapter(currentChapterIndex + 1);
  const goToPreviousChapter = () => goToChapter(currentChapterIndex - 1);

  const toggleBackgroundMusic = () => {
    if (!currentChapter) return;
    
    if (playingChapter === currentChapter.id) {
      stop();
      setPlayingChapter(null);
    } else {
      play({ mood: currentChapter.mood, volume: isMuted ? 0 : volume });
      setPlayingChapter(currentChapter.id);
    }
  };

  const getChapterContent = (chapter: Chapter): string => {
    if (language === 'english' && chapter.contentEnglish) {
      return chapter.contentEnglish;
    }
    return chapter.content;
  };

  const getChapterTitle = (chapter: Chapter): string => {
    if (language === 'english' && chapter.titleEnglish) {
      return chapter.titleEnglish;
    }
    return chapter.title;
  };

  const getChapterSubtitle = (chapter: Chapter): string | undefined => {
    if (language === 'english' && chapter.subtitleEnglish) {
      return chapter.subtitleEnglish;
    }
    return chapter.subtitle;
  };

  const startListening = () => {
    if (!currentChapter) return;
    
    // Start background music
    if (playingChapter !== currentChapter.id) {
      play({ mood: currentChapter.mood, volume: isMuted ? 0 : volume * 0.3 });
      setPlayingChapter(currentChapter.id);
    } else {
      setVolume(volume * 0.3);
    }
    
    narration.startNarration(getChapterContent(currentChapter));
    setListeningChapter(currentChapter.id);
  };

  const stopListening = () => {
    narration.stopNarration();
    setListeningChapter(null);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? volume : 0);
  };

  const toggleLanguage = () => {
    if (listeningChapter) {
      narration.stopNarration();
      setListeningChapter(null);
    }
    setLanguage(language === 'hindi' ? 'english' : 'hindi');
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

  if (!currentChapter) return null;

  // Chapter List View
  if (showChapterList) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {language === 'hindi' ? 'अध्याय सूची' : 'Chapter List'}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5 text-xs px-3 h-9 bg-gradient-to-r from-cosmic-gold/20 to-cosmic-gold/10 border-cosmic-gold/30"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === 'hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </Button>
        </div>

        <div className="grid gap-3">
          {chapters.map((chapter, index) => (
            <Card 
              key={chapter.id}
              onClick={() => goToChapter(index)}
              className="p-4 cursor-pointer hover:bg-cosmic-gold/10 transition-all duration-300 border-cosmic-gold/20 hover:border-cosmic-gold/40"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cosmic-gold/30 to-primary/30 flex items-center justify-center text-lg font-heading font-bold text-cosmic-gold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground">
                    {getChapterTitle(chapter)}
                  </h4>
                  {getChapterSubtitle(chapter) && (
                    <p className="text-sm text-muted-foreground">{getChapterSubtitle(chapter)}</p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // Single Chapter Book View
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentChapter.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-cosmic-gold/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChapterList(true)}
            className="gap-1.5 text-xs hover:bg-cosmic-gold/10"
          >
            <Home className="w-4 h-4" />
            {language === 'hindi' ? 'सभी अध्याय' : 'All Chapters'}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5 text-xs px-3 h-8 bg-gradient-to-r from-cosmic-gold/20 to-cosmic-gold/10 border-cosmic-gold/30"
            >
              <Languages className="w-3.5 h-3.5" />
              {language === 'hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </Button>
            
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'read' | 'listen')} className="w-auto">
              <TabsList className="h-8">
                <TabsTrigger value="read" className="gap-1 text-xs px-2">
                  <BookOpenText className="w-3 h-3" />
                  {language === 'hindi' ? 'पढ़ें' : 'Read'}
                </TabsTrigger>
                <TabsTrigger value="listen" className="gap-1 text-xs px-2">
                  <Headphones className="w-3 h-3" />
                  {language === 'hindi' ? 'सुनें' : 'Listen'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Chapter Title Section */}
        <Card className="p-6 bg-gradient-to-br from-cosmic-gold/10 via-background/80 to-primary/5 border-cosmic-gold/30">
          <div className="text-center space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cosmic-gold/20 text-cosmic-gold font-medium text-sm border border-cosmic-gold/30">
              {language === 'hindi' ? `अध्याय ${currentChapterIndex + 1}` : `Chapter ${currentChapterIndex + 1}`}
            </span>
            
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {getChapterTitle(currentChapter)}
            </h2>
            
            {getChapterSubtitle(currentChapter) && (
              <p className="text-muted-foreground text-lg">{getChapterSubtitle(currentChapter)}</p>
            )}

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cosmic-gold/50" />
              <span className="text-cosmic-gold text-xl">✦</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-cosmic-gold/50" />
            </div>
          </div>
        </Card>

        {/* Audio Controls */}
        <Card className="p-4 border-cosmic-gold/20">
          {mode === 'read' ? (
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  onClick={toggleBackgroundMusic}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-cosmic-gold to-cosmic-gold/80 hover:from-cosmic-gold/90 hover:to-cosmic-gold/70 text-black"
                >
                  {playingChapter === currentChapter.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {playingChapter === currentChapter.id 
                      ? (language === 'hindi' ? "🎵 संगीत चल रहा है" : "🎵 Playing music")
                      : (language === 'hindi' ? "पृष्ठभूमि संगीत" : "Background music")}
                  </p>
                  <p className="text-xs text-muted-foreground">{getMoodLabel(currentChapter.mood)}</p>
                </div>
              </div>
              
              {playingChapter === currentChapter.id && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-24" />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {listeningChapter === currentChapter.id ? (
                    <>
                      {narration.isLoading ? (
                        <Button size="icon" disabled className="w-10 h-10 rounded-full bg-blue-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          onClick={toggleNarrationPause}
                          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                        >
                          {narration.isPaused ? <Play className="w-4 h-4 ml-0.5" /> : <Pause className="w-4 h-4" />}
                        </Button>
                      )}
                      <Button size="icon" variant="outline" onClick={stopListening} className="w-10 h-10 rounded-full">
                        <Square className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="icon"
                      onClick={startListening}
                      className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Headphones className="w-4 h-4" />
                    </Button>
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {listeningChapter === currentChapter.id 
                        ? narration.isLoading
                          ? (language === 'hindi' ? "ऑडियो लोड हो रहा है..." : "Loading...")
                          : narration.isPaused 
                            ? (language === 'hindi' ? "रुका हुआ" : "Paused")
                            : (language === 'hindi' 
                              ? `पैराग्राफ ${narration.currentParagraph + 1}/${narration.totalParagraphs}`
                              : `Paragraph ${narration.currentParagraph + 1}/${narration.totalParagraphs}`)
                        : (language === 'hindi' ? "अध्याय सुनें" : "Listen to chapter")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'hindi' ? 'वॉइस नैरेशन + संगीत' : 'Voice narration + music'}
                    </p>
                  </div>
                </div>

                {listeningChapter === currentChapter.id && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-20" />
                  </div>
                )}
              </div>

              {narration.error && (
                <p className="text-xs text-red-500">{narration.error}</p>
              )}
            </div>
          )}
        </Card>

        {/* Chapter Content */}
        <Card className="border-cosmic-gold/20 overflow-hidden">
          <ScrollArea className="h-[60vh] md:h-[65vh]">
            <div className="p-6 md:p-8 space-y-6">
              {/* Chapter text with proper paragraph spacing */}
              <div className={`prose prose-lg dark:prose-invert max-w-none ${language === 'hindi' ? 'font-hindi' : ''}`}>
                {getChapterContent(currentChapter).split('\n\n').map((paragraph, i) => (
                  <p 
                    key={i} 
                    className={`text-foreground/90 leading-relaxed mb-6 text-base md:text-lg ${
                      listeningChapter === currentChapter.id && narration.currentParagraph === i
                        ? 'bg-primary/10 -mx-2 px-2 py-1 rounded-lg border-l-4 border-primary'
                        : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Chapter End Marker */}
              <div className="pt-8 pb-4">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-cosmic-gold/50 to-transparent" />
                  <span className="text-cosmic-gold text-2xl tracking-widest">❖ ❖ ❖</span>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-cosmic-gold/50 to-transparent" />
                </div>
                
                <p className="text-center text-muted-foreground text-sm font-medium">
                  {language === 'hindi' 
                    ? '— इस अध्याय का समापन —' 
                    : '— End of This Chapter —'}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 pb-4">
                {currentChapterIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={goToPreviousChapter}
                    className="w-full sm:w-auto gap-2 border-cosmic-gold/30 hover:bg-cosmic-gold/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {language === 'hindi' ? 'पिछला अध्याय' : 'Previous Chapter'}
                  </Button>
                )}

                {currentChapterIndex < chapters.length - 1 && (
                  <Button
                    onClick={goToNextChapter}
                    className="w-full sm:w-auto gap-2 bg-gradient-to-r from-cosmic-gold to-cosmic-gold/80 text-black font-semibold hover:from-cosmic-gold/90 hover:to-cosmic-gold/70 shadow-lg"
                  >
                    {language === 'hindi' ? 'अगला अध्याय' : 'Next Chapter'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}

                {currentChapterIndex === chapters.length - 1 && (
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-3">
                      {language === 'hindi' 
                        ? '🙏 आपने सभी अध्याय पूरे किए' 
                        : '🙏 You have completed all chapters'}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowChapterList(true)}
                      className="gap-2 border-cosmic-gold/30"
                    >
                      <Home className="w-4 h-4" />
                      {language === 'hindi' ? 'अध्याय सूची देखें' : 'View All Chapters'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </Card>

        {/* Bottom Chapter Progress */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {chapters.map((_, index) => (
            <button
              key={index}
              onClick={() => goToChapter(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentChapterIndex 
                  ? 'bg-cosmic-gold w-6' 
                  : index < currentChapterIndex
                    ? 'bg-cosmic-gold/50'
                    : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to chapter ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChapterAudioReader;

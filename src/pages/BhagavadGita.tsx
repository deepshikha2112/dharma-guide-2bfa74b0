import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChapterAudioReader from '@/components/ChapterAudioReader';
import BackButton from '@/components/BackButton';
import { bhagavadGitaChapters } from '@/data/bhagavadGitaChapters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

const BhagavadGita = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const totalChapters = bhagavadGitaChapters.length;

  const overallProgress = ((currentChapterIndex + 1) / totalChapters) * 100;

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const goToNextChapter = () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const hasPreviousChapter = currentChapterIndex > 0;
  const hasNextChapter = currentChapterIndex < totalChapters - 1;
  const currentChapter = bhagavadGitaChapters[currentChapterIndex];

  const formattedChapter = {
    id: currentChapter.id,
    title: `${currentChapter.titleHindi} (${currentChapter.title})`,
    content: currentChapter.content,
    mood: currentChapter.mood,
    instrument: currentChapter.instrument
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Back Button */}
        <BackButton label="Back to Home" />
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-800 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>श्रीमद्भगवद्गीता</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-temple-primary mb-4 font-playfair">
            Shrimad Bhagavad Gita
          </h1>
          <p className="text-temple-dark/70 max-w-2xl mx-auto mb-6">
            The divine song of the Lord - A sacred dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra
          </p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-temple-dark/60 mb-2">
              <span>Reading Progress</span>
              <span>Adhyaya {currentChapterIndex + 1} of {totalChapters}</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        {/* Current Chapter Info */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-orange-700 mb-1">
                अध्याय {currentChapter.adhyayaNumber} • {currentChapter.versesCount} श्लोक
              </div>
              <h2 className="text-2xl font-bold text-temple-primary font-playfair">
                {currentChapter.titleSanskrit}
              </h2>
              <p className="text-temple-dark/70">
                {currentChapter.titleHindi} • {currentChapter.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-medium">
                {currentChapter.versesCount} Verses
              </span>
            </div>
          </div>
        </Card>

        {/* Chapter Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={goToPreviousChapter}
            disabled={!hasPreviousChapter}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Adhyaya
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-temple-dark/60">
              Adhyaya {currentChapterIndex + 1} of {totalChapters}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={goToNextChapter}
            disabled={!hasNextChapter}
            className="gap-2"
          >
            Next Adhyaya
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="read" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="read">Read Chapter</TabsTrigger>
            <TabsTrigger value="chapters">All Chapters</TabsTrigger>
          </TabsList>

          <TabsContent value="read">
            <ChapterAudioReader 
              chapters={[formattedChapter]} 
              deityName="Lord Krishna"
            />
          </TabsContent>

          <TabsContent value="chapters">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bhagavadGitaChapters.map((chapter, index) => (
                <Card
                  key={chapter.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    index === currentChapterIndex 
                      ? 'ring-2 ring-orange-500 bg-orange-50' 
                      : 'hover:bg-amber-50'
                  }`}
                  onClick={() => setCurrentChapterIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      index === currentChapterIndex 
                        ? 'bg-orange-500' 
                        : 'bg-temple-primary/70'
                    }`}>
                      {chapter.adhyayaNumber}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-temple-primary">
                        {chapter.titleSanskrit}
                      </h3>
                      <p className="text-sm text-temple-dark/70">
                        {chapter.titleHindi}
                      </p>
                      <p className="text-xs text-temple-dark/50 mt-1">
                        {chapter.versesCount} Shlokas
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sacred Message */}
        <Card className="p-6 bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200 text-center mt-8">
          <h3 className="text-lg font-bold text-temple-primary mb-2 font-playfair">
            ॥ फल श्रुति ॥
          </h3>
          <p className="text-temple-dark/80 italic">
            "गीता सुगीता कर्तव्या किमन्यैः शास्त्रविस्तरैः।<br/>
            या स्वयं पद्मनाभस्य मुखपद्माद्विनिःसृता॥"
          </p>
          <p className="text-sm text-temple-dark/60 mt-2">
            The Gita should be studied well; what is the use of studying other scriptures?<br/>
            This has emanated from the lotus-like mouth of Lord Vishnu Himself.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default BhagavadGita;

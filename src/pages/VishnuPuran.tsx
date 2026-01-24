import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChapterAudioReader from '@/components/ChapterAudioReader';
import BackButton from '@/components/BackButton';
import { vishnuPuranChapters } from '@/data/vishnuPuranChapters';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

const VishnuPuran = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const totalChapters = vishnuPuranChapters.length;

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
  const currentChapter = vishnuPuranChapters[currentChapterIndex];

  const formattedChapter = {
    id: currentChapter.id,
    title: `${currentChapter.titleHindi} (${currentChapter.title})`,
    content: currentChapter.content,
    mood: currentChapter.mood,
    instrument: currentChapter.instrument
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        {/* Back Button */}
        <BackButton label="Back to Home" />
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>श्री विष्णु पुराण</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-temple-primary mb-4 font-playfair">
            Lord Vishnu - Divine History
          </h1>
          <p className="text-temple-dark/70 max-w-2xl mx-auto mb-6">
            The glorious history of Lord Vishnu, the Supreme Preserver of the Universe, and His divine avatars
          </p>
          
          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-temple-dark/60 mb-2">
              <span>Reading Progress</span>
              <span>Chapter {currentChapterIndex + 1} of {totalChapters}</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        {/* Current Chapter Info */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-sm text-blue-700 mb-1">
                अध्याय {currentChapterIndex + 1}
              </div>
              <h2 className="text-2xl font-bold text-temple-primary font-playfair">
                {currentChapter.titleHindi}
              </h2>
              <p className="text-temple-dark/70">
                {currentChapter.title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                Divine Scripture
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
            Previous Chapter
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-temple-dark/60">
              Chapter {currentChapterIndex + 1} of {totalChapters}
            </span>
          </div>
          
          <Button
            variant="outline"
            onClick={goToNextChapter}
            disabled={!hasNextChapter}
            className="gap-2"
          >
            Next Chapter
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
              deityName="Lord Vishnu"
            />
          </TabsContent>

          <TabsContent value="chapters">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vishnuPuranChapters.map((chapter, index) => (
                <Card
                  key={chapter.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    index === currentChapterIndex 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-indigo-50'
                  }`}
                  onClick={() => setCurrentChapterIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      index === currentChapterIndex 
                        ? 'bg-blue-500' 
                        : 'bg-temple-primary/70'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-temple-primary">
                        {chapter.titleHindi}
                      </h3>
                      <p className="text-sm text-temple-dark/70">
                        {chapter.title}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sacred Message */}
        <Card className="p-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200 text-center mt-8">
          <h3 className="text-lg font-bold text-temple-primary mb-2 font-playfair">
            ॥ विष्णु स्तुति ॥
          </h3>
          <p className="text-temple-dark/80 italic">
            "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्।<br/>
            विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्॥"
          </p>
          <p className="text-sm text-temple-dark/60 mt-2">
            Salutations to Lord Vishnu who has a peaceful form, who rests on the serpent Shesha,<br/>
            who has a lotus in his navel, who is the lord of the gods.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default VishnuPuran;

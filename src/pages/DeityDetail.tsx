import { useParams, Link } from "react-router-dom";
import { getDeityById } from "@/data/deities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, BookOpen, Heart, Sparkles, Music } from "lucide-react";

const DeityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const deity = getDeityById(id || "");

  if (!deity) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Deity Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The requested deity information could not be found.
          </p>
          <Link to="/">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-6xl md:text-7xl ${deity.color} shadow-glow`}>
              {deity.emoji}
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-primary font-medium text-lg mb-1">{deity.sanskrit}</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                {deity.name}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {deity.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-primary" />
              Introduction
            </h2>
            <p className="text-foreground/90 leading-relaxed text-lg">
              {deity.introduction}
            </p>
          </Card>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-primary" />
            Divine Life Story
          </h2>
          
          <Tabs defaultValue="1" className="w-full">
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <TabsList className="inline-flex w-auto bg-muted/50 p-1">
                {deity.chapters.map((chapter) => (
                  <TabsTrigger 
                    key={chapter.id} 
                    value={chapter.id.toString()}
                    className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Ch. {chapter.id}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            
            {deity.chapters.map((chapter) => (
              <TabsContent key={chapter.id} value={chapter.id.toString()}>
                <Card className="p-6 md:p-8 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center">
                      {chapter.id}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                      {chapter.title}
                    </h3>
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-lg whitespace-pre-line">
                    {chapter.content}
                  </p>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Mantras & Festivals */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mantras */}
            <Card className="p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2 text-primary" />
                Sacred Mantras
              </h3>
              <ul className="space-y-3">
                {deity.mantras.map((mantra, index) => (
                  <li 
                    key={index}
                    className="p-3 bg-primary/5 rounded-lg text-foreground font-medium text-center border border-primary/10"
                  >
                    {mantra}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Festivals */}
            <Card className="p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                Sacred Festivals
              </h3>
              <ul className="space-y-3">
                {deity.festivals.map((festival, index) => (
                  <li 
                    key={index}
                    className="p-3 bg-secondary/10 rounded-lg text-foreground border border-secondary/20"
                  >
                    {festival}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Life Lesson */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
              🙏 Life Lesson from {deity.name}
            </h3>
            <p className="text-foreground/90 leading-relaxed text-lg italic">
              "{deity.lifeLesson}"
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Seek Divine Guidance
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Receive personalized spiritual guidance based on the teachings and life struggles of {deity.name}.
          </p>
          <Link to="/guidance">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Spiritual Guidance
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DeityDetail;

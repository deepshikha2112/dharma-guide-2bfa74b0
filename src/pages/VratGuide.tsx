import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, BookOpen, Utensils, CheckCircle, XCircle, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import TempleBackground from "@/components/TempleBackground";
import BackButton from "@/components/BackButton";
import { vrats, type Vrat } from "@/data/vratData";

const VratGuide = () => {
  const [selectedVrat, setSelectedVrat] = useState<Vrat | null>(null);

  return (
    <main className="min-h-screen relative pb-24">
      <TempleBackground />
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-8">
        <AnimatePresence mode="wait">
          {selectedVrat ? (
            <VratDetail vrat={selectedVrat} onBack={() => setSelectedVrat(null)} />
          ) : (
            <VratList onSelect={setSelectedVrat} />
          )}
        </AnimatePresence>
      </div>

      <BottomNavigation />
    </main>
  );
};

interface VratListProps {
  onSelect: (vrat: Vrat) => void;
}

const VratList = ({ onSelect }: VratListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Back Button */}
      <BackButton label="Back to Home" />
      {/* Page Header */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">🙏</span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          व्रत एवं उपवास गाइड
        </h1>
        <p className="text-lg text-muted-foreground">Vrat & Fasting Guide</p>
        <p className="text-sm text-primary/80 mt-2">
          Traditional fasting rules, rituals & katha
        </p>
      </div>

      {/* Vrat Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {vrats.map((vrat, index) => (
          <motion.div
            key={vrat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="temple-card-warm cursor-pointer hover:shadow-temple transition-all group"
              onClick={() => onSelect(vrat)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xl">🪔</span>
                    </div>
                    <div>
                      <h3 className="font-semibold font-hindi text-lg">{vrat.nameHindi}</h3>
                      <p className="text-sm text-muted-foreground">{vrat.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {vrat.deity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{vrat.timing}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="temple-card-saffron">
          <CardContent className="p-6 text-center">
            <span className="text-3xl block mb-3">📿</span>
            <p className="font-hindi text-lg text-foreground mb-2">
              उपवासः परमं तपः
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Fasting is the supreme penance"
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              — Hindu Scriptures
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface VratDetailProps {
  vrat: Vrat;
  onBack: () => void;
}

const VratDetail = ({ vrat, onBack }: VratDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {/* Back Button */}
      <BackButton label="Back to Vrat List" />

      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">🪔</span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground font-hindi">
          {vrat.nameHindi}
        </h1>
        <p className="text-lg text-muted-foreground">{vrat.name}</p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Badge variant="secondary">{vrat.deity}</Badge>
          <span className="text-sm text-muted-foreground font-hindi">{vrat.timingHindi}</span>
        </div>
      </div>

      {/* Description */}
      <Card className="temple-card-warm mb-6">
        <CardContent className="p-4">
          <p className="text-foreground">{vrat.description}</p>
          <p className="text-sm text-muted-foreground mt-2">{vrat.significance}</p>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="rules" className="text-xs">Rules</TabsTrigger>
          <TabsTrigger value="food" className="text-xs">Food</TabsTrigger>
          <TabsTrigger value="rituals" className="text-xs">Rituals</TabsTrigger>
          <TabsTrigger value="katha" className="text-xs">Katha</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <Card className="temple-card-warm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Fasting Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {vrat.fastingRules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food">
          <div className="space-y-4">
            <Card className="temple-card-warm border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Allowed Foods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {vrat.foods.allowed.map((food, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                      {food}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="temple-card-warm border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                  <XCircle className="w-5 h-5" />
                  Foods to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {vrat.foods.notAllowed.map((food, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 border-red-200 text-red-700">
                      {food}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rituals">
          <Card className="temple-card-warm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-secondary" />
                Rituals & Puja Vidhi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {vrat.rituals.map((ritual, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm text-primary font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{ritual}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="katha">
          <Card className="temple-card-saffron">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                व्रत कथा (Vrat Katha)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {vrat.katha}
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="temple-card-warm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-secondary" />
              Benefits of this Vrat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 md:grid-cols-2">
              {vrat.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary">✨</span>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default VratGuide;
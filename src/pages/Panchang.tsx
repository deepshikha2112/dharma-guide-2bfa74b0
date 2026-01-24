import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Sun, Moon, Clock, Star, AlertTriangle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import TempleBackground from "@/components/TempleBackground";
import BackButton from "@/components/BackButton";
import { generatePanchang, upcomingFestivals, weekdays, type PanchangInfo } from "@/data/panchangData";

const Panchang = () => {
  const [currentDate] = useState(new Date());
  const [panchang, setPanchang] = useState<PanchangInfo | null>(null);

  useEffect(() => {
    setPanchang(generatePanchang(currentDate));
  }, [currentDate]);

  const todayWeekday = weekdays[currentDate.getDay()];

  if (!panchang) return null;

  return (
    <main className="min-h-screen relative pb-24">
      <TempleBackground />
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Back Button */}
        <BackButton label="Back to Home" />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-4xl mb-4 block">🕉️</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            आज का पंचांग
          </h1>
          <p className="text-lg text-muted-foreground">Daily Panchang & Muhurat</p>
          <p className="text-sm text-primary mt-2 font-hindi">
            {currentDate.toLocaleDateString('hi-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Main Tithi Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="temple-card-saffron mb-6 overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Moon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-hindi">{panchang.tithiHindi}</CardTitle>
                    <p className="text-sm text-muted-foreground">{panchang.tithi}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="font-hindi text-lg px-4 py-2">
                  {panchang.pakshaHindi}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <Star className="w-5 h-5 mx-auto mb-2 text-secondary" />
                  <p className="text-xs text-muted-foreground">नक्षत्र</p>
                  <p className="font-hindi font-medium">{panchang.nakshatraHindi}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-secondary" />
                  <p className="text-xs text-muted-foreground">वार</p>
                  <p className="font-hindi font-medium">{panchang.vaarHindi}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <Sun className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">सूर्योदय</p>
                  <p className="font-medium">{panchang.sunrise}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-background/50">
                  <Moon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">सूर्यास्त</p>
                  <p className="font-medium">{panchang.sunset}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rahu Kaal Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-6 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">राहु काल</h3>
                  <p className="text-sm text-muted-foreground">Inauspicious time - avoid new beginnings</p>
                </div>
                <Badge variant="destructive" className="text-base px-4 py-2">
                  {panchang.rahuKaal}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shubh Muhurat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="temple-card-warm mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="font-hindi">शुभ मुहूर्त</span>
                <span className="text-sm font-normal text-muted-foreground ml-2">Auspicious Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {panchang.shubhMuhurat.map((time, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-secondary/10 border-secondary/30 text-foreground px-4 py-2 text-sm"
                  >
                    <Clock className="w-4 h-4 mr-2 text-secondary" />
                    {time}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Deity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="temple-card-warm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">🙏</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground font-hindi">
                    {todayWeekday.hindi} के देवता
                  </h3>
                  <p className={`text-lg font-medium ${todayWeekday.color}`}>
                    {todayWeekday.deity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Special worship day for {todayWeekday.deity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Festivals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            आगामी त्योहार
            <span className="text-sm font-normal text-muted-foreground">Upcoming Festivals</span>
          </h2>
          
          <div className="space-y-3">
            {upcomingFestivals.slice(0, 5).map((festival, index) => (
              <motion.div
                key={festival.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="temple-card-warm hover:shadow-temple transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🪔</span>
                        <div>
                          <h3 className="font-medium font-hindi">{festival.nameHindi}</h3>
                          <p className="text-sm text-muted-foreground">{festival.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-primary/10 border-primary/30">
                          {festival.date}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {festival.relatedDeity}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="temple-card-saffron">
            <CardContent className="p-6 text-center">
              <span className="text-3xl block mb-3">🙏</span>
              <p className="font-hindi text-lg text-foreground mb-2">
                ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
              </p>
              <p className="text-sm text-muted-foreground italic">
                "May all beings be happy; may all be free from illness"
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </main>
  );
};

export default Panchang;
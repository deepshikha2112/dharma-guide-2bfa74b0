import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deities, getRashiFromDate, rashis } from "@/data/deities";
import { Sparkles, User, Calendar, Star, Heart, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  devotedDeity: string;
  dateOfBirth: string;
  rashi: string;
  problem: string;
}

const GUIDANCE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/divine-guidance`;

const Guidance = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    devotedDeity: "",
    dateOfBirth: "",
    rashi: "",
    problem: ""
  });
  const [guidance, setGuidance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (dateStr: string) => {
    setProfile(prev => ({ ...prev, dateOfBirth: dateStr }));
    if (dateStr) {
      const date = new Date(dateStr);
      const rashi = getRashiFromDate(date);
      if (rashi) {
        setProfile(prev => ({ ...prev, rashi: rashi.name }));
      }
    }
  };

  const selectedDeity = deities.find(d => d.id === profile.devotedDeity);
  const selectedRashi = rashis.find(r => r.name === profile.rashi);

  const streamGuidance = useCallback(async () => {
    setIsLoading(true);
    setGuidance("");
    setStep(4);

    try {
      const resp = await fetch(GUIDANCE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          name: profile.name,
          devotedDeity: profile.devotedDeity,
          rashi: profile.rashi,
          problem: profile.problem,
          language: "hindi"
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "मार्गदर्शन प्राप्त करने में त्रुटि हुई");
      }

      if (!resp.body) throw new Error("No response stream");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setGuidance(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setGuidance(fullText);
            }
          } catch { /* ignore */ }
        }
      }
    } catch (error) {
      console.error("Guidance error:", error);
      toast.error(error instanceof Error ? error.message : "कुछ गलत हो गया। कृपया पुनः प्रयास करें।");
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  }, [profile]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            दिव्य मार्गदर्शन
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            अपने आराध्य देव से सीधे मार्गदर्शन प्राप्त करें। वे आपकी समस्या सुनेंगे और आपको राह दिखाएंगे।
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-primary" />
                अपना परिचय दें
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">आपका नाम</Label>
                  <Input
                    id="name"
                    placeholder="अपना नाम लिखें"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="deity">आपके आराध्य देव / गुरु</Label>
                  <Select 
                    value={profile.devotedDeity} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, devotedDeity: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="अपने आराध्य देव चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {deities.map((deity) => (
                        <SelectItem key={deity.id} value={deity.id}>
                          {deity.emoji} {deity.name} ({deity.sanskrit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={() => setStep(2)}
                  disabled={!profile.name || !profile.devotedDeity}
                  className="w-full"
                >
                  आगे बढ़ें
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Date & Rashi */}
          {step === 2 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                जन्म विवरण
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="dob">जन्म तिथि</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {profile.rashi && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">आपकी राशि</p>
                        <p className="font-heading text-xl font-semibold text-foreground">
                          {selectedRashi?.symbol} {profile.rashi} ({selectedRashi?.sanskrit})
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    पीछे जाएं
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!profile.dateOfBirth}
                    className="flex-1"
                  >
                    आगे बढ़ें
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Problem */}
          {step === 3 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-primary" />
                अपनी समस्या बताएं
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">मार्गदर्शन प्राप्त करेंगे</p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {selectedDeity?.emoji} {selectedDeity?.name} से
                  </p>
                </div>

                <div>
                  <Label htmlFor="problem">जीवन में क्या कठिनाई है?</Label>
                  <Textarea
                    id="problem"
                    placeholder="अपनी चिंता, समस्या या प्रश्न यहाँ लिखें। आपके आराध्य देव आपको मार्गदर्शन देंगे..."
                    value={profile.problem}
                    onChange={(e) => setProfile(prev => ({ ...prev, problem: e.target.value }))}
                    className="mt-2 min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    आपकी समस्या पूर्णतः गोपनीय रखी जाएगी।
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    पीछे जाएं
                  </Button>
                  <Button 
                    onClick={streamGuidance}
                    disabled={!profile.problem || isLoading}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    मार्गदर्शन प्राप्त करें
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Guidance */}
          {step === 4 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                {selectedDeity && (
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                    {selectedDeity.emoji}
                  </div>
                )}
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    {selectedDeity?.name} का संदेश
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {profile.name} के लिए दिव्य मार्गदर्शन
                  </p>
                </div>
              </div>
              
              {isLoading && !guidance && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground text-center">
                    {selectedDeity?.name} आपकी पुकार सुन रहे हैं...
                  </p>
                </div>
              )}

              {guidance && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="whitespace-pre-line text-foreground/90 leading-relaxed text-lg">
                    {guidance}
                  </div>
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              )}

              {!isLoading && guidance && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setStep(1);
                      setGuidance("");
                      setProfile({
                        name: "",
                        devotedDeity: "",
                        dateOfBirth: "",
                        rashi: "",
                        problem: ""
                      });
                    }}
                    className="flex-1"
                  >
                    नया सत्र शुरू करें
                  </Button>
                  <Button 
                    onClick={() => navigate(`/deity/${profile.devotedDeity}`)}
                    className="flex-1"
                  >
                    {selectedDeity?.name} की कथा पढ़ें
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Guidance;

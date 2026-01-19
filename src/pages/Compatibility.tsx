import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRashiFromDate, rashis } from "@/data/deities";
import { Heart, User, Calendar, MapPin, Clock, Loader2, Globe, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PartnerProfile {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  rashi: string;
}

const relationshipTypes = [
  { id: "love", labelHi: "प्रेम संबंध", labelEn: "Love Relationship" },
  { id: "marriage", labelHi: "विवाह", labelEn: "Marriage" },
  { id: "engagement", labelHi: "सगाई", labelEn: "Engagement" },
  { id: "friendship", labelHi: "मित्रता", labelEn: "Friendship" },
];

const Compatibility = () => {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [language, setLanguage] = useState<"hindi" | "english" | null>(null);
  const [step, setStep] = useState(0); // 0 = language selection
  const [partner1, setPartner1] = useState<PartnerProfile>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    rashi: ""
  });
  const [partner2, setPartner2] = useState<PartnerProfile>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    rashi: ""
  });
  const [relationshipType, setRelationshipType] = useState("");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const isHindi = language === "hindi";

  const handleDateChange = (partner: 1 | 2, dateStr: string) => {
    const setPartner = partner === 1 ? setPartner1 : setPartner2;
    setPartner(prev => ({ ...prev, dateOfBirth: dateStr }));
    if (dateStr) {
      const date = new Date(dateStr);
      const rashi = getRashiFromDate(date);
      if (rashi) {
        setPartner(prev => ({ ...prev, rashi: rashi.name }));
      }
    }
  };

  const selectedRashi1 = rashis.find(r => r.name === partner1.rashi);
  const selectedRashi2 = rashis.find(r => r.name === partner2.rashi);
  const selectedRelType = relationshipTypes.find(r => r.id === relationshipType);

  const streamCompatibility = useCallback(async () => {
    // Check if user is authenticated
    if (!session?.access_token) {
      toast.error(isHindi ? "कृपया पहले लॉगिन करें।" : "Please login first.");
      navigate("/auth");
      return;
    }

    setIsLoading(true);
    setResult("");
    setStep(4);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    
    if (!supabaseUrl) {
      console.error("Missing environment variables");
      toast.error(isHindi ? "सर्वर कॉन्फ़िगरेशन में त्रुटि है।" : "Server configuration error.");
      setStep(3);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Calling kundali-matching function...");
      const resp = await fetch(`${supabaseUrl}/functions/v1/kundali-matching`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          partner1,
          partner2,
          relationshipType,
          language
        }),
      });

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || (isHindi ? "अनुकूलता जाँचने में त्रुटि हुई" : "Error checking compatibility"));
      }

      if (!resp.body) throw new Error(isHindi ? "कोई उत्तर नहीं मिला" : "No response received");

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
              setResult(fullText);
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
              setResult(fullText);
            }
          } catch { /* ignore */ }
        }
      }
      
      if (!fullText) {
        throw new Error(isHindi ? "कोई परिणाम प्राप्त नहीं हुआ। कृपया पुनः प्रयास करें।" : "No result received. Please try again.");
      }
    } catch (error) {
      console.error("Compatibility error:", error);
      toast.error(error instanceof Error ? error.message : (isHindi ? "कुछ गलत हो गया। कृपया पुनः प्रयास करें।" : "Something went wrong. Please try again."));
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  }, [partner1, partner2, relationshipType, language, isHindi, session, navigate]);

  const resetForm = () => {
    setStep(0);
    setLanguage(null);
    setResult("");
    setPartner1({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "", rashi: "" });
    setPartner2({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "", rashi: "" });
    setRelationshipType("");
  };

  const isStep1Valid = partner1.name && partner1.dateOfBirth && partner1.placeOfBirth;
  const isStep2Valid = partner2.name && partner2.dateOfBirth && partner2.placeOfBirth;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isHindi ? "कुंडली मिलान" : language === "english" ? "Kundali Matching" : "कुंडली मिलान | Kundali Matching"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {isHindi 
              ? "वैदिक ज्योतिष के अनुसार गुण मिलान और संबंध अनुकूलता जाँचें।"
              : language === "english" 
                ? "Check Guna Milan and relationship compatibility based on Vedic Astrology."
                : "वैदिक ज्योतिष के अनुसार अनुकूलता जाँचें।"
            }
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {/* Language Selection - Step 0 */}
          {step === 0 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center justify-center">
                <Globe className="w-6 h-6 mr-2 text-primary" />
                Select Your Language / भाषा चुनें
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 text-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => { setLanguage("hindi"); setStep(1); }}
                >
                  🇮🇳 हिंदी
                </Button>
                <Button
                  variant="outline"
                  className="h-24 text-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => { setLanguage("english"); setStep(1); }}
                >
                  🇬🇧 English
                </Button>
              </div>
            </Card>
          )}

          {/* Progress Steps for steps 1-3 */}
          {step >= 1 && step <= 3 && (
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
          )}

          {/* Step 1: Partner 1 Details */}
          {step === 1 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "पार्टनर 1 का विवरण" : "Partner 1 Details"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name1">{isHindi ? "पूर्ण नाम *" : "Full Name *"}</Label>
                  <Input
                    id="name1"
                    placeholder={isHindi ? "पार्टनर 1 का नाम" : "Partner 1's name"}
                    value={partner1.name}
                    onChange={(e) => setPartner1(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="dob1">{isHindi ? "जन्म तिथि *" : "Date of Birth *"}</Label>
                  <Input
                    id="dob1"
                    type="date"
                    value={partner1.dateOfBirth}
                    onChange={(e) => handleDateChange(1, e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tob1" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {isHindi ? "जन्म समय" : "Time of Birth"}
                  </Label>
                  <Input
                    id="tob1"
                    type="time"
                    value={partner1.timeOfBirth}
                    onChange={(e) => setPartner1(prev => ({ ...prev, timeOfBirth: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pob1" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {isHindi ? "जन्म स्थान *" : "Place of Birth *"}
                  </Label>
                  <Input
                    id="pob1"
                    placeholder={isHindi ? "शहर, राज्य, देश" : "City, State, Country"}
                    value={partner1.placeOfBirth}
                    onChange={(e) => setPartner1(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                {partner1.rashi && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedRashi1?.symbol}</span>
                      <div>
                        <p className="text-sm text-muted-foreground">{isHindi ? "चंद्र राशि" : "Moon Sign"}</p>
                        <p className="font-heading text-xl font-semibold text-foreground">
                          {selectedRashi1?.sanskrit} ({partner1.rashi})
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                    {isHindi ? "भाषा बदलें" : "Change Language"}
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="flex-1"
                  >
                    {isHindi ? "आगे बढ़ें" : "Continue"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Partner 2 Details */}
          {step === 2 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "पार्टनर 2 का विवरण" : "Partner 2 Details"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name2">{isHindi ? "पूर्ण नाम *" : "Full Name *"}</Label>
                  <Input
                    id="name2"
                    placeholder={isHindi ? "पार्टनर 2 का नाम" : "Partner 2's name"}
                    value={partner2.name}
                    onChange={(e) => setPartner2(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="dob2">{isHindi ? "जन्म तिथि *" : "Date of Birth *"}</Label>
                  <Input
                    id="dob2"
                    type="date"
                    value={partner2.dateOfBirth}
                    onChange={(e) => handleDateChange(2, e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tob2" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {isHindi ? "जन्म समय" : "Time of Birth"}
                  </Label>
                  <Input
                    id="tob2"
                    type="time"
                    value={partner2.timeOfBirth}
                    onChange={(e) => setPartner2(prev => ({ ...prev, timeOfBirth: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pob2" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {isHindi ? "जन्म स्थान *" : "Place of Birth *"}
                  </Label>
                  <Input
                    id="pob2"
                    placeholder={isHindi ? "शहर, राज्य, देश" : "City, State, Country"}
                    value={partner2.placeOfBirth}
                    onChange={(e) => setPartner2(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                {partner2.rashi && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedRashi2?.symbol}</span>
                      <div>
                        <p className="text-sm text-muted-foreground">{isHindi ? "चंद्र राशि" : "Moon Sign"}</p>
                        <p className="font-heading text-xl font-semibold text-foreground">
                          {selectedRashi2?.sanskrit} ({partner2.rashi})
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    {isHindi ? "पीछे जाएं" : "Go Back"}
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className="flex-1"
                  >
                    {isHindi ? "आगे बढ़ें" : "Continue"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Relationship Type & Summary */}
          {step === 3 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "संबंध प्रकार और सारांश" : "Relationship Type & Summary"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label>{isHindi ? "संबंध प्रकार (वैकल्पिक)" : "Relationship Type (Optional)"}</Label>
                  <Select 
                    value={relationshipType} 
                    onValueChange={setRelationshipType}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isHindi ? "संबंध प्रकार चुनें" : "Select relationship type"} />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {isHindi ? type.labelHi : type.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary of both partners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">{isHindi ? "पार्टनर 1" : "Partner 1"}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>👤 {partner1.name}</p>
                      <p>📅 {partner1.dateOfBirth}</p>
                      <p>📍 {partner1.placeOfBirth}</p>
                      {partner1.rashi && <p>⭐ {selectedRashi1?.symbol} {selectedRashi1?.sanskrit}</p>}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-2">{isHindi ? "पार्टनर 2" : "Partner 2"}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>👤 {partner2.name}</p>
                      <p>📅 {partner2.dateOfBirth}</p>
                      <p>📍 {partner2.placeOfBirth}</p>
                      {partner2.rashi && <p>⭐ {selectedRashi2?.symbol} {selectedRashi2?.sanskrit}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    {isHindi ? "पीछे जाएं" : "Go Back"}
                  </Button>
                  <Button 
                    onClick={streamCompatibility}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isHindi ? "अनुकूलता जाँचें" : "Check Compatibility"}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {isHindi 
                    ? "आपकी जानकारी पूर्णतः गोपनीय रखी जाएगी।"
                    : "Your information will be kept completely confidential."
                  }
                </p>
              </div>
            </Card>
          )}

          {/* Step 4: Compatibility Result */}
          {step === 4 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                  💕
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    {isHindi ? "कुंडली मिलान रिपोर्ट" : "Kundali Matching Report"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {partner1.name} ❤️ {partner2.name}
                  </p>
                </div>
              </div>
              
              {isLoading && !result && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground text-center">
                    {isHindi ? "कुंडली मिलान हो रहा है..." : "Matching kundalis..."}
                  </p>
                </div>
              )}

              {result && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="whitespace-pre-line text-foreground/90 leading-relaxed">
                    {result}
                  </div>
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              )}

              {!isLoading && result && (
                <div className="mt-8 space-y-4">
                  {/* Follow-up Options */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground mb-3">
                      {isHindi ? "और जानना चाहते हैं?" : "Want to know more?"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate("/guidance")}
                      >
                        {isHindi ? "💍 विवाह समय देखें" : "💍 Check Marriage Timing"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate("/guidance")}
                      >
                        {isHindi ? "🔮 व्यक्तिगत भविष्यवाणी" : "🔮 Personal Prediction"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      onClick={resetForm}
                      className="flex-1"
                    >
                      {isHindi ? "नया मिलान करें" : "New Matching"}
                    </Button>
                    <Button 
                      onClick={() => navigate("/")}
                      className="flex-1"
                    >
                      {isHindi ? "होम पेज पर जाएं" : "Go to Home"}
                    </Button>
                  </div>
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

export default Compatibility;

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
import { getRashiFromDate, rashis } from "@/data/deities";
import { Sparkles, User, Calendar, MapPin, Clock, Heart, MessageCircle, Loader2, Globe, HelpCircle, Users } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: string;
  problemCategory: string;
  problem: string;
  rashi: string;
}

const problemCategories = [
  { id: "career", labelHi: "करियर / नौकरी", labelEn: "Career / Job" },
  { id: "love", labelHi: "प्रेम / रिश्ते", labelEn: "Love / Relationships" },
  { id: "marriage", labelHi: "विवाह", labelEn: "Marriage" },
  { id: "finance", labelHi: "आर्थिक / धन", labelEn: "Finance / Money" },
  { id: "health", labelHi: "स्वास्थ्य", labelEn: "Health" },
  { id: "education", labelHi: "शिक्षा", labelEn: "Education" },
  { id: "family", labelHi: "परिवार", labelEn: "Family" },
];

const Guidance = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"select" | "personal" | "compatibility">("select");
  const [language, setLanguage] = useState<"hindi" | "english" | null>(null);
  const [step, setStep] = useState(0); // 0 = language selection
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
    problemCategory: "",
    problem: "",
    rashi: ""
  });
  const [guidance, setGuidance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false); // Session memory flag
  const [askingNewQuestion, setAskingNewQuestion] = useState(false); // For asking another question

  const isHindi = language === "hindi";

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

  const selectedRashi = rashis.find(r => r.name === profile.rashi);
  const selectedCategory = problemCategories.find(c => c.id === profile.problemCategory);

  const streamGuidance = useCallback(async () => {
    setIsLoading(true);
    setGuidance("");
    setStep(4);
    setSessionActive(true); // Mark session as active after first prediction

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing environment variables");
      toast.error(isHindi ? "सर्वर कॉन्फ़िगरेशन में त्रुटि है।" : "Server configuration error.");
      setStep(3);
      setIsLoading(false);
      return;
    }

    try {
      console.log("Calling divine-guidance function...");
      const resp = await fetch(`${supabaseUrl}/functions/v1/divine-guidance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          name: profile.name,
          dateOfBirth: profile.dateOfBirth,
          timeOfBirth: profile.timeOfBirth,
          placeOfBirth: profile.placeOfBirth,
          gender: profile.gender,
          problemCategory: profile.problemCategory,
          problem: profile.problem,
          rashi: profile.rashi,
          language: language
        }),
      });

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || (isHindi ? "मार्गदर्शन प्राप्त करने में त्रुटि हुई" : "Error getting guidance"));
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
      
      if (!fullText) {
        throw new Error(isHindi ? "कोई मार्गदर्शन प्राप्त नहीं हुआ। कृपया पुनः प्रयास करें।" : "No guidance received. Please try again.");
      }
    } catch (error) {
      console.error("Guidance error:", error);
      toast.error(error instanceof Error ? error.message : (isHindi ? "कुछ गलत हो गया। कृपया पुनः प्रयास करें।" : "Something went wrong. Please try again."));
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  }, [profile, language, isHindi]);

  const resetForm = () => {
    setStep(0);
    setMode("select");
    setLanguage(null);
    setGuidance("");
    setSessionActive(false);
    setAskingNewQuestion(false);
    setProfile({
      name: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
      gender: "",
      problemCategory: "",
      problem: "",
      rashi: ""
    });
  };

  // Ask another question (keep birth details, reset question only)
  const askAnotherQuestion = () => {
    setGuidance("");
    setProfile(prev => ({ ...prev, problemCategory: "", problem: "" }));
    setAskingNewQuestion(true);
    setStep(5); // New step for asking another question
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {mode === "select" 
              ? "ज्योतिष सेवाएं | Astrology Services"
              : (isHindi ? "ज्योतिष मार्गदर्शन" : "Astrology Guidance")
            }
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {mode === "select" 
              ? "वैदिक ज्योतिष की शक्ति से अपने जीवन को समझें।"
              : (isHindi ? "वैदिक ज्योतिष के आधार पर जीवन की समस्याओं का समाधान पाएं।" : "Get solutions to your life problems based on Vedic Astrology.")
            }
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Mode Selection */}
          {mode === "select" && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 animate-fade-in">
              <Card 
                className="p-4 md:p-8 cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => setMode("personal")}
              >
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg md:text-2xl font-semibold text-foreground">
                    व्यक्तिगत भविष्यवाणी
                  </h3>
                  <p className="text-sm md:text-lg text-primary font-medium">Personal Prediction</p>
                  <p className="hidden sm:block text-muted-foreground">
                    करियर, विवाह, स्वास्थ्य, धन और जीवन की समस्याओं का समाधान
                  </p>
                  <div className="hidden sm:flex flex-wrap gap-2 justify-center pt-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">💼 Career</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">💍 Marriage</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">💰 Finance</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">❤️ Love</span>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-4 md:p-8 cursor-pointer hover:border-primary hover:shadow-lg transition-all group"
                onClick={() => navigate("/compatibility")}
              >
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-7 h-7 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg md:text-2xl font-semibold text-foreground">
                    कुंडली मिलान
                  </h3>
                  <p className="text-sm md:text-lg text-primary font-medium">Kundali Matching</p>
                  <p className="hidden sm:block text-muted-foreground">
                    गुण मिलान, संबंध अनुकूलता और भविष्य का विश्लेषण
                  </p>
                  <div className="hidden sm:flex flex-wrap gap-2 justify-center pt-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">💕 36 गुण</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">🔮 भविष्य</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-xs">✨ उपाय</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Personal Prediction Flow */}
          {mode === "personal" && (
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMode("select");
                    setStep(0);
                  }}
                  className="justify-start"
                >
                  ← Back to Services
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/compatibility")}
                >
                  Kundali Matching
                </Button>
              </div>

              {/* Language Selection - Step 0 */}
              {step === 0 && (
                <Card className="p-6 md:p-8 animate-fade-in">
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center justify-center">
                    <Globe className="w-6 h-6 mr-2 text-primary" />
                    Select Your Language / भाषा चुनें
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  <Button variant="ghost" onClick={() => setMode("select")} className="w-full">
                    ← Back to Services
                  </Button>
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

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "व्यक्तिगत विवरण" : "Personal Details"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name">{isHindi ? "पूर्ण नाम *" : "Full Name *"}</Label>
                  <Input
                    id="name"
                    placeholder={isHindi ? "अपना पूरा नाम लिखें" : "Enter your full name"}
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">{isHindi ? "लिंग" : "Gender"}</Label>
                  <Select 
                    value={profile.gender} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isHindi ? "लिंग चुनें (वैकल्पिक)" : "Select gender (optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{isHindi ? "पुरुष" : "Male"}</SelectItem>
                      <SelectItem value="female">{isHindi ? "महिला" : "Female"}</SelectItem>
                      <SelectItem value="other">{isHindi ? "अन्य" : "Other"}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                    {isHindi ? "भाषा बदलें" : "Change Language"}
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!profile.name}
                    className="flex-1"
                  >
                    {isHindi ? "आगे बढ़ें" : "Continue"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Birth Details */}
          {step === 2 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "जन्म विवरण" : "Birth Details"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label htmlFor="dob">{isHindi ? "जन्म तिथि *" : "Date of Birth *"}</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="tob" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {isHindi ? "जन्म समय" : "Time of Birth"}
                  </Label>
                  <Input
                    id="tob"
                    type="time"
                    value={profile.timeOfBirth}
                    onChange={(e) => setProfile(prev => ({ ...prev, timeOfBirth: e.target.value }))}
                    className="mt-2"
                    placeholder={isHindi ? "उदाहरण: 10:30 AM" : "Example: 10:30 AM"}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isHindi ? "(सटीक समय से बेहतर भविष्यवाणी मिलती है)" : "(Accurate time gives better predictions)"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="pob" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {isHindi ? "जन्म स्थान *" : "Place of Birth *"}
                  </Label>
                  <Input
                    id="pob"
                    placeholder={isHindi ? "शहर, राज्य, देश" : "City, State, Country"}
                    value={profile.placeOfBirth}
                    onChange={(e) => setProfile(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                {profile.rashi && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{selectedRashi?.symbol}</span>
                      <div>
                        <p className="text-sm text-muted-foreground">{isHindi ? "आपकी चंद्र राशि" : "Your Moon Sign"}</p>
                        <p className="font-heading text-xl font-semibold text-foreground">
                          {selectedRashi?.sanskrit} ({profile.rashi})
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
                    disabled={!profile.dateOfBirth || !profile.placeOfBirth}
                    className="flex-1"
                  >
                    {isHindi ? "आगे बढ़ें" : "Continue"}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Problem */}
          {step === 3 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "अपनी समस्या बताएं" : "Describe Your Problem"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label>{isHindi ? "समस्या का क्षेत्र *" : "Problem Category *"}</Label>
                  <Select 
                    value={profile.problemCategory} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, problemCategory: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isHindi ? "समस्या का क्षेत्र चुनें" : "Select problem category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {problemCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {isHindi ? cat.labelHi : cat.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="problem">{isHindi ? "विस्तार से बताएं *" : "Describe in Detail *"}</Label>
                  <Textarea
                    id="problem"
                    placeholder={isHindi 
                      ? "अपनी समस्या या प्रश्न यहाँ विस्तार से लिखें। जैसे: मेरी शादी कब होगी? करियर में आगे कैसे बढ़ूं?"
                      : "Describe your problem or question in detail. E.g.: When will I get married? How to progress in career?"
                    }
                    value={profile.problem}
                    onChange={(e) => setProfile(prev => ({ ...prev, problem: e.target.value }))}
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                {/* Summary */}
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="font-semibold text-foreground">{isHindi ? "आपका विवरण:" : "Your Details:"}</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>👤 {profile.name}</p>
                    <p>📅 {profile.dateOfBirth} {profile.timeOfBirth && `| ${profile.timeOfBirth}`}</p>
                    <p>📍 {profile.placeOfBirth}</p>
                    {profile.rashi && <p>⭐ {selectedRashi?.symbol} {selectedRashi?.sanskrit} ({profile.rashi})</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    {isHindi ? "पीछे जाएं" : "Go Back"}
                  </Button>
                  <Button 
                    onClick={streamGuidance}
                    disabled={!profile.problemCategory || !profile.problem || isLoading}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isHindi ? "भविष्यवाणी प्राप्त करें" : "Get Prediction"}
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

          {/* Step 4: Prediction Result */}
          {step === 4 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
                  🪐
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    {isHindi ? "ज्योतिष भविष्यवाणी" : "Astrology Prediction"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {profile.name} • {selectedRashi?.symbol} {isHindi ? selectedRashi?.sanskrit : profile.rashi} • {isHindi ? selectedCategory?.labelHi : selectedCategory?.labelEn}
                  </p>
                </div>
              </div>
              
              {isLoading && !guidance && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground text-center">
                    {isHindi ? "आपकी कुंडली का विश्लेषण हो रहा है..." : "Analyzing your birth chart..."}
                  </p>
                </div>
              )}

              {guidance && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div className="whitespace-pre-line text-foreground/90 leading-relaxed">
                    {guidance}
                  </div>
                  {isLoading && (
                    <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                  )}
                </div>
              )}

              {!isLoading && guidance && (
                <div className="mt-8 space-y-4">
                  {/* Session Active Label */}
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {isHindi ? "सत्र सक्रिय है" : "Session Active"}
                  </div>

                  {/* Two Options Only */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={askAnotherQuestion}
                      className="w-full h-14 text-lg"
                    >
                      1️⃣ {isHindi ? "और प्रश्न पूछें" : "Ask Another Question"}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        navigate("/");
                      }}
                      className="w-full h-14 text-lg"
                    >
                      2️⃣ {isHindi ? "सत्र समाप्त करें और होम जाएं" : "End Session & Go to Home"}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Step 5: Ask Another Question (Session Mode) */}
          {step === 5 && sessionActive && (
            <Card className="p-6 md:p-8 animate-fade-in">
              {/* Session Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {isHindi ? "सत्र सक्रिय है" : "Session Active"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {profile.name} • {selectedRashi?.symbol} {profile.rashi}
                </div>
              </div>

              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-primary" />
                {isHindi ? "अगला प्रश्न पूछें" : "Ask Your Next Question"}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label>{isHindi ? "समस्या का क्षेत्र *" : "Problem Category *"}</Label>
                  <Select 
                    value={profile.problemCategory} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, problemCategory: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={isHindi ? "समस्या का क्षेत्र चुनें" : "Select problem category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {problemCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {isHindi ? cat.labelHi : cat.labelEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="newQuestion">{isHindi ? "अपना प्रश्न लिखें *" : "Write Your Question *"}</Label>
                  <Textarea
                    id="newQuestion"
                    placeholder={isHindi 
                      ? "अपना अगला प्रश्न यहाँ लिखें..."
                      : "Write your next question here..."
                    }
                    value={profile.problem}
                    onChange={(e) => setProfile(prev => ({ ...prev, problem: e.target.value }))}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      navigate("/");
                    }}
                    className="flex-1"
                  >
                    {isHindi ? "सत्र समाप्त करें" : "End Session"}
                  </Button>
                  <Button 
                    onClick={streamGuidance}
                    disabled={!profile.problemCategory || !profile.problem || isLoading}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isHindi ? "उत्तर प्राप्त करें" : "Get Answer"}
                  </Button>
                </div>
              </div>
            </Card>
          )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Guidance;

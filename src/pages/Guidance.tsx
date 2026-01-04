import { useState } from "react";
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
import { Sparkles, User, Calendar, Star, Heart, MessageCircle } from "lucide-react";

interface UserProfile {
  name: string;
  devotedDeity: string;
  dateOfBirth: string;
  rashi: string;
  problem: string;
}

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
  const [guidance, setGuidance] = useState<string | null>(null);

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

  const generateGuidance = () => {
    if (!selectedDeity) return;
    
    // Generate guidance based on deity's teachings and rashi
    const rashiGuidance = selectedRashi 
      ? `As a ${selectedRashi.name} (${selectedRashi.sanskrit}), you possess unique strengths. Channel these qualities with patience and faith.`
      : "";
    
    const deityGuidance = `
🙏 Divine Guidance from ${selectedDeity.name}

Dear ${profile.name},

${selectedDeity.lifeLesson}

${rashiGuidance}

**From the Life of ${selectedDeity.name}:**

${selectedDeity.name} faced great challenges in their divine journey. In Chapter 4, we learn about their struggles: "${selectedDeity.chapters[3]?.content.substring(0, 200)}..."

**Practical Steps for You:**

1. **Shraddha (Faith)**: Believe that your current situation is temporary. Just as ${selectedDeity.name} overcame obstacles, you too shall prevail.

2. **Saburi (Patience)**: Do not rush for solutions. Divine timing is perfect. Continue your duties with dedication.

3. **Seva (Service)**: Help someone in need today. This selfless act opens doors for divine blessings.

4. **Mantra Practice**: Chant "${selectedDeity.mantras[0]}" with devotion. Regular practice brings mental peace and clarity.

5. **Morning Ritual**: Wake before sunrise, offer water to the sun, and spend 10 minutes in quiet contemplation.

**Sacred Reminder:**
"${selectedDeity.chapters[5]?.content.substring(0, 150)}..."

Remember, the divine is always with you. Your problems are opportunities for spiritual growth. Walk with faith, and the path will illuminate itself.

🙏 Om Shanti 🙏
    `.trim();

    setGuidance(deityGuidance);
    setStep(4);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Divine Spiritual Guidance
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Receive personalized guidance based on the life struggles and teachings of your devoted deity.
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
                Tell Us About Yourself
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="deity">Your Devoted God / Guru</Label>
                  <Select 
                    value={profile.devotedDeity} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, devotedDeity: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your devoted deity" />
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
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Date & Rashi */}
          {step === 2 && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-primary" />
                Your Birth Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
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
                        <p className="text-sm text-muted-foreground">Your Rashi</p>
                        <p className="font-heading text-xl font-semibold text-foreground">
                          {selectedRashi?.symbol} {profile.rashi} ({selectedRashi?.sanskrit})
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    disabled={!profile.dateOfBirth}
                    className="flex-1"
                  >
                    Continue
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
                Share Your Concern
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Seeking guidance from</p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {selectedDeity?.emoji} {selectedDeity?.name}
                  </p>
                </div>

                <div>
                  <Label htmlFor="problem">What challenge are you facing in life?</Label>
                  <Textarea
                    id="problem"
                    placeholder="Share your worries, struggles, or questions. We will provide guidance based on divine teachings..."
                    value={profile.problem}
                    onChange={(e) => setProfile(prev => ({ ...prev, problem: e.target.value }))}
                    className="mt-2 min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Your concerns are treated with respect and confidentiality.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={generateGuidance}
                    disabled={!profile.problem}
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Receive Guidance
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Guidance */}
          {step === 4 && guidance && (
            <Card className="p-6 md:p-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-semibold text-foreground mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                Your Divine Guidance
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-foreground/90 leading-relaxed">
                  {guidance}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setStep(1);
                    setGuidance(null);
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
                  Start New Session
                </Button>
                <Button 
                  onClick={() => navigate(`/deity/${profile.devotedDeity}`)}
                  className="flex-1"
                >
                  Read Full Story of {selectedDeity?.name}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Guidance;

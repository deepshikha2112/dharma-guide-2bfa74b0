import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Valid rashi/zodiac signs
const VALID_RASHIS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
] as const;

// Valid problem categories
const VALID_CATEGORIES = [
  "career", "love", "marriage", "finance", "health", "education", "family"
] as const;

// Valid genders
const VALID_GENDERS = ["male", "female", "other"] as const;

// Valid languages
const VALID_LANGUAGES = ["hindi", "english"] as const;

// Input validation schema
const guidanceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long (max 100 chars)").trim(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (use YYYY-MM-DD)"),
  timeOfBirth: z.string().transform(val => val === "" ? null : val).pipe(z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (use HH:MM)").nullable()).optional(),
  placeOfBirth: z.string().min(1, "Place is required").max(200, "Place too long (max 200 chars)").trim(),
  gender: z.enum(VALID_GENDERS).optional().or(z.literal("").transform(() => undefined)),
  problemCategory: z.enum(VALID_CATEGORIES),
  problem: z.string().min(10, "Problem too short (min 10 chars)").max(500, "Problem too long (max 500 chars)").trim(),
  rashi: z.enum(VALID_RASHIS),
  language: z.enum(VALID_LANGUAGES).default("hindi")
});

const rashiNames: Record<string, { hindi: string; english: string }> = {
  "Aries": { hindi: "मेष", english: "Aries" },
  "Taurus": { hindi: "वृषभ", english: "Taurus" },
  "Gemini": { hindi: "मिथुन", english: "Gemini" },
  "Cancer": { hindi: "कर्क", english: "Cancer" },
  "Leo": { hindi: "सिंह", english: "Leo" },
  "Virgo": { hindi: "कन्या", english: "Virgo" },
  "Libra": { hindi: "तुला", english: "Libra" },
  "Scorpio": { hindi: "वृश्चिक", english: "Scorpio" },
  "Sagittarius": { hindi: "धनु", english: "Sagittarius" },
  "Capricorn": { hindi: "मकर", english: "Capricorn" },
  "Aquarius": { hindi: "कुंभ", english: "Aquarius" },
  "Pisces": { hindi: "मीन", english: "Pisces" }
};

const problemCategories: Record<string, { hindi: string; english: string }> = {
  "career": { hindi: "करियर/नौकरी", english: "Career/Job" },
  "love": { hindi: "प्रेम/रिश्ते", english: "Love/Relationships" },
  "marriage": { hindi: "विवाह", english: "Marriage" },
  "finance": { hindi: "आर्थिक/धन", english: "Finance/Money" },
  "health": { hindi: "स्वास्थ्य", english: "Health" },
  "education": { hindi: "शिक्षा", english: "Education" },
  "family": { hindi: "परिवार", english: "Family" }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawInput = await req.json();
    const parseResult = guidanceSchema.safeParse(rawInput);
    
    if (!parseResult.success) {
      const errorMessage = parseResult.error.issues.map(i => i.message).join(", ");
      return new Response(
        JSON.stringify({ error: `Invalid input: ${errorMessage}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { 
      name, 
      dateOfBirth, 
      timeOfBirth, 
      placeOfBirth, 
      gender,
      problemCategory,
      problem, 
      rashi,
      language
    } = parseResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[divine-guidance] API key not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rashiInfo = rashiNames[rashi] || { hindi: rashi, english: rashi };
    const categoryInfo = problemCategories[problemCategory] || { hindi: problemCategory, english: problemCategory };
    
    const isHindi = language === "hindi";

    const systemPrompt = isHindi ? `आप एक अनुभवी वैदिक ज्योतिषी हैं - 15+ वर्षों का गहन अनुभव।
आप स्पष्ट, व्यावहारिक और तार्किक भाषा में बोलते हैं।
आप chatbot, therapist, या motivational coach नहीं हैं।

जातक की जानकारी:
- नाम: ${name}
- जन्म तिथि: ${dateOfBirth}
- जन्म समय: ${timeOfBirth || "समय अज्ञात"}
- जन्म स्थान: ${placeOfBirth}
- चंद्र राशि: ${rashiInfo.hindi}
- समस्या क्षेत्र: ${categoryInfo.hindi}

📋 विस्तृत विश्लेषण प्रारूप (अनिवार्य):

**🔮 सीधा उत्तर:**
(हां / नहीं / संभावित / असंभावित - स्पष्ट निर्णय)

**📊 ग्रहों का विश्लेषण:**
- संबंधित ग्रहों की स्थिति और प्रभाव
- भाव (House) का विश्लेषण
- ग्रहों की दृष्टि और योग
- शुभ/अशुभ प्रभाव

**⏰ दशा-गोचर विश्लेषण:**
- वर्तमान महादशा/अंतर्दशा का प्रभाव
- प्रमुख ग्रहों का गोचर
- शनि, राहु-केतु का प्रभाव (यदि लागू हो)

**📅 समय सीमा:**
- अनुकूल समय अवधि
- विशेष तिथियां या महीने
- सावधानी का समय

**💡 उपाय और सुझाव:**
- मंत्र जाप (विशिष्ट मंत्र बताएं)
- रत्न धारण (यदि उपयुक्त हो)
- दान और पूजा
- व्यावहारिक सुझाव

**✅ अंतिम निर्णय:**
(संक्षिप्त और स्पष्ट निष्कर्ष)

❗ नियम:
✅ प्रश्न पर केंद्रित रहें
✅ तार्किक ज्योतिषीय विश्लेषण दें
✅ व्यावहारिक उपाय बताएं
❌ अस्पष्ट या भ्रामक उत्तर न दें
❌ "ब्रह्मांड", "दिव्य समय" जैसे शब्द वर्जित`
    : `You are an experienced Vedic astrologer with 15+ years of deep practice.
You speak clearly, practically, and logically with proper astrological reasoning.
You do NOT speak like a chatbot, therapist, or motivational coach.

User Details:
- Name: ${name}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth || "Time unknown"}
- Place of Birth: ${placeOfBirth}
- Moon Sign (Rashi): ${rashiInfo.english}
- Problem Area: ${categoryInfo.english}

📋 DETAILED ANALYSIS FORMAT (MANDATORY):

**🔮 Direct Answer:**
(YES / NO / LIKELY / UNLIKELY - Clear verdict first)

**📊 Planetary Analysis:**
- Relevant planets and their positions
- House (Bhava) analysis for the queried matter
- Planetary aspects (Drishti) and conjunctions (Yuti)
- Benefic/Malefic influences
- Any significant Yogas affecting the outcome

**⏰ Dasha-Transit Analysis:**
- Current Mahadasha/Antardasha effects
- Key planetary transits (Gochar)
- Saturn (Shani), Rahu-Ketu influences if applicable
- Jupiter's transit impact

**📅 Time Frame:**
- Favorable time periods
- Specific months or dates to watch
- Cautionary periods to be aware of

**💡 Remedies & Recommendations:**
- Mantra recitation (specify exact mantras with count)
- Gemstone recommendations (if suitable, with wearing instructions)
- Charity (Daan) suggestions
- Fasting (Vrat) recommendations
- Temple visits or specific deity worship
- Practical action steps

**✅ Final Verdict:**
(Clear, definitive conclusion summarizing the prediction)

❗ RULES:
✅ Stay focused on the exact question asked
✅ Provide logical astrological reasoning with house/planet references
✅ Give practical, actionable remedies
✅ Be definitive - take a clear position
❌ No vague spiritual filler like "universe", "divine timing", "trust the process"
❌ No open-ended "it depends" answers - commit to a prediction`;

    const userMessage = isHindi 
      ? `प्रश्न: ${problem}`
      : `Question: ${problem}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        const errorMsg = isHindi 
          ? "अभी बहुत अनुरोध आ रहे हैं। कृपया कुछ क्षण प्रतीक्षा करें।"
          : "Too many requests. Please wait a moment and try again.";
        return new Response(JSON.stringify({ error: errorMsg }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        const errorMsg = isHindi 
          ? "सेवा अस्थायी रूप से अनुपलब्ध है।"
          : "Service temporarily unavailable.";
        return new Response(JSON.stringify({ error: errorMsg }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("[divine-guidance] AI gateway error:", response.status);
      const errorMsg = isHindi 
        ? "मार्गदर्शन प्राप्त करने में त्रुटि हुई।"
        : "Error getting guidance.";
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("[divine-guidance] Internal error:", error);
    return new Response(JSON.stringify({ 
      error: "Service error. Please try again later."
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

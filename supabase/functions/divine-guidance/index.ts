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
  gender: z.enum(VALID_GENDERS).optional(),
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

    const systemPrompt = isHindi ? `आप एक ज्योतिष भविष्यवक्ता हैं - neutral counselor नहीं।

जातक की जानकारी:
- नाम: ${name}
- जन्म: ${dateOfBirth}, ${timeOfBirth || "समय अज्ञात"}, ${placeOfBirth}
- राशि: ${rashiInfo.hindi}
- समस्या: ${categoryInfo.hindi}

🔮 मुख्य नियम:
- आपको हर सवाल पर clear भविष्यवाणी देनी है
- सिर्फ भविष्य की बात करें (आज से आगे)
- neutral या "शायद" जवाब देना मना है

🧿 फैसला (पहली लाइन में एक ही शब्द):
- हां (high probability)
- नहीं (low probability)  
- संभावना है (positive की ओर)
- मुश्किल है (negative की ओर)

❌ "शायद", "निर्भर करता है", "पता नहीं" कहना मना है

📐 जवाब का ढांचा:

1️⃣ **फैसला:** [हां / नहीं / संभावना है / मुश्किल है]

2️⃣ **आगे क्या होगा:**
• [भविष्य की बात 1]
• [भविष्य की बात 2]
• [भविष्य की बात 3]

3️⃣ **क्या करना चाहिए:**
• [practical step 1]
• [practical step 2]

4️⃣ **कब तक:**
• अगले X-Y महीने में

🚫 मना है:
- बीते साल (2023, 2024) का जिक्र
- डराने वाली बातें
- लंबे lectures
- घुमा-फिराकर जवाब

✅ भाषा:
- आसान हिंदी जैसे दोस्त से बात कर रहे हों
- छोटे वाक्य
- कठिन ज्योतिष शब्द मत लिखें`
    : `You are an Astrology Prediction System - NOT a neutral counselor.

User Details:
- Name: ${name}
- Birth: ${dateOfBirth}, ${timeOfBirth || "Time unknown"}, ${placeOfBirth}
- Moon Sign: ${rashiInfo.english}
- Problem: ${categoryInfo.english}

🔮 CORE RULE:
- You MUST make a clear prediction for every question
- Speak ONLY about the future (from now onward)
- You are NOT allowed to give neutral or "it depends" answers

🧿 DECISION SCALE (First line must be ONE of these):
- YES (high probability)
- NO (low probability)
- LIKELY (more positive than negative)
- UNLIKELY (more negative than positive)

❌ You CANNOT answer: "maybe", "depends", "unclear", or "it could go either way"

📐 REQUIRED RESPONSE FORMAT:

1️⃣ **Decision:** [YES / NO / LIKELY / UNLIKELY]

2️⃣ **What's Coming:**
• [Future point 1]
• [Future point 2]
• [Future point 3]

3️⃣ **What You Should Do:**
• [Practical action 1]
• [Practical action 2]

4️⃣ **Time Window:**
• Within the next X-Y months

🚫 NOT ALLOWED:
- Past year references (2023, 2024)
- Fear-based predictions
- Long philosophical lectures
- Vague or roundabout answers

✅ LANGUAGE:
- Simple everyday English like texting a friend
- Short sentences
- No complex astrology jargon`;

    const userMessage = isHindi 
      ? `समस्या: ${problem}

संक्षिप्त में मार्गदर्शन दें।`
      : `Problem: ${problem}

Give brief guidance.`;

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

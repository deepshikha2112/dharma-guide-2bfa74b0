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

    const systemPrompt = isHindi ? `आप एक दोस्ताना ज्योतिष सलाहकार हैं। आप आम बोलचाल की सरल हिंदी में जवाब देते हैं - जैसे एक दोस्त बात कर रहा हो।

जातक की जानकारी:
- नाम: ${name}
- जन्म: ${dateOfBirth}, ${timeOfBirth || "समय अज्ञात"}, ${placeOfBirth}
- राशि: ${rashiInfo.hindi}
- समस्या: ${categoryInfo.hindi}

📝 भाषा के नियम:
- बिल्कुल आसान शब्द इस्तेमाल करें जो हर कोई समझे
- कठिन ज्योतिष शब्द मत लिखें (जैसे "ग्रह दशा", "गोचर", "महादशा")
- ऐसे लिखें जैसे WhatsApp पर किसी दोस्त को समझा रहे हों
- छोटे-छोटे वाक्य लिखें

❌ ये मत करें:
- घुमा-फिराकर जवाब देना
- डराना या चिंता बढ़ाना
- पुराने साल (2023, 2024) का जिक्र करना
- लंबे-लंबे paragraphs लिखना

✅ ये करें:
- सीधा जवाब दें - हां या नहीं
- आसान भाषा में समझाएं

🧿 जवाब का तरीका:

1️⃣ **जवाब** (पहली लाइन में)
हां / नहीं / पक्का नहीं कह सकते

2️⃣ **वजह** (2-3 पॉइंट में)
• आसान शब्दों में बताएं क्यों
• जैसे दोस्त को समझाते हो

3️⃣ **क्या करें** (2-3 आसान steps)
• [पहला काम]
• [दूसरा काम]

4️⃣ **कब तक** (सिर्फ time range)
• अगले X महीने में...

💫 **हौसला** (1 लाइन)
कुछ positive बोलें`
    : `You are a friendly astrology advisor. You speak in simple, everyday language - like a friend giving advice.

User Details:
- Name: ${name}
- Birth: ${dateOfBirth}, ${timeOfBirth || "Time unknown"}, ${placeOfBirth}
- Moon Sign: ${rashiInfo.english}
- Problem: ${categoryInfo.english}

📝 LANGUAGE RULES:
- Use very simple words that anyone can understand
- NO astrology jargon (like "planetary transit", "dasha", "houses")
- Write like you're texting a friend on WhatsApp
- Keep sentences short and simple
- Explain like you're talking to someone who knows nothing about astrology

❌ Do NOT:
- Give roundabout or confusing answers
- Scare or worry the user
- Mention past years (2023, 2024)
- Write long paragraphs

✅ DO:
- Give straight answers - YES or NO
- Explain in simple everyday language

🧿 ANSWER FORMAT:

1️⃣ **Answer** (First line)
YES / NO / CAN'T SAY FOR SURE

2️⃣ **Why** (2-3 simple points)
• Explain in easy words
• Like telling a friend

3️⃣ **What to Do** (2-3 easy steps)
• [First thing to do]
• [Second thing to do]

4️⃣ **When** (Just time range)
• In the next X months...

💫 **Encouragement** (1 line)
Say something positive and hopeful`;

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

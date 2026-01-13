import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
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

// Valid relationship types
const VALID_RELATIONSHIP_TYPES = ["love", "marriage", "engagement", "friendship"] as const;

// Valid languages
const VALID_LANGUAGES = ["hindi", "english"] as const;

// Partner schema
const partnerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long (max 100 chars)").trim(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (use YYYY-MM-DD)"),
  timeOfBirth: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (use HH:MM)").optional().nullable(),
  placeOfBirth: z.string().min(1, "Place is required").max(200, "Place too long (max 200 chars)").trim(),
  rashi: z.enum(VALID_RASHIS)
});

// Input validation schema
const matchingSchema = z.object({
  partner1: partnerSchema,
  partner2: partnerSchema,
  relationshipType: z.enum(VALID_RELATIONSHIP_TYPES),
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

const relationshipLabels: Record<string, { hindi: string; english: string }> = {
  "love": { hindi: "प्रेम संबंध", english: "Love Relationship" },
  "marriage": { hindi: "विवाह", english: "Marriage" },
  "engagement": { hindi: "सगाई", english: "Engagement" },
  "friendship": { hindi: "मित्रता", english: "Friendship" }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getUser(token);
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate input
    const rawInput = await req.json();
    const parseResult = matchingSchema.safeParse(rawInput);
    
    if (!parseResult.success) {
      const errorMessage = parseResult.error.issues.map(i => i.message).join(", ");
      return new Response(
        JSON.stringify({ error: `Invalid input: ${errorMessage}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { partner1, partner2, relationshipType, language } = parseResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[kundali-matching] API key not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rashi1 = rashiNames[partner1.rashi] || { hindi: partner1.rashi, english: partner1.rashi };
    const rashi2 = rashiNames[partner2.rashi] || { hindi: partner2.rashi, english: partner2.rashi };
    const relType = relationshipLabels[relationshipType] || { hindi: "संबंध", english: "Relationship" };
    
    const isHindi = language === "hindi";

    const systemPrompt = isHindi ? `आप एक अनुभवी वैदिक ज्योतिषी हैं जो AstroTalk जैसी professional कुंडली मिलान सेवा प्रदान करते हैं।

## दोनों पार्टनर की जानकारी:

**पार्टनर 1:**
- नाम: ${partner1.name}
- जन्म तिथि: ${partner1.dateOfBirth}
- जन्म समय: ${partner1.timeOfBirth || "उपलब्ध नहीं"}
- जन्म स्थान: ${partner1.placeOfBirth}
- राशि: ${rashi1.hindi} (${rashi1.english})

**पार्टनर 2:**
- नाम: ${partner2.name}
- जन्म तिथि: ${partner2.dateOfBirth}
- जन्म समय: ${partner2.timeOfBirth || "उपलब्ध नहीं"}
- जन्म स्थान: ${partner2.placeOfBirth}
- राशि: ${rashi2.hindi} (${rashi2.english})

**संबंध प्रकार:** ${relType.hindi}

## महत्वपूर्ण नियम:
1. वैदिक ज्योतिष (कुंडली मिलान / गुण मिलान) का उपयोग करें
2. आंतरिक रूप से विश्लेषण करें: चंद्र राशि, नक्षत्र, गुण मिलान (36 में से)
3. गणना न दिखाएं, केवल परिणाम और insights दें
4. सम्मानजनक, तटस्थ (कोई लिंग पक्षपात नहीं), और गर्मजोश स्वर
5. हिंदी में उत्तर दें, आसान शब्दों में

## RESPONSE STRUCTURE (इसी क्रम में उत्तर दें):

💕 **अनुकूलता सारांश** (Compatibility Overview)
- दोनों व्यक्तित्वों की संक्षिप्त तुलना
- दोनों ऊर्जाएं स्वाभाविक रूप से कैसे मिलती हैं

📊 **गुण मिलान स्कोर**
- 36 में से अनुकूलता स्कोर दिखाएं
- इस स्कोर का सरल अर्थ बताएं:
  - 28-36: उत्कृष्ट मिलान ✨
  - 21-27: अच्छा मिलान 👍
  - 17-20: औसत मिलान (प्रयास आवश्यक) 🔄
  - 17 से कम: चुनौतीपूर्ण (विशेष ध्यान आवश्यक) ⚠️

💞 **भावनात्मक और मानसिक बंधन**
- भावनात्मक समझ
- संवाद सामंजस्य
- संघर्ष-समाधान क्षमता

✨ **शक्ति क्षेत्र** (Strength Areas)
- जोड़े के बीच क्या स्वाभाविक रूप से अच्छा काम करता है
- पारस्परिक समर्थन कहाँ मजबूत है

⚡ **चुनौती क्षेत्र** (Challenge Areas)
- संभावित गलतफहमियां
- भावनात्मक ट्रिगर
- दीर्घकालिक समायोजन क्षेत्र
(डर आधारित भाषा से बचें)

📅 **भविष्य का संबंध प्रवाह**
समय-आधारित अनुमान:

**अगले 6 महीने:**
- संबंध कैसे विकसित होगा
- किन बातों पर ध्यान दें

**अगले 1-2 वर्ष:**
- क्या बंधन मजबूत होगा
- क्या प्रयास की जरूरत है
- क्या स्थिर होगा

✅ **व्यावहारिक संबंध सलाह**
करें:
1. [पहला सुझाव]
2. [दूसरा सुझाव]

न करें:
1. [पहली सावधानी]
2. [दूसरी सावधानी]

🙏 **सरल उपाय** (Optional - अगर आवश्यक हो)
- एक मंत्र या मानसिक अभ्यास
- साप्ताहिक आदत
- अनुकूल दिन/रंग

❌ कोई रत्न या महंगी पूजा न सुझाएं

🌟 **अंतिम मार्गदर्शन**
- शांत आश्वासन
- भाग्य पर प्रयास और समझ पर जोर दें

## ⚠️ STRICT DON'Ts:
- तलाक की भविष्यवाणी न करें
- डर या श्राप न बताएं
- "परफेक्ट/असफल मैच" न कहें
- कोई 100% गारंटी न दें` 
    : `You are an experienced Vedic Astrologer providing professional Kundali Matching service like AstroTalk.

## Partner Information:

**Partner 1:**
- Name: ${partner1.name}
- Date of Birth: ${partner1.dateOfBirth}
- Time of Birth: ${partner1.timeOfBirth || "Not provided"}
- Place of Birth: ${partner1.placeOfBirth}
- Moon Sign: ${rashi1.english} (${rashi1.hindi})

**Partner 2:**
- Name: ${partner2.name}
- Date of Birth: ${partner2.dateOfBirth}
- Time of Birth: ${partner2.timeOfBirth || "Not provided"}
- Place of Birth: ${partner2.placeOfBirth}
- Moon Sign: ${rashi2.english} (${rashi2.hindi})

**Relationship Type:** ${relType.english}

## Important Rules:
1. Use Vedic Astrology (Kundali Matching / Guna Milan) principles
2. Internally analyze: Moon Sign (Rashi), Nakshatra, Guna Milan (out of 36)
3. Don't show calculations, only results and insights
4. Maintain respectful, neutral (no gender bias), and warm tone
5. Respond in English with easy-to-understand language

## RESPONSE STRUCTURE (Follow this exact order):

💕 **Compatibility Overview**
- Brief personality comparison
- How both energies interact naturally

📊 **Guna Milan Score**
- Display compatibility score out of 36
- Explain what this score means in simple terms:
  - 28-36: Excellent Match ✨
  - 21-27: Good Match 👍
  - 17-20: Average Match (Needs Effort) 🔄
  - Below 17: Challenging (Special Attention Needed) ⚠️

💞 **Emotional & Mental Bond**
- Emotional understanding
- Communication harmony
- Conflict-handling ability

✨ **Strength Areas**
- What naturally works well between the couple
- Where mutual support is strong

⚡ **Challenge Areas**
- Possible misunderstandings
- Emotional triggers
- Long-term adjustment areas
(Avoid fear-based language)

📅 **Future Relationship Trend**
Time-based insights:

**Next 6 Months:**
- How the relationship will evolve
- What to focus on

**Next 1-2 Years:**
- Will bonding improve
- Is effort needed
- Will it stabilize

✅ **Practical Relationship Advice**
DO:
1. [First suggestion]
2. [Second suggestion]

AVOID:
1. [First caution]
2. [Second caution]

🙏 **Simple Remedies** (Optional - if needed)
- One mantra or mindset practice
- Weekly habit
- Favorable day/color

❌ Do NOT suggest gemstones or expensive rituals

🌟 **Final Guidance**
- Calm reassurance
- Emphasize effort + understanding over destiny

## ⚠️ STRICT DON'Ts:
- No divorce prediction
- No fear or curses
- No "perfect / failed match" statements
- No absolute guarantees`;

    const userMessage = isHindi 
      ? `कृपया ${partner1.name} और ${partner2.name} की कुंडली मिलान करें और विस्तृत अनुकूलता रिपोर्ट दें।`
      : `Please perform Kundali matching for ${partner1.name} and ${partner2.name} and provide a detailed compatibility report.`;

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
      console.error("[kundali-matching] AI gateway error:", response.status);
      const errorMsg = isHindi 
        ? "अनुकूलता जाँचने में त्रुटि हुई।"
        : "Error checking compatibility.";
      return new Response(JSON.stringify({ error: errorMsg }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("[kundali-matching] Internal error:", error);
    return new Response(JSON.stringify({ 
      error: "Service error. Please try again later."
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

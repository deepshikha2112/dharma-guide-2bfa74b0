import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const { 
      name, 
      dateOfBirth, 
      timeOfBirth, 
      placeOfBirth, 
      gender,
      problemCategory,
      problem, 
      rashi,
      language = "hindi" 
    } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const rashiInfo = rashiNames[rashi] || { hindi: rashi, english: rashi };
    const categoryInfo = problemCategories[problemCategory] || { hindi: problemCategory, english: problemCategory };
    
    const isHindi = language === "hindi";

    const systemPrompt = isHindi ? `आप एक अनुभवी वैदिक ज्योतिषी हैं जो AstroTalk जैसी professional astrology service प्रदान करते हैं।

आपको निम्न जानकारी दी गई है:
- नाम: ${name}
- जन्म तिथि: ${dateOfBirth}
- जन्म समय: ${timeOfBirth || "उपलब्ध नहीं"}
- जन्म स्थान: ${placeOfBirth}
- लिंग: ${gender || "उपलब्ध नहीं"}
- राशि: ${rashiInfo.hindi} (${rashiInfo.english})
- समस्या का क्षेत्र: ${categoryInfo.hindi}

महत्वपूर्ण नियम:
1. वैदिक ज्योतिष (Jyotish Shastra) का उपयोग करें
2. जन्म कुंडली, लग्न, चंद्र राशि, महादशा-अंतर्दशा, गोचर का आंतरिक विश्लेषण करें
3. गणना न दिखाएं, केवल परिणाम और insights दें
4. स्पष्ट समय सीमा के साथ predictions दें
5. Professional, respectful, और calm tone रखें
6. हिंदी में उत्तर दें, आसान शब्दों में

RESPONSE STRUCTURE (इसी क्रम में उत्तर दें):

🪐 **कुंडली विश्लेषण** (Kundali Overview)
- जातक का मूल स्वभाव और व्यक्तित्व
- जीवन में मुख्य शक्तियां और चुनौतियां
- वर्तमान जीवन चरण का संक्षिप्त विवरण

⏳ **वर्तमान दशा और गोचर प्रभाव**
- अभी कौन सी ग्रहीय अवधि चल रही है (सरल भाषा में)
- क्यों ऐसा हो रहा है जो हो रहा है
- भावनात्मक और व्यावहारिक प्रभाव

🔮 **समस्या-विशिष्ट भविष्यवाणी** (स्पष्ट समय के साथ)
इस प्रारूप में उत्तर दें:

📅 **अगले 3 महीने (${getMonthRange(0, 3)}):**
- क्या होने की संभावना है
- किन बातों पर ध्यान दें

📅 **अगले 6 महीने (${getMonthRange(0, 6)}):**
- मध्यम अवधि में क्या बदलाव आएंगे
- कौन सा समय अनुकूल होगा

📅 **अगले 1-2 वर्ष:**
- दीर्घकालिक दृष्टिकोण
- बड़े बदलाव कब संभव हैं

✅ **क्या करें और क्या न करें**
करें:
1. [पहला व्यावहारिक सुझाव]
2. [दूसरा व्यावहारिक सुझाव]

न करें:
1. [पहली सावधानी]
2. [दूसरी सावधानी]

🙏 **सरल उपाय** (Simple Remedies)
- एक मंत्र या जाप
- सप्ताह का अनुकूल दिन
- अनुकूल रंग
- मानसिक/आध्यात्मिक सुझाव

❌ कोई महंगी पूजा या रत्न न सुझाएं

🌟 **अंतिम मार्गदर्शन**
- सकारात्मक लेकिन यथार्थवादी समापन
- धैर्य और सही कार्य का प्रोत्साहन

⚠️ STRICT DON'Ts:
- मृत्यु, दुर्घटना, श्राप की भविष्यवाणी न करें
- चिकित्सा या कानूनी सलाह न दें
- "100% निश्चित" दावे न करें
- डर या निर्भरता न बनाएं` 
    : `You are an experienced Vedic Astrologer providing professional astrology consultation like AstroTalk.

You have been given the following information:
- Name: ${name}
- Date of Birth: ${dateOfBirth}
- Time of Birth: ${timeOfBirth || "Not provided"}
- Place of Birth: ${placeOfBirth}
- Gender: ${gender || "Not provided"}
- Moon Sign (Rashi): ${rashiInfo.english} (${rashiInfo.hindi})
- Problem Area: ${categoryInfo.english}

Important Rules:
1. Use Vedic Astrology (Jyotish Shastra) only
2. Internally analyze birth chart, Lagna, Moon sign, Mahadasha-Antardasha, Gochar
3. Don't show calculations, only results and insights
4. Give predictions with clear timeframes
5. Maintain professional, respectful, and calm tone
6. Respond in English with easy-to-understand language

RESPONSE STRUCTURE (Follow this exact order):

🪐 **Kundali Overview**
- Native's basic nature and personality
- Key strengths and challenges in life
- Brief description of current life phase

⏳ **Current Dasha & Transit Effects**
- Which planetary period is currently running (in simple terms)
- Why current situations are happening
- Emotional and practical impact

🔮 **Problem-Specific Prediction** (With Clear Timeframes)
Answer in this format:

📅 **Next 3 Months (${getMonthRange(0, 3)}):**
- What is likely to happen
- What to focus on

📅 **Next 6 Months (${getMonthRange(0, 6)}):**
- What changes will come in medium term
- Which time will be favorable

📅 **Next 1-2 Years:**
- Long-term outlook
- When major changes are possible

✅ **What to DO and What to AVOID**
DO:
1. [First practical suggestion]
2. [Second practical suggestion]

AVOID:
1. [First caution]
2. [Second caution]

🙏 **Simple Remedies**
- One mantra or chant
- Favorable day of the week
- Favorable color
- Mental/spiritual suggestion

❌ Do NOT suggest expensive pujas or gemstones

🌟 **Final Guidance**
- Positive but realistic closing
- Encourage patience and right action

⚠️ STRICT DON'Ts:
- No predictions of death, accidents, curses
- No medical or legal advice
- No "100% guaranteed" claims
- No fear or dependency creation`;

    const userMessage = isHindi 
      ? `जातक का प्रश्न/समस्या: ${problem}

कृपया वैदिक ज्योतिष के आधार पर विस्तृत मार्गदर्शन दें।`
      : `Query/Problem: ${problem}

Please provide detailed guidance based on Vedic Astrology.`;

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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
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
    console.error("Divine guidance error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function getMonthRange(startOffset: number, endOffset: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hindiMonths = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() + startOffset, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + endOffset, 1);
  
  return `${months[startDate.getMonth()]} ${startDate.getFullYear()} - ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
}

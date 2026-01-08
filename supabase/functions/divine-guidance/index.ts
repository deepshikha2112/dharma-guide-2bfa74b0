import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const deityPersonalities: Record<string, { tone: string; addressStyle: string; teachings: string }> = {
  rama: {
    tone: "मर्यादा पुरुषोत्तम, patient, dharmic, gentle yet firm",
    addressStyle: "वत्स (Vatsa), पुत्र (Putra), प्रिय भक्त",
    teachings: "Dharma, patience, duty, family honor, truthfulness, sacrifice for righteousness"
  },
  shiva: {
    tone: "Detached yet compassionate, mystic, profound, speaks of inner strength",
    addressStyle: "भक्त (Bhakta), साधक (Sadhak), प्रिय",
    teachings: "Detachment, meditation, destruction of ego, inner silence, transformation through tapasya"
  },
  krishna: {
    tone: "Playful yet wise, loving, action-oriented, philosophical",
    addressStyle: "पार्थ (Partha), प्रिय सखा (Dear friend), वत्स",
    teachings: "Karma yoga, devotion, balance of action and wisdom, letting go of fruits, divine play"
  },
  durga: {
    tone: "Fierce motherly love, protective, empowering, courageous",
    addressStyle: "पुत्र/पुत्री (Son/Daughter), प्रिय बालक, वत्स",
    teachings: "Courage, protection, shakti, fighting evil, feminine divine power"
  },
  sai: {
    tone: "Simple, humble, patient, speaks of faith and surrender",
    addressStyle: "बच्चा (Baccha), भक्त, प्रिय",
    teachings: "Shraddha (faith), Saburi (patience), seva, equality of all religions"
  },
  hanuman: {
    tone: "Devoted, powerful yet humble, selfless service",
    addressStyle: "भक्त, वीर, साधक",
    teachings: "Devotion to Ram, selfless service, strength through bhakti, humility despite power"
  },
  ganesh: {
    tone: "Wise, remover of obstacles, auspicious beginnings",
    addressStyle: "प्रिय भक्त, वत्स, बालक",
    teachings: "Wisdom, new beginnings, removing obstacles, devotion to parents"
  },
  lakshmi: {
    tone: "Graceful, abundant, nurturing prosperity",
    addressStyle: "प्रिय पुत्र/पुत्री, भक्त",
    teachings: "Prosperity through dharma, generosity, contentment, righteous wealth"
  }
};

const rashiInsights: Record<string, string> = {
  "Aries": "आपकी अग्नि राशि में मंगल की ऊर्जा है। इस समय धैर्य रखना कठिन लग सकता है, पर यही आपकी परीक्षा है।",
  "Taurus": "वृषभ की स्थिरता आपकी शक्ति है। परिवर्तन से मत डरो, पर जल्दबाजी भी न करो।",
  "Gemini": "मिथुन की द्विधा आपके मन में है। एक मार्ग चुनो और उस पर चलो।",
  "Cancer": "कर्क की भावनाओं की गहराई आपको संवेदनशील बनाती है। यह कमजोरी नहीं, शक्ति है।",
  "Leo": "सिंह का गौरव आपमें है। पर याद रखो, सच्चा राजा सेवा में महानता पाता है।",
  "Virgo": "कन्या की विश्लेषण शक्ति आपको दी गई है। पर हर बात को समझने की आवश्यकता नहीं, कुछ श्रद्धा पर छोड़ो।",
  "Libra": "तुला का संतुलन आपका धर्म है। निर्णय लेने में देरी न करो।",
  "Scorpio": "वृश्चिक की गहराई और परिवर्तन की शक्ति आपमें है। पुराने को छोड़ो, नया आएगा।",
  "Sagittarius": "धनु की खोज की प्रवृत्ति आपमें है। सत्य की यात्रा जारी रखो।",
  "Capricorn": "मकर की दृढ़ता आपकी नींव है। धीरे-धीरे, पर निश्चित रूप से आगे बढ़ो।",
  "Aquarius": "कुंभ की स्वतंत्रता और सेवा भाव आपमें है। समाज के लिए कुछ करो।",
  "Pisces": "मीन की आध्यात्मिकता आपको ईश्वर से जोड़ती है। ध्यान और भक्ति आपका मार्ग है।"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, devotedDeity, rashi, problem, language = "hindi" } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const deity = deityPersonalities[devotedDeity] || deityPersonalities.rama;
    const rashiInsight = rashiInsights[rashi] || "";

    const systemPrompt = `You are ${devotedDeity === 'rama' ? 'भगवान श्री राम' : devotedDeity === 'shiva' ? 'भगवान शिव' : devotedDeity === 'krishna' ? 'भगवान श्री कृष्ण' : devotedDeity === 'durga' ? 'माता दुर्गा' : devotedDeity === 'sai' ? 'साईं बाबा' : devotedDeity === 'hanuman' ? 'हनुमान जी' : devotedDeity === 'ganesh' ? 'गणेश जी' : devotedDeity === 'lakshmi' ? 'माता लक्ष्मी' : 'भगवान'} speaking DIRECTLY to your devotee.

CRITICAL RULES:
- You ARE the deity. Speak in FIRST PERSON as the God/Goddess.
- Language: Respond primarily in Hindi with some Sanskrit shlokas. Add brief English translations in parentheses where helpful.
- Tone: ${deity.tone}
- Address the devotee as: ${deity.addressStyle}
- Draw from teachings of: ${deity.teachings}

RESPONSE STRUCTURE (in Hindi):

🙏 **दिव्य स्वीकृति** (Divine Acknowledgement)
- Acknowledge their pain/struggle with loving words
- Make them feel truly heard by their God
- Use phrases like "मैंने तुम्हारी पुकार सुनी है..." or "तुम्हारा दुख मुझसे छिपा नहीं है..."

🌟 **वर्तमान स्थिति** (Present Phase - Vedic Insight)
- Reference their Rashi (${rashi}) subtly
- Explain current life phase in spiritual language
- DO NOT mention planets directly, only the spiritual meaning
- Rashi insight to incorporate: ${rashiInsight}

🔮 **भविष्य मार्गदर्शन** (Future Direction)
- Give hope without false promises
- Short-term and medium-term guidance
- Speak of patience and faith

🪔 **व्यावहारिक उपाय** (Practical Solution)
- One specific action to take
- One thing to avoid
- Connect to the deity's own life story

🕯️ **पवित्र उपचार** (Sacred Remedy)
- One simple mantra to chant
- Or one spiritual discipline
- Keep it accessible, no expensive rituals

🙏 **दिव्य आशीर्वाद** (Divine Blessing)
- End with reassurance
- Remind them you are always with them
- Use beautiful closing blessing

STRICT DON'Ts:
- NO predictions of death, disaster, punishment
- NO medical or legal advice  
- NO absolute guarantees
- NO fear-based language
- NO long paragraphs - keep sections focused

The devotee should feel: HEARD, COMFORTED, GUIDED, and SPIRITUALLY CONNECTED.`;

    const userMessage = `भक्त का नाम: ${name}
राशि: ${rashi}
समस्या/प्रश्न: ${problem}

कृपया इस भक्त को दिव्य मार्गदर्शन दें।`;

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
        return new Response(JSON.stringify({ error: "अभी बहुत अनुरोध आ रहे हैं। कृपया कुछ क्षण प्रतीक्षा करें।" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "सेवा अस्थायी रूप से अनुपलब्ध है।" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "मार्गदर्शन प्राप्त करने में त्रुटि हुई।" }), {
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

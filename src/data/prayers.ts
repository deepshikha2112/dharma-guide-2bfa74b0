export interface Prayer {
  id: string;
  deityId: string;
  name: string;
  sanskrit?: string;
  text: string;
  meaning?: string;
  type: 'aarti' | 'chalisa' | 'stotram' | 'prayer';
}

export const prayers: Prayer[] = [
  // Ganesha Prayers
  {
    id: "ganesh-aarti",
    deityId: "ganesha",
    name: "Jai Ganesh Deva",
    sanskrit: "जय गणेश देवा",
    type: "aarti",
    text: `जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥

एक दन्त दयावन्त, चार भुजा धारी।
माथे पर तिलक सोहे, मूसे की सवारी॥

पान चढ़े, फूल चढ़े, और चढ़े मेवा।
लड्डुअन का भोग लगे, संत करें सेवा॥

जय गणेश, जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा॥`,
    meaning: "Victory to Lord Ganesha! His mother is Parvati and father is Mahadeva (Shiva). He has one tusk, is compassionate, and has four arms. A tilak adorns his forehead, and the mouse is his vehicle."
  },
  {
    id: "ganesh-vandana",
    deityId: "ganesha",
    name: "Ganesh Vandana",
    sanskrit: "गणेश वंदना",
    type: "prayer",
    text: `वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥

शुक्लाम्बरधरं देवं शशिवर्णं चतुर्भुजम्।
प्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥`,
    meaning: "O Lord with curved trunk and massive body, with the brilliance of a million suns, please remove all obstacles from my endeavors always."
  },
  
  // Shiva Prayers
  {
    id: "shiv-aarti",
    deityId: "shiva",
    name: "Om Jai Shiv Omkara",
    sanskrit: "ॐ जय शिव ओमकारा",
    type: "aarti",
    text: `ॐ जय शिव ओमकारा, स्वामी जय शिव ओमकारा।
ब्रह्मा विष्णु सदाशिव, अर्धांगी धारा॥

एकानन चतुरानन पंचानन राजे।
हंसासन गरुड़ासन वृषवाहन साजे॥

दो भुज चार चतुर्भुज दसभुज अति सोहे।
त्रिगुण रूप निरखते त्रिभुवन जन मोहे॥

ॐ जय शिव ओमकारा, स्वामी जय शिव ओमकारा॥`,
    meaning: "Victory to Lord Shiva, the cosmic Om! Brahma, Vishnu, and Sadashiva together, he holds his consort Parvati as half of himself."
  },
  {
    id: "shiv-chalisa",
    deityId: "shiva",
    name: "Shiv Chalisa (Excerpt)",
    sanskrit: "शिव चालीसा",
    type: "chalisa",
    text: `दोहा:
जय गणेश गिरिजा सुवन, मंगल मूल सुजान।
कहत अयोध्यादास तुम, देहु अभय वरदान॥

चौपाई:
जय गिरिजापति दीनदयाला। सदा करत संतन प्रतिपाला॥
भाल चंद्रमा सोहत नीके। कानन कुंडल नागफनी के॥

अंग गौर शिर गंग बहाये। मुंडमाल तन क्षार लगाये॥
वस्त्र खाल बाघम्बर सोहे। छवि को देख नाग मन मोहे॥`,
    meaning: "Victory to the Lord of Parvati, compassionate to the humble. He always protects the saints. The moon adorns his forehead beautifully, with serpent earrings."
  },

  // Durga Prayers
  {
    id: "durga-aarti",
    deityId: "durga",
    name: "Durge Durgat Bhari",
    sanskrit: "दुर्गे दुर्घट भारी",
    type: "aarti",
    text: `दुर्गे दुर्घट भारी, तुम्हीं निवारण हारी।
अमृप शुभ करनी, तव पद रिझावैं।।

ब्रह्माणी, रुद्राणी, कमला, तू ही है जग दाता।
सूर्य-चंद्रमा ध्यावत, नारद ऋषि गाता॥

त्रिगुण स्वरूपिणी, शक्ति सम्पन्न।
तुम्हीं नित्य पूजैं, हर-विधि रचैं॥

जय अम्बे गौरी, मैया जय श्यामा गौरी॥`,
    meaning: "O Mother Durga, you remove the most difficult obstacles. Brahma's consort, Rudra's consort, Lakshmi - you are the giver of the world."
  },
  
  // Hanuman Prayers
  {
    id: "hanuman-aarti",
    deityId: "hanuman",
    name: "Aarti Keeje Hanuman",
    sanskrit: "आरती कीजै हनुमान",
    type: "aarti",
    text: `आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर कांपै।
रोग-दोष जाके निकट न झांके॥

अंजनी पुत्र महा बलदाई।
संतन के प्रभु सदा सहाई॥

दे बीरा रघुनाथ पठाई।
लंका जारी सिया सुध लाई॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥`,
    meaning: "Perform the aarti of Hanuman, the one who destroys evil with Lord Rama's grace. Mountains tremble at his strength, diseases dare not approach him."
  },
  {
    id: "hanuman-chalisa",
    deityId: "hanuman",
    name: "Hanuman Chalisa (Excerpt)",
    sanskrit: "हनुमान चालीसा",
    type: "chalisa",
    text: `दोहा:
श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।
बरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥

चौपाई:
जय हनुमान ज्ञान गुन सागर।
जय कपीस तिहुँ लोक उजागर॥

राम दूत अतुलित बल धामा।
अंजनि पुत्र पवनसुत नामा॥

महाबीर बिक्रम बजरंगी।
कुमति निवार सुमति के संगी॥`,
    meaning: "Victory to Hanuman, ocean of wisdom and virtues. Victory to the Lord of monkeys, who illuminates the three worlds. Messenger of Rama, repository of immeasurable strength."
  },
  
  // Lakshmi Prayers
  {
    id: "lakshmi-aarti",
    deityId: "lakshmi",
    name: "Om Jai Lakshmi Mata",
    sanskrit: "ॐ जय लक्ष्मी माता",
    type: "aarti",
    text: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।
तुमको निशिदिन सेवत, हर विष्णु विधाता॥

उमा, रमा, ब्रह्माणी, तुम ही जग-माता।
सूर्य-चंद्रमा ध्यावत, नारद ऋषि गाता॥

दुर्गा रूप निरंजनी, सुख संपत्ति दाता।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥

तुम पाताल-निवासिनि, तुम ही शुभ दाता।
कर्म-प्रभाव-प्रकाशिनि, भवनिधि की त्राता॥`,
    meaning: "Victory to Mother Lakshmi! Shiva, Vishnu, and Brahma serve you day and night. Uma, Rama, Brahma's consort - you are the mother of the world."
  },
  
  // Rama Prayers
  {
    id: "ram-aarti",
    deityId: "rama",
    name: "Aarti Shri Ramchandra Ji",
    sanskrit: "आरती श्री रामचन्द्र जी",
    type: "aarti",
    text: `आरती श्री रामचन्द्र जी की। कीजै।
पाप कटे दुख मिटे लेखे करम की॥

शरणागत को तारन। मंगल भय भंजन॥
श्री रघुनाथ अर्चना। भाव भक्ति करणा॥

आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जय रामचंद्र, जय रामचंद्र, जय जय रामचंद्र।
जय सियाराम, जय जय सियाराम॥`,
    meaning: "Perform the aarti of Lord Ramchandra. Sins are cut, sorrows removed, karmic accounts cleansed. He saves those who take refuge in him."
  },
  
  // Krishna Prayers
  {
    id: "krishna-aarti",
    deityId: "krishna",
    name: "Aarti Kunj Bihari Ki",
    sanskrit: "आरती कुञ्ज बिहारी की",
    type: "aarti",
    text: `आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥

गले में बैजंती माला, बजावे मुरली मधुर बाला।
श्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला॥

गगन सम अंग कांति काली, राधिका चमक रही आली।
लतन में ठाढ़े बनमाली, भ्रमर सी अलक रेखा भाली॥

कनकमय मोर मुकुट बिलसे, देवता दर्शन को तरसे।
गगन सों सुमन रासी बरसे, बजे मुरचंग मधुर मिर्दंग॥

आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥`,
    meaning: "Aarti of the one who wanders in the groves, Shri Giridhar Krishna Murari. He wears a Vaijayanti garland, plays the sweet flute, earrings sparkle in his ears - the beloved son of Nanda."
  },
  
  // Sai Baba Prayers
  {
    id: "sai-aarti",
    deityId: "saibaba",
    name: "Sai Baba Aarti",
    sanskrit: "साईबाबा आरती",
    type: "aarti",
    text: `आरती साईबाबा, सौख्यदातार साईबाबा।
जय मनी जागवया, अनाथांचा नाथ॥

जालुनियां आनंगा, स्वस्वरूपी राहे दंगा।
मुमुक्षूजनां दावी, निजडोळा श्रीरंगा॥

जय देव, जय देव, दत्ता अवधूता।
जोडुनियां करद्वय, साष्टांग प्रणतू॥

श्रद्धा सबुरी दाखवी, बाबांनी निज सेवकां।
सर्व दुःख हारी, भक्तां जे आलय बाबांचा॥`,
    meaning: "Aarti of Sai Baba, giver of happiness. Lord of the orphaned, he burns the ego and remains in true self. He shows devotees the path with Shraddha (faith) and Saburi (patience)."
  },
  
  // Guru Nanak Prayers
  {
    id: "nanak-aarti",
    deityId: "gurunanak",
    name: "Aarti (Gagan Mein Thaal)",
    sanskrit: "गगन में थाल",
    type: "aarti",
    text: `गगन में थाल रवि चंद दीपक बने,
तारिका मंडल जनक मोती।
धूप मलयानलो पवन चवरो करे,
सगल बनराय फूलंत जोती॥

कैसी आरती होय, भव खंडना तेरी आरती।
अनहद शब्द वाजंत भेरी॥

सहस तव नैन नन नैन हें तोहि कौ,
सहस मूरत नना एक तोही।
सहस पद बिमल नन एक पद गंध बिन,
सहस तव गंध इव चलत मोही॥`,
    meaning: "The sky is the platter, the sun and moon are lamps, the stars are pearls. The sandalwood breeze is incense, the wind is the fan, and all vegetation offers flowers of light."
  },
  
  // Vishnu Prayers
  {
    id: "vishnu-aarti",
    deityId: "vishnu",
    name: "Om Jai Jagdish Hare",
    sanskrit: "ॐ जय जगदीश हरे",
    type: "aarti",
    text: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।
भक्त जनों के संकट, दास जनों के संकट।
क्षण में दूर करे॥

जो ध्यावे फल पावे, दुख बिनसे मन का।
सुख संपत्ति घर आवे, कष्ट मिटे तन का॥

मात पिता तुम मेरे, शरण गहूं किसकी।
तुम बिन और न दूजा, आस करूं जिसकी॥

तुम पूरण परमात्मा, तुम अंतर्यामी।
पारब्रह्म परमेश्वर, तुम सब के स्वामी॥

ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे॥`,
    meaning: "Victory to the Lord of the Universe! You remove the troubles of your devotees in an instant. Those who meditate on you receive blessings, sorrows of the mind vanish."
  },
  
  // Murugan Prayers
  {
    id: "murugan-aarti",
    deityId: "murugan",
    name: "Vel Muruga",
    sanskrit: "वेल् मुरुगा",
    type: "aarti",
    text: `वेल् वेल् मुरुगा, वेल् वेल् मुरुगा।
वेलायुतम् सरवणभवा॥

शक्ति वेल् विडुत्तवनै,
शण्मुखा शरवणभवा।
कार्तिकेय कुमारा,
कडम्ब वन प्रिया॥

सुब्रह्मण्य स्वामिये,
सुन्दर वदनाये।
वल्लि देवसेना संगम,
वीर बाहुके॥

वेल् वेल् मुरुगा, वेल् वेल् मुरुगा॥`,
    meaning: "Vel Vel Muruga! He who wields the divine spear (Vel). Shanmukha (six-faced), born from Sharavana. Kartikeya, the youthful one, beloved of Kadamba groves."
  }
];

export const getPrayersByDeityId = (deityId: string): Prayer[] => {
  return prayers.filter(prayer => prayer.deityId === deityId);
};

export const getPrayerById = (id: string): Prayer | undefined => {
  return prayers.find(prayer => prayer.id === id);
};

export interface DeityMantra {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  mantra: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
    audioUrl?: string; // URL to pre-recorded mantra audio
  };
  aarti: {
    title: string;
    titleHindi: string;
    lyrics: string;
    lyricsHindi: string;
    audioUrl?: string; // URL to pre-recorded aarti audio
  };
}

// Storage bucket base URL for audio files
export const AUDIO_BUCKET_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/devotional-audio`;

// Helper to get audio URL from bucket
export const getAudioUrl = (deityId: string, type: 'mantra' | 'aarti'): string => {
  return `${AUDIO_BUCKET_URL}/${deityId}/${type}.mp3`;
};

export const sacredMantras: DeityMantra[] = [
  {
    id: "ganesha",
    name: "Lord Ganesha",
    nameHindi: "श्री गणेश",
    image: "/src/assets/deities/ganesha.jpg",
    mantra: {
      sanskrit: "ॐ गं गणपतये नमः",
      transliteration: "Om Gam Ganapataye Namaha",
      meaning: "I bow to the Lord of all beings, the remover of obstacles"
    },
    aarti: {
      title: "Jai Ganesh Deva",
      titleHindi: "जय गणेश देवा",
      lyrics: "Jai Ganesh, Jai Ganesh, Jai Ganesh Deva. Mata Jaki Parvati, Pita Mahadeva. Ek dant dayavant, char bhuja dhari. Mathe par tilak sohe, muse ki sawari. Andhan ko aankh det, kodhin ko kaya. Banjhan ko putra det, nirdhan ko maya. Haar chadhey, phool chadhey, aur chadhey mewa. Ladduan ka bhog lage, sant kare seva.",
      lyricsHindi: "जय गणेश जय गणेश जय गणेश देवा। माता जाकी पार्वती पिता महादेवा। एक दंत दयावंत चार भुजा धारी। माथे पर तिलक सोहे मूसे की सवारी। अंधन को आँख देत कोढ़िन को काया। बांझन को पुत्र देत निर्धन को माया। हार चढ़े फूल चढ़े और चढ़े मेवा। लड्डुअन का भोग लगे संत करें सेवा।"
    }
  },
  {
    id: "shiva",
    name: "Lord Shiva",
    nameHindi: "भगवान शिव",
    image: "/src/assets/deities/shiva.jpg",
    mantra: {
      sanskrit: "ॐ नमः शिवाय",
      transliteration: "Om Namah Shivaya",
      meaning: "I bow to Lord Shiva, the auspicious one"
    },
    aarti: {
      title: "Om Jai Shiv Omkara",
      titleHindi: "ॐ जय शिव ओमकारा",
      lyrics: "Om Jai Shiv Omkara, Swami Jai Shiv Omkara. Brahma Vishnu Sadashiv, Arddhangee Dhara. Om Jai Shiv Omkara. Ekanan Chaturanan Panchanan Raje. Hansanan Garudasan Vrishvahan Saje. Om Jai Shiv Omkara. Do Bhuj Char Chaturbhuj Dash Bhuj Ati Sohe. Teeno Roop Nirakhta Tribhuvan Jan Mohe. Om Jai Shiv Omkara.",
      lyricsHindi: "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा। ब्रह्मा विष्णु सदाशिव अर्द्धांगी धारा। ॐ जय शिव ओंकारा। एकानन चतुरानन पंचानन राजे। हंसासन गरुड़ासन वृषवाहन साजे। ॐ जय शिव ओंकारा। दो भुज चार चतुर्भुज दसभुज अति सोहे। तीनों रूप निरखता त्रिभुवन जन मोहे। ॐ जय शिव ओंकारा।"
    }
  },
  {
    id: "vishnu",
    name: "Lord Vishnu",
    nameHindi: "भगवान विष्णु",
    image: "/src/assets/deities/vishnu.jpg",
    mantra: {
      sanskrit: "ॐ नमो भगवते वासुदेवाय",
      transliteration: "Om Namo Bhagavate Vasudevaya",
      meaning: "I bow to Lord Vasudeva, the Supreme Being"
    },
    aarti: {
      title: "Om Jai Jagdish Hare",
      titleHindi: "ॐ जय जगदीश हरे",
      lyrics: "Om Jai Jagdish Hare, Swami Jai Jagdish Hare. Bhakt Jano Ke Sankat, Daas Jano Ke Sankat, Kshan Mein Door Kare. Om Jai Jagdish Hare. Jo Dhyave Phal Paave, Dukh Binse Mann Ka, Swami Dukh Binse Mann Ka. Sukh Sampati Ghar Aave, Kasht Mite Tan Ka. Om Jai Jagdish Hare.",
      lyricsHindi: "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे। भक्त जनों के संकट, दास जनों के संकट, क्षण में दूर करे। ॐ जय जगदीश हरे। जो ध्यावे फल पावे, दुख बिनसे मन का, स्वामी दुख बिनसे मन का। सुख संपत्ति घर आवे, कष्ट मिटे तन का। ॐ जय जगदीश हरे।"
    }
  },
  {
    id: "krishna",
    name: "Lord Krishna",
    nameHindi: "भगवान कृष्ण",
    image: "/src/assets/deities/krishna.jpg",
    mantra: {
      sanskrit: "ॐ क्लीं कृष्णाय नमः",
      transliteration: "Om Kleem Krishnaya Namaha",
      meaning: "I bow to Lord Krishna, the all-attractive one"
    },
    aarti: {
      title: "Aarti Kunj Bihari Ki",
      titleHindi: "आरती कुंजबिहारी की",
      lyrics: "Aarti Kunj Bihari Ki, Shri Girdhar Krishna Murari Ki. Aarti Kunj Bihari Ki. Gale Mein Baijanti Mala, Bajave Murali Madhur Bala. Shravan Mein Kundal Jhala Jhala, Nand Ke Anand Nandlala. Aarti Kunj Bihari Ki. Kanak Saman Kalevar, Raas Kasturi Tilak Diye Bhar. Braj Ke Nand Yashoda Var, Nand Ke Anand Nandlala. Aarti Kunj Bihari Ki.",
      lyricsHindi: "आरती कुंजबिहारी की, श्री गिरधर कृष्ण मुरारी की। आरती कुंजबिहारी की। गले में बैजंती माला, बजावे मुरली मधुर बाला। श्रवण में कुंडल झाला झाला, नंद के आनंद नंदलाला। आरती कुंजबिहारी की। कनक समान कलेवर, रास कस्तूरी तिलक दिए भर। ब्रज के नंद यशोदा वर, नंद के आनंद नंदलाला। आरती कुंजबिहारी की।"
    }
  },
  {
    id: "rama",
    name: "Lord Rama",
    nameHindi: "भगवान राम",
    image: "/src/assets/deities/rama.jpg",
    mantra: {
      sanskrit: "ॐ श्री रामाय नमः",
      transliteration: "Om Shri Ramaya Namaha",
      meaning: "I bow to Lord Rama, the embodiment of righteousness"
    },
    aarti: {
      title: "Aarti Shri Ramayan Ji Ki",
      titleHindi: "आरती श्री रामायण जी की",
      lyrics: "Aarti Shri Ramayan Ji Ki, Kirthi Kali Maldal Haran Ki. Aarti Shri Ramayan Ji Ki. Gaavanat Brahmaadi Muni Narada, Sharada Sahit Aheesha. Aarti Shri Ramayan Ji Ki. Gaavanat Ved Puran Ashtdas, Chowbees Jahin Rishi. Aarti Shri Ramayan Ji Ki.",
      lyricsHindi: "आरती श्री रामायण जी की, कीर्ति कलि मल दल हरण की। आरती श्री रामायण जी की। गावत ब्रह्मादि मुनि नारद, शारदा सहित अहीश। आरती श्री रामायण जी की। गावत वेद पुराण अष्टदश, चौबीस जहिं ऋषि। आरती श्री रामायण जी की।"
    }
  },
  {
    id: "hanuman",
    name: "Hanuman Ji",
    nameHindi: "हनुमान जी",
    image: "/src/assets/deities/hanuman.jpg",
    mantra: {
      sanskrit: "ॐ हं हनुमते नमः",
      transliteration: "Om Ham Hanumate Namaha",
      meaning: "I bow to Lord Hanuman, the devoted servant of Lord Rama"
    },
    aarti: {
      title: "Aarti Keeje Hanuman Lala Ki",
      titleHindi: "आरती कीजै हनुमान लला की",
      lyrics: "Aarti Keeje Hanuman Lala Ki, Dusht Dalan Raghunath Kala Ki. Aarti Keeje Hanuman Lala Ki. Jake Bal Se Girivar Kaape, Rog Dosh Jake Nikat Na Jhanke. Anjani Putra Maha Baldayi, Santan Ke Prabhu Sada Sahayi. Aarti Keeje Hanuman Lala Ki.",
      lyricsHindi: "आरती कीजै हनुमान लला की, दुष्ट दलन रघुनाथ कला की। आरती कीजै हनुमान लला की। जाके बल से गिरिवर कांपे, रोग दोष जाके निकट न झांके। अंजनी पुत्र महा बलदायी, संतन के प्रभु सदा सहायी। आरती कीजै हनुमान लला की।"
    }
  },
  {
    id: "durga",
    name: "Maa Durga",
    nameHindi: "माँ दुर्गा",
    image: "/src/assets/deities/durga.jpg",
    mantra: {
      sanskrit: "ॐ दुं दुर्गायै नमः",
      transliteration: "Om Dum Durgayei Namaha",
      meaning: "I bow to Goddess Durga, the invincible one"
    },
    aarti: {
      title: "Jai Ambe Gauri",
      titleHindi: "जय अम्बे गौरी",
      lyrics: "Jai Ambe Gauri, Maiya Jai Shyama Gauri. Tumko Nishdin Dhyavat, Hari Brahma Shivji. Jai Ambe Gauri. Maang Sindur Birajat, Tiko Mrigmad Ko. Ujjwal Se Do Naina, Chandravadan Niko. Jai Ambe Gauri. Kanak Saman Kalevar, Raktambar Raje. Raktapushp Gal Mala, Kanthan Par Saje. Jai Ambe Gauri.",
      lyricsHindi: "जय अम्बे गौरी, मैया जय श्यामा गौरी। तुमको निशदिन ध्यावत, हरि ब्रह्मा शिवजी। जय अम्बे गौरी। मांग सिंदूर बिराजत, टीको मृगमद को। उज्ज्वल से दो नैना, चंद्रवदन नीको। जय अम्बे गौरी। कनक समान कलेवर, रक्ताम्बर राजे। रक्तपुष्प गल माला, कंठन पर साजे। जय अम्बे गौरी।"
    }
  },
  {
    id: "lakshmi",
    name: "Maa Lakshmi",
    nameHindi: "माँ लक्ष्मी",
    image: "/src/assets/deities/lakshmi.jpg",
    mantra: {
      sanskrit: "ॐ श्रीं महालक्ष्म्यै नमः",
      transliteration: "Om Shreem Mahalakshmyai Namaha",
      meaning: "I bow to Goddess Lakshmi, the bestower of wealth and prosperity"
    },
    aarti: {
      title: "Om Jai Lakshmi Mata",
      titleHindi: "ॐ जय लक्ष्मी माता",
      lyrics: "Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata. Tumko Nishdin Sevat, Hari Vishnu Dhata. Om Jai Lakshmi Mata. Uma Rama Brahmani, Tum Hi Jag Mata. Surya Chandrama Dhyavat, Narad Rishi Gata. Om Jai Lakshmi Mata. Durga Roop Niranjani, Sukh Sampati Data. Jo Koi Tumko Dhyavat, Riddhi Siddhi Dhan Pata. Om Jai Lakshmi Mata.",
      lyricsHindi: "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता। तुमको निशदिन सेवत, हरि विष्णु धाता। ॐ जय लक्ष्मी माता। उमा रमा ब्रह्माणी, तुम ही जग माता। सूर्य चंद्रमा ध्यावत, नारद ऋषि गाता। ॐ जय लक्ष्मी माता। दुर्गा रूप निरंजनी, सुख संपत्ति दाता। जो कोई तुमको ध्यावत, ऋद्धि सिद्धि धन पाता। ॐ जय लक्ष्मी माता।"
    }
  },
  {
    id: "saraswati",
    name: "Maa Saraswati",
    nameHindi: "माँ सरस्वती",
    image: "/src/assets/deities/saraswati.jpg",
    mantra: {
      sanskrit: "ॐ ऐं सरस्वत्यै नमः",
      transliteration: "Om Aim Saraswatyai Namaha",
      meaning: "I bow to Goddess Saraswati, the bestower of knowledge and wisdom"
    },
    aarti: {
      title: "Jai Saraswati Mata",
      titleHindi: "जय सरस्वती माता",
      lyrics: "Jai Saraswati Mata, Maiya Jai Saraswati Mata. Sadguna Vaibhav Shaalin, Tribhuvan Vikhyaata. Jai Saraswati Mata. Chandra Vadaniya Nayan Virajat, Nashika Kamala Suhata. Jai Saraswati Mata. Veenapustak Shobhit Kar, Hansavarini Mata. Jai Saraswati Mata.",
      lyricsHindi: "जय सरस्वती माता, मैया जय सरस्वती माता। सद्गुण वैभव शालिन, त्रिभुवन विख्याता। जय सरस्वती माता। चंद्र वदनीया नयन विराजत, नासिका कमल सुहाता। जय सरस्वती माता। वीणा पुस्तक शोभित कर, हंसावारिणी माता। जय सरस्वती माता।"
    }
  },
  {
    id: "saibaba",
    name: "Sai Baba",
    nameHindi: "साईं बाबा",
    image: "/src/assets/deities/saibaba.jpg",
    mantra: {
      sanskrit: "ॐ साईं नाथाय नमः",
      transliteration: "Om Sai Nathaya Namaha",
      meaning: "I bow to Sai Baba, the divine master"
    },
    aarti: {
      title: "Aarti Sai Baba",
      titleHindi: "आरती साईं बाबा",
      lyrics: "Aarti Sai Baba, Saukhyadatara Jeeva. Charana Rajatali, Dyava Dasa Visawa. Aarti Sai Baba. Jaaluniya Aanang, Swaswarupee Rahe Dang. Mumukshu Janaan Daavi, Nija Dola Shri Rang. Aarti Sai Baba. Jaya Mani Jaisa Bhava, Taya Taisa Anubhava. Davisi Dayagahana, Aisi Tuzi He Mava. Aarti Sai Baba.",
      lyricsHindi: "आरती साईं बाबा, सौख्यदातारा जीवा। चरण रजातली, द्यावा दास विसावा। आरती साईं बाबा। जालुनिया आनंग, स्वस्वरूपी रहे डंग। मुमुक्षू जनां दावी, निज डोळा श्री रंग। आरती साईं बाबा। जया मनी जैसा भाव, तया तैसा अनुभव। दाविसी दयाघना, ऐसी तुझी हे माव। आरती साईं बाबा।"
    }
  },
  {
    id: "murugan",
    name: "Lord Murugan",
    nameHindi: "भगवान मुरुगन",
    image: "/src/assets/deities/murugan.jpg",
    mantra: {
      sanskrit: "ॐ सरवणभवाय नमः",
      transliteration: "Om Saravanabhavaya Namaha",
      meaning: "I bow to Lord Murugan, born of the forest of reeds"
    },
    aarti: {
      title: "Aarti Kartikeya",
      titleHindi: "आरती कार्तिकेय",
      lyrics: "Jai Kartikeya Deva, Prabhu Jai Kartikeya Deva. Shan-Mukha Saravana Bhava, Shakti Suta Shubh Meva. Jai Kartikeya Deva. Mayura Vahana Sundara, Vel Dhari Veera. Tarakasura Samhari, Deva Senapati Dheera. Jai Kartikeya Deva.",
      lyricsHindi: "जय कार्तिकेय देवा, प्रभु जय कार्तिकेय देवा। षण्मुख सरवण भवा, शक्ति सुत शुभ मेवा। जय कार्तिकेय देवा। मयूर वाहन सुंदर, वेल धारी वीरा। तारकासुर संहारी, देव सेनापति धीरा। जय कार्तिकेय देवा।"
    }
  },
  {
    id: "gurunanak",
    name: "Guru Nanak Dev Ji",
    nameHindi: "गुरु नानक देव जी",
    image: "/src/assets/deities/gurunanak.jpg",
    mantra: {
      sanskrit: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ",
      transliteration: "Ik Onkar Satnam Karta Purakh",
      meaning: "There is one God, His name is Truth, He is the Creator"
    },
    aarti: {
      title: "Gagan Mein Thaal",
      titleHindi: "गगन में थाल",
      lyrics: "Gagan Mein Thaal Rav Chand Deepak Bane. Tarika Mandal Janak Moti. Dhoop Malyanlo Pavan Chavro Kare. Sagal Banrai Phoolant Jyoti. Kaisi Aarti Hoye Bhav Khandna Teri Aarti. Anhata Shabad Vajant Bheri.",
      lyricsHindi: "गगन में थाल रवि चंद दीपक बने। तारिका मंडल जनक मोती। धूप मलयानलो पवन चवरो करे। सगल बनराइ फूलंत ज्योति। कैसी आरती होए भव खंडना तेरी आरती। अनहता शबद वजंत भेरी।"
    }
  }
];

export const getDeityById = (id: string): DeityMantra | undefined => {
  return sacredMantras.find(deity => deity.id === id);
};

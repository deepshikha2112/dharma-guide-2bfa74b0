import { Chapter } from '@/components/ChapterAudioReader';
import { shivPuranChapters, ShivPuranChapter } from './shivPuranChapters';
import { lakshmiPuranChapters, LakshmiPuranChapter } from './lakshmiPuranChapters';
import { deviSaptashatiChapters, DeviSaptashatiChapter } from './deviSaptashatiChapters';

export interface DeityChapters {
  deityId: string;
  chapters: Chapter[];
}

// Convert Shiv Puran chapters to the Chapter format
const convertShivPuranChapters = (): Chapter[] => {
  return shivPuranChapters.map((chapter: ShivPuranChapter) => ({
    id: chapter.id,
    title: chapter.titleHindi,
    subtitle: `${chapter.khandHindi} - अध्याय ${chapter.chapterNumber}`,
    mood: chapter.mood,
    instrument: chapter.instrument,
    content: chapter.content,
  }));
};

const convertLakshmiPuranChapters = (): Chapter[] => {
  return lakshmiPuranChapters.map((chapter: LakshmiPuranChapter) => ({
    id: chapter.id,
    title: chapter.titleHindi || chapter.titleEnglish,
    subtitle: chapter.titleEnglish,
    mood: chapter.mood,
    instrument: chapter.instrument,
    content: chapter.content,
  }));
};

const convertDeviSaptashatiChapters = (): Chapter[] => {
  return deviSaptashatiChapters.map((chapter: DeviSaptashatiChapter) => ({
    id: chapter.id,
    title: chapter.titleHindi || chapter.titleEnglish,
    subtitle: chapter.titleEnglish,
    mood: chapter.mood,
    instrument: chapter.instrument,
    content: chapter.content,
  }));
};

export const deityChaptersData: DeityChapters[] = [
  {
    deityId: "ganesha",
    chapters: [
      {
        id: "g1",
        title: "The Divine Birth",
        subtitle: "How Lord Ganesha came into existence",
        mood: "divine",
        instrument: "om",
        content: `In the sacred abode of Mount Kailash, Goddess Parvati, the divine consort of Lord Shiva, wished for a loyal guardian. While Lord Shiva was away in deep meditation, Parvati created a boy from the sacred turmeric paste of her body.

She breathed life into the figure and named him Ganesha. She instructed him to guard the entrance and allow no one to enter while she bathed.

Young Ganesha stood firm at his post, filled with devotion to his mother. He was innocent yet determined, knowing nothing of the world but his duty to protect.

This was the beginning of one of the most beloved deities in Hindu tradition - the remover of obstacles, the lord of beginnings, Sri Ganesha.`
      },
      {
        id: "g2",
        title: "The Test of Devotion",
        subtitle: "Ganesha's encounter with Lord Shiva",
        mood: "powerful",
        instrument: "tanpura",
        content: `Lord Shiva returned from his meditation to find a young boy blocking his path. Not knowing this was his own son, created by Parvati, Shiva asked to enter his own home.

Ganesha, following his mother's instructions, firmly refused. A fierce confrontation ensued between the mighty Lord Shiva and the steadfast young guardian.

Despite being just a child, Ganesha's determination was unwavering. He fought with all his might to fulfill his duty to his mother. The battle was intense, and the heavens themselves shook with its power.

In the heat of battle, Lord Shiva, in his divine fury, severed the boy's head. The moment this happened, Parvati emerged and was struck with unbearable grief.`
      },
      {
        id: "g3",
        title: "The Elephant Head",
        subtitle: "Transformation and blessing",
        mood: "emotional",
        instrument: "flute",
        content: `Seeing Parvati's immense sorrow, Lord Shiva realized what had transpired. Filled with remorse and love for his consort, he promised to restore their son's life.

Shiva sent his attendants to find the first creature facing north in deep sleep. They found a majestic elephant, and its head was brought to Kailash.

Lord Shiva placed the elephant head on Ganesha's body and breathed new life into him. The divine child awoke, now with the head of an elephant, radiating wisdom and grace.

Shiva blessed his son: "You shall be worshipped first before all other deities. You shall be the remover of obstacles and the lord of new beginnings." Thus, Lord Ganesha was reborn with divine blessings.`
      },
      {
        id: "g4",
        title: "The First Among Worshipped",
        subtitle: "Ganesha's eternal blessing",
        mood: "devotional",
        instrument: "bells",
        content: `From that day forward, Lord Ganesha became the first deity to be worshipped in any Hindu ceremony. His elephant head symbolizes wisdom, understanding, and a discriminating intellect.

His large ears remind devotees to listen more. His small eyes teach us to concentrate and focus. His trunk represents adaptability - the ability to both uproot trees and pick up delicate objects.

Lord Ganesha carries a modak (sweet) in his hand, representing the sweetness of spiritual knowledge. His mouse vehicle teaches us that even the smallest creature can carry the mightiest of gods.

To this day, millions begin their prayers, journeys, and new ventures by invoking Ganesha. "Om Gam Ganapataye Namaha" - the mantra that removes all obstacles from our path.`
      }
    ]
  },
  {
    deityId: "shiva",
    chapters: convertShivPuranChapters()
  },
  {
    deityId: "vishnu",
    chapters: [
      {
        id: "v1",
        title: "The Preserver of the Universe",
        subtitle: "Lord Vishnu's eternal role",
        mood: "divine",
        instrument: "om",
        content: `Lord Vishnu, the Preserver, maintains the cosmic order. He rests on the infinite serpent Ananta Shesha in the cosmic ocean of milk, dreaming the universe into existence. From his navel grows a lotus, upon which sits Brahma, the creator.

With four arms, Vishnu holds the conch (Shankha) representing the primordial sound Om, the discus (Sudarshana Chakra) symbolizing the mind and the cycle of time, the mace (Gada) representing strength and knowledge, and the lotus (Padma) signifying purity and liberation.

His consort is Lakshmi, the goddess of prosperity. His vehicle is Garuda, the divine eagle. Together, they watch over all creation with infinite compassion.

Whenever dharma (righteousness) declines and adharma (unrighteousness) rises, Vishnu descends to Earth in various forms called Avatars. His love for his devotees knows no bounds.`
      },
      {
        id: "v2",
        title: "The Avatars of Vishnu",
        subtitle: "Divine incarnations through the ages",
        mood: "powerful",
        instrument: "tanpura",
        content: `Lord Vishnu has descended to Earth in ten major incarnations, the Dashavatar. Each avatar came to restore balance when evil threatened to overwhelm the world.

As Matsya (the Fish), he saved the Vedas from the great flood. As Kurma (the Tortoise), he supported Mount Mandara during the churning of the ocean. As Varaha (the Boar), he lifted the Earth from cosmic waters.

As Narasimha (the Man-Lion), he protected his devotee Prahlada from the demon king. As Vamana (the Dwarf), he reclaimed the universe from King Bali. As Parashurama, he rid the world of corrupt warriors.

As Rama, he showed the world the path of dharma. As Krishna, he delivered the Bhagavad Gita. As Buddha, he taught compassion. The tenth avatar, Kalki, is yet to come, appearing at the end of Kali Yuga to begin a new cycle.`
      },
      {
        id: "v3",
        title: "The Cosmic Sleep",
        subtitle: "Vishnu in Yoga Nidra",
        mood: "peaceful",
        instrument: "flute",
        content: `Between cycles of creation, Lord Vishnu rests in Yoga Nidra - the yogic sleep of cosmic consciousness. Floating on the cosmic waters upon Shesha, the thousand-headed serpent, he enters a state of divine rest.

Yet even in this rest, Vishnu is aware. His consciousness pervades all existence. The entire universe exists within him, like waves in an infinite ocean. Lakshmi gently massages his feet as he dreams.

When the time for creation comes, from his deep contemplation, a golden lotus emerges from his navel. On this lotus sits Brahma, who then begins the work of creation according to Vishnu's divine will.

This imagery teaches us that behind all activity is profound stillness. The universe emerges from and dissolves back into this peaceful awareness. Vishnu's sleep is not unconsciousness but supreme consciousness - aware of all while attached to nothing.`
      }
    ]
  },
  {
    deityId: "krishna",
    chapters: [
      {
        id: "k1",
        title: "The Divine Child of Vrindavan",
        subtitle: "Krishna's miraculous birth",
        mood: "divine",
        instrument: "flute",
        content: `On a dark night in the month of Shravan, in the prison cell of the tyrant Kamsa, Lord Krishna was born to Devaki and Vasudeva. The moment of his birth, all chains fell away, prison doors opened, and divine light filled the cell.

Vasudeva, following divine instructions, carried the newborn across the flooding Yamuna river. The serpent Shesha sheltered them from the rain. He exchanged Krishna with the newborn daughter of Nanda and Yashoda in Gokul.

Thus began Krishna's childhood in Vrindavan - a time of pure joy and divine play. Yashoda became his loving foster mother, and the cowherd village became his playground.

The butter thief, the slayer of demons, the enchanter of all hearts - Krishna's childhood stories fill the hearts of devotees with overwhelming love and joy.`
      },
      {
        id: "k2",
        title: "The Flute Player",
        subtitle: "Krishna's divine music",
        mood: "peaceful",
        instrument: "flute",
        content: `When Krishna played his flute, the entire universe stood still in enchantment. The rivers stopped flowing, the wind held its breath, and even the birds paused in mid-flight to listen.

The Gopis of Vrindavan, upon hearing his flute, would leave everything behind. They would abandon their homes, their families, even their sense of self, drawn irresistibly to the divine melody.

The Raas Leela - Krishna's cosmic dance with the Gopis - represents the soul's longing for the Divine. Each Gopi felt Krishna was dancing with her alone, as the Lord multiplied himself to be with each devotee personally.

Krishna's flute represents the call of the Divine to the human soul. When we empty ourselves like the hollow bamboo, the Lord can play his divine music through us. The flute's melody is the sound of pure love calling us home.`
      },
      {
        id: "k3",
        title: "The Bhagavad Gita",
        subtitle: "The Song of God",
        mood: "powerful",
        instrument: "tanpura",
        content: `On the battlefield of Kurukshetra, the great warrior Arjuna stood paralyzed with doubt. Before him were his own kinsmen, teachers, and loved ones - all ready for a war that seemed impossible to fight.

In this moment of crisis, Lord Krishna revealed his cosmic form and delivered the supreme teaching known as the Bhagavad Gita - the Song of God.

"You have the right to work, but not to the fruits of your actions," Krishna taught. "Perform your duty without attachment. Find refuge in wisdom. Those who act with devotion, offering all actions to Me, are free from the bonds of karma."

The Gita teaches karma yoga (selfless action), bhakti yoga (devotion), jnana yoga (knowledge), and raja yoga (meditation). It is the essence of all spiritual wisdom, applicable to every human being regardless of their path or station in life.`
      },
      {
        id: "k4",
        title: "The Eternal Friend",
        subtitle: "Krishna's unconditional love",
        mood: "devotional",
        instrument: "bells",
        content: `Lord Krishna is the friend of all beings. To Arjuna, he was a trusted charioteer and guide. To Sudama, he was the beloved childhood friend who never forgot their bond. To Draupadi, he was the protector who answered her call in her darkest hour.

Krishna's love knows no boundaries. He ate the humble rice flakes offered by Sudama with the same joy as the grandest feast. He washed the feet of guests at Yudhishthira's Rajasuya sacrifice, though he himself was the Supreme Lord.

"Whoever offers Me a leaf, a flower, a fruit, or water with devotion - that offering of love from a pure heart I accept," Krishna promises in the Gita.

This is the essence of Krishna consciousness - that the Lord is accessible to all, at all times. He responds to the pure call of the heart, regardless of caste, creed, or status. He is the supreme friend who never abandons those who take refuge in him.`
      }
    ]
  },
  {
    deityId: "hanuman",
    chapters: [
      {
        id: "h1",
        title: "The Son of the Wind",
        subtitle: "Hanuman's divine birth and childhood",
        mood: "divine",
        instrument: "om",
        content: `Hanuman was born to Anjana and Kesari, blessed by the Wind God Vayu. As a child, he possessed extraordinary powers, and in his innocence, he once mistook the rising sun for a ripe fruit.

Leaping into the sky, young Hanuman flew towards the sun. Indra, the king of gods, struck him with his thunderbolt, causing him to fall. Vayu, angered by the attack on his son, withdrew all air from the universe.

To appease Vayu and save creation, the gods blessed Hanuman with numerous gifts - immortality, invincibility, and powers beyond measure. But they also placed a condition: Hanuman would forget his powers until reminded at the right time.

Thus grew the mighty Hanuman, humble and devoted, unaware of the cosmic strength that lay dormant within him, waiting to be awakened in service of Lord Rama.`
      },
      {
        id: "h2",
        title: "Finding Lord Rama",
        subtitle: "The meeting that changed everything",
        mood: "emotional",
        instrument: "flute",
        content: `When Rama and Lakshmana wandered through the forests searching for Sita, they came upon Rishyamuka Mountain where Sugriva and his ministers lived in exile.

Sugriva, fearing they might be sent by his enemy Vali, asked Hanuman to approach them in disguise. Hanuman took the form of a Brahmin scholar and approached the princes.

The moment Hanuman saw Rama, something stirred deep within his heart. Here was the purpose of his existence, the master he was born to serve. When Rama spoke, Hanuman was enchanted by the sweetness and wisdom of his words.

Revealing his true form, Hanuman bowed at Rama's feet and offered his eternal service. From that moment, he lived only for Rama - thinking of Rama, speaking of Rama, working only for Rama's mission. This complete surrender became the foundation of his legendary devotion.`
      },
      {
        id: "h3",
        title: "The Leap Across the Ocean",
        subtitle: "Hanuman's journey to Lanka",
        mood: "powerful",
        instrument: "tanpura",
        content: `When the monkey army reached the southern shore and faced the vast ocean, despair set in. Who could cross the mighty sea to reach Lanka and find Sita?

Jambavan, the wise bear, approached Hanuman. "Son of Vayu, you have forgotten your powers! You can leap across this ocean. Remember who you are!"

As Jambavan reminded Hanuman of his divine nature, the devotee began to grow. He expanded until he stood as tall as a mountain. With a mighty roar of "Jai Shri Ram!", he leaped into the sky.

The ocean creatures watched in awe as Hanuman soared through the clouds. Demons tried to stop him; magical beings tried to trap him. But nothing could halt the flight of pure devotion. Hanuman crossed the hundred yojanas of ocean and landed in Lanka, ready to find his mother Sita.`
      },
      {
        id: "h4",
        title: "The Burning of Lanka",
        subtitle: "Devotion turns into divine fire",
        mood: "powerful",
        instrument: "bells",
        content: `In Lanka, Hanuman found Sita in the Ashoka grove, gave her Rama's ring, and assured her that rescue was coming. But he allowed himself to be captured by Ravana's forces - he wanted to see the demon king face to face.

Before Ravana's court, Hanuman delivered Rama's message boldly. Enraged, Ravana ordered Hanuman's tail to be set on fire as punishment for a monkey's insolence.

But as they wrapped his tail with cloth soaked in oil, Hanuman began to grow. More cloth was needed, then more. His tail extended through the streets of Lanka. When they finally lit the fire, Hanuman shrank, slipped from his bonds, and leaped across the golden city.

Building by building, palace by palace, Hanuman burned Lanka with his flaming tail. Yet, by Sita's blessing, Ravana's inner quarters remained untouched. Having accomplished his mission, Hanuman extinguished his tail in the ocean and flew back to Rama with news that would launch the great war.`
      }
    ]
  },
  {
    deityId: "durga",
    chapters: convertDeviSaptashatiChapters()
  },
  {
    deityId: "lakshmi",
    chapters: convertLakshmiPuranChapters()
  },
  {
    deityId: "saraswati",
    chapters: [
      {
        id: "sa1",
        title: "The Goddess of Knowledge",
        subtitle: "Saraswati's eternal radiance",
        mood: "peaceful",
        instrument: "flute",
        content: `Saraswati, dressed in pure white, sits upon a white lotus, embodying the pristine nature of true knowledge. She holds a veena, creating the music of learning. A book and rosary in her other hands represent spiritual and worldly wisdom.

She is the consort of Brahma, the creator. Without her wisdom, creation itself would be impossible. She is the flowing river of consciousness, the articulation of cosmic truth.

Her swan vehicle represents the ability to discern truth from falsehood, just as a swan can separate milk from water. Her white sari symbolizes purity - for true knowledge is untainted by ego or material desire.

Students, artists, musicians, and scholars worship Saraswati, seeking her blessings for clarity of mind, eloquence of speech, and excellence in their pursuits.`
      },
      {
        id: "sa2",
        title: "The Sacred River",
        subtitle: "Saraswati as the invisible stream",
        mood: "divine",
        instrument: "tanpura",
        content: `In ancient times, the Saraswati was one of the mightiest rivers of the Indian subcontinent. Along its banks, the Vedas were composed and great civilizations flourished.

Over millennia, the river gradually went underground, becoming invisible to human eyes. Yet its waters continue to flow, joining the Ganga and Yamuna at the sacred Triveni Sangam in Prayagraj.

This physical transformation mirrors a spiritual truth. Just as the Saraswati flows unseen beneath the earth, true knowledge flows silently through the universe, available to those who dive deep within themselves.

The goddess Saraswati represents this hidden stream of wisdom. Through meditation, study, and devotion, we can tap into this eternal flow and receive the blessings of divine knowledge.`
      }
    ]
  },
  {
    deityId: "rama",
    chapters: [
      {
        id: "rama-1",
        title: "श्री राम जन्म",
        subtitle: "Divine Birth in Ayodhya",
        mood: "divine",
        instrument: "tanpura",
        content: `भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी।
हरषित महतारी मुनि मन हारी अद्भुत रूप बिचारी॥

लोचन अभिरामा तनु घनस्यामा निज आयुध भुज चारी।
भूषन बनमाला नयन बिसाला सोभासिंधु खरारी॥

अयोध्या के राजा दशरथ ने पुत्रेष्टि यज्ञ का आयोजन किया। ऋष्यश्रृंग मुनि ने यज्ञ संपन्न कराया। अग्निकुंड से एक दिव्य पुरुष प्रकट हुए, जो स्वर्ण पात्र में खीर लिए थे।

तीनों रानियों - कौशल्या, कैकेयी और सुमित्रा ने प्रसाद ग्रहण किया। चैत्र शुक्ल नवमी को, पुनर्वसु नक्षत्र में, कर्क लग्न में श्री राम का जन्म हुआ।

देवता पुष्प वर्षा करने लगे। गंधर्व गान करने लगे। अयोध्या में आनंद की लहर दौड़ पड़ी। भगवान विष्णु ने मर्यादा पुरुषोत्तम के रूप में अवतार लिया था।`
      },
      {
        id: "rama-2",
        title: "विश्वामित्र आगमन",
        subtitle: "Sage Vishwamitra's Arrival",
        mood: "powerful",
        instrument: "mantra-rhythm",
        content: `विश्वामित्र महामुनि राजा दशरथ के दरबार में पधारे। उन्होंने कहा - "हे राजन! मेरे यज्ञ में राक्षस विघ्न डालते हैं। अपने पुत्र राम को मेरे साथ भेजो।"

दशरथ ने कहा - "मुनिवर! राम अभी बालक है। मैं स्वयं सेना लेकर चलूंगा।" परंतु वशिष्ठ मुनि ने समझाया - "राजन! राम साधारण बालक नहीं। वे साक्षात् नारायण हैं।"

राम और लक्ष्मण मुनि के साथ वन को चले। मार्ग में ताड़का राक्षसी ने आक्रमण किया। राम ने एक ही बाण से उसका वध किया।

विश्वामित्र ने राम को बला और अतिबला विद्या प्रदान की। फिर दिव्यास्त्रों का ज्ञान दिया। यज्ञ रक्षा करते हुए राम ने मारीच को समुद्र पार फेंका और सुबाहु का वध किया।`
      },
      {
        id: "rama-3",
        title: "सीता स्वयंवर",
        subtitle: "Marriage with Sita",
        mood: "happy",
        instrument: "flute",
        content: `जनक नंदिनी सीता का स्वयंवर मिथिला में आयोजित था। शिव धनुष को उठाकर प्रत्यंचा चढ़ाने की शर्त थी। अनेक राजा-महाराजा आए, परंतु कोई भी धनुष हिला न सका।

राम ने गुरु की आज्ञा ली। धनुष की परिक्रमा की। फिर एक हाथ से उठाकर प्रत्यंचा चढ़ाई। धनुष भंग हो गया। तीनों लोक कांप उठे।

सीता ने जयमाला राम के गले में डाली। देवताओं ने पुष्प वर्षा की। भरत, लक्ष्मण और शत्रुघ्न का भी विवाह हुआ।

सीताराम विवाह - यह प्रकृति और पुरुष का मिलन था। जीव और ब्रह्म का संयोग था। यह विवाह सनातन है, शाश्वत है।

मंगल भवन अमंगल हारी। द्रवहु सु दसरथ अजिर बिहारी॥`
      },
      {
        id: "rama-4",
        title: "वनवास",
        subtitle: "Exile to the Forest",
        mood: "sad",
        instrument: "tanpura",
        content: `राम राज्याभिषेक की तैयारी थी। समस्त अयोध्या आनंदित थी। परंतु विधि का विधान कुछ और था।

कैकेयी ने दो वर मांगे - भरत को राज्य और राम को चौदह वर्ष का वनवास। दशरथ मूर्छित हो गए। परंतु राम मुस्कुराए।

राम ने कहा - "पिता की आज्ञा शिरोधार्य है। वनवास मेरे लिए महोत्सव है।"

सीता ने कहा - "पति के बिना स्वर्ग भी नरक है। मैं साथ चलूंगी।" लक्ष्मण ने कहा - "बिना भैया के मैं एक क्षण भी नहीं रह सकता।"

तीनों ने राजवस्त्र त्यागे, वल्कल धारण किए। अयोध्या रो पड़ी। दशरथ ने प्राण त्याग दिए।

रघुकुल रीति सदा चलि आई। प्राण जाहुं बरु बचनु न जाई॥`
      },
      {
        id: "rama-5",
        title: "सीता हरण",
        subtitle: "Abduction of Sita",
        mood: "sad",
        instrument: "tanpura",
        content: `पंचवटी में शूर्पणखा आई। राम पर मोहित हुई। जब उसने सीता पर आक्रमण किया, लक्ष्मण ने उसके नाक-कान काट दिए।

रावण ने प्रतिशोध की योजना बनाई। मारीच को स्वर्ण मृग बनाकर भेजा। सीता ने हठ किया - "मुझे यह मृग चाहिए।"

राम मृग के पीछे गए। मारीच ने राम की आवाज में पुकारा। सीता ने लक्ष्मण को भेज दिया।

रावण साधु वेष में आया। सीता ने आतिथ्य किया। रावण ने अपना रूप दिखाया और सीता को उठाकर पुष्पक विमान में ले गया।

जटायु ने रोका, लड़ा, परंतु रावण ने उसके पंख काट दिए। मरते हुए जटायु ने राम को सारी बात बताई। राम ने उनका अंतिम संस्कार पुत्रवत् किया।`
      },
      {
        id: "rama-6",
        title: "हनुमान मिलन",
        subtitle: "Meeting with Hanuman",
        mood: "devotional",
        instrument: "tanpura",
        content: `राम और लक्ष्मण सीता की खोज में भटक रहे थे। ऋष्यमूक पर्वत पर सुग्रीव का राज्य था। सुग्रीव ने हनुमान को भेजा।

हनुमान ब्राह्मण वेश में आए। राम को देखते ही उनका हृदय भक्ति से भर गया। यह मिलन युगों-युगों का था।

राम ने कहा - "तुम्हारी वाणी में वेद की गरिमा है।" हनुमान ने अपना रूप प्रकट किया और राम के चरणों में गिर पड़े।

सुग्रीव से मित्रता हुई। राम ने बालि का वध किया। वानर सेना सीता की खोज में चारों दिशाओं में गई।

संपाति ने बताया कि सीता लंका में हैं। समुद्र पार करना था। जामवंत ने हनुमान को उनकी शक्ति याद दिलाई।

हनुमान ने विराट रूप धारण किया और "जय श्री राम" के उद्घोष के साथ समुद्र लांघ गए।`
      },
      {
        id: "rama-7",
        title: "लंका दहन",
        subtitle: "Burning of Lanka",
        mood: "powerful",
        instrument: "mantra-rhythm",
        content: `हनुमान ने अशोक वाटिका में सीता माता को खोजा। राम की अंगूठी दी। माता ने चूड़ामणि दी।

हनुमान ने सोचा - "रावण की शक्ति का आकलन करना चाहिए।" उन्होंने वाटिका उजाड़ दी। राक्षसों को मारा। अक्षय कुमार का वध किया।

मेघनाद ने ब्रह्मास्त्र से बांधा। रावण के दरबार में लाए गए। हनुमान ने निर्भय होकर राम का संदेश दिया।

रावण ने पूंछ में आग लगाने का आदेश दिया। हनुमान ने पूंछ बढ़ाई। जितना कपड़ा लपेटते, पूंछ उतनी बढ़ती।

फिर हनुमान ने लंका में आग लगा दी। स्वर्ण नगरी जल उठी। समुद्र में पूंछ बुझाकर वे वापस लौटे।

राम राम रटते जग जाना। बालि बध किन्हों भगवाना॥`
      },
      {
        id: "rama-8",
        title: "सेतु बंधन",
        subtitle: "Building the Bridge",
        mood: "powerful",
        instrument: "mantra-rhythm",
        content: `वानर सेना समुद्र तट पर पहुंची। सागर पार करना था। राम ने तीन दिन समुद्र की प्रार्थना की। जब समुद्र न माना, राम ने धनुष उठाया।

समुद्र प्रकट हुआ और बोला - "प्रभु! नल और नील में वरदान है। वे जो पत्थर डालेंगे, तैरेंगे।"

"राम" नाम लिखकर पत्थर डाले गए। पांच दिनों में सेतु बन गया। यह रामसेतु आज भी है।

विभीषण रावण का भाई था, परंतु धर्म का पक्षधर था। उसने रावण को समझाया, परंतु रावण न माना। विभीषण राम की शरण आए। राम ने उन्हें लंका का राज्य देने का वचन दिया।

सेना ने सेतु पार किया। लंका को घेर लिया। महायुद्ध आरंभ हुआ।`
      },
      {
        id: "rama-9",
        title: "राम-रावण युद्ध",
        subtitle: "The Great Battle",
        mood: "powerful",
        instrument: "mantra-rhythm",
        content: `भयंकर युद्ध हुआ। कुंभकर्ण, मेघनाद, अतिकाय - एक-एक करके सब मारे गए।

मेघनाद ने शक्ति से लक्ष्मण को मूर्छित किया। हनुमान एक ही रात में हिमालय गए और संजीवनी बूटी लाए। लक्ष्मण जी उठे।

अंतिम युद्ध राम और रावण के बीच हुआ। रावण के दस सिर थे, बीस भुजाएं थीं। जितने सिर कटते, उतने उग आते।

विभीषण ने बताया - "नाभि में अमृत है।" अगस्त्य मुनि ने आदित्य हृदयम् का पाठ कराया। राम ने ब्रह्मास्त्र चलाया।

बाण ने रावण की नाभि भेदी। रावण गिर पड़ा। विजय हुई। देवताओं ने जय-जयकार किया।

रामचंद्र कृपालु भजु मन हरण भवभय दारुणम्।
नवकंज लोचन कंज मुख कर कंज पद कंजारुणम्॥`
      },
      {
        id: "rama-10",
        title: "अयोध्या वापसी - राम राज्य",
        subtitle: "Return to Ayodhya - Ram Rajya",
        mood: "happy",
        instrument: "flute",
        content: `सीता से पुनर्मिलन हुआ। विभीषण का राज्याभिषेक हुआ। पुष्पक विमान में राम, सीता, लक्ष्मण और सभी वानर अयोध्या की ओर चले।

भरत चौदह वर्ष से राम की पादुका रखकर शासन कर रहे थे। जब सुना कि राम आ रहे हैं, समस्त अयोध्या सज गई।

दीपमाला जलाई गई। यही दीपावली की शुरुआत थी। राम का राज्याभिषेक हुआ। राम राज्य की स्थापना हुई।

राम राज्य में कोई दुखी न था। न अकाल, न महामारी। धर्म चारों चरणों पर चलता था। प्रजा सुखी थी, संतुष्ट थी।

मंगल भवन अमंगल हारी। द्रवहु सु दसरथ अजिर बिहारी॥
राम सीता बिहारी जय बोलो हनुमान की।
जय हो प्रभु श्री राम की॥

जो सुमिरत सिधि होई, गननायक करिबर बदन।
करहु अनुग्रह सोई, बुद्धि रासि सुभ गुन सदन॥`
      }
    ]
  }
];

export const getChaptersByDeityId = (deityId: string): Chapter[] => {
  const data = deityChaptersData.find(d => d.deityId === deityId.toLowerCase());
  return data?.chapters || [];
};

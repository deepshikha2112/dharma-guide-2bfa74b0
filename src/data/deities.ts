export interface Chapter {
  id: number;
  title: string;
  content: string;
}

export interface Deity {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  emoji: string;
  color: string;
  image?: string;
  introduction: string;
  chapters: Chapter[];
  mantras: string[];
  festivals: string[];
  lifeLesson: string;
}

export const deities: Deity[] = [
  {
    id: "ganesha",
    name: "Lord Ganesha",
    sanskrit: "श्री गणेश",
    description: "The remover of obstacles and the deity of beginnings, wisdom, and learning.",
    emoji: "🐘",
    color: "bg-primary/10",
    introduction: "Lord Ganesha, also known as Ganapati and Vinayaka, is one of the most beloved and widely worshipped deities in Hinduism. With an elephant head and a human body, He represents wisdom, prosperity, and good fortune. He is honored at the beginning of all rituals and ceremonies as the remover of obstacles.",
    chapters: [
      {
        id: 1,
        title: "Divine Origin & Birth",
        content: "Lord Ganesha was created by Goddess Parvati from the sandalwood paste she used for bathing. She breathed life into the figure and set him as a guard outside her chambers. When Lord Shiva returned and was stopped by Ganesha, who did not recognize him, a confrontation occurred. This divine event led to Ganesha receiving his elephant head, symbolizing wisdom and the removal of obstacles. His creation represents the power of the Divine Mother and the protective nature of a devoted child."
      },
      {
        id: 2,
        title: "Early Life & Divine Childhood",
        content: "After receiving his elephant head, young Ganesha became dear to all the gods and goddesses. The divine beings blessed him with extraordinary powers. Lord Brahma blessed him to be worshipped before all ceremonies. His brother Kartikeya and he shared many playful moments in Mount Kailash. Ganesha's love for modak (sweet dumplings) and his gentle, wise nature made him beloved among devotees even in his childhood."
      },
      {
        id: 3,
        title: "Major Life Events",
        content: "Lord Ganesha played a crucial role in writing the Mahabharata. When sage Vyasa sought someone to transcribe the epic, Ganesha agreed on the condition that Vyasa narrate without pause. Ganesha used his broken tusk as a pen, showing his dedication to preserving sacred knowledge. Another significant event was the race around the universe with his brother Kartikeya. While Kartikeya traveled the cosmos, wise Ganesha simply circled his parents, Shiva and Parvati, declaring them as his entire universe."
      },
      {
        id: 4,
        title: "Struggles & Challenges",
        content: "The greatest struggle Lord Ganesha faced was the initial confrontation with Lord Shiva that led to the loss of his original head. This sacrifice was not a defeat but a transformation. Despite his unusual appearance with an elephant head, Ganesha never felt inferior. He embraced his form with dignity and turned what could be seen as a limitation into his greatest strength - becoming the most recognizable and beloved deity."
      },
      {
        id: 5,
        title: "Decisions & Sacrifices",
        content: "Ganesha's decision to break his own tusk to write the Mahabharata shows ultimate dedication to knowledge and dharma. He sacrificed his physical perfection for the preservation of sacred wisdom. His choice to circle his parents instead of the universe demonstrated that true wisdom lies in understanding what truly matters. These decisions reflect his teaching that intelligence and devotion triumph over physical prowess."
      },
      {
        id: 6,
        title: "Teachings & Dharma",
        content: "Lord Ganesha teaches us that obstacles are opportunities for growth. His broken tusk reminds us that knowledge requires sacrifice. His large ears signify the importance of listening, while his small mouth teaches us to speak less. His big belly represents the ability to digest all good and bad in life peacefully. He shows us that wisdom, humility, and devotion to family are the highest virtues."
      },
      {
        id: 7,
        title: "Legacy & Eternal Presence",
        content: "Lord Ganesha is worshipped at the beginning of every auspicious occasion. Ganesh Chaturthi is celebrated with great devotion across India. Temples dedicated to him exist worldwide. His image adorns homes, businesses, and vehicles as a symbol of protection and good fortune. His legacy teaches that true worship begins with removing the obstacles of ego and ignorance from our own hearts."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Ganesha, we learn: 1) Face challenges with wisdom, not just strength. 2) Honor and respect your parents above all worldly achievements. 3) Knowledge is worth any sacrifice. 4) Your appearance does not define your worth. 5) Listen more, speak less, and act wisely. 6) Begin every task with a pure heart and proper intention. 7) Obstacles are divine tests that make us stronger."
      }
    ],
    mantras: ["ॐ गं गणपतये नमः", "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ", "ॐ श्री गणेशाय नमः"],
    festivals: ["Ganesh Chaturthi", "Sankashti Chaturthi", "Vinayaka Chaturthi"],
    lifeLesson: "When facing obstacles, remember Lord Ganesha's wisdom: every challenge is an opportunity to grow stronger and wiser. Embrace difficulties with patience and intelligence."
  },
  {
    id: "shiva",
    name: "Lord Shiva",
    sanskrit: "भगवान शिव",
    description: "The supreme being who creates, protects, and transforms the universe.",
    emoji: "🔱",
    color: "bg-secondary/20",
    introduction: "Lord Shiva, known as Mahadeva (the Great God), is one of the principal deities of Hinduism. He is the supreme being within Shaivism and represents the aspects of creation, preservation, and destruction. As the Adiyogi (first yogi), he is the source of yoga and meditation.",
    chapters: [
      {
        id: 1,
        title: "Divine Origin & Eternal Nature",
        content: "Lord Shiva is Swayambhu - self-manifested, without beginning or end. He is the Adi (first) and Anant (infinite). The Puranas describe him as the supreme consciousness from which all creation emerges. He resides on Mount Kailash with his consort Parvati and sons Ganesha and Kartikeya. His third eye represents wisdom and the power to see beyond the ordinary. His blue throat (Neelkanth) resulted from drinking the poison Halahala during the churning of the cosmic ocean to save the universe."
      },
      {
        id: 2,
        title: "Divine Marriages & Family",
        content: "Lord Shiva's first wife was Sati, daughter of Daksha. When Daksha insulted Shiva at a yagna (fire ceremony), Sati immolated herself in grief. Overcome with sorrow, Shiva performed the Tandava - the cosmic dance of destruction. Sati was reborn as Parvati, who performed intense penance to win Shiva's heart. Their divine marriage represents the union of consciousness (Shiva) and energy (Shakti). Their family life on Mount Kailash is depicted as ideal, filled with love and wisdom."
      },
      {
        id: 3,
        title: "Major Divine Acts",
        content: "Lord Shiva saved the universe by consuming the deadly poison Halahala during Samudra Manthan (ocean churning). He reduced Kamadeva (god of desire) to ashes with his third eye, teaching that uncontrolled desires destroy peace. He gave the river Ganga a place in his hair to control her force and bless humanity. He defeated countless demons including Tripurasura, Andhakasura, and Jalandhara. He gave the Sudarshan Chakra to Lord Vishnu and the Pashupatastra to Arjuna."
      },
      {
        id: 4,
        title: "Struggles & Tests",
        content: "Even the supreme Lord faced tests and struggles. The loss of Sati brought him immense grief and anger. He had to perform intense austerity to control his powers. He was misunderstood by Daksha and other devas who failed to recognize his true nature. His simple appearance - wearing animal skins, covered in ash, living among ghosts and serpents - led many to underestimate him. Yet these struggles showed that detachment and inner peace triumph over worldly appearances."
      },
      {
        id: 5,
        title: "Teachings as Adiyogi",
        content: "As the first yogi (Adiyogi), Lord Shiva transmitted the science of yoga to the Saptarishis (seven sages) at Kanti Sarovar near Kedarnath. He taught that liberation comes through self-realization, not rituals alone. His teachings include: the body is a temple, meditation is the path to truth, attachment causes suffering, and the divine exists within all beings. His Nataraja form depicts the cosmic dance of creation and destruction - the eternal rhythm of the universe."
      },
      {
        id: 6,
        title: "Compassion & Grace",
        content: "Despite being called the Destroyer, Lord Shiva is known as Bholenath - the innocent lord who grants boons easily. He accepted the outcasts - ghosts, goblins, and beings rejected by society - as his companions. He blessed Ravana despite knowing his nature. He gave darshan to the simplest of devotees - a hunter, a child, a tribal woman. His message is that divine grace is available to all, regardless of status or background."
      },
      {
        id: 7,
        title: "Sacred Forms & Manifestations",
        content: "Lord Shiva manifests in many forms: as Nataraja performing the cosmic dance, as Dakshinamurti teaching in silence, as Ardhanarishvara (half-male, half-female) showing the unity of Shiva-Shakti, as Bhairava for fierce protection, and as the Jyotirlinga (column of light) in twelve sacred sites across India. The Shiva Linga represents the formless infinite Brahman."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Shiva, we learn: 1) True strength lies in inner peace and control, not anger. 2) Accept all beings with compassion - none are outcasts to the divine. 3) Simplicity and detachment bring true freedom. 4) Destruction of ego is necessary for spiritual rebirth. 5) The poison of life (struggles) can become a ornament if accepted with courage. 6) Meditation and yoga are paths to self-realization. 7) Love transcends death - true connections are eternal."
      }
    ],
    mantras: ["ॐ नमः शिवाय", "महामृत्युंजय मंत्र", "शिव तांडव स्तोत्रम्"],
    festivals: ["Maha Shivaratri", "Shravan Month", "Pradosha"],
    lifeLesson: "When life feels chaotic, embody Lord Shiva's stillness. The poison of difficulties can become your ornament when faced with courage and inner peace."
  },
  {
    id: "vishnu",
    name: "Lord Vishnu",
    sanskrit: "भगवान विष्णु",
    description: "The preserver and protector of the universe, embodiment of mercy and goodness.",
    emoji: "🪷",
    color: "bg-accent/20",
    introduction: "Lord Vishnu is the supreme being who protects and preserves the universe. He rests on the cosmic serpent Shesha in the ocean of milk. Whenever evil threatens cosmic order, he incarnates on Earth to restore dharma. His ten avatars (Dashavatar) include Rama and Krishna.",
    chapters: [
      {
        id: 1,
        title: "Divine Origin & Cosmic Role",
        content: "Lord Vishnu is part of the Trimurti - the Hindu trinity alongside Brahma (creator) and Shiva (destroyer). He is the preserver who maintains cosmic order (dharma). He resides in Vaikuntha, the supreme abode, with his consort Goddess Lakshmi. The lotus emerges from his navel, upon which Brahma sits to create the universe. His four arms hold the Sudarshana Chakra (discus), Kaumodaki (mace), Panchajanya (conch), and a lotus, symbolizing power, strength, the sacred sound, and purity."
      },
      {
        id: 2,
        title: "The Dashavatar - Ten Incarnations",
        content: "Lord Vishnu descends to Earth whenever dharma declines. His ten main avatars are: Matsya (fish) who saved Manu and the Vedas from the great flood; Kurma (tortoise) who supported Mount Mandara during ocean churning; Varaha (boar) who rescued Earth from the demon Hiranyaksha; Narasimha (man-lion) who defeated Hiranyakashipu; Vamana (dwarf) who subdued King Bali; Parashurama who ended the tyranny of Kshatriyas; Rama the ideal king; Krishna the divine guide; Buddha the enlightened one; and Kalki who will appear to end the Kali Yuga."
      },
      {
        id: 3,
        title: "Divine Acts of Protection",
        content: "Lord Vishnu's protective acts span all creation. He emerged as Narasimha from a pillar to save his devotee Prahlada. He churned the ocean with the devas and asuras to obtain Amrita (nectar of immortality). As Mohini, he ensured the nectar went only to the devas. He blessed the demon Prahlada for his unwavering devotion. He protected the world from the cosmic flood by guiding Manu. In every Yuga, he appears to restore balance whenever evil gains power."
      },
      {
        id: 4,
        title: "Struggles Against Adharma",
        content: "In each avatar, Lord Vishnu faced tremendous struggles. As Rama, he endured 14 years of exile and the kidnapping of his wife Sita. As Krishna, he witnessed the destruction of his own clan, the Yadavas. As Narasimha, he had to take a terrifying form to defeat Hiranyakashipu. These struggles teach us that even the divine chooses to face hardship to uphold dharma. Victory over evil requires patience, strategy, and unwavering commitment to righteousness."
      },
      {
        id: 5,
        title: "Teachings Through Avatars",
        content: "Each avatar of Vishnu carries profound teachings. Matsya teaches us to preserve sacred knowledge during times of destruction. Rama's life demonstrates the importance of duty, honor, and family. Krishna's Bhagavad Gita is the ultimate guide to righteous living and self-realization. Narasimha shows that divine protection comes to true devotees in unexpected ways. Vamana teaches that humility can conquer pride. Together, these avatars create a complete guide for dharmic living."
      },
      {
        id: 6,
        title: "Divine Relationships & Devotees",
        content: "Lord Vishnu's relationship with his devotees is that of a protector and friend. He blessed Dhruva, a young prince, with an eternal star. He protected Prahlada from his own father. He accepted the simple offerings of Vidura and Sudama with joy. His consort Lakshmi serves him eternally, representing the union of prosperity with righteousness. He appears to those who call him with sincere devotion, regardless of their status or background."
      },
      {
        id: 7,
        title: "Sacred Symbols & Worship",
        content: "The Shaligrama stone is worshipped as Lord Vishnu's representation. The Tulsi plant is dear to him. His vehicle is Garuda, the divine eagle. He is worshipped through the recitation of Vishnu Sahasranama (thousand names) and the chanting of 'Om Namo Narayanaya'. The Char Dham pilgrimage and visits to Tirupati, Puri Jagannath, and other temples honor him. Ekadashi fasting is dedicated to his worship."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Vishnu, we learn: 1) Protection of dharma is the highest duty. 2) Help comes to those who maintain faith during hardship. 3) Adapt to circumstances while holding to your core values - like water takes the shape of its container but remains pure. 4) True victory is restoring balance, not destroying enemies. 5) Preservation requires constant vigilance and action. 6) Divine help may come in unexpected forms. 7) Surrender to the divine brings ultimate peace."
      }
    ],
    mantras: ["ॐ नमो नारायणाय", "ॐ नमो भगवते वासुदेवाय", "विष्णु सहस्रनाम"],
    festivals: ["Vaikuntha Ekadashi", "Ram Navami", "Krishna Janmashtami", "Tulsi Vivah"],
    lifeLesson: "When feeling helpless against injustice, remember that Lord Vishnu appears in unexpected ways to protect dharma. Maintain faith and continue doing right."
  },
  {
    id: "durga",
    name: "Goddess Durga",
    sanskrit: "माँ दुर्गा",
    description: "The fierce warrior goddess who protects the righteous and destroys evil.",
    emoji: "🦁",
    color: "bg-primary/10",
    introduction: "Goddess Durga, meaning 'the invincible', is the fierce form of the Divine Mother. Created by the combined energies of all the gods to defeat the buffalo demon Mahishasura, she represents the ultimate power of good over evil. She is worshipped as the protector of the universe and the source of all strength.",
    chapters: [
      {
        id: 1,
        title: "Divine Origin & Creation",
        content: "When the demon Mahishasura, blessed with a boon that no man or god could kill him, conquered the three worlds, the gods united their powers. From Brahma, Vishnu, Shiva, and all devas emerged a brilliant light that formed Goddess Durga. Each god contributed their divine weapons: Shiva's trident, Vishnu's discus, Indra's thunderbolt, and more. She was given a lion as her mount. Thus was born the unconquerable goddess - neither man nor god, but the supreme feminine power."
      },
      {
        id: 2,
        title: "The Battle with Mahishasura",
        content: "The battle between Durga and Mahishasura lasted nine days. The demon took many forms - buffalo, lion, elephant, and warrior - but Durga matched each transformation. Her divine weapons destroyed his army. On the tenth day (Vijayadashami), she finally struck Mahishasura as he emerged from his buffalo form, piercing him with her trident. This victory symbolizes the triumph of good over evil, of divine feminine power over demonic arrogance."
      },
      {
        id: 3,
        title: "The Nine Forms (Navadurga)",
        content: "During Navratri, devotees worship Durga's nine forms: Shailaputri (daughter of mountains), Brahmacharini (the ascetic), Chandraghanta (moon-adorned), Kushmanda (creator of the universe), Skandamata (mother of Kartikeya), Katyayani (warrior goddess), Kalaratri (dark night), Mahagauri (great white goddess), and Siddhidatri (granter of supernatural powers). Each form represents different aspects of the divine feminine journey and power."
      },
      {
        id: 4,
        title: "Struggles as Divine Mother",
        content: "Goddess Durga's struggle was not just physical battle. She faced the arrogance of Mahishasura who initially laughed at fighting a woman. She endured a nine-day war while demons attacked from all sides. Yet she remained calm, focused, and unstoppable. Her struggle teaches us that righteous causes require tremendous patience and persistence. The forces of evil may seem powerful, but focused determination always triumphs."
      },
      {
        id: 5,
        title: "Protection of Devotees",
        content: "Durga Maa is called 'Durgatinashini' - destroyer of difficulties. When devotees call her with sincere hearts, she rushes to protect them. She saved the gods from countless demons. She blessed the sage Durgas who named himself after her. Stories tell of her appearing to protect women from harm, soldiers in battle, and the innocent from persecution. Her presence is felt whenever courage is needed against injustice."
      },
      {
        id: 6,
        title: "Teachings of the Divine Mother",
        content: "Durga Maa teaches that feminine power is not just gentle nurturing but also fierce protection. Her weapons teach us that different situations require different tools - sometimes wisdom (the book), sometimes force (the trident), sometimes divine knowledge (the conch). She shows that anger against evil is righteous. She demonstrates that the greatest power comes from the unity of many forces working together for good."
      },
      {
        id: 7,
        title: "Worship & Navratri",
        content: "The nine nights of Navratri honor Durga's battle and victory. Devotees fast, pray, and perform special pujas. The Durga Saptashati (700 verses) is recited describing her victories. Kanya puja honors young girls as manifestations of the goddess. The tenth day, Vijayadashami, celebrates victory of good over evil. In Bengal, elaborate pandals house her clay images, which are immersed in water on Dashami, symbolizing her return to Kailash."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Durga Maa, we learn: 1) True power knows no gender - divine feminine is as mighty as masculine. 2) Face difficulties head-on with courage and determination. 3) Protect the innocent and stand against injustice. 4) Patience and persistence defeat even the mightiest foes. 5) Unity multiplies strength - work with others for righteous causes. 6) Keep multiple tools (skills) ready for different challenges. 7) Anger in service of protection is divine, not sinful."
      }
    ],
    mantras: ["ॐ दुं दुर्गायै नमः", "सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके", "या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता"],
    festivals: ["Navratri", "Durga Puja", "Vijayadashami"],
    lifeLesson: "When facing overwhelming challenges, invoke Durga Maa's courage. The power to overcome any difficulty already exists within you - channel it with focus and determination."
  },
  {
    id: "hanuman",
    name: "Lord Hanuman",
    sanskrit: "श्री हनुमान",
    description: "The embodiment of devotion, strength, and selfless service.",
    emoji: "🙏",
    color: "bg-accent/20",
    introduction: "Lord Hanuman, the mighty vanara (monkey god), is the embodiment of pure devotion (bhakti), selfless service (seva), and immense strength. As the greatest devotee of Lord Rama, he played a crucial role in the Ramayana. He represents what a devotee can achieve through unwavering faith.",
    chapters: [
      {
        id: 1,
        title: "Divine Birth & Origins",
        content: "Hanuman was born to Anjana and Kesari. Vayu (the wind god) also played a role in his birth, making Hanuman known as Vayuputra (son of wind). His mother Anjana was an apsara (celestial nymph) cursed to be born as a vanara. On the day of his birth, the infant Hanuman saw the rising sun and, thinking it was a ripe fruit, leapt toward it. Indra struck him with his thunderbolt, and the gods blessed the child with various powers. Thus began the life of the extraordinary Hanuman."
      },
      {
        id: 2,
        title: "Childhood & Curse",
        content: "Young Hanuman was mischievous and incredibly powerful. He disturbed the meditations of sages who, in their frustration, cursed him to forget his powers until reminded by someone. This curse became a blessing in disguise, teaching Hanuman humility. He grew up in Kishkindha, unaware of his true capabilities. His education came from Surya (the sun god) himself, whom he chased as an infant. Hanuman learned all the scriptures, gaining knowledge equal to his strength."
      },
      {
        id: 3,
        title: "Meeting Lord Rama",
        content: "When Rama and Lakshmana came to Kishkindha searching for Sita, Sugriva sent Hanuman in disguise to meet them. The moment Hanuman saw Rama, his life found its purpose. He recognized the divine and devoted himself completely. When Sugriva and Rama became allies, Hanuman became Rama's most dedicated servant. This meeting was the turning point that awakened his dormant powers and defined his eternal role."
      },
      {
        id: 4,
        title: "The Leap to Lanka",
        content: "When no other vanara could cross the ocean to find Sita in Lanka, Jambavan reminded Hanuman of his true powers. Awakened, Hanuman grew to an enormous size and leapt across the sea. He faced Surasa (a serpent goddess) and Simhika (a shadow-catching demoness) but overcame all obstacles with cleverness and strength. Reaching Lanka, he found Sita in the Ashoka Vatika, delivered Rama's message, and gave her hope."
      },
      {
        id: 5,
        title: "Burning Lanka & Bringing Sanjeevani",
        content: "Captured by Ravana's forces, Hanuman allowed himself to be brought before the demon king. When his tail was set on fire, he broke free and used that burning tail to set Lanka ablaze. During the war, when Lakshmana lay dying, Hanuman flew to the Himalayas. Unable to identify the Sanjeevani herb, he lifted the entire mountain and brought it back, saving Lakshmana's life. This act exemplifies his 'whatever it takes' devotion."
      },
      {
        id: 6,
        title: "Devotion to Rama",
        content: "Hanuman's devotion is legendary. When asked where Rama resides, he tore open his chest to reveal Rama and Sita in his heart. He refused liberation (moksha) when offered, choosing instead to remain on Earth serving Rama's name. He asked only for the boon of eternal life to continue chanting Rama's name. He sits wherever the Ramayana is recited, listening with tears of devotion. His love for Rama is the purest form of bhakti."
      },
      {
        id: 7,
        title: "Chiranjeevi - The Immortal",
        content: "Hanuman is one of the Chiranjeevis - immortals who live through all four Yugas. He is present wherever Rama's name is chanted. Devotees believe he still visits places where the Ramayana is recited. In the Mahabharata, he appeared to his brother Bhima. He is said to reside in the Himalayas and on the Gandhamadana mountain. His presence gives strength and protection to all who remember him."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Hanuman, we learn: 1) True strength comes from devotion to a higher purpose. 2) Humility increases power - Hanuman forgot his abilities, making him stronger when they returned. 3) Selfless service (seva) is the highest form of worship. 4) 'Whatever it takes' attitude - lift the mountain if needed. 5) Remain loyal even when it's difficult. 6) Physical strength means nothing without moral strength. 7) Chanting the divine name keeps one connected to the supreme."
      }
    ],
    mantras: ["ॐ हनुमते नमः", "हनुमान चालीसा", "बजरंग बाण"],
    festivals: ["Hanuman Jayanti", "Tuesday Worship", "Saturday Worship"],
    lifeLesson: "When you feel powerless, remember Hanuman. Your true strength lies dormant until awakened by a worthy purpose. Devote yourself completely, and no obstacle will be too great."
  },
  {
    id: "lakshmi",
    name: "Goddess Lakshmi",
    sanskrit: "माँ लक्ष्मी",
    description: "The goddess of wealth, fortune, prosperity, and beauty.",
    emoji: "✨",
    color: "bg-secondary/20",
    introduction: "Goddess Lakshmi is the divine consort of Lord Vishnu and the goddess of wealth, prosperity, fortune, and beauty. She emerged from the churning of the cosmic ocean (Samudra Manthan) and chose Vishnu as her eternal consort. She blesses devotees with both material and spiritual abundance.",
    chapters: [
      {
        id: 1,
        title: "Divine Origin from the Ocean",
        content: "When the devas and asuras churned the cosmic ocean for Amrita (nectar of immortality), many divine treasures emerged. Among them, seated on a lotus, appeared the radiant Goddess Lakshmi. All the gods and demons desired her as their consort. But Lakshmi, seeing only Lord Vishnu as worthy, garlanded him and chose to be his eternal companion. She emerged from the ocean dressed in red, holding lotus flowers, her beauty illuminating all directions."
      },
      {
        id: 2,
        title: "Eternal Companion of Vishnu",
        content: "In Vaikuntha, the divine abode, Lakshmi serves Lord Vishnu eternally. She presses his feet as he rests on Shesha Naga. In every avatar of Vishnu, she incarnates alongside him - as Sita with Rama, as Rukmini and Radha with Krishna, as Dharani with Varaha. Her presence with Vishnu represents the inseparable nature of prosperity and righteousness. Without dharma, wealth becomes destructive; without wealth, dharma cannot flourish."
      },
      {
        id: 3,
        title: "The Eight Forms (Ashta Lakshmi)",
        content: "Goddess Lakshmi manifests in eight forms: Adi Lakshmi (primordial prosperity), Dhana Lakshmi (monetary wealth), Dhanya Lakshmi (food grains), Gaja Lakshmi (royal power), Santana Lakshmi (children), Veera Lakshmi (courage), Vidya Lakshmi (knowledge), and Vijaya Lakshmi (victory). Together, these eight forms represent complete prosperity - material, spiritual, and emotional. Devotees worship all eight forms for holistic abundance."
      },
      {
        id: 4,
        title: "Lessons from Her Incarnations",
        content: "As Sita, Lakshmi endured kidnapping and years of suffering, showing that wealth does not exempt one from trials. As Rukmini, she wrote a secret letter to Krishna, teaching that dignity allows asking for help. In each incarnation, she demonstrated that true prosperity includes patience, faith, and grace under pressure. Her stories teach that wealth is not merely money but includes dignity, family, knowledge, and spiritual richness."
      },
      {
        id: 5,
        title: "The Importance of Cleanliness & Order",
        content: "Lakshmi resides where there is cleanliness, order, and harmony. She leaves places of dirt, laziness, and discord. Her sister Alakshmi (misfortune) occupies neglected spaces. This teaching emphasizes that prosperity comes to those who maintain physical cleanliness, mental clarity, and organized living. Lighting lamps, keeping the home clean, and maintaining harmony invites Lakshmi's blessings."
      },
      {
        id: 6,
        title: "Worship & Diwali",
        content: "Diwali, the festival of lights, is primarily a celebration of Lakshmi. On Lakshmi Puja night, homes are cleaned, decorated with rangoli and lights, and new clothes are worn. Merchants close old account books and open new ones. Lakshmi is worshipped alongside Ganesha (for success) and Saraswati (for wisdom). The lights guide her to homes filled with love and devotion. Regular Friday worship also honors her."
      },
      {
        id: 7,
        title: "The Restless Nature of Lakshmi",
        content: "Unlike Vishnu who is steady, Lakshmi is described as 'Chanchala' - restless, always moving. This reflects the nature of wealth itself - it comes and goes. Therefore, devotees are taught not to hoard or misuse wealth, for Lakshmi will leave. She stays where wealth is used righteously - for charity, family care, and dharmic purposes. Greed and arrogance drive her away; generosity and humility attract her."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lakshmi Maa, we learn: 1) True wealth includes health, family, knowledge, and peace - not just money. 2) Keep your home, mind, and relationships clean and orderly. 3) Wealth must be paired with righteousness or it becomes destructive. 4) Be generous - hoarding drives away prosperity. 5) Respect wealth without worshipping it. 6) Work with dignity; Lakshmi blesses sincere effort. 7) Light dispels darkness - maintain hope and positivity."
      }
    ],
    mantras: ["ॐ श्रीं महालक्ष्म्यै नमः", "ॐ ह्रीं श्रीं लक्ष्मीभ्यो नमः", "महालक्ष्मी अष्टक"],
    festivals: ["Diwali", "Sharad Purnima", "Friday Worship", "Varalakshmi Vratam"],
    lifeLesson: "True prosperity flows to those who maintain cleanliness, order, and generosity. Honor wealth as sacred, use it righteously, and it will grow in your life."
  },
  {
    id: "rama",
    name: "Lord Rama",
    sanskrit: "श्री राम",
    description: "The embodiment of dharma, the ideal man, king, and son.",
    emoji: "🏹",
    color: "bg-primary/10",
    introduction: "Lord Rama, the seventh avatar of Vishnu, is celebrated as Maryada Purushottam - the ideal man who followed dharma perfectly. His life, as told in the Ramayana by Sage Valmiki and later by Tulsidas in Ramcharitmanas, is a guide for righteous living. He is worshipped as the embodiment of truth, duty, and virtue.",
    chapters: [
      {
        id: 1,
        title: "Divine Birth in Ayodhya",
        content: "King Dasharatha of Ayodhya performed the Putrakameshti Yagna (sacrifice for sons) under Sage Rishyashringa's guidance. From the sacred fire emerged a divine being carrying a bowl of kheer (sacred pudding). The three queens - Kaushalya, Kaikeyi, and Sumitra - consumed the prasad and were blessed with sons. Rama was born to Kaushalya on the ninth day of Chaitra (Ram Navami). His three brothers - Bharata, Lakshmana, and Shatrughna - followed. The kingdom rejoiced at the prince who embodied divinity."
      },
      {
        id: 2,
        title: "Education & Youth",
        content: "Sage Vasishtha educated the four princes in scriptures, warfare, and dharma. Later, Sage Vishwamitra took Rama and Lakshmana to protect his yagna from demons. Young Rama killed the demoness Tataka and received divine weapons. He freed Ahalya from her curse with the touch of his feet. At Mithila, he lifted and broke Lord Shiva's bow, winning Sita's hand in marriage. His brothers also married Sita's sister and cousins in a grand ceremony."
      },
      {
        id: 3,
        title: "Exile to the Forest",
        content: "When Rama was to be crowned king, Queen Kaikeyi, manipulated by her maid Manthara, demanded two boons from Dasharatha: crown Bharata as king and exile Rama for fourteen years. Though the kingdom wept, Rama accepted the exile without a word of protest, honoring his father's word. Sita and Lakshmana insisted on accompanying him. Dressed as ascetics, they departed for the Dandaka forest, embodying sacrifice for the sake of family honor."
      },
      {
        id: 4,
        title: "Years in the Forest",
        content: "During the exile, Rama, Sita, and Lakshmana lived as forest dwellers. They met sages, protected hermitages from demons, and lived simply. The demoness Shurpanakha's advances were rejected, leading her brother Ravana to scheme revenge. Using the golden deer Maricha as a lure, Ravana kidnapped Sita while Rama was away. The grief-stricken Rama vowed to find her, beginning an epic search."
      },
      {
        id: 5,
        title: "Alliance & the Search for Sita",
        content: "The dying Jatayu told Rama of Sita's abduction. In Kishkindha, Rama met Hanuman and formed an alliance with Sugriva after defeating Vali. The vanara army searched the four directions. Hanuman leaped to Lanka, found Sita, and returned with proof. Rama led the army to the ocean, built the Rama Setu bridge, and marched to Lanka. Each challenge was overcome through dharma, strategy, and the devotion of allies."
      },
      {
        id: 6,
        title: "The War in Lanka",
        content: "The battle between Rama's forces and Ravana's demons lasted many days. Great warriors fell on both sides. Indrajit's magic weapons, Kumbhakarna's might, and Ravana's ten heads posed tremendous challenges. Lakshmana nearly died but was saved by Hanuman bringing the Sanjeevani mountain. Finally, Rama killed Ravana with the Brahmastra, ending the demon king's tyranny. Vibhishana, Ravana's righteous brother, was crowned king of Lanka."
      },
      {
        id: 7,
        title: "Return to Ayodhya & Reign",
        content: "After Sita's Agni Pariksha (fire ordeal) proving her purity, Rama, Sita, and the others returned to Ayodhya in the Pushpaka Vimana. The kingdom celebrated with lights and joy - the origin of Diwali. Rama was crowned king, beginning Ram Rajya - an era of peace, prosperity, and justice that became the ideal of governance. For many years, the kingdom flourished under his righteous rule."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Rama, we learn: 1) Honor your word and your family's word, even at great personal cost. 2) Treat everyone with respect - Rama befriended vanaras, bore witness to a bird's devotion, and honored even enemies like Ravana's funeral rites. 3) A leader shares in his people's suffering. 4) Righteousness may demand sacrifice, but truth ultimately triumphs. 5) Even God chooses to live by dharma. 6) Love is patient, forgiving, and eternal. 7) True strength is gentleness combined with unwavering principle."
      }
    ],
    mantras: ["श्री राम जय राम जय जय राम", "ॐ रामाय नमः", "रामरक्षास्तोत्रम्"],
    festivals: ["Ram Navami", "Diwali", "Vivah Panchami", "Ram Leela"],
    lifeLesson: "Walk the path of dharma even when it's difficult. Like Lord Rama, your integrity and truthfulness will ultimately lead to victory over all obstacles."
  },
  {
    id: "krishna",
    name: "Lord Krishna",
    sanskrit: "श्री कृष्ण",
    description: "The divine charioteer, the speaker of the Bhagavad Gita, the complete avatar.",
    emoji: "🦚",
    color: "bg-accent/20",
    introduction: "Lord Krishna, the eighth avatar of Vishnu, is considered Purna Avatar - the complete incarnation. From the playful child of Vrindavan to the wise charioteer of Kurukshetra, he embodies love, wisdom, and divine play (leela). His teachings in the Bhagavad Gita guide millions on the path of dharma and self-realization.",
    chapters: [
      {
        id: 1,
        title: "Birth in the Prison of Mathura",
        content: "The tyrant King Kamsa of Mathura imprisoned his sister Devaki and her husband Vasudeva after a prophecy foretold that Devaki's eighth child would kill him. Kamsa killed six newborns. The seventh (Balarama) was mystically transferred to Rohini. On Ashtami night, Krishna was born with divine signs - the prison doors opened, guards fell asleep, and chains fell away. Vasudeva carried the newborn across the flooding Yamuna to Gokul, exchanged him with Yashoda's daughter, and returned."
      },
      {
        id: 2,
        title: "Divine Childhood in Gokul & Vrindavan",
        content: "In Gokul, raised by Nanda and Yashoda, Krishna's childhood was filled with divine play. He killed the demoness Putana who came as a nurse with poisoned breasts. He showed mother Yashoda the entire universe in his mouth. He lifted Govardhan mountain to protect the villagers from Indra's wrath. His butter-stealing antics delighted the gopas and gopis. The Yamuna banks echoed with his flute, drawing all beings to him with divine love."
      },
      {
        id: 3,
        title: "Youth & the Killing of Kamsa",
        content: "As Krishna grew, he defeated demon after demon sent by Kamsa - Aghasura, Bakasura, and many others. Finally, Kamsa invited the brothers to Mathura for a wrestling match, planning their death. Krishna and Balarama entered the arena, killed the elephant Kuvalayapeeda and the wrestlers, then killed Kamsa himself. They freed their parents from prison and restored the rightful king, Ugrasena, to the throne. This marked the end of Krishna's pastoral childhood."
      },
      {
        id: 4,
        title: "The Kingdom of Dwaraka",
        content: "Attacked repeatedly by Jarasandha, Krishna decided to relocate his people. He built the magnificent island city of Dwaraka in the sea. There he married Rukmini, whom he carried away from an unwanted marriage, and later Satyabhama and others. He killed Narakasura, freeing 16,100 captive women whom he married to restore their honor. Dwaraka became a prosperous kingdom where Krishna ruled with wisdom and justice."
      },
      {
        id: 5,
        title: "The Mahabharata & Friendship with Pandavas",
        content: "Krishna was cousin and friend to the Pandavas. He attended Draupadi's swayamvara, protected her during her humiliation, and guided the Pandavas through their exile. When war became inevitable, both Arjuna and Duryodhana came to him for alliance. Krishna offered: his army to one side, himself (unarmed) to the other. Duryodhana chose the army; Arjuna chose Krishna as his charioteer. This choice determined the war's outcome."
      },
      {
        id: 6,
        title: "The Bhagavad Gita",
        content: "On the battlefield of Kurukshetra, seeing his relatives and teachers on the opposing side, Arjuna dropped his weapons in despair. Krishna then spoke the Bhagavad Gita - 700 verses of supreme wisdom. He taught about the eternal soul, the three paths (karma, bhakti, jnana), detachment from fruits of action, and the nature of the divine. He revealed his cosmic form (Vishwaroop). The Gita remains humanity's guide to righteous living and self-realization."
      },
      {
        id: 7,
        title: "Final Days & Departure",
        content: "After the war, the Yadava clan was cursed for an offense against sages. Krishna knew the end was near. Civil war erupted among the Yadavas in a drunken brawl, and they destroyed each other. Balarama departed through meditation. Krishna, seated in meditation under a tree, was mistakenly shot in the foot by a hunter named Jara. He forgave the hunter and departed to his divine abode. Dwaraka was submerged by the sea. Thus ended Krishna's earthly play."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Krishna, we learn: 1) Do your duty without attachment to results (Nishkama Karma). 2) The soul is eternal; grief for the inevitable is needless. 3) Righteousness may require difficult choices - war against injustice is dharma. 4) Divine love transcends all social barriers - the gopis' devotion shows the highest bhakti. 5) Play and joy are divine qualities. 6) Friendship with God is possible through surrender. 7) In darkest moments, divine guidance comes to the sincere seeker."
      }
    ],
    mantras: ["हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे", "ॐ कृष्णाय वासुदेवाय हरये परमात्मने", "ॐ नमो भगवते वासुदेवाय"],
    festivals: ["Krishna Janmashtami", "Holi", "Govardhan Puja", "Ratha Yatra"],
    lifeLesson: "When paralyzed by difficult decisions, remember Krishna's teaching: Do what is right without attachment to outcomes. The divine works through you when you surrender your ego."
  },
  {
    id: "saibaba",
    name: "Sai Baba of Shirdi",
    sanskrit: "साईं बाबा",
    description: "The saint who taught unity of all religions and the importance of faith and patience.",
    emoji: "🙏",
    color: "bg-secondary/20",
    introduction: "Shirdi Sai Baba, the humble saint who lived in a dilapidated mosque in the small town of Shirdi, Maharashtra, is revered by millions across religions. His teachings of 'Shraddha' (faith) and 'Saburi' (patience) continue to guide devotees. He demonstrated that God is one, regardless of the name used.",
    chapters: [
      {
        id: 1,
        title: "Mysterious Arrival in Shirdi",
        content: "No one knows where Sai Baba came from. As a young man, he appeared under a neem tree in Shirdi around 1858. The villagers were puzzled by this stranger who sat in meditation for hours. He left for some time and returned around 1858-1860 with a wedding procession, after which he settled permanently in Shirdi. He took residence in a dilapidated mosque he called 'Dwarkamai'. His origins remained a mystery - he never revealed his birth, parentage, or caste."
      },
      {
        id: 2,
        title: "Early Years in Shirdi",
        content: "Initially, the villagers thought him mad. He would beg for food from a few houses, kept a fire (dhuni) constantly burning, and spoke in riddles. Gradually, people noticed miraculous occurrences - healing of the sick, knowing the future, reading minds. Mhalsapati, a local priest, was among the first to recognize his spiritual greatness and gave him the name 'Sai' (saint). Slowly, devotees began to gather around this unusual holy man."
      },
      {
        id: 3,
        title: "Teaching Through Daily Life",
        content: "Baba taught not through lectures but through daily interactions. He asked for dakshina (offerings) from some and refused from others, teaching detachment. He made a Brahmin Hindu prepare his food in a mosque, breaking religious barriers. He celebrated Hindu and Muslim festivals alike. He tended the sick personally, ground wheat for the village, and shared food with all beings. Every act was a teaching in humility and service."
      },
      {
        id: 4,
        title: "Miracles of the Saint",
        content: "Countless miracles are attributed to Sai Baba. He lit lamps with water when denied oil. He appeared simultaneously in different places to save devotees in danger. He cured the incurable by giving ordinary substances as medicine. He predicted events accurately. He extracted wealth to help the poor. He knew every devotee's thoughts and addressed them before they spoke. Yet he always said, 'Allah Malik' (God is the Master), giving all credit to the divine."
      },
      {
        id: 5,
        title: "Core Teachings",
        content: "Sai Baba's teachings were simple yet profound: 1) 'Shraddha and Saburi' - faith and patience will take you to the goal. 2) 'Allah Malik Ek' - God is One, regardless of what you call him. 3) 'Why fear when I am here' - assurance of divine protection to devotees. 4) 'Give food to the hungry' - service to the poor is service to God. 5) Never harm any being. 6) Control anger and desire. 7) See God in all creatures."
      },
      {
        id: 6,
        title: "Relationship with Devotees",
        content: "Sai Baba had unique relationships with each devotee. To Mrs. Tarkhad, he appeared as a stray dog to accept her food offering. To Das Ganu, he taught the essence of scriptures. He called devotees to Shirdi in dreams and visions. He gave personal guidance tailored to each person's needs. He was a stern guru to some, a loving mother to others. He promised to be active even after leaving the body - 'I will respond to devotees from my tomb.'"
      },
      {
        id: 7,
        title: "Final Days & Mahasamadhi",
        content: "In 1918, Sai Baba predicted his departure. He gave away all his possessions and distributed money. On Vijayadashami (October 15, 1918), surrounded by devotees, he left his body peacefully. His last words were about sending his devotee Tatya Patil in his place (Tatya was dying but recovered). His body was placed in the samadhi in Butti Wada, which became Shirdi Samadhi Mandir, now a major pilgrimage site."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Sai Baba, we learn: 1) 'Shraddha and Saburi' - faith and patience solve all problems. 2) God responds to sincerity, not rituals. 3) Helping the poor is the highest worship. 4) Religious labels divide; divine love unites. 5) The guru appears when the student is ready. 6) Simple living and high thinking lead to peace. 7) 'Why fear when I am here' - maintain courage, divine protection is always present. 8) Death is a doorway, not an ending - the saint continues to guide from beyond."
      }
    ],
    mantras: ["ॐ साईं नमः", "ॐ साईं राम", "श्री सच्चिदानंद सद्गुरु साईंनाथ महाराज की जय"],
    festivals: ["Guru Purnima", "Ram Navami (at Shirdi)", "Vijayadashami", "Thursday Worship"],
    lifeLesson: "In times of worry, remember Baba's words: 'Why fear when I am here?' Trust in divine timing, maintain faith and patience, and your difficulties will transform into blessings."
  },
  {
    id: "gurunanak",
    name: "Guru Nanak Dev Ji",
    sanskrit: "गुरु नानक देव जी",
    description: "The founder of Sikhism who taught the oneness of God and equality of all humans.",
    emoji: "☬",
    color: "bg-primary/10",
    introduction: "Guru Nanak Dev Ji, born in 1469, is the founder of Sikhism and the first of the ten Sikh Gurus. His revolutionary teachings of one God, equality of all humans, honest living, and selfless service laid the foundation for a new path. His message transcended religious boundaries and social divisions.",
    chapters: [
      {
        id: 1,
        title: "Birth & Divine Childhood",
        content: "Guru Nanak was born on April 15, 1469, in Rai Bhoi di Talwandi (now Nankana Sahib, Pakistan) to Mehta Kalu Ji and Mata Tripta Ji. From childhood, he showed extraordinary spiritual awareness. He questioned empty rituals, refused the sacred thread ceremony, and amazed his teachers with his wisdom. The money his father gave him for business, he spent feeding hungry saints, calling it 'Sacha Sauda' (true bargain). His divine nature was evident from the start."
      },
      {
        id: 2,
        title: "The Divine Disappearance",
        content: "At age 30, while bathing in the river Bein, Nanak disappeared for three days. People thought he had drowned. When he emerged, he remained silent for a day, then spoke his first words: 'There is no Hindu, there is no Muslim.' He had experienced divine enlightenment and received his mission. He described being taken to the divine court where he was given the task of spreading the name of God. From that moment, he began his teaching mission."
      },
      {
        id: 3,
        title: "The Four Great Journeys (Udasis)",
        content: "Guru Nanak undertook four major journeys (Udasis) covering thousands of kilometers on foot, accompanied by his Muslim companion Mardana who played the rebab. He traveled east to Assam and Bengal, south to Sri Lanka, north to Tibet and the Himalayas, and west to Mecca and Baghdad. Everywhere, he engaged with people of all faiths, debated with scholars, and shared his message of divine unity and human equality."
      },
      {
        id: 4,
        title: "Miraculous Events & Teachings",
        content: "Many miraculous events occurred during Guru Nanak's journeys. At Mecca, when he slept with his feet toward the Kaaba, a priest scolded him. Nanak replied, 'Turn my feet where God is not.' When the priest moved his feet, the Kaaba reportedly moved with them. He made bitter fruit sweet, stopped a boulder with his hand, and made a dried well flow. Yet he always used these events to teach deeper truths about devotion and the nature of God."
      },
      {
        id: 5,
        title: "Core Teachings",
        content: "Guru Nanak's teachings centered on three pillars: Naam Japna (remembering God), Kirat Karni (earning an honest living), and Vand Chakna (sharing with others). He rejected caste distinctions, declaring all humans equal. He promoted the status of women in an age of severe discrimination. He taught that God is one, formless, and accessible to all through sincere devotion. He rejected empty rituals and emphasized inner transformation."
      },
      {
        id: 6,
        title: "Founding Kartarpur",
        content: "In his final years, Guru Nanak settled in Kartarpur (now in Pakistan), where he established the first Sikh community. He practiced what he preached, working as a farmer while continuing to teach and compose hymns. The community langar (free kitchen) was established, where all ate together regardless of caste or status. The evening congregations of singing and meditation became the template for Sikh worship. This was the prototype of the Sikh community."
      },
      {
        id: 7,
        title: "Final Days & Succession",
        content: "Before his death, Guru Nanak chose his devoted disciple Bhai Lehna as his successor over his own sons. He renamed him Angad (part of my body) and established the line of Gurus that would continue for nine more generations. On September 22, 1539, Guru Nanak departed peacefully. Hindus and Muslims disputed over his funeral rites. Legend says when the sheet was removed, only flowers remained - Hindus and Muslims each took the flowers for their respective rites."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Guru Nanak, we learn: 1) God is One - call Him by any name, but know His unity. 2) All humans are equal; caste, religion, and status are human inventions. 3) Earn honestly and share with those in need. 4) Rituals without sincere devotion are empty. 5) Stand against injustice - truth must be spoken even before kings. 6) Women deserve equal respect; they are central to family and society. 7) Remember God in all your actions - 'work is worship' when done with divine awareness."
      }
    ],
    mantras: ["इक ओंकार सतनाम", "वाहे गुरु जी का खालसा, वाहे गुरु जी की फतेह", "मूल मंत्र"],
    festivals: ["Guru Nanak Jayanti", "Baisakhi", "Gurpurab"],
    lifeLesson: "Live honestly, share generously, and remember the One in all your actions. As Guru Nanak taught, true spirituality is not in rituals but in how you treat others and conduct your daily life."
  },
  {
    id: "murugan",
    name: "Lord Murugan",
    sanskrit: "भगवान मुरुगन",
    description: "The god of war and victory, the divine son of Shiva and Parvati.",
    emoji: "🦚",
    color: "bg-accent/20",
    introduction: "Lord Murugan, also known as Kartikeya, Skanda, and Subramanya, is the Hindu god of war and victory. He is the elder son of Shiva and Parvati, and brother of Ganesha. He is especially revered in South India and among Tamil communities worldwide. His worship represents the victory of good over evil.",
    chapters: [
      {
        id: 1,
        title: "Divine Birth",
        content: "The demon Tarakasura had received a boon that only Lord Shiva's son could kill him. The gods prayed for Shiva, who was in deep meditation, to have a son. When Shiva's energy was released, it was too powerful for any being to contain. Agni (fire god) carried it, but even he couldn't bear it. Finally, six sparks fell into the Ganges and were received by six Krittikas (divine mothers). Six babies were born, and Parvati lovingly merged them into one divine child with six faces - Shanmukha."
      },
      {
        id: 2,
        title: "Childhood & Divine Powers",
        content: "Young Murugan was raised by the six Krittikas in a celestial setting. His six faces allowed him to see in all directions simultaneously, symbolizing omniscience. He was nursed by the divine mothers and trained by the greatest warriors. Even as a child, he displayed exceptional valor and wisdom. His father Shiva was pleased with his son's divine qualities. The peacock Paravani became his mount, symbolizing the conquest of ego (the serpent the peacock defeats)."
      },
      {
        id: 3,
        title: "The War Against Tarakasura",
        content: "When the time came, the gods appointed young Murugan as the commander of the divine army. Armed with the Vel (divine spear) given by his mother Parvati, he led the devas against Tarakasura's forces. The battle was fierce. Murugan's six faces coordinated a perfect strategy, his twelve arms wielded divine weapons. He finally slew Tarakasura with his Vel, fulfilling the prophecy and freeing the world from the demon's tyranny. He became known as 'Devasenapati' - commander of the divine army."
      },
      {
        id: 4,
        title: "The Race Around the World",
        content: "Once, Narada brought a magical fruit that could only be eaten by one person. Both Murugan and Ganesha wanted it. Their parents set a competition: whoever circled the world first would win the fruit. Murugan mounted his peacock and flew around the universe. When he returned, he found Ganesha had already won - by simply circling their parents, saying they were his entire world. Murugan felt humiliated and retreated to Palani hill, where his mother pacified him with the wisdom that he was the fruit (Pazham Ni - 'you are the fruit')."
      },
      {
        id: 5,
        title: "The Guru of Shiva",
        content: "In a profound reversal of roles, Murugan once became the guru of his own father. When Brahma could not explain the meaning of the sacred syllable 'Om', young Murugan understood its deepest secrets. Shiva himself asked his son to enlighten him. The child instructed the Supreme Being, earning the title 'Swaminatha' (lord of the lord). This event shows that wisdom knows no age, and truth flows where it will."
      },
      {
        id: 6,
        title: "Divine Marriages",
        content: "Lord Murugan married two consorts representing different aspects of devotion. Devasena (Devayanai), the daughter of Indra, represents the devout soul that is given to God by tradition and family. Valli, a tribal princess, represents the soul that God actively seeks and wins through love. Murugan appeared to Valli in various disguises to win her heart. Together, his marriages show that divine union comes both through tradition and personal spiritual effort."
      },
      {
        id: 7,
        title: "Six Sacred Abodes (Arupadai Veedu)",
        content: "Six temples in Tamil Nadu are considered Murugan's special abodes: Thiruthani, Swamimalai, Palani, Thiruchendur, Thiruparankundram, and Pazhamudhircholai. Each represents a different aspect of his worship and different events from his mythology. Pilgrimage to all six is considered highly meritorious. The kavadi processions during Thai Pusam, where devotees carry decorated arches as acts of devotion, are among the most spectacular religious events in Hinduism."
      },
      {
        id: 8,
        title: "Life Lessons for Devotees",
        content: "From Lord Murugan, we learn: 1) Courage and valor are divine qualities - stand against evil fearlessly. 2) The divine plan works even through apparent delays - Murugan's birth came when the time was right. 3) Youth is not a barrier to wisdom - even the young can be teachers. 4) The Vel symbolizes focused spiritual energy that cuts through ignorance. 5) Different paths (like Devasena and Valli) lead to the same divine union. 6) Disappointment can lead to deeper wisdom (Palani incident). 7) Victory comes through both strength and strategy."
      }
    ],
    mantras: ["ॐ सरवणभवाय नमः", "वेल वेल मुरुगा", "ॐ शरवणभवाय नमः"],
    festivals: ["Thai Pusam", "Skanda Sashti", "Vaikasi Visakam", "Panguni Uthiram"],
    lifeLesson: "Face your battles with the courage of Murugan. His Vel represents focused spiritual energy - when you direct your mind with purpose, no obstacle can withstand you."
  }
];

export const getDeityById = (id: string): Deity | undefined => {
  return deities.find(deity => deity.id === id);
};

export const rashis = [
  { name: "Aries", sanskrit: "मेष", symbol: "♈", startDate: { month: 3, day: 21 }, endDate: { month: 4, day: 19 } },
  { name: "Taurus", sanskrit: "वृषभ", symbol: "♉", startDate: { month: 4, day: 20 }, endDate: { month: 5, day: 20 } },
  { name: "Gemini", sanskrit: "मिथुन", symbol: "♊", startDate: { month: 5, day: 21 }, endDate: { month: 6, day: 20 } },
  { name: "Cancer", sanskrit: "कर्क", symbol: "♋", startDate: { month: 6, day: 21 }, endDate: { month: 7, day: 22 } },
  { name: "Leo", sanskrit: "सिंह", symbol: "♌", startDate: { month: 7, day: 23 }, endDate: { month: 8, day: 22 } },
  { name: "Virgo", sanskrit: "कन्या", symbol: "♍", startDate: { month: 8, day: 23 }, endDate: { month: 9, day: 22 } },
  { name: "Libra", sanskrit: "तुला", symbol: "♎", startDate: { month: 9, day: 23 }, endDate: { month: 10, day: 22 } },
  { name: "Scorpio", sanskrit: "वृश्चिक", symbol: "♏", startDate: { month: 10, day: 23 }, endDate: { month: 11, day: 21 } },
  { name: "Sagittarius", sanskrit: "धनु", symbol: "♐", startDate: { month: 11, day: 22 }, endDate: { month: 12, day: 21 } },
  { name: "Capricorn", sanskrit: "मकर", symbol: "♑", startDate: { month: 12, day: 22 }, endDate: { month: 1, day: 19 } },
  { name: "Aquarius", sanskrit: "कुंभ", symbol: "♒", startDate: { month: 1, day: 20 }, endDate: { month: 2, day: 18 } },
  { name: "Pisces", sanskrit: "मीन", symbol: "♓", startDate: { month: 2, day: 19 }, endDate: { month: 3, day: 20 } }
];

export const getRashiFromDate = (date: Date): typeof rashis[0] | null => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const rashi of rashis) {
    if (
      (month === rashi.startDate.month && day >= rashi.startDate.day) ||
      (month === rashi.endDate.month && day <= rashi.endDate.day) ||
      (rashi.startDate.month === 12 && rashi.endDate.month === 1 && 
        ((month === 12 && day >= rashi.startDate.day) || (month === 1 && day <= rashi.endDate.day)))
    ) {
      return rashi;
    }
  }
  return rashis[0];
};

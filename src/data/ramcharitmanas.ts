import { MoodType, InstrumentType } from '@/hooks/useDivineAudio';

export interface Verse {
  hindi?: string;
  transliteration?: string;
  english: string;
}

export interface RamcharitmanasChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle?: string;
  content: string;
  verses?: Verse[];
  mood: MoodType;
  instrument: InstrumentType;
}

export interface Kand {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  chapters: RamcharitmanasChapter[];
  totalChapters: number;
}

// Ramcharitmanas content extracted from the PDF - Goswami Tulsidas ji's sacred work
export const ramcharitmanasKands: Kand[] = [
  {
    id: "bal-kand",
    name: "Bāla Kāṇḍa",
    hindiName: "बालकाण्ड",
    description: "The Book of Childhood - Narrates the birth and early life of Lord Rama, including the divine sports of His childhood.",
    totalChapters: 8,
    chapters: [
      {
        id: "bal-1",
        chapterNumber: 1,
        title: "Invocations & Salutations",
        subtitle: "Mangalacharan - Divine Invocations",
        content: `I reverence Vāṇī (the goddess of speech) and Vināyaka (Lord Gaṇeśa), the originators of sounds represented by the alphabet, of the multitudes of objects denoted by those sounds, of poetic sentiments as well as of metres, and the begetters of all blessings.

I greet Goddess Pārvatī and Her consort, Bhagavān Śaṅkara, embodiments of reverence and faith respectively, without which even the adept cannot perceive God enshrined in their very heart.

I make obeisance to the eternal preceptor in the form of Lord Śaṅkara, who is all wisdom, and resting on whose brow the crescent moon, though crooked in shape, is universally adored.

I pay homage to the king of bards (Vālmīki) and the chief of monkeys (Hanumān), of pure intelligence, both of whom sport in the holy woods in the shape of glories of Sītā and Rāma.

I bow to Sītā the beloved consort of Śrī Rāma, who is responsible for the creation, sustenance and dissolution of the universe, removes afflictions and begets all blessings.

I adore Lord Hari, known by the name of Śrī Rāma, who is superior to and lies beyond all causes, whose Māyā (illusive power) holds sway over the entire universe including gods from Brahmā (the Creator) downwards and demons, whose presence lends positive reality to the world of appearances—even as the false notion of a serpent is entertained with reference to a rope—and whose feet are the only bark for those who are eager to cross the ocean of mundane existence.

For the gratification of his own self Tulasīdāsa brings forth this very elegant composition relating in common parlance the story of the Lord of Raghus, which is in accord with the various Purāṇas, Vedas and the Āgamas (Tantras), and incorporates what has been recorded in the Rāmāyaṇa (of Vālmīki) and culled from some other sources.

May Lord Gaṇeśa, the leader of Śiva's retinue, whose very thought ensures success, who carries on his shoulders the head of a beautiful elephant, who is a repository of wisdom and an abode of blessed qualities, shower his grace.`,
        mood: "divine",
        instrument: "tanpura"
      },
      {
        id: "bal-2",
        chapterNumber: 2,
        title: "Salutations to the Guru",
        subtitle: "Guru Vandana",
        content: `I bow to the lotus feet of my Guru, who is an ocean of mercy and is no other than Śrī Hari Himself in human form, and whose words are sunbeams as it were for dispersing the mass of darkness in the form of gross ignorance.

I greet the pollen-like dust of my preceptor's lotus feet, which is lovely and fragrant and saturated with love. It is a powder of the life-giving herb, Miraculous in its potency to wipe out the malady of mundane existence.

Like the auspicious ashes on Lord Śambhu's (Śiva's) form, born of virtue, it is the parent of joy and felicity. It rubs the dirt off the shining mirror of the devotee's heart.

The bright lustre of the nails on the feet of the holy Guru, which I recall when I undertake any important task, is a cluster of shining gems.

Those gems that illumine my heart, which thus acquires the bright light of wisdom—how blessed am I to possess the dust of my Guru's feet!

A Guru who is ignorant is a great misfortune; so too is a disciple who is stupid. They are both to be pitied, for without the capacity for discrimination, neither will be able to find release from the world.`,
        mood: "devotional",
        instrument: "tanpura"
      },
      {
        id: "bal-3",
        chapterNumber: 3,
        title: "The Glory of Lord Rama's Name",
        subtitle: "Nāma Mahimā",
        content: `The Name of Śrī Rāma is greater than Brahma (the Absolute) and the Supreme Deity. The power of the Name has been eulogized by Śiva from his own experience.

The Name saves the devotee from the terror of the world: such is the verdict of the Vedas. The Name is the seed of all spiritual practices, it is the tree that yields the fruit of blessings.

The efficacy of the Name alone can be realized by those who have experienced it. The power of the Name is the guardian of the devoted; it is their only refuge.

Śiva knowingly took nectar, but in his heart he keeps the Name of Rāma—sweeter than nectar. Such is the greatness of Rāma's Name in this world.

Brahmā, Viṣṇu and Śiva—all three lords worship this Name. The Name removes the sins of a sinful age and is the seed of liberation.

One cannot count the glories of the Name of Śrī Rāma; it is inexhaustible, infinite, and ever new. The wise know that the Name of Rāma is the wish-yielding tree in this world.

Repeating the Name in the morning, at noon and in the evening, dispels all sins. The Name is a helper even to a helper—it comes to the aid of the devout.

Those who take the Name with love, considering all beings as images of Śrī Rāma, enjoy all blessings in this world and the next.`,
        mood: "divine",
        instrument: "tanpura"
      },
      {
        id: "bal-4",
        chapterNumber: 4,
        title: "Causes of Śrī Rāma's Descent",
        subtitle: "Rāma Avatāra Kāraṇa",
        content: `There was once a mighty king by the name of Pratāpabhānu, who ruled over the kingdom of Kaikaya. He was virtuous and powerful, yet due to the curse of a sage and the machinations of demons, his dynasty fell.

His descendants were reborn as the demons Rāvaṇa, Kumbhakarṇa and Vibhīṣaṇa. Rāvaṇa performed great austerities and received from Brahmā the boon that he could not be killed by gods, demons, serpents or any other beings except human beings and monkeys—whom he despised.

Armed with this boon, Rāvaṇa conquered the three worlds. He oppressed the gods, the sages, and all righteous beings. The earth, assuming the form of a cow, went to the gods and wept over her woes.

The gods, led by Brahmā, approached Lord Viṣṇu in the ocean of milk and prayed for deliverance. The Lord assured them that He would appear on earth as the son of King Daśaratha for the destruction of Rāvaṇa and his demon race.

Manu and Śatarūpā, the first humans, performed austerities for sixty thousand years to obtain the boon of having the Supreme Lord as their son. The Lord granted their wish, promising to be born as their son in their future lives as Daśaratha and Kausalyā.

Thus, the Lord resolved to descend on earth to protect the righteous, destroy the wicked, and establish dharma. His mission was set in motion by divine will and the prayers of saints, sages and gods.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "bal-5",
        chapterNumber: 5,
        title: "Birth of Lord Rāma",
        subtitle: "Rāma Janma",
        content: `In the city of Ayodhyā, King Daśaratha ruled with righteousness and glory. He had three queens: Kausalyā, Kaikeyī and Sumitrā. Yet despite his greatness, the king had no son to continue his lineage.

The sage Vasiṣṭha advised the king to perform the Putreṣṭi Yajña (sacrifice for obtaining sons). The king invited the great sage Śṛṅga to conduct the sacrifice.

When the sacred fire was kindled and the offerings made, a divine being emerged from the flames carrying a golden vessel filled with divine nectar (payasam). He instructed the king to distribute it among his queens.

King Daśaratha gave half the nectar to Kausalyā, a quarter to Kaikeyī, and an eighth each to Sumitrā (through both senior queens). In due course, all three queens conceived.

On the ninth day of the bright half of the month of Chaitra (Rāma Navamī), when the stars were auspiciously aligned, the Supreme Lord Viṣṇu manifested Himself in the womb of Queen Kausalyā.

The moment of His birth was marked by celestial music, the showering of flowers from heaven, and the chanting of the gods. Mother Kausalyā beheld the divine four-armed form of Lord Viṣṇu—dark blue like a fresh rain cloud, adorned with crown, earrings, and holding the conch, discus, mace and lotus.

Overwhelmed with love and devotion, Kausalyā prayed: "O Lord of the Universe, You have appeared in my womb out of compassion. Please now assume the form of an ordinary human child so that I may nurture You as my son."

The Lord smiled and assumed the form of a beautiful baby with dark complexion and lotus eyes. Joy spread throughout Ayodhyā. King Daśaratha distributed wealth to Brāhmaṇas and the poor. Śrī Rāma, Bharata, Lakṣmaṇa and Śatrughna—the four divine brothers—illumined the royal palace.`,
        mood: "divine",
        instrument: "sitar"
      },
      {
        id: "bal-6",
        chapterNumber: 6,
        title: "Childhood Divine Sports",
        subtitle: "Bāla Līlā",
        content: `The four princes grew up in the royal palace, spreading joy with their divine sports. Śrī Rāma crawled on the palace floors, His anklet bells jingling sweetly, charming all who beheld Him.

The queens would adorn the children and watch them play. When Rāma pretended to be hungry and cried, the gods themselves came in disguise to witness His innocent play.

The princes learned to walk, to speak, and to play with each other. Rāma and Lakṣmaṇa were inseparable; Bharata and Śatrughna were similarly bonded. The people of Ayodhyā found inexhaustible joy in watching the divine children.

The sage Vasiṣṭha performed the naming ceremony. The eldest, son of Kausalyā, was named Rāma—the one who delights all. The son of Kaikeyī was named Bharata—one who sustains. Sumitrā's two sons were named Lakṣmaṇa (marked with auspicious signs) and Śatrughna (destroyer of enemies).

As the princes grew, they were invested with the sacred thread and began their education under the sage Vasiṣṭha. Rāma mastered all the Vedas and scriptures in a short time. His knowledge was limitless, His character spotless.

Rāma and His brothers would play in the gardens, swim in the Sarayū river, and delight all of Ayodhyā. Their beauty, wisdom and grace were the talk of all the three worlds. The demons trembled at news of Rāma's growing strength.

King Daśaratha's heart swelled with pride and love as he watched his sons grow into noble young princes—warriors, scholars and paragons of virtue.`,
        mood: "happy",
        instrument: "flute"
      },
      {
        id: "bal-7",
        chapterNumber: 7,
        title: "Viśvāmitra's Visit",
        subtitle: "Protection of the Sage's Sacrifice",
        content: `The great sage Viśvāmitra arrived at King Daśaratha's court. The king received him with utmost reverence, washing his feet and offering him the best seat.

Viśvāmitra revealed his purpose: demons Mārīca and Subāhu were disrupting his sacred sacrifices. He asked the king to send Rāma, though still a young boy, to protect the sacrifice.

King Daśaratha was shocked. He offered to come himself with his entire army, but the sage insisted on Rāma alone. The king's heart was torn—he could not refuse a sage's request, yet he could not bear to part with his beloved Rāma.

The sage Vasiṣṭha counseled the king: "Fear not, O King. Rāma is no ordinary prince. He is the Supreme Lord Himself. Go with him, Viśvāmitra, and your sacrifice will be protected."

Reluctantly, King Daśaratha agreed. Rāma and Lakṣmaṇa took leave of their parents and departed with the sage. Along the way, Viśvāmitra taught them the mantras Balā and Atibalā—powers that would protect them from hunger, thirst, fatigue and all dangers.

They arrived at the āśrama. The demoness Tāṭakā attacked them, but Rāma slew her with a single arrow. He then stood guard as the sage performed his sacrifice. When Mārīca and Subāhu attacked, Rāma used the divine Mānavāstra to hurl Mārīca across the ocean and killed Subāhu.

The sacrifice was completed successfully. Viśvāmitra blessed Rāma and Lakṣmaṇa with divine weapons and knowledge of all celestial arms. He then said: "Now let us proceed to Mithilā, where King Janaka is holding a great bow-ceremony."`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "bal-8",
        chapterNumber: 8,
        title: "Marriage of Sītā and Rāma",
        subtitle: "Sītā Svayaṃvara & Divine Wedding",
        content: `The sage Viśvāmitra led Rāma and Lakṣmaṇa toward Mithilā. On the way, they stopped at the āśrama of the sage Gautama, where Rāma redeemed Ahalyā from her curse with the touch of His feet.

In Mithilā, King Janaka had organized a great svayaṃvara. The condition: whoever could string the mighty bow of Lord Śiva would win the hand of his daughter Sītā in marriage. Kings and princes from far and wide had gathered, but none could even move the bow.

When Rāma entered the assembly with Lakṣmaṇa and Viśvāmitra, Sītā's heart was captivated. She prayed to Goddess Pārvatī: "May this prince with lotus eyes be my lord."

King Janaka, observing the divine beauty of the princes, felt inexplicable love for them. He explained the challenge—many had tried and failed; even the mightiest warriors could not budge the bow.

Receiving permission from his guru, Rāma walked toward the bow. With effortless grace, He picked it up as if it were a lotus stem. As He strung it, the mighty bow broke in two with a thunderous sound that shook the three worlds.

The gods showered flowers. Sītā placed the victory garland around Rāma's neck. King Janaka wept with joy. Messengers were sent to Ayodhyā to invite King Daśaratha for the wedding.

The wedding was celebrated with unparalleled splendor. Bharata, Lakṣmaṇa and Śatrughna were married to Janaka's nieces—Māṇḍavī, Urmilā and Śrutakīrti respectively. The four divine couples returned to Ayodhyā amidst great rejoicing.

Ayodhyā was decorated like heaven itself. King Daśaratha's joy knew no bounds. The people celebrated for days. Thus ended the Bāla Kāṇḍa—the book of Śrī Rāma's childhood.`,
        mood: "happy",
        instrument: "sitar"
      }
    ]
  },
  {
    id: "ayodhya-kand",
    name: "Ayodhyā Kāṇḍa",
    hindiName: "अयोध्याकाण्ड",
    description: "The Book of Ayodhya - Chronicles the preparations for Rama's coronation, His exile to the forest, and Bharata's devotion.",
    totalChapters: 6,
    chapters: [
      {
        id: "ayo-1",
        chapterNumber: 1,
        title: "Preparations for Coronation",
        subtitle: "Rāma Rājyābhiṣeka Preparation",
        content: `Time passed blissfully in Ayodhyā. Śrī Rāma's fame and virtues spread far and wide. He was the ideal son, the ideal brother, the ideal husband—adored by all.

King Daśaratha, now advanced in age, decided to install Rāma as the prince regent. He consulted his ministers and the sage Vasiṣṭha. All agreed with great enthusiasm—the people's hearts leaped with joy at the prospect.

The city was decorated magnificently. Fragrant flowers adorned every doorway. Festoons and banners waved in the breeze. The citizens prepared to welcome their crown prince.

Rāma and Sītā were informed of the impending coronation. Though Rāma remained humble, Sītā's heart was filled with joy—not for the crown, but because she knew her lord would serve the people as their king.

Queen Kausalyā performed auspicious rituals. The palace buzzed with preparation. Musicians practiced, priests chanted, and artisans worked through the night.

But in heaven, the gods grew anxious. If Rāma became king, how would He fulfill His mission to destroy Rāvaṇa? They approached goddess Sarasvatī with their concern.

Sarasvatī, understanding divine will, entered the mind of Mantharā—the hunchbacked maidservant of Queen Kaikeyī. What followed would change the course of history.`,
        mood: "peaceful",
        instrument: "flute"
      },
      {
        id: "ayo-2",
        chapterNumber: 2,
        title: "Kaikeyī's Demand",
        subtitle: "The Two Boons",
        content: `Mantharā, poisoned by Sarasvatī's influence, went to Queen Kaikeyī with sinister counsel. She reminded the queen of two boons King Daśaratha had once promised her—boons she had never claimed.

"Your husband is about to make Kausalyā's son the king," Mantharā said. "You will become a servant in your own palace. Use your boons now—demand that Bharata be crowned king and Rāma be exiled to the forest for fourteen years."

At first, Kaikeyī refused. She loved Rāma as her own son. But Mantharā's persistent manipulation eventually corrupted her mind. The queen entered her chamber of anger and lay on the floor, disheveled and weeping.

When King Daśaratha came to her, he was shocked to find his beloved wife in such a state. "What troubles you, my queen? Ask anything—the sun, the moon, my kingdom, my life—and it shall be yours."

Kaikeyī reminded him of his promise—two boons, to be granted without question. The king, bound by his word, agreed. Then came the devastating demands: "Crown Bharata as king. Send Rāma to the forest for fourteen years."

The king collapsed as if struck by lightning. He pleaded, he wept, he raged—but Kaikeyī was unmoved. The night passed in anguish. The king, trapped by his own word, could find no escape.

At dawn, the city awaited the coronation, unaware of the tragedy unfolding in the royal chambers.`,
        mood: "sad",
        instrument: "tanpura"
      },
      {
        id: "ayo-3",
        chapterNumber: 3,
        title: "Rāma's Exile",
        subtitle: "Vanavas - The Forest Exile",
        content: `Śrī Rāma was summoned to Queen Kaikeyī's chambers. When He learned of the boons she had claimed, His face showed no anger, no disappointment—only serene acceptance.

"Mother, why did you not call me sooner? Father's word must be honored. I shall gladly go to the forest. Please arrange for Bharata's coronation."

Rāma went to Queen Kausalyā and touched her feet. She wept bitterly, but Rāma comforted her: "Mother, the forest is not a punishment but an opportunity to serve father's word. Your blessings will protect me always."

Sītā, upon hearing the news, declared she would accompany her lord. Rāma tried to dissuade her, describing the hardships of forest life—wild animals, harsh weather, sparse food. But Sītā was firm: "A wife's place is beside her husband. The palace without you would be worse than any forest."

Lakṣmaṇa too refused to be left behind. "Brother, I shall carry your bow and serve you in the forest. Without you, Ayodhyā is meaningless to me."

Rāma, Sītā and Lakṣmaṇa donned garments of bark and prepared to leave. The citizens of Ayodhyā lined the streets, weeping. Many followed the chariot, unable to bear separation.

King Daśaratha, watching from his palace, collapsed in grief. Crying "Rāma! Rāma!" he fell unconscious. The greatest tragedy of his life had come to pass—he had to banish his most beloved son.

As the chariot crossed the Sarayū river, Rāma looked back at his weeping city one last time, then turned his face toward the forest—toward destiny.`,
        mood: "emotional",
        instrument: "tanpura"
      },
      {
        id: "ayo-4",
        chapterNumber: 4,
        title: "Death of Daśaratha",
        subtitle: "The King's Departure",
        content: `After Rāma's departure, King Daśaratha was consumed by grief. He lay in his chamber, calling out Rāma's name, refusing food and water.

On the night of Rāma's departure, the king remembered a terrible incident from his youth. Once, while hunting, he had mistakenly killed a young hermit named Śravaṇa Kumāra, who was fetching water for his blind parents.

The dying youth's parents had cursed Daśaratha: "Just as we die of grief for our son, so shall you die of grief for yours." Now, that curse was being fulfilled.

Queen Kausalyā stayed by the king's side, but Kaikeyī was banished from his presence. Daśaratha could not bear to see the woman who had destroyed his happiness.

For seven days, the king lay dying, his lips uttering only one word: "Rāma... Rāma..." At last, his spirit departed, crying out for his beloved son.

The city of Ayodhyā was plunged into darkness. The sun seemed to lose its brightness; the rivers flowed in mourning. The people wept as though they had lost their own father.

Sage Vasiṣṭha sent swift messengers to Bharata, who was visiting his maternal grandfather in Kekaya. The kingdom needed its prince. The throne stood empty. Ayodhyā awaited its new king with heavy hearts.`,
        mood: "sad",
        instrument: "tanpura"
      },
      {
        id: "ayo-5",
        chapterNumber: 5,
        title: "Bharata's Noble Refusal",
        subtitle: "Bharata's Devotion",
        content: `When Bharata received the news, he rushed back to Ayodhyā. He did not know what tragedy had befallen—only that he was urgently needed.

Entering the palace, Bharata found only grief and silence. When he learned the full truth—his mother's demands, Rāma's exile, his father's death—he was devastated.

Bharata fell at his mother's feet, not in respect but in anguish: "Mother, what have you done? You have destroyed our family! I will never accept this throne purchased with my brother's tears!"

He cursed his own birth, he wept for his father, he longed for his brother. Kaikeyī, finally realizing the enormity of her actions, was consumed by remorse.

Bharata declared: "I shall go to the forest and bring Rāma back. He alone is the rightful king. I will beg him on my knees to return."

With the entire city following him, Bharata set out for the forest. His determination was unshakeable—he would restore dharma, he would place Rāma on the throne.

The journey was long, but Bharata's love drove him forward. Finally, he reached the hermitage of Citrakūṭa, where Rāma, Sītā and Lakṣmaṇa had made their home.`,
        mood: "emotional",
        instrument: "sitar"
      },
      {
        id: "ayo-6",
        chapterNumber: 6,
        title: "Meeting at Citrakūṭa",
        subtitle: "The Divine Dialogue",
        content: `When Bharata approached, Lakṣmaṇa initially suspected treachery—perhaps Bharata had come with an army to eliminate Rāma. But Rāma knew His brother's heart.

The moment Bharata saw Rāma in the garments of an ascetic, he ran forward and fell at His feet, weeping uncontrollably. "Brother, please return! Father has died calling your name. Ayodhyā is desolate without you!"

Rāma lifted Bharata and embraced him. Learning of their father's death, He performed the funeral rites with perfect devotion. Then came the great dialogue.

Bharata pleaded: "The throne is yours by right. I will never sit on it. Please return and rule as our king."

Rāma replied with gentle firmness: "Brother, father's word must be honored. I have given my promise to live in the forest for fourteen years. How can either of us break that vow?"

Bharata countered: "Then let me take your place in exile! I will spend fourteen years in the forest while you rule!"

Rāma smiled: "Dear brother, each must fulfill his own dharma. Your dharma is to rule Ayodhyā in my absence. Rule with justice and compassion. I will return when the time is complete."

Still Bharata refused to accept the throne for himself. Finally, a compromise was reached: Bharata would place Rāma's sandals (pādukā) on the throne and rule as regent in their name. If Rāma did not return on the first day after fourteen years, Bharata would immolate himself.

Bharata returned to Ayodhyā but refused to live in the palace. He established his residence in Nandigrāma, living like an ascetic, counting the days until his brother's return.

Thus ended the Ayodhyā Kāṇḍa—a testament to love, dharma and the highest ideal of brotherhood.`,
        mood: "devotional",
        instrument: "tanpura"
      }
    ]
  },
  {
    id: "aranya-kand",
    name: "Araṇya Kāṇḍa",
    hindiName: "अरण्यकाण्ड",
    description: "The Book of the Forest - Details the exile period, encounters with sages and demons, and the abduction of Sītā.",
    totalChapters: 5,
    chapters: [
      {
        id: "ara-1",
        chapterNumber: 1,
        title: "Life in the Forest",
        subtitle: "Vanavāsa - Forest Dwelling",
        content: `After Bharata's departure, Rāma, Sītā and Lakṣmaṇa left Citrakūṭa—the place now held too many memories. They wandered deeper into the Daṇḍaka forest, visiting the hermitages of various sages.

Each sage they met was overwhelmed with devotion. They offered fruits and roots, showed them sacred places, and received their blessings. Rāma promised each: "I will protect your hermitages from the demons who trouble you."

The years passed peacefully. Sītā created a beautiful home wherever they stayed. Lakṣmaṇa served them with tireless devotion—gathering food, standing guard, anticipating every need.

One day, they arrived at the hermitage of the sage Agastya. The great sage, who had once drunk the entire ocean, received them with great honor. He gave Rāma the divine bow of Viṣṇu, an inexhaustible quiver, and a mighty sword.

"Go to Pañcavaṭī," Agastya advised, "a beautiful place near the Godāvarī river. Build your hermitage there. It is a suitable place for your remaining years of exile."

Following the sage's directions, they reached Pañcavaṭī. Lakṣmaṇa built a beautiful cottage surrounded by flowering trees. Here, by the banks of the Godāvarī, they established their new home.

The forest became their kingdom, the birds and animals their subjects, the rivers their wealth. Rāma and Sītā lived in perfect contentment, their love deepening with each passing day.`,
        mood: "peaceful",
        instrument: "flute"
      },
      {
        id: "ara-2",
        chapterNumber: 2,
        title: "Śūrpaṇakhā's Encounter",
        subtitle: "The Demoness Sister of Rāvaṇa",
        content: `One day, a demoness named Śūrpaṇakhā wandered near their hermitage. She was the sister of Rāvaṇa, the mighty king of Laṅkā.

Seeing Rāma's extraordinary beauty, Śūrpaṇakhā was smitten with desire. She transformed herself into a beautiful woman and approached Him.

"Who are you, handsome one? Why do you live in this forest like a hermit when you deserve to be a king? I am Śūrpaṇakhā, sister of the great Rāvaṇa. Marry me and become lord of all you survey."

Rāma smiled and pointed to Sītā: "I am already married to this noble lady. But my brother Lakṣmaṇa is unmarried. Perhaps he would appreciate your proposal."

Śūrpaṇakhā went to Lakṣmaṇa, who sent her back to Rāma with similar jest. Humiliated and enraged, the demoness revealed her true form and attacked Sītā.

In an instant, Lakṣmaṇa drew his sword and cut off Śūrpaṇakhā's nose and ears. Screaming in pain and fury, she fled to her brother Khara, who commanded an army of fourteen thousand demons.

"Avenge me!" she cried. "Destroy these humans who have disfigured me!"

Khara and his demon horde attacked Pañcavaṭī. Rāma told Lakṣmaṇa to protect Sītā while He faced the army alone. In less than an hour, Rāma destroyed all fourteen thousand demons and killed both Khara and his brother Dūṣaṇa.

Śūrpaṇakhā, witnessing this destruction, fled to Laṅkā to report to Rāvaṇa himself.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "ara-3",
        chapterNumber: 3,
        title: "The Golden Deer",
        subtitle: "Mārīca's Deception",
        content: `In Laṅkā, Śūrpaṇakhā described to Rāvaṇa not just her humiliation, but the unparalleled beauty of Sītā. "Brother, you are lord of the three worlds, yet you have never seen a woman so beautiful. Her radiance puts the moon to shame."

Rāvaṇa's desire was inflamed. He resolved to abduct Sītā. He went to his uncle Mārīca—the same demon Rāma had hurled across the ocean years ago.

"Take the form of a golden deer and lure Rāma away from his hermitage. Once he is gone, I will abduct Sītā."

Mārīca tried to warn Rāvaṇa: "Rāma is no ordinary mortal. I have felt his power. This plan will be your destruction." But Rāvaṇa threatened to kill him if he refused.

The magical golden deer appeared near Pañcavaṭī. Sītā, enchanted by its beauty, asked Rāma to capture it for her. Rāma, knowing it was likely a demon, asked Lakṣmaṇa to guard Sītā and pursued the deer.

After a long chase, Rāma shot the deer with an arrow. As Mārīca died, he cried out in Rāma's voice: "O Lakṣmaṇa! O Sītā! Help me!"

Sītā heard the cry and panicked. "Lakṣmaṇa, your brother is in danger! Go help him!"

Lakṣmaṇa assured her it was a trick—Rāma could never be in danger. But Sītā, maddened by fear, accused him of wanting Rāma dead so he could have her. These cruel words pierced Lakṣmaṇa's heart.

Unable to bear the accusation, Lakṣmaṇa drew a protective line around the hermitage: "Mother, do not cross this line under any circumstances." Then he ran to find Rāma.

Sītā was alone. Rāvaṇa's moment had come.`,
        mood: "anxious",
        instrument: "tanpura"
      },
      {
        id: "ara-4",
        chapterNumber: 4,
        title: "Abduction of Sītā",
        subtitle: "Sītā Haraṇa",
        content: `Rāvaṇa approached Pañcavaṭī in the guise of an aged mendicant. He called out for alms. Sītā, ever compassionate, prepared to offer food.

"Noble lady, I am an old Brahmin, weak and hungry. Please step outside and give me food."

Sītā remembered Lakṣmaṇa's warning but could not refuse a holy man. She stepped outside the protective line to offer him food.

Instantly, Rāvaṇa revealed his true form—ten heads, twenty arms, glittering with gold and jewels. He seized Sītā and lifted her into his flying chariot.

Sītā screamed and struggled. She threw her jewels to the ground, hoping to leave a trail. She called out to the trees, the rivers, the animals: "Tell Rāma where I have been taken!"

The vulture king Jaṭāyu, a friend of King Daśaratha, heard her cries. Despite his old age, he attacked Rāvaṇa's chariot, fighting valiantly. But Rāvaṇa cut off his wings, and Jaṭāyu fell to earth, mortally wounded.

Rāvaṇa carried Sītā across the ocean to his golden city of Laṅkā. He placed her in the Aśoka grove and tried to tempt her with offers of wealth and power.

But Sītā, placing a blade of grass between herself and the demon, declared: "You are less than this grass to me. Rāma will come for me, and you will be destroyed. Until then, I will not even look upon your face."

She sat beneath an Aśoka tree, meditating on Rāma, awaiting her lord's arrival.`,
        mood: "emotional",
        instrument: "tanpura"
      },
      {
        id: "ara-5",
        chapterNumber: 5,
        title: "Rāma's Grief and Resolve",
        subtitle: "Search for Sītā",
        content: `When Rāma and Lakṣmaṇa returned to find the hermitage empty, Rāma's grief knew no bounds. He wandered through the forest calling Sītā's name.

"O trees, O rivers, O birds—have you seen my Sītā? Where has she gone? Who has taken her?"

The Lord who had witnessed the death of countless universes wept like an ordinary husband. Such was His human play—to show the world how deep a husband's love should be.

Lakṣmaṇa tried to console Him: "Brother, we must not despair. We will find Sītā. We will search every corner of creation."

Following the scattered jewels, they came upon the dying Jaṭāyu. The great bird, with his last breath, revealed what had happened: "Rāvaṇa... the demon king of Laṅkā... has taken Sītā... southward..."

Rāma performed Jaṭāyu's funeral rites with the same care as He had done for His own father. Then, with firm resolve, He turned south.

"Lakṣmaṇa, we will find Sītā. We will destroy Rāvaṇa. This I vow—no demon, no ocean, no fortress will stand in my way."

The brothers journeyed south, facing and defeating demon after demon. They were guided to seek the monkey kingdom of Kiṣkindhā, where they would find the allies they needed.

Thus ended the Araṇya Kāṇḍa—the book of separation, the prelude to the great war that was to come.`,
        mood: "emotional",
        instrument: "tanpura"
      }
    ]
  },
  {
    id: "kishkindha-kand",
    name: "Kiṣkindhā Kāṇḍa",
    hindiName: "किष्किन्धाकाण्ड",
    description: "The Book of Kishkindha - Describes the alliance with the monkey king Sugrīva and the search for Sītā.",
    totalChapters: 4,
    chapters: [
      {
        id: "kish-1",
        chapterNumber: 1,
        title: "Meeting with Hanumān",
        subtitle: "The Divine Servant",
        content: `Near the Ṛṣyamūka mountain, Rāma and Lakṣmaṇa were approached by a young Brahmin. This was Hanumān, the mighty son of the Wind God, in disguise.

Hanumān had been sent by Sugrīva, the exiled monkey king, to discover who these powerful warriors were. Were they friends or enemies?

As Hanumān conversed with them, he was overwhelmed by their nobility. He revealed his true form—a magnificent monkey warrior of immense strength and wisdom.

"I am Hanumān, servant of Sugrīva, lord of the monkeys. My master hides on this mountain, exiled by his brother Vālī. He saw you both and was afraid, for your bearing is that of kings."

Rāma saw in Hanumān a devotee of perfect purity. He embraced him and said: "Hanumān, take us to Sugrīva. We seek his friendship and aid."

Hanumān lifted both brothers onto his shoulders and leaped to Sugrīva's hiding place. This was the beginning of a friendship that would shake the three worlds.

Sugrīva and Rāma pledged eternal alliance. They exchanged vows before sacred fire. Sugrīva would help Rāma find Sītā; Rāma would help Sugrīva defeat Vālī and reclaim his throne.`,
        mood: "devotional",
        instrument: "tanpura"
      },
      {
        id: "kish-2",
        chapterNumber: 2,
        title: "Defeat of Vālī",
        subtitle: "Vālī Vadha",
        content: `Sugrīva told Rāma his story. His elder brother Vālī, king of Kiṣkindhā, had misunderstood him and cast him out, even stealing his wife. Vālī was invincible in direct combat—he had a boon that half the strength of any opponent would transfer to him.

"Do not fear," said Rāma. "Challenge Vālī to combat. I will end his tyranny."

Sugrīva challenged Vālī. The two brothers fought fiercely, but Rāma could not distinguish between them in the heat of battle. Sugrīva was beaten and fled.

"Wear this garland," Rāma instructed him. "Challenge Vālī again. This time I will not fail."

The second battle began. As Vālī pummeled Sugrīva, Rāma released an arrow from behind a tree. It pierced Vālī's heart.

The dying Vālī questioned Rāma: "Why did you attack me from hiding? Is this dharma for a righteous prince?"

Rāma replied: "You are a monkey king, and I am hunting in this forest as a prince. More importantly, you seized your brother's wife—a grave sin. For this alone, you deserved death."

Vālī accepted Rāma's justice. With his dying breath, he blessed Sugrīva and entrusted his son Aṅgada to Rāma's care. Sugrīva was installed as king of Kiṣkindhā.

The monsoon arrived, preventing immediate search for Sītā. Rāma spent these months in a cave, his heart burning with separation from Sītā.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "kish-3",
        chapterNumber: 3,
        title: "The Great Search",
        subtitle: "Sītā Anveshana",
        content: `When the monsoon ended, Sugrīva assembled millions of monkeys and bears. They were divided into groups and sent in all directions to search for Sītā.

The southern party, led by Hanumān, Aṅgada, Jāmbavān and others, was given special importance—for Jaṭāyu had indicated Rāvaṇa fled south.

Rāma gave Hanumān His ring: "When you find Sītā, show her this ring. She will know you come from me."

The search parties scattered across the world. Mountains, caves, forests, islands—every corner was explored. But weeks passed without success.

The southern party reached the southern ocean and stood in despair. How could they cross this vast expanse? Laṅkā lay somewhere beyond, but the ocean was endless.

An old vulture named Sampāti, brother of Jaṭāyu, heard of his brother's noble death. In gratitude, he revealed crucial information: "Sītā is in Laṅkā, held in Rāvaṇa's Aśoka grove. The island is one hundred yojanas across the sea."

One hundred yojanas! Who among them could leap such a distance?

Jāmbavān, the wise old bear, looked at Hanumān: "Son of the Wind God, you alone have the power. You have forgotten your own strength. Remember who you are!"

As Jāmbavān recounted Hanumān's divine origin and powers, the monkey warrior began to grow. He remembered. He grew to the size of a mountain.

"I will cross this ocean. I will find Mother Sītā. Victory to Śrī Rāma!"`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "kish-4",
        chapterNumber: 4,
        title: "Hanumān's Leap",
        subtitle: "Samudra Langhan",
        content: `Standing on the peak of Mount Mahendra, Hanumān prepared for the greatest leap in history. He grew to an enormous size, his body glowing with divine power.

The mountain trembled under his feet. Trees bent, animals fled, the very earth groaned. Then, with a mighty roar of "Śrī Rāma!" Hanumān launched himself into the sky.

He flew through the air like an arrow from Rāma's bow. The ocean parted beneath him. The gods watched in wonder.

Three challenges awaited him on the journey:

First came Mainaka, the golden mountain, who rose from the sea offering rest. Hanumān touched him in respect but did not stop: "I cannot rest until my mission is complete."

Next came Surasā, mother of serpents, who tried to swallow him. Hanumān became huge, then tiny, entering and exiting her mouth before she could close it. "You have passed my test," she blessed him.

Finally, a shadow-grabbing demoness named Siṃhikā tried to pull him down. Hanumān killed her and continued on.

As the sun set, Hanumān saw the golden towers of Laṅkā gleaming on the horizon. He reduced himself to the size of a cat and entered the demon city under cover of darkness.

Thus ended the Kiṣkindhā Kāṇḍa. Hanumān had reached Laṅkā. The stage was set for his meeting with Sītā.`,
        mood: "powerful",
        instrument: "drums"
      }
    ]
  },
  {
    id: "sundar-kand",
    name: "Sundara Kāṇḍa",
    hindiName: "सुन्दरकाण्ड",
    description: "The Beautiful Book - Narrates Hanumān's adventures in Lanka, his meeting with Sītā, and the burning of Lanka.",
    totalChapters: 5,
    chapters: [
      {
        id: "sun-1",
        chapterNumber: 1,
        title: "Entry into Laṅkā",
        subtitle: "Laṅkā Pravesh",
        content: `In the form of a small cat, Hanumān crept through the golden streets of Laṅkā. The city was magnificent beyond imagination—golden walls, crystal palaces, gardens of celestial flowers.

He searched through Rāvaṇa's palace, seeing wonders that would dazzle any mortal eye. Chambers filled with treasures, weapons of the gods, luxuries beyond count.

He found Rāvaṇa's inner chambers and saw the demon king sleeping on a golden bed, surrounded by his queens. For a moment, Hanumān wondered if one of these beautiful women was Sītā.

But he quickly dismissed the thought: "No! Mother Sītā would never sleep peacefully in another man's chamber. She must be held elsewhere, against her will."

He searched on through the night—through gardens, through groves, through prison halls. At last, near dawn, he reached the Aśoka grove.

There, beneath a shimshapa tree, sat a woman in worn clothes, surrounded by fierce demonesses. She was thin from fasting, her eyes red from weeping, yet her radiance was undimmed.

Hanumān's heart leaped: "This must be Mother Sītā! Her beauty, her dignity, her sorrow—all match Lord Rāma's description."

He hid in the tree above, waiting for the right moment to reveal himself.`,
        mood: "devotional",
        instrument: "tanpura"
      },
      {
        id: "sun-2",
        chapterNumber: 2,
        title: "Meeting with Sītā",
        subtitle: "Sītā Darshan",
        content: `As dawn broke, Rāvaṇa himself came to the Aśoka grove. He pleaded with Sītā, threatened her, promised her kingdoms—but she would not even look at him.

"You are like a rabbit trying to become a lion. Rāma will come, and you will be destroyed. Until then, I will not defile myself by speaking to you."

Enraged, Rāvaṇa gave her an ultimatum: "Two months! After that, you will be killed and served as my breakfast!"

After he left, the demoness guards continued their torments. Sītā wept, considering ending her life.

At this darkest moment, Hanumān began to sing softly from his hiding place—a song praising Rāma, recounting His glories, telling of His search for Sītā.

Sītā looked up in wonder. "Who speaks of my lord with such love? Is this a dream? A trick of the demons?"

Hanumān descended and prostrated before her: "Mother, I am Hanumān, servant of Śrī Rāma. He has sent me to find you."

He showed her Rāma's ring. Sītā wept with joy: "Hanumān! Tell me—is Rāma well? Does He still remember me? Is He coming?"

Hanumān reassured her: "Mother, Rāma thinks of nothing but you. He sends this message: 'Soon I will come. I will destroy Rāvaṇa and all his demons. We will be together again.'"

Sītā gave Hanumān her crest jewel as proof of their meeting. She also gave him a message for Rāma, recounting an intimate moment only they knew about.`,
        mood: "devotional",
        instrument: "tanpura"
      },
      {
        id: "sun-3",
        chapterNumber: 3,
        title: "Destruction of the Grove",
        subtitle: "Aśoka Vāṭikā Dhvaṃsa",
        content: `Before leaving, Hanumān thought: "I have found Sītā, but I should also assess Rāvaṇa's strength. Let me test his army."

He began destroying the Aśoka grove—uprooting trees, crushing demons, creating havoc. The demon guards fell like leaves in a storm.

When news reached Rāvaṇa, he sent warrior after warrior. Hanumān defeated them all. He killed Rāvaṇa's son Akṣayakumāra with a single blow.

Finally, Indrajit, Rāvaṇa's most powerful son, was sent. The great demon warrior used the Brahmastra, the ultimate weapon. Though Hanumān was immune to it, he chose to let himself be bound—he wanted to meet Rāvaṇa face to face.

Bound in ropes, Hanumān was dragged before Rāvaṇa's throne. The demon king demanded: "Who are you? Why have you come to my city?"

Hanumān answered with fearless dignity: "I am a messenger of Śrī Rāma, whose wife you have foolishly abducted. Return Sītā and beg His forgiveness—this is your only hope of survival."

Rāvaṇa was amused by this monkey's audacity. But when his brother Vibhīṣaṇa urged him to respect the messenger's immunity, Rāvaṇa devised a different punishment.

"A monkey's greatest treasure is his tail. Set it on fire! Let him return to his master in humiliation!"`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "sun-4",
        chapterNumber: 4,
        title: "Burning of Laṅkā",
        subtitle: "Laṅkā Dahana",
        content: `The demons wrapped Hanumān's tail in oil-soaked cloth and set it ablaze. They paraded him through the streets of Laṅkā, mocking and tormenting him.

But Hanumān was the son of the Wind God. Fire could not harm him. Instead, he shrunk his body to slip free of the ropes, then grew enormous.

With his burning tail, he leaped from building to building, from palace to palace. Wherever his tail touched, flames erupted. The golden city of Laṅkā became an inferno.

Mansions collapsed. Treasury houses exploded. The demons ran screaming through the streets. The fire consumed everything—only Vibhīṣaṇa's palace and the Aśoka grove (where Sītā was) were spared.

Finally, Hanumān extinguished his tail in the ocean and prepared to return. But first, he wanted to see Sītā one last time.

"Mother, I am leaving now. But I could carry you on my shoulder back to Rāma. Why wait for the army?"

Sītā smiled gently: "Dear Hanumān, that would not be proper. Rāma must come here Himself, defeat Rāvaṇa in battle, and take me home with honor. That is the way of dharma."

Hanumān bowed to her wisdom. Then, with one great leap, he launched himself back across the ocean, carrying with him the greatest news in the world: Sītā was found.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "sun-5",
        chapterNumber: 5,
        title: "Return to Rāma",
        subtitle: "Joyful Reunion",
        content: `The monkeys waiting on the southern shore heard Hanumān's triumphant roar from across the ocean. They knew he had succeeded.

Hanumān landed among them, shouting: "Victory! I have seen Mother Sītā! She is alive and waiting for Lord Rāma!"

The journey back to Kiṣkindhā was filled with celebration. When they reached Rāma, Hanumān fell at His feet and reported everything.

"Lord, I found Mother Sītā in the Aśoka grove. She gave me this jewel as proof. She sends her love and awaits your coming."

Rāma held the jewel to His heart, tears flowing down His cheeks. "Hanumān, what you have done cannot be repaid in a thousand lifetimes. You have given me back my life."

Hanumān's heart swelled with joy: "I desire no reward but to serve you, my Lord. Command me, and I will bring you Rāvaṇa's head."

Rāma embraced Hanumān: "Faithful one, you are dearer to me than Bharata, than Lakṣmaṇa, than my own life. Your devotion is the greatest treasure in the three worlds."

Now Rāma knew where Sītā was. Now He knew Rāvaṇa's strength. Now was the time to march to war.

"Sugrīva, assemble your armies. We march to the southern ocean. Laṅkā's doom is at hand!"

Thus ended the Sundara Kāṇḍa—the beautiful book of Hanumān's glory, the prelude to the great war of righteousness.`,
        mood: "happy",
        instrument: "sitar"
      }
    ]
  },
  {
    id: "lanka-kand",
    name: "Laṅkā Kāṇḍa",
    hindiName: "लंकाकाण्ड",
    description: "The Book of Lanka - Describes the great war between Rama's army and Ravana's demons, culminating in Ravana's defeat.",
    totalChapters: 6,
    chapters: [
      {
        id: "lan-1",
        chapterNumber: 1,
        title: "March to the Ocean",
        subtitle: "Samudra Tīra",
        content: `Śrī Rāma's army—millions of monkeys and bears—marched southward. The earth trembled under their feet. The sky was dark with their numbers.

They reached the southern shore and faced the vast ocean. How would this massive army cross? Even Hanumān could not carry so many.

Rāma sat on the beach for three days, praying to the Ocean God. But the ocean did not respond.

Rāma's patience ended. He strung His divine bow and aimed an arrow of fire at the ocean: "If you will not yield to prayer, you will yield to power. I will dry you up and my army will walk across your bed!"

The Ocean God appeared, terrified and trembling: "Lord, forgive me! I am bound by nature—I cannot simply part. But I offer you a solution. The monkey Nala is a master builder, blessed by Viśvakarmā. With his skill, a bridge can be built across my waters."

Rāma agreed. Nala directed the army to gather enormous rocks and trees. Millions of monkeys worked day and night. Some carried boulders, others uprooted mountains.

In five days, a miraculous bridge spanning one hundred yojanas was complete. It stood firm on the waters—a testament to devotion transforming the impossible into reality.

The monkey army crossed the ocean and camped on Laṅkā's shore. Rāvaṇa, watching from his palace, felt the first stirrings of fear.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "lan-2",
        chapterNumber: 2,
        title: "Vibhīṣaṇa's Refuge",
        subtitle: "Vibhīṣaṇa Śaraṇāgati",
        content: `In Laṅkā, Rāvaṇa's righteous brother Vibhīṣaṇa tried one final time to counsel peace: "Brother, return Sītā. Make peace with Rāma. This war will destroy us all."

Rāvaṇa kicked him in fury: "You traitor! You side with our enemies! Leave my kingdom and never return!"

Vibhīṣaṇa, heartbroken but resolute, flew across the ocean to Rāma's camp. Some of the monkey generals were suspicious—was this a spy?

But Rāma received him with open arms: "He who surrenders to me, even if he is my enemy, I accept him as my own. Vibhīṣaṇa shall be king of Laṅkā after Rāvaṇa falls."

Vibhīṣaṇa revealed all of Laṅkā's secrets—its defenses, its warriors, its weaknesses. He also revealed that Rāvaṇa had a boon of immortality stored in his navel—he could only be killed if that secret was discovered.

Rāma formally crowned Vibhīṣaṇa as the rightful king of Laṅkā—even before the battle was won. This was His way of honoring surrender, of rewarding virtue.

The final embassy was sent: Aṅgada, the monkey prince, went to Rāvaṇa's court to offer peace. But Rāvaṇa, drunk on pride, refused.

"Let them come! I have defeated the gods themselves! What can these monkeys do to me?"

The war would begin at dawn.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "lan-3",
        chapterNumber: 3,
        title: "The Great Battle Begins",
        subtitle: "Mahā Yuddha",
        content: `The battle that followed was the greatest the world had ever seen. Demons poured out of Laṅkā like angry waves. Monkeys and bears met them in a clash that shook the universe.

Day after day, the fighting raged. Demon generals fell one by one. Prahasta, Rāvaṇa's commander-in-chief, was killed by Nīla. Akampana fell to Hanumān. Dhumraksha was crushed by Aṅgada.

But the demons had their victories too. Many brave monkeys perished. The battlefield was carpeted with the dead.

Then came Kumbhakarṇa, Rāvaṇa's gigantic brother, who slept for six months at a time. Awakened for the war, he consumed entire mountains of food and strode onto the battlefield like a walking apocalypse.

He crushed thousands of monkeys underfoot. Even Hanumān and Aṅgada could not stop him. Finally, Rāma faced him in combat.

A titanic duel ensued. Rāma severed Kumbhakarṇa's arms, then his legs, then finally his head. The giant fell, and the earth shook.

Rāvaṇa wept for his brother, then raged for revenge. He sent his sons, his generals, his magical warriors. One by one, they all fell.

Now only Indrajit, the invincible, remained. And Rāvaṇa himself.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "lan-4",
        chapterNumber: 4,
        title: "Victory Over Indrajit",
        subtitle: "Indrajit Vadha",
        content: `Indrajit, conqueror of Indra himself, possessed the most terrible powers. He could become invisible and strike from the shadows.

Using the Nagapasha—the serpent weapon—he bound both Rāma and Lakṣmaṇa in coils of magic snakes. The monkey army despaired. Their lords lay motionless on the battlefield.

But Garuḍa, the divine eagle and enemy of serpents, flew down from heaven. At his approach, the snakes fled, and the brothers were freed.

Indrajit tried again. This time, his weapon appeared to kill Sītā before the monkey army's eyes. The monkeys were devastated—all their struggle seemed pointless.

But Vibhīṣaṇa recognized the illusion: "It was a phantom, not the real Sītā! He seeks to destroy your morale!"

Encouraged, the monkeys fought on. Lakṣmaṇa vowed to kill Indrajit. He pursued the invisible demon, guided by Vibhīṣaṇa's knowledge.

In a secret grove where Indrajit performed dark rituals to maintain his power, Lakṣmaṇa confronted him. The battle lasted all night.

Finally, as dawn broke, Lakṣmaṇa invoked the divine Aindra weapon and severed Indrajit's head. The invincible had fallen.

With his son dead, Rāvaṇa's heart turned to stone. Now he would fight—and die—himself.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "lan-5",
        chapterNumber: 5,
        title: "The Final Battle",
        subtitle: "Rāvaṇa Vadha",
        content: `Rāvaṇa mounted his war chariot and rode onto the battlefield. His ten heads blazed with fury. His twenty arms wielded weapons of unimaginable power.

The monkey army scattered before him like leaves in a hurricane. He was Destruction incarnate.

The gods sent a divine chariot for Rāma. Matali, Indra's charioteer, descended from heaven to serve Him.

The two greatest warriors faced each other. The duel that followed lasted through day and night, through weapons both mortal and divine.

Rāvaṇa fired the Brahmastra. Rāma countered with the Brahmastra. Their collision created a storm that darkened the three worlds.

Each time Rāma severed one of Rāvaṇa's heads, another grew in its place. The battle seemed endless.

Then Vibhīṣaṇa reminded Rāma: "The secret of his immortality is in his navel! Strike there!"

Rāma invoked the Brahmastra blessed by Brahmā himself. The divine arrow, blazing like the sun, pierced Rāvaṇa's navel and passed through his heart.

Rāvaṇa, the terror of the three worlds, fell.

At that moment, flowers rained from heaven. The gods cheered. The earth sighed in relief. Dharma had triumphed over adharma.`,
        mood: "powerful",
        instrument: "drums"
      },
      {
        id: "lan-6",
        chapterNumber: 6,
        title: "Reunion with Sītā",
        subtitle: "Sītā Milan",
        content: `Vibhīṣaṇa was officially crowned king of Laṅkā. The demons who surrendered were pardoned. Peace returned to the island.

Then came the moment Rāma had waited for—reunion with Sītā. But what followed shocked everyone.

Rāma received Sītā with cold words: "I fought this war to uphold dharma, not for you. You lived in another man's house for a year. How can I accept you now?"

Sītā understood. The world would question her purity. She had to prove herself.

"Lakṣmaṇa, prepare a fire."

As the flames rose, Sītā walked around them in worship, then stepped into the inferno: "If I have been pure in thought, word and deed, let this fire protect me!"

The Fire God Agni himself rose from the flames, carrying Sītā unharmed: "She is pure, Rāma! Her mind never wavered from you for a single moment!"

Rāma embraced Sītā, tears streaming: "I never doubted you, my love. But the world needed to know. Now no one can ever question your honor."

The fourteen years were complete. It was time to return home. Puṣpaka, Rāvaṇa's flying chariot, carried them all—Rāma, Sītā, Lakṣmaṇa, Hanumān, Sugrīva, Vibhīṣaṇa, and their dear companions—northward to Ayodhyā.

Thus ended the Laṅkā Kāṇḍa—the book of war, victory, and divine reunion.`,
        mood: "happy",
        instrument: "sitar"
      }
    ]
  },
  {
    id: "uttara-kand",
    name: "Uttara Kāṇḍa",
    hindiName: "उत्तरकाण्ड",
    description: "The Last Book - Describes Rama's return to Ayodhya, His coronation, and the establishment of Rama Rajya.",
    totalChapters: 4,
    chapters: [
      {
        id: "utt-1",
        chapterNumber: 1,
        title: "Return to Ayodhyā",
        subtitle: "Ayodhyā Āgamana",
        content: `As the Puṣpaka chariot flew northward, Rāma pointed out the landmarks of their journey to Sītā: the battlefield, the bridge, Kiṣkindhā, Citrakūṭa...

They stopped at the sage Bharadvāja's hermitage to send word ahead to Bharata. The sage's joy knew no bounds—after fourteen years, the rightful king was returning!

A messenger flew to Nandigrāma where Bharata waited. The moment Bharata heard the news, he collapsed in joy. His austerities had not been in vain. His brother was coming home.

Ayodhyā erupted in celebration. The city that had been mourning for fourteen years came alive with music, flowers, and lights. Streets were cleaned and decorated. Every citizen put on their finest clothes.

Bharata, carrying Rāma's sandals on his head, led the procession to receive his brother. The entire city followed—queens, ministers, citizens, children, everyone.

When the flying chariot appeared in the sky, a roar of joy shook the heavens. Rāma descended. Bharata fell at His feet. The brothers embraced.

Mother Kausalyā, aged with grief, saw her son at last. She held Him and wept. Rāma touched the feet of all His mothers. He embraced Śatrughna. He was home.

Sumaṅtra, the aged charioteer, sobbed: "My lord, I drove you away in tears. Today I receive you in joy. Blessed is this day!"`,
        mood: "happy",
        instrument: "sitar"
      },
      {
        id: "utt-2",
        chapterNumber: 2,
        title: "Coronation of Śrī Rāma",
        subtitle: "Rāma Rājyābhiṣeka",
        content: `The coronation of Śrī Rāma was the grandest ceremony in the history of the world. Gods descended from heaven to witness it. Sages came from all corners of the earth.

Sacred water was brought from every holy river. The throne of Ayodhyā, vacant for fourteen years, was prepared with divine offerings.

Sage Vasiṣṭha, the royal preceptor, performed the sacred rituals. One by one, he poured holy waters over Rāma's head as the mantras rang through the palace.

Then came the moment: the crown of Ayodhyā was placed on Rāma's head. The entire assembly chanted: "Long live King Rāma! Long live the Divine King!"

Sītā was crowned queen. Lakṣmaṇa was named crown prince. Bharata and Śatrughna took their places beside the throne, devoted servants of their king.

Hanumān was offered any boon he desired. His answer: "I desire only to be your servant forever. Where you are remembered, let me be there, listening to your glory."

Rāma embraced him: "So shall it be. Wherever my story is told, you shall be present and honored."

Sugrīva, Vibhīṣaṇa, Aṅgada, Jāmbavān—all the heroes were rewarded with gifts beyond counting. But their greatest reward was the love they saw in Rāma's eyes.

The gods returned to heaven, blessing the earth that had witnessed such dharma.`,
        mood: "divine",
        instrument: "sitar"
      },
      {
        id: "utt-3",
        chapterNumber: 3,
        title: "Rāma Rājya - The Perfect Kingdom",
        subtitle: "The Divine Rule",
        content: `Under Rāma's rule, Ayodhyā became paradise on earth. This age came to be known as Rāma Rājya—the kingdom of Rāma.

There was no disease, no untimely death. Children did not die before their parents. No one was poor, no one hungry. Crime was unknown. Nature itself became bountiful—trees bore fruit in all seasons, rivers flowed with sweet water, the earth yielded abundant harvests.

Rāma ruled with perfect justice. He heard every citizen's grievance personally. No one was oppressed, no one was afraid. Even animals lived in peace.

But Rāma's highest priority was the happiness of His subjects. He would wander in disguise among the people, listening to their joys and concerns.

The four brothers ruled in perfect harmony. Lakṣmaṇa managed the administration. Bharata commanded the army. Śatrughna protected the borders. And Rāma presided over all with wisdom and compassion.

Years passed in this golden age. The fame of Ayodhyā spread to the three worlds. Even the gods envied the happiness of its citizens.

Sītā and Rāma's love deepened with each passing day. Their divine union was the model for all marriages. Together, they performed great yajñas, distributed charity, and blessed all who came to them.

This was the kingdom of dharma—where righteousness was not just a law but a way of life.`,
        mood: "peaceful",
        instrument: "flute"
      },
      {
        id: "utt-4",
        chapterNumber: 4,
        title: "The Eternal Glory",
        subtitle: "Māhātmya - The Power of the Story",
        content: `Thus concludes the Rāmacaritamānasa—the lake of Rāma's deeds—composed by Gosvāmī Tulasīdāsa in the tongue of the people.

Those who hear this story with faith are freed from the sins of the Kali age. Those who recite it with devotion cross the ocean of worldly existence.

This story is the boat that carries souls across the sea of birth and death. It is the light that dispels the darkness of ignorance. It is the medicine that cures all diseases of the heart.

Rāma is the Supreme Lord, yet He lived as a human to show us how to live with dharma. Sītā is the Divine Mother, yet she suffered to show us how to bear separation with faith.

Lakṣmaṇa's service teaches us the ideal of brotherhood. Bharata's devotion teaches us the ideal of renunciation. Hanumān's love teaches us the ideal of devotion.

Every character in this story—from the greatest to the smallest—offers us a lesson. Every verse is a jewel of wisdom. Every page is a prayer.

Those who sing of Rāma's glory are protected from all harm. Those who remember His name find liberation at the hour of death.

Hari Om Tat Sat.

Glory to Śrī Rāma! Glory to Mother Sītā! Glory to the eternal story of divine love and triumph!

🙏 Jai Śrī Rām! 🙏`,
        mood: "divine",
        instrument: "tanpura"
      }
    ]
  }
];

// Get a specific Kand by ID
export const getKandById = (kandId: string): Kand | undefined => {
  return ramcharitmanasKands.find(kand => kand.id === kandId);
};

// Get all chapters across all Kands
export const getAllChapters = (): RamcharitmanasChapter[] => {
  return ramcharitmanasKands.flatMap(kand => kand.chapters);
};

// Get chapter by ID
export const getChapterById = (chapterId: string): RamcharitmanasChapter | undefined => {
  for (const kand of ramcharitmanasKands) {
    const chapter = kand.chapters.find(ch => ch.id === chapterId);
    if (chapter) return chapter;
  }
  return undefined;
};

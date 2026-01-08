import { Chapter, MoodType, InstrumentType } from '@/components/ChapterAudioReader';

export interface LakshmiPuranChapter {
  id: string;
  chapterNumber: number;
  titleHindi: string;
  titleEnglish: string;
  mood: MoodType;
  instrument: InstrumentType;
  content: string;
}

export const lakshmiPuranChapters: LakshmiPuranChapter[] = [
  {
    id: "lp1",
    chapterNumber: 1,
    titleHindi: "प्रस्तावना एवं लक्ष्मी वंदना",
    titleEnglish: "Introduction & Invocation to Lakshmi",
    mood: "divine",
    instrument: "om",
    content: `This is an abridged and free translation of the Oriya Lakshmi Purana (also called Manabasa—installation of the mana or grain measure). Written by Balaram Das (fifteenth-sixteenth century), the poem is recited even today during observance of the Lakshmi Puja or Manabasa vrat.

This vrat is celebrated on all Thursdays of the month of Margashira (December-January).

Houses are cleaned a day before the puja and in the villages they are plastered with cowdung. Floors and walls are decorated with designs made out of rice paste and doorways with strings of green mango leaves and bunches of ripe (yellow) paddy stalks.

The puja is performed early in the morning, preferably before sunrise and a reading of the Lakshmi Purana is part of the ritual. Though the puja is performed by women, the Purana is usually recited aloud by a man or a young boy of the house.

॥ श्री लक्ष्मी वंदना ॥

Salutations to thee, mother consort,
Salutations to Kamala, daughter of the ocean.
Salutations to thee, Lakshmi, Vishnu's benevolent one,
Who looks after all beings, inert and living.

He who listens to your life story with attention,
Or remembers you with devotion,
Is delivered of his poverty.

नमस्ते नमस्ते माँ गो सागर दुलानी
नमस्ते नमस्ते लक्ष्मी बिष्णुङ्क घराणी
नमस्ते कमला माँ गो अति दयाबती
स्थाबर जंगम कीट आदि पालु नीती`
  },
  {
    id: "lp2",
    chapterNumber: 2,
    titleHindi: "नारद और पराशर मुनि का आगमन",
    titleEnglish: "Arrival of Narada and Parashara Muni",
    mood: "peaceful",
    instrument: "tanpura",
    content: `One day, Narada and Parashara Muni, wandering from place to place, arrived at a village.

That day was a Thursday in the month of Margashira. The festival was being observed by all the inhabitants of that town.

The doorways of every house were plastered with cowdung. The lotus footprints of Lakshmi were drawn with sacred designs.

The women, after bathing and wearing fine clothes, were all engaged in worshipping Lakshmi.

From Brahmin to Chandala, all were devoted to Lakshmi's worship. The sound of auspicious ululation filled the sky.

Seeing this festival celebration, Narada, the son of Brahma, asked Parashara Muni about its significance.

"Tell me, O great sage, what is this celebration? From Brahmin to Chandala, all castes are participating with joyful hearts. What vow is this? What observance? Whom do they worship and by what rules?"

Hearing this, Parashara smiled and spoke softly: "Listen, O disciple of Brahma. This Thursday is dedicated to the worship of Goddess Lakshmi.

Of all the months, Margashira is the most sacred. And of all the days that fall on Thursdays in this month, this is most dear to Lakshmi.

Thursdays are foremost among all days. When Shukla Dashami falls on a Thursday, the Sudasha Vrat is observed. This vrat is most dear to Lakshmi."`
  },
  {
    id: "lp3",
    chapterNumber: 3,
    titleHindi: "लक्ष्मी व्रत की विधि",
    titleEnglish: "The Method of Lakshmi Vrat",
    mood: "peaceful",
    instrument: "flute",
    content: `Narada further asked Parashara Muni: "Who performed this Lakshmi vrat on earth? What auspicious fruits did they receive? Who neglected Lakshmi and suffered? Tell me all this, O great sage, for my heart is eager to hear."

Hearing Narada's words, Parashara Muni spoke with joy in his heart in sweet words:

"Blessed are you, O Narada, of pure character, who are devoted to hearing the story of Lakshmi vrat. Let me tell you an ancient tale that will bring you great joy."

॥ लक्ष्मी व्रत की विधि ॥

On the first Thursday of Margashira month, rise early before dawn.

Plaster the house and doorway with cowdung and sacred water.

Draw the lotus footprints of Lakshmi with rice paste designs.

Bring a new measuring vessel (mana), wash and dry it carefully.

Decorate it with various colorful designs using rice paste.

Place it on a clean platform or small stool.

Put new unhusked rice in it, and on top place three betel nuts washed in turmeric water.

Place a sheaf of rice on top, then invoke Mahalakshmi.

Offer sandal paste, flowers, incense, and lamp.

First offer incense, then present the sacred food offering.

Those who perform this vrat on every Thursday of Margashira shall be blessed with wealth and prosperity.`
  },
  {
    id: "lp4",
    chapterNumber: 4,
    titleHindi: "लक्ष्मी का जगन्नाथ से आज्ञा लेना",
    titleEnglish: "Lakshmi Seeks Permission from Jagannath",
    mood: "divine",
    instrument: "tanpura",
    content: `One day, Goddess Lakshmi was with Lord Jagannath. With folded hands, she informed him:

"Today my Thursday vrat has fallen, O Lord. With your permission, I wish to go around the town."

Lord Govinda said: "O Lakshmi, go around the town. But prepare the Dashami Palana food quickly before you go."

Hearing these words from her Lord, Lakshmi carefully adorned herself.

She wore a nasal ornament of nine gems, a necklace of precious stones around her neck, beautiful armlets, bangles, and bracelets on her arms.

She wore tinkling anklets on her feet and adorned herself with various ornaments.

Thus beautifully dressed, she set out. The three worlds were under her authority, and she could distribute ornaments as she pleased.

Assuming the form of an elderly Brahmin woman, the Mother of the Universe entered the house of a good woman.

A virtuous housewife was standing there at that moment.

Seeing her, Mahalakshmi spoke: "Listen carefully, O virtuous housewife. Today is the Thursday of Mahalakshmi vrat. Have you plastered your house and doorway? Have you prepared the proper worship?"

The housewife replied: "Please tell me, O noble grandmother, how is this vrat performed? What worship should be done? Explain everything to me, and I shall perform this vrat with devotion."`
  },
  {
    id: "lp5",
    chapterNumber: 5,
    titleHindi: "चंडालिनी श्रिया की भक्ति",
    titleEnglish: "Devotion of Shriya the Chandala Woman",
    mood: "devotional",
    instrument: "om",
    content: `Now hear, O Narada, about Shriya the Chandala woman.

She performed the Lakshmi puja with great devotion at the feet of the Goddess.

Her worship pleased the Goddess so much that Lakshmi granted her many boons without being asked.

Her small hut of branches was transformed by Lakshmi's grace into a palace of sandalwood.

The Chandala woman's house, which had no food, was now filled with pure gold in all four corners.

The Chandala woman who had no children was blessed by Lakshmi with five sons.

"May you be blessed with wealth and sons," said the Goddess, and having granted these boons, she departed.

Through Lakshmi's grace, the Chandala woman became extremely fortunate.

Now hear, O Narada, the extraordinary tale that follows.

When Lakshmi Mahamaya arrived at the Lion Gate of the temple, she saw the two brothers sitting at the entrance.

"Make way, let me enter," she said. "I must quickly prepare the Dashami food."

But Lord Govinda replied: "O Lakshmi, what has happened? Where did you go to the Chandala quarter?"

"We did not see you, but our elder brother did. We saw that he cast you out."

"You had no work here anymore. Our elder brother spoke many harsh words to me."`
  },
  {
    id: "lp6",
    chapterNumber: 6,
    titleHindi: "बलराम द्वारा लक्ष्मी का बहिष्कार",
    titleEnglish: "Balaram's Rejection of Lakshmi",
    mood: "powerful",
    instrument: "tanpura",
    content: `When Hari and Balaram returned from the forest, Balaram came to know through his divine power what had happened.

He called Jagannath and said: "Look at your wife's conduct! She is now in a Chandala's house. She goes to the huts of low-caste Hadis and Panas and comes back to the temple without even taking a bath. This she does every day.

She is supposed to care for the poor, and so the Chandala woman worships her. Well, if you are so fond of your wife, go and build her a palace in the Chandala street.

Listen to me and drive her out. It ill becomes you to have such a wife."

Lord Jagannath said: "If we throw her out, we cannot get a wife like Lakshmi again. What we can do is get her back into caste by paying a fine of five lakh rupees to the inhabitants of heaven.

If she repeats this, we will throw her out of the temple. We may excuse her this once."

But Balaram was firm: "If your Lakshmi stays, I do not stay. A wife is like a pair of sandals. If you have your brother, you can have ten million wives.

If you still feel for your wife, go and build a palace in the Chandala street. Don't come back to my great temple."

Lord Jagannath could take no more of this, and they came to the main gate of the temple.

In the meantime, Lakshmi had given Shriya all she desired—a mansion of sandalwood, plenty of gold, and five sons.`
  },
  {
    id: "lp7",
    chapterNumber: 7,
    titleHindi: "लक्ष्मी का मंदिर से निष्कासन",
    titleEnglish: "Lakshmi's Expulsion from the Temple",
    mood: "sad",
    instrument: "bells",
    content: `After giving her blessings, Lakshmi returned to the temple to find the two brothers sitting on the doorway.

When she wanted to enter, Jagannath said: "We cannot allow you to enter."

Lakshmi spoke with dignity: "You want to throw me out since I stayed a while in the house of an untouchable. You talk of caste, and since you are gods, everything is excused.

What about your own caste? You lived in a cowherd's house. You ate in Nima's house. You ate leftover fruits from Jara the hunter.

Both you brothers are therefore low caste, no less. If the wife commits a mistake, the husband must bear it. For one transgression, the master does not remove his servant."

Jagannath said: "I cannot disobey my brother. I will give you a daily ration for the time being and maybe bring you back later after persuading my brother."

Lakshmi replied with firm resolve: "I do not want a daily ration. I will leave like a helpless orphan. I will go to my father's house.

Take away your ornaments and do not accuse me later."

So saying, Lakshmi took off all her ornaments and gave them to her husband.

He said: "When a man sends away his wife, he gives her clothes and food for six months. Take these ornaments, sell them, and buy yourself clothes and food."

But Lakshmi refused: "When you get another wife, give her these ornaments. I leave like a lowly orphan."`
  },
  {
    id: "lp8",
    chapterNumber: 8,
    titleHindi: "लक्ष्मी का शाप",
    titleEnglish: "Lakshmi's Curse",
    mood: "powerful",
    instrument: "om",
    content: `Standing at the temple gate, Lakshmi pronounced her curse:

"But I put a curse on you. As true as the movement of sun and moon, you will have nothing to eat.

For twelve years, you will be destitute and will get no food, water, or clothing.

Only when I, the Chandala woman, offer you food, only then will you eat, O crusher of Kaliya."

Having spoken thus, Lakshmi departed from the temple.

Going outside, she called Vishwakarma and asked him to build her a small hut.

But Vishwakarma built her a palace with walls of gold and columns of coral, and this pleased Lakshmi.

She then summoned the eight Vetalas (spirits) and asked them to ransack the kitchen and pantry in the temple and bring everything to her.

When the Vetalas said they were afraid of Jagannath catching them in the act, Lakshmi asked Nidradevi (the goddess of sleep) to make the two brothers sleep till the next day.

The Vetalas went and brought all the provisions after putting the two brothers to sleep on ordinary string beds.

They also brought the costly garments of the brothers.

All the provisions from the eighteen crore treasury were carried away. Not a single coin or grain was left behind.

Seeing this, Mahalakshmi was pleased and told the Vetalas: "You have become like sons to me today."`
  },
  {
    id: "lp9",
    chapterNumber: 9,
    titleHindi: "भाइयों की दुर्दशा",
    titleEnglish: "The Suffering of the Brothers",
    mood: "sad",
    instrument: "flute",
    content: `The next morning, the brothers awoke to find nothing in the temple.

Balaram said: "Listen, O Jagannath! There is no sound of activity today. No sound of temple servants or pandas. Where have the maidservants gone?"

There was no water even to wash their faces.

Jagannath said: "Listen, elder brother. Since Lakshmi left, this has happened."

They went to the kitchen and pantry but found nothing inside. They went to the Indradyumna tank, but there was not a drop of water in it.

Having spent the day without food and water, they decided to go out begging.

Wearing torn clothes, with their sacred thread on the shoulder and broken umbrella in hand, the brothers, now looking like Brahmin beggars, went round asking for water to drink.

Wherever they went, they were taken to be thieves and driven out.

At one place, when a Brahmin urged Agni not to provide any heat to the firewood when the brothers tried to cook, they were frustrated.

Lakshmi, who knows everything, asked the wind god to blow away any fire they tried to make.

The brothers then thought of entering a pond and eating lotus roots, but as soon as they entered, the water became mud.

Thus frustrated, the brothers agreed to eat in Lakshmi's house even if it meant losing caste.`
  },
  {
    id: "lp10",
    chapterNumber: 10,
    titleHindi: "जगन्नाथ समुद्र तट पर",
    titleEnglish: "Jagannath at the Ocean Shore",
    mood: "peaceful",
    instrument: "tanpura",
    content: `The brothers then went to the seashore, the abode of Lakshmi's father.

There at the portals of the palace, they recited the Vedas.

When the maidservants came out, they asked for food.

The maids reported this to Lakshmi, who asked them to go to the Brahmins and tell them that they could not possibly eat food prepared by a Chandala woman.

When told this, Balaram said: "Give us utensils and provisions; we will do our own cooking."

Lakshmi sent them utensils, rice, and vegetables.

But she also commanded the fire not to give heat and the water not to boil.

No matter how much wood was burned, it turned to ash without cooking the food.

Balaram now asked Jagannath to go and hold Lakshmi's hand and tell her that it was all his, Balaram's, fault.

"Lakshmi could live wherever she wanted, and he would never again try to forbid her."

Jagannath went inside, and as soon as Lakshmi saw him, she was all smiles.

She washed his feet, and from the water thus sanctified, she sipped a little and sprinkled a little on her head.

She worshipped his lotus feet with flowers.`
  },
  {
    id: "lp11",
    chapterNumber: 11,
    titleHindi: "लक्ष्मी का प्रश्न",
    titleEnglish: "Lakshmi's Question",
    mood: "divine",
    instrument: "om",
    content: `After worshipping his feet, Lakshmi spoke:

"You drove me out as a Chandala woman. Yet you came to eat in that very same woman's house.

Both of you have thus lost caste. Shame on your greatness! Shame on your vows!

Shame on your brother and your promise. Now what do you want?"

Jagannath said: "We have suffered a lot because of you. The world now knows us as beggars.

Everyone knows that it is you who fed us.

Please, whoever listens to this Purana on Thursday will be absolved of sins.

The woman who recites this on Lakshmi Puja day will go to heaven."

Then Lakshmi made her demand:

"You must promise this to me: Chandalas and Brahmins will have no food taboos henceforth.

They should eat from each other's hand. Only then will I go back to the temple."

Jagannath agreed and took Lakshmi by her hand.

With Balaram, they returned to the great temple.

Balaram finally spoke: "A home is beautiful only when the lady of the house is there. Now I know how great Lakshmi is."`
  },
  {
    id: "lp12",
    chapterNumber: 12,
    titleHindi: "फलश्रुति - पुराण का फल",
    titleEnglish: "Phala Shruti - The Fruits of the Purana",
    mood: "divine",
    instrument: "om",
    content: `Narada listened to the story with rapt attention.

It is only through the grace of Lakshmi that the wretched Chandala woman was blessed with wealth.

Success comes to those who read this Purana.

All sins vanish as with sunrise.

Those who recite or listen to this Purana earn the benefits of a trillion cow-gifts.

This Purana is the way to salvation.

॥ फलश्रुति ॥

गुरुवार दिन जेउन कथा निवारण
से कथा कहुछि एबे साधवानी शुन
केबे न भाजिब खाइ गुरुबार दिन

जेउन नारी गुरुबार दिन रे आमिष
भुञ्जै लोभरे किम्बा न पखाले केश
भुञ्जै उच्छिष्ट किबा लगाए जे तेल
महालक्ष्मी तार निश्चे भाङ्गिबे ति गेल

गुरुबारे जेउन नारी पिन्धे शुक्ल लुगा
ऐश्वर्य सम्पदा पाए हुइ सुभगा

॥ इति श्री लक्ष्मी पुराण सम्पूर्णं ॥

Thus ends the Lakshmi Purana written by Balaram Das.

The message of this sacred text is that divine grace knows no boundaries of caste or status. Goddess Lakshmi's compassion extends to all beings who worship her with sincere devotion.

Those who maintain cleanliness, observe the Thursday vrat with devotion, and treat all beings with respect shall always be blessed by Mahalakshmi.`
  }
];

// Convert Lakshmi Puran chapters to the Chapter format
export const convertLakshmiPuranChapters = (): Chapter[] => {
  return lakshmiPuranChapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.titleEnglish,
    subtitle: `${chapter.titleHindi} - अध्याय ${chapter.chapterNumber}`,
    mood: chapter.mood,
    instrument: chapter.instrument,
    content: chapter.content,
  }));
};

export const getLakshmiPuranChapters = (): Chapter[] => {
  return convertLakshmiPuranChapters();
};

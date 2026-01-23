// YouTube Aarti & Bhajan Links
// This app does not host or own any video/audio content.
// All links redirect to YouTube - copyright belongs to respective creators.

export interface YouTubeLink {
  id: string;
  deityId: string;
  title: string;
  titleHindi: string;
  type: "aarti" | "bhajan" | "chalisa" | "mantra";
  youtubeUrl: string;
  description?: string;
}

export const youtubeLinks: YouTubeLink[] = [
  {
    id: "ganesha-aarti-1",
    deityId: "ganesha",
    title: "Ganesh Aarti - Jai Ganesh Deva",
    titleHindi: "जय गणेश देवा आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/BhwOproElxU",
    description: "Traditional Ganesh Aarti sung during puja"
  },
  {
    id: "shiva-aarti-1",
    deityId: "shiva",
    title: "Shiv Aarti - Om Jai Shiv Omkara",
    titleHindi: "ॐ जय शिव ओमकारा आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/AETFvQonfV8",
    description: "Sacred Shiva Aarti for morning and evening worship"
  },
  {
    id: "vishnu-aarti-1",
    deityId: "vishnu",
    title: "Vishnu Aarti - Om Jai Jagdish Hare",
    titleHindi: "ॐ जय जगदीश हरे आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/SyqgAt-T0iQ",
    description: "Divine Vishnu Aarti for daily worship"
  },
  {
    id: "krishna-aarti-1",
    deityId: "krishna",
    title: "Krishna Aarti - Aarti Kunj Bihari Ki",
    titleHindi: "आरती कुंज बिहारी की",
    type: "aarti",
    youtubeUrl: "https://youtu.be/J5cllhBiAV0",
    description: "Beautiful Krishna Aarti for devotees"
  },
  {
    id: "hanuman-aarti-1",
    deityId: "hanuman",
    title: "Hanuman Aarti - Aarti Keeje Hanuman Lala Ki",
    titleHindi: "आरती कीजै हनुमान लला की",
    type: "aarti",
    youtubeUrl: "https://youtu.be/HAUxmNFkPfk",
    description: "Powerful Hanuman Aarti for strength and protection"
  },
  {
    id: "durga-aarti-1",
    deityId: "durga",
    title: "Durga Aarti - Jai Ambe Gauri",
    titleHindi: "जय अम्बे गौरी आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/QKf_JPbN6Lw",
    description: "Sacred Durga Aarti for Navratri and daily worship"
  },
  {
    id: "lakshmi-aarti-1",
    deityId: "lakshmi",
    title: "Lakshmi Aarti - Om Jai Lakshmi Mata",
    titleHindi: "ॐ जय लक्ष्मी माता आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/T9K8aBm31Hc",
    description: "Auspicious Lakshmi Aarti for prosperity"
  },
  {
    id: "saraswati-aarti-1",
    deityId: "saraswati",
    title: "Saraswati Aarti - Om Jai Saraswati Mata",
    titleHindi: "ॐ जय सरस्वती माता आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/GKMSZ8SN0IA",
    description: "Divine Saraswati Aarti for knowledge and wisdom"
  },
  {
    id: "saibaba-aarti-1",
    deityId: "saibaba",
    title: "Sai Baba Aarti - Aarti Sai Baba",
    titleHindi: "आरती साईं बाबा",
    type: "aarti",
    youtubeUrl: "https://youtu.be/NE3SWh9_vR4",
    description: "Sacred Shirdi Sai Baba Aarti"
  },
  {
    id: "rama-aarti-1",
    deityId: "rama",
    title: "Ram Aarti - Aarti Shri Ramayan Ji Ki",
    titleHindi: "आरती श्री रामायण जी की",
    type: "aarti",
    youtubeUrl: "https://youtu.be/EMO1AT1UQf0",
    description: "Traditional Ram Aarti for devotees"
  },
  {
    id: "santoshi-aarti-1",
    deityId: "santoshi",
    title: "Santoshi Mata Aarti",
    titleHindi: "संतोषी माता आरती",
    type: "aarti",
    youtubeUrl: "https://youtu.be/XWKtCrBKdOo",
    description: "Blessed Santoshi Mata Aarti for Friday worship"
  }
];

// Get YouTube links by deity
export const getYouTubeLinksByDeity = (deityId: string): YouTubeLink[] => {
  return youtubeLinks.filter(link => link.deityId === deityId);
};

// Get YouTube links by type
export const getYouTubeLinksByType = (type: YouTubeLink["type"]): YouTubeLink[] => {
  return youtubeLinks.filter(link => link.type === type);
};

// Get all aartis
export const getAartiYouTubeLinks = (): YouTubeLink[] => {
  return youtubeLinks.filter(link => link.type === "aarti");
};

// Open YouTube link externally
export const openYouTubeLink = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer");
};

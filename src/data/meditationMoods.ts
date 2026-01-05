export interface MeditationMood {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tracks: MeditationTrack[];
}

export interface MeditationTrack {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export const meditationMoods: MeditationMood[] = [
  {
    id: "stress-relief",
    name: "Stress Relief",
    description: "Release tension and find calm with soothing sounds",
    icon: "🌊",
    color: "from-blue-400/20 to-cyan-400/20",
    tracks: [
      { id: "sr1", name: "Ocean of Peace", duration: "10:00", description: "Gentle waves and soft ambient music" },
      { id: "sr2", name: "Forest Rain", duration: "15:00", description: "Raindrops on leaves with bird songs" },
      { id: "sr3", name: "Temple Bells", duration: "12:00", description: "Sacred bells with soft chanting" },
      { id: "sr4", name: "River Flow", duration: "20:00", description: "Peaceful river sounds for deep relaxation" },
    ]
  },
  {
    id: "anxiety-calm",
    name: "Anxiety & Overthinking",
    description: "Quiet the mind and ease anxious thoughts",
    icon: "🧘",
    color: "from-purple-400/20 to-indigo-400/20",
    tracks: [
      { id: "ac1", name: "Breath of Silence", duration: "8:00", description: "Guided breathing with soft music" },
      { id: "ac2", name: "Still Mind", duration: "15:00", description: "Minimalist ambient for mental peace" },
      { id: "ac3", name: "Grounding Earth", duration: "12:00", description: "Deep tones for feeling centered" },
      { id: "ac4", name: "Lotus Meditation", duration: "10:00", description: "Gentle flute and nature sounds" },
    ]
  },
  {
    id: "peace-calm",
    name: "Peace & Calm",
    description: "Find inner stillness and serenity",
    icon: "☮️",
    color: "from-green-400/20 to-emerald-400/20",
    tracks: [
      { id: "pc1", name: "Sacred Silence", duration: "20:00", description: "Pure ambient peace" },
      { id: "pc2", name: "Garden of Tranquility", duration: "15:00", description: "Nature sounds with soft harmonies" },
      { id: "pc3", name: "Divine Light", duration: "12:00", description: "Uplifting spiritual music" },
      { id: "pc4", name: "Om Shanti", duration: "10:00", description: "Peaceful chanting and bells" },
    ]
  },
  {
    id: "focus",
    name: "Focus & Concentration",
    description: "Sharpen your mind with clarity-enhancing sounds",
    icon: "🎯",
    color: "from-amber-400/20 to-orange-400/20",
    tracks: [
      { id: "fc1", name: "Deep Focus", duration: "30:00", description: "Binaural beats for concentration" },
      { id: "fc2", name: "Mind Clarity", duration: "20:00", description: "Steady tones for mental focus" },
      { id: "fc3", name: "Study Temple", duration: "45:00", description: "Ambient music for studying" },
      { id: "fc4", name: "Clear Stream", duration: "25:00", description: "Water sounds for focus" },
    ]
  },
  {
    id: "positive-energy",
    name: "Positive Energy",
    description: "Uplift your spirit and radiate positivity",
    icon: "✨",
    color: "from-yellow-400/20 to-amber-400/20",
    tracks: [
      { id: "pe1", name: "Morning Blessings", duration: "10:00", description: "Uplifting devotional music" },
      { id: "pe2", name: "Joyful Heart", duration: "12:00", description: "Happy and peaceful melodies" },
      { id: "pe3", name: "Divine Energy", duration: "15:00", description: "Energizing spiritual sounds" },
      { id: "pe4", name: "Sunrise Mantra", duration: "8:00", description: "Morning chants for positive start" },
    ]
  },
  {
    id: "sleep",
    name: "Sleep & Deep Relaxation",
    description: "Drift into peaceful, restful sleep",
    icon: "🌙",
    color: "from-indigo-400/20 to-violet-400/20",
    tracks: [
      { id: "sl1", name: "Dreamscape", duration: "60:00", description: "Gentle sounds for deep sleep" },
      { id: "sl2", name: "Night Prayer", duration: "30:00", description: "Soft devotional lullaby" },
      { id: "sl3", name: "Starlit Peace", duration: "45:00", description: "Ambient sounds for rest" },
      { id: "sl4", name: "Sacred Rest", duration: "40:00", description: "Temple sounds for sleep" },
    ]
  }
];

export const getMoodById = (id: string): MeditationMood | undefined => {
  return meditationMoods.find(mood => mood.id === id);
};

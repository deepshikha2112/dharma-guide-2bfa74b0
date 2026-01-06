import { MoodType, InstrumentType } from '@/hooks/useDivineAudio';

export interface MeditationMood {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  moodType: MoodType;
  tracks: MeditationTrack[];
}

export interface MeditationTrack {
  id: string;
  name: string;
  duration: string;
  description: string;
  instrument: InstrumentType;
}

export const meditationMoods: MeditationMood[] = [
  {
    id: "peaceful",
    name: "Peaceful",
    description: "Find inner stillness and serenity with divine sounds",
    icon: "☮️",
    color: "from-green-400/20 to-emerald-400/20",
    moodType: "peaceful",
    tracks: [
      { id: "p1", name: "Sacred Silence", duration: "∞", description: "Pure ambient peace with soft harmonics", instrument: "om" },
      { id: "p2", name: "Temple Serenity", duration: "∞", description: "Gentle temple bells and soft drone", instrument: "bells" },
      { id: "p3", name: "Bansuri Dreams", duration: "∞", description: "Peaceful flute melodies", instrument: "flute" },
      { id: "p4", name: "Nature's Calm", duration: "∞", description: "Wind and water for deep relaxation", instrument: "nature" },
    ]
  },
  {
    id: "stressed",
    name: "Stressed",
    description: "Release tension and find calm instantly",
    icon: "🌊",
    color: "from-blue-400/20 to-cyan-400/20",
    moodType: "stressed",
    tracks: [
      { id: "s1", name: "Flowing Waters", duration: "∞", description: "Calming water sounds for stress relief", instrument: "water" },
      { id: "s2", name: "Wind Through Trees", duration: "∞", description: "Gentle wind for mental release", instrument: "wind" },
      { id: "s3", name: "Temple Bells", duration: "∞", description: "Sacred bells to calm the mind", instrument: "bells" },
      { id: "s4", name: "Tanpura Healing", duration: "∞", description: "Deep drone for stress release", instrument: "tanpura" },
    ]
  },
  {
    id: "sad",
    name: "Sad",
    description: "Gentle sounds for emotional healing",
    icon: "💙",
    color: "from-slate-400/20 to-gray-400/20",
    moodType: "sad",
    tracks: [
      { id: "sd1", name: "Comforting Embrace", duration: "∞", description: "Warm, nurturing tones", instrument: "tanpura" },
      { id: "sd2", name: "Gentle Flute", duration: "∞", description: "Soft melodies for the heart", instrument: "flute" },
      { id: "sd3", name: "Om Healing", duration: "∞", description: "Divine frequencies for comfort", instrument: "om" },
      { id: "sd4", name: "Wind Chimes", duration: "∞", description: "Soft chimes for emotional release", instrument: "chimes" },
    ]
  },
  {
    id: "angry",
    name: "Angry",
    description: "Grounding sounds to release anger peacefully",
    icon: "🔥",
    color: "from-red-400/20 to-orange-400/20",
    moodType: "angry",
    tracks: [
      { id: "a1", name: "Grounding Earth", duration: "∞", description: "Deep, low tones for centering", instrument: "om" },
      { id: "a2", name: "Calm Wind", duration: "∞", description: "Gentle wind for release", instrument: "wind" },
      { id: "a3", name: "Water Release", duration: "∞", description: "Flowing water to wash away anger", instrument: "water" },
      { id: "a4", name: "Temple Peace", duration: "∞", description: "Sacred bells for tranquility", instrument: "bells" },
    ]
  },
  {
    id: "anxious",
    name: "Anxious",
    description: "Binaural beats and calming sounds for anxiety relief",
    icon: "🧘",
    color: "from-purple-400/20 to-indigo-400/20",
    moodType: "anxious",
    tracks: [
      { id: "ax1", name: "Alpha Waves", duration: "∞", description: "Binaural beats for relaxation", instrument: "om" },
      { id: "ax2", name: "Still Mind", duration: "∞", description: "Gentle tanpura for mental peace", instrument: "tanpura" },
      { id: "ax3", name: "Soft Chimes", duration: "∞", description: "Wind chimes for gentle calming", instrument: "chimes" },
      { id: "ax4", name: "Nature Calm", duration: "∞", description: "Natural sounds for grounding", instrument: "nature" },
    ]
  },
  {
    id: "happy",
    name: "Happy",
    description: "Uplifting sounds to enhance your joy",
    icon: "✨",
    color: "from-yellow-400/20 to-amber-400/20",
    moodType: "happy",
    tracks: [
      { id: "h1", name: "Joyful Morning", duration: "∞", description: "Bright, uplifting melodies", instrument: "flute" },
      { id: "h2", name: "Celebration Bells", duration: "∞", description: "Happy temple bells", instrument: "bells" },
      { id: "h3", name: "Divine Joy", duration: "∞", description: "Celebratory Om chanting", instrument: "om" },
      { id: "h4", name: "Wind Chimes Dance", duration: "∞", description: "Playful chimes", instrument: "chimes" },
    ]
  },
  {
    id: "devotional",
    name: "Devotional",
    description: "Sacred sounds for spiritual connection",
    icon: "🙏",
    color: "from-orange-400/20 to-amber-400/20",
    moodType: "devotional",
    tracks: [
      { id: "d1", name: "Om Meditation", duration: "∞", description: "Sacred Om frequency", instrument: "om" },
      { id: "d2", name: "Temple Atmosphere", duration: "∞", description: "Authentic temple bells", instrument: "bells" },
      { id: "d3", name: "Tanpura Prayer", duration: "∞", description: "Traditional drone for worship", instrument: "tanpura" },
      { id: "d4", name: "Divine Flute", duration: "∞", description: "Krishna-style flute", instrument: "flute" },
    ]
  }
];

export const getMoodById = (id: string): MeditationMood | undefined => {
  return meditationMoods.find(mood => mood.id === id);
};

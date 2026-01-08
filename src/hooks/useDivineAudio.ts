import { useRef, useState, useCallback, useEffect } from 'react';

export type MoodType = 
  | 'peaceful' 
  | 'stressed' 
  | 'sad' 
  | 'angry' 
  | 'anxious' 
  | 'happy' 
  | 'devotional'
  | 'sleep'
  | 'focus'
  | 'energy'
  | 'powerful'
  | 'emotional'
  | 'divine';

export type InstrumentType = 
  | 'om' 
  | 'bells' 
  | 'tanpura' 
  | 'flute' 
  | 'nature' 
  | 'water'
  | 'wind'
  | 'chimes'
  | 'singing-bowls'
  | 'violin'
  | 'piano'
  | 'percussion'
  | 'mantra-rhythm';

interface DivineAudioOptions {
  mood?: MoodType;
  instrument?: InstrumentType;
  volume?: number;
}

// Volume presets for different moods (0-1 scale)
const MOOD_VOLUMES: Record<MoodType, number> = {
  peaceful: 0.25,    // Low
  stressed: 0.35,    // Medium-low
  sad: 0.4,          // Medium
  angry: 0.35,       // Medium-low (calming)
  anxious: 0.3,      // Low
  happy: 0.5,        // Medium-high
  devotional: 0.4,   // Medium
  sleep: 0.15,       // Very low
  focus: 0.3,        // Low
  energy: 0.55,      // Medium-high
  powerful: 0.5,     // Medium-high
  emotional: 0.4,    // Medium
  divine: 0.4,       // Medium
};

export const useDivineAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const evolutionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Create noise buffer for various effects
  const createNoiseBuffer = useCallback((ctx: AudioContext, seconds: number = 2) => {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }, []);

  // Clear all intervals
  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current = [];
    if (evolutionIntervalRef.current) {
      clearInterval(evolutionIntervalRef.current);
      evolutionIntervalRef.current = null;
    }
  }, []);

  // ==========================================
  // 😌 CALM / PEACE - Flute, tanpura, soft pads
  // Very slow tempo, low volume, stillness
  // ==========================================
  const createPeacefulSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Soft tanpura drone - very gentle
    const tanpuraFreqs = [130.81, 196.00]; // C3, G3 - open fifth
    tanpuraFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);
      
      // Very slow breathing LFO (stillness)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.02, ctx.currentTime); // Very slow
      lfoGain.gain.setValueAtTime(0.015, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Soft pad layer
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    const padFilter = ctx.createBiquadFilter();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(500, ctx.currentTime);
    padGain.gain.setValueAtTime(0.03, ctx.currentTime);
    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);

    // Occasional gentle flute notes - very sparse
    const playFluteNote = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const notes = [392.00, 440.00, 523.25]; // G4, A4, C5
      const freq = notes[Math.floor(Math.random() * notes.length)];
      
      const noteOsc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1);
      noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 5);
      
      noteOsc.connect(noteGain);
      noteGain.connect(gainNode);
      noteOsc.start();
      noteOsc.stop(ctx.currentTime + 5);
    };

    const interval = setInterval(playFluteNote, 8000); // Very slow
    intervalsRef.current.push(interval);
    setTimeout(playFluteNote, 3000);

    return nodes;
  }, []);

  // ==========================================
  // 😟 ANXIETY / STRESS RELIEF - Soft piano, ambient pads
  // Slow rhythmic, medium-low volume, safety/grounding
  // ==========================================
  const createStressReliefSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Deep ambient pad for safety
    const padFreqs = [174.61, 220.00]; // F3, A3 - warm third
    padFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.06, ctx.currentTime);
      
      // Slow rhythmic pulse for grounding
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Rhythmic, slow
      lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Soft piano-like tones with slow attack
    const playPianoNote = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const notes = [261.63, 293.66, 349.23, 392.00]; // C4, D4, F4, G4 - pentatonic feel
      const freq = notes[Math.floor(Math.random() * notes.length)];
      
      const noteOsc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteFilter = ctx.createBiquadFilter();
      
      noteOsc.type = 'triangle';
      noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(800, ctx.currentTime);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
      
      noteOsc.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(gainNode);
      noteOsc.start();
      noteOsc.stop(ctx.currentTime + 4);
    };

    const interval = setInterval(playPianoNote, 4000); // Slow, rhythmic
    intervalsRef.current.push(interval);
    playPianoNote();

    return nodes;
  }, []);

  // ==========================================
  // 😢 SADNESS / HEALING - Violin, soft strings
  // Slow with emotional pauses, medium volume
  // ==========================================
  const createSadSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // String ensemble base - minor key
    const stringFreqs = [220.00, 261.63, 329.63]; // A3, C4, E4 - A minor
    stringFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.05 / (i + 1), ctx.currentTime);
      
      // Slow, melancholic vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(4.5, ctx.currentTime);
      vibGain.gain.setValueAtTime(3, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Expressive violin-like melody with emotional pauses
    const playViolinPhrase = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      // Minor pentatonic for sadness
      const notes = [440.00, 523.25, 587.33, 659.25, 783.99]; // A4, C5, D5, E5, G5
      const note1 = notes[Math.floor(Math.random() * notes.length)];
      const note2 = notes[Math.floor(Math.random() * notes.length)];
      
      const playNote = (freq: number, delay: number, duration: number) => {
        setTimeout(() => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          
          noteOsc.type = 'sawtooth';
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          // Expressive vibrato
          const vib = ctx.createOscillator();
          const vibGain = ctx.createGain();
          vib.frequency.setValueAtTime(5, ctx.currentTime);
          vibGain.gain.setValueAtTime(5, ctx.currentTime);
          vib.connect(vibGain);
          vibGain.connect(noteOsc.frequency);
          vib.start();
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2000, ctx.currentTime);
          
          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
          noteGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + duration * 0.7);
          noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
          
          noteOsc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(gainNode);
          noteOsc.start();
          noteOsc.stop(ctx.currentTime + duration);
          vib.stop(ctx.currentTime + duration);
        }, delay);
      };

      playNote(note1, 0, 3);
      playNote(note2, 3500, 3); // Pause between notes
    };

    const interval = setInterval(playViolinPhrase, 8000); // With pauses
    intervalsRef.current.push(interval);
    playViolinPhrase();

    return nodes;
  }, []);

  // ==========================================
  // 😴 SLEEP / NIGHT RELAX - Deep drones, wind chimes
  // Extremely slow, very low volume, weightless
  // ==========================================
  const createSleepSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Very deep drone - almost sub-bass
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 - very deep
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(200, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
    
    // Extremely slow fading
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.01, ctx.currentTime); // Extremely slow
    lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(droneGain.gain);
    lfo.start();
    
    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(gainNode);
    droneOsc.start();
    nodes.push(droneOsc);

    // Second harmonic drone
    const drone2 = ctx.createOscillator();
    const drone2Gain = ctx.createGain();
    drone2.type = 'sine';
    drone2.frequency.setValueAtTime(82.41, ctx.currentTime); // E2
    drone2Gain.gain.setValueAtTime(0.04, ctx.currentTime);
    drone2.connect(drone2Gain);
    drone2Gain.connect(gainNode);
    drone2.start();
    nodes.push(drone2);

    // Gentle wind chimes - very sparse
    const playChime = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const chimeFreqs = [1046.5, 1174.66, 1396.91]; // High, ethereal
      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      chimeGain.gain.setValueAtTime(0.02, ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
      
      chimeOsc.connect(chimeGain);
      chimeGain.connect(gainNode);
      chimeOsc.start();
      chimeOsc.stop(ctx.currentTime + 6);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) playChime(); // Very sparse
    }, 10000); // Long intervals
    intervalsRef.current.push(interval);

    return nodes;
  }, []);

  // ==========================================
  // 🧘 FOCUS / MEDITATION - Singing bowls, bell tones
  // Steady slow tempo, low volume, centered attention
  // ==========================================
  const createFocusSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Steady base tone for centered focus
    const baseOsc = ctx.createOscillator();
    const baseGain = ctx.createGain();
    baseOsc.type = 'sine';
    baseOsc.frequency.setValueAtTime(256, ctx.currentTime); // C4 - centered
    baseGain.gain.setValueAtTime(0.05, ctx.currentTime);
    baseOsc.connect(baseGain);
    baseGain.connect(gainNode);
    baseOsc.start();
    nodes.push(baseOsc);

    // Singing bowl resonance
    const playSingingBowl = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const bowlFreqs = [256, 384, 512]; // Pure intervals
      const baseFreq = bowlFreqs[Math.floor(Math.random() * bowlFreqs.length)];
      
      // Main tone
      const bowlOsc = ctx.createOscillator();
      const bowlGain = ctx.createGain();
      bowlOsc.type = 'sine';
      bowlOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      
      bowlGain.gain.setValueAtTime(0.1, ctx.currentTime);
      bowlGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 8);
      
      bowlOsc.connect(bowlGain);
      bowlGain.connect(gainNode);
      bowlOsc.start();
      bowlOsc.stop(ctx.currentTime + 8);

      // Harmonic overtones
      [2, 3, 4].forEach((harmonic, i) => {
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(baseFreq * harmonic, ctx.currentTime);
        overtoneGain.gain.setValueAtTime(0.03 / (i + 1), ctx.currentTime);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
        overtone.connect(overtoneGain);
        overtoneGain.connect(gainNode);
        overtone.start();
        overtone.stop(ctx.currentTime + 6);
      });
    };

    const interval = setInterval(playSingingBowl, 6000); // Steady
    intervalsRef.current.push(interval);
    playSingingBowl();

    return nodes;
  }, []);

  // ==========================================
  // 🔥 ENERGY / MOTIVATION - Light percussion, soft beats
  // Medium tempo, medium-high volume, uplifting
  // ==========================================
  const createEnergySound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Uplifting major chord base
    const chordFreqs = [261.63, 329.63, 392.00, 523.25]; // C major
    chordFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Rhythmic soft beat
    const playBeat = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      // Kick-like tone
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(100, ctx.currentTime);
      kickOsc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
      
      kickGain.gain.setValueAtTime(0.12, ctx.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      kickOsc.connect(kickGain);
      kickGain.connect(gainNode);
      kickOsc.start();
      kickOsc.stop(ctx.currentTime + 0.3);
    };

    // Light hi-hat
    const playHat = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const noiseBuffer = createNoiseBuffer(ctx, 0.1);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(8000, ctx.currentTime);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(gainNode);
      noise.start();
    };

    // Medium tempo rhythm
    let beatCount = 0;
    const interval = setInterval(() => {
      playBeat();
      beatCount++;
      if (beatCount % 2 === 0) {
        setTimeout(playHat, 250);
      }
    }, 500); // Medium tempo - 120 BPM
    intervalsRef.current.push(interval);
    playBeat();

    return nodes;
  }, [createNoiseBuffer]);

  // ==========================================
  // 🙏 DEVOTIONAL - Sacred Om, temple bells
  // Slow, medium volume, spiritual
  // ==========================================
  const createDevotionalSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Om frequency drone
    const omFreq = 136.1; // Earth's frequency
    [1, 2, 3].forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(omFreq * harmonic, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.08 / (i + 1), ctx.currentTime);
      
      // Sacred vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(0.1, ctx.currentTime);
      vibGain.gain.setValueAtTime(1.5, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Temple bells
    const playBell = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const bellFreqs = [523.25, 659.25, 783.99];
      const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
      
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      bellGain.gain.setValueAtTime(0.1, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5);
      
      bellOsc.connect(bellGain);
      bellGain.connect(gainNode);
      bellOsc.start();
      bellOsc.stop(ctx.currentTime + 5);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) playBell();
    }, 4000);
    intervalsRef.current.push(interval);
    playBell();

    return nodes;
  }, []);

  // ==========================================
  // 😊 HAPPY - Bright, uplifting major tones
  // Medium-fast, medium-high volume
  // ==========================================
  const createHappySound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Bright major chord
    const chordFreqs = [329.63, 415.30, 493.88, 659.25]; // E major
    chordFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      // Shimmer effect
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.frequency.setValueAtTime(5 + i * 0.5, ctx.currentTime);
      shimmerGain.gain.setValueAtTime(2, ctx.currentTime);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(osc.frequency);
      shimmer.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Playful melodic arpeggios
    const playArpeggio = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          noteGain.gain.setValueAtTime(0.08, ctx.currentTime);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          
          noteOsc.connect(noteGain);
          noteGain.connect(gainNode);
          noteOsc.start();
          noteOsc.stop(ctx.currentTime + 0.8);
        }, i * 150); // Quick arpeggios
      });
    };

    const interval = setInterval(playArpeggio, 3000);
    intervalsRef.current.push(interval);
    playArpeggio();

    return nodes;
  }, []);

  // ==========================================
  // 😡 ANGRY (Calming) - Deep grounding, earth tones
  // Very slow, medium-low, grounding
  // ==========================================
  const createAngryCalming = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Very deep grounding frequencies
    const groundFreqs = [65.41, 98.00, 130.81]; // C2, G2, C3
    groundFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.07 / (i + 1), ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    // Slow, calming wind
    const windBuffer = createNoiseBuffer(ctx, 3);
    const wind = ctx.createBufferSource();
    wind.buffer = windBuffer;
    wind.loop = true;
    
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(300, ctx.currentTime);
    
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.025, ctx.currentTime);
    
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.05, ctx.currentTime);
    lfoGain.gain.setValueAtTime(100, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();
    
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(gainNode);
    wind.start();

    return nodes;
  }, [createNoiseBuffer]);

  // ==========================================
  // 😰 ANXIOUS RELIEF - Binaural alpha, soft pads
  // Slow rhythmic, low volume, safety
  // ==========================================
  const createAnxiousRelief = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    // Binaural beats - 10Hz alpha for relaxation
    const baseFreq = 180;
    
    // Left ear
    const leftOsc = ctx.createOscillator();
    const leftGain = ctx.createGain();
    const leftPan = ctx.createStereoPanner();
    leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    leftGain.gain.setValueAtTime(0.08, ctx.currentTime);
    leftPan.pan.setValueAtTime(-1, ctx.currentTime);
    leftOsc.connect(leftGain);
    leftGain.connect(leftPan);
    leftPan.connect(gainNode);
    leftOsc.start();
    nodes.push(leftOsc);

    // Right ear (10Hz difference)
    const rightOsc = ctx.createOscillator();
    const rightGain = ctx.createGain();
    const rightPan = ctx.createStereoPanner();
    rightOsc.frequency.setValueAtTime(baseFreq + 10, ctx.currentTime);
    rightGain.gain.setValueAtTime(0.08, ctx.currentTime);
    rightPan.pan.setValueAtTime(1, ctx.currentTime);
    rightOsc.connect(rightGain);
    rightGain.connect(rightPan);
    rightPan.connect(gainNode);
    rightOsc.start();
    nodes.push(rightOsc);

    // Warm, safe pad
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    const padFilter = ctx.createBiquadFilter();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(220, ctx.currentTime);
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(400, ctx.currentTime);
    padGain.gain.setValueAtTime(0.04, ctx.currentTime);
    
    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);

    return nodes;
  }, []);

  // ==========================================
  // INSTRUMENT-SPECIFIC GENERATORS
  // ==========================================

  const createTempleBells = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(220, ctx.currentTime);
    padGain.gain.setValueAtTime(0.04, ctx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);

    const playBell = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const bellFreqs = [523.25, 659.25, 783.99, 880, 1046.5];
      const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
      
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      bellGain.gain.setValueAtTime(0.12, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
      bellOsc.connect(bellGain);
      bellGain.connect(gainNode);
      bellOsc.start();
      bellOsc.stop(ctx.currentTime + 4);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.5) playBell();
    }, 3000);
    intervalsRef.current.push(interval);
    playBell();

    return nodes;
  }, []);

  const createTanpura = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    const frequencies = [130.81, 196.00, 261.63];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.06, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + i * 0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });

    return nodes;
  }, []);

  const createFlute = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(130.81, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.05, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(gainNode);
    droneOsc.start();
    nodes.push(droneOsc);

    const playNote = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      
      const noteOsc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.2);
      noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);

      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(5, ctx.currentTime);
      vibGain.gain.setValueAtTime(4, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(noteOsc.frequency);
      vib.start();
      vib.stop(ctx.currentTime + 3);

      noteOsc.connect(noteGain);
      noteGain.connect(gainNode);
      noteOsc.start();
      noteOsc.stop(ctx.currentTime + 3);
    };

    const interval = setInterval(playNote, 3500);
    intervalsRef.current.push(interval);
    setTimeout(playNote, 500);

    return nodes;
  }, []);

  const createNature = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    const windBuffer = createNoiseBuffer(ctx, 3);
    const wind = ctx.createBufferSource();
    wind.buffer = windBuffer;
    wind.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(400, ctx.currentTime);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.04, ctx.currentTime);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(150, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(gainNode);
    wind.start();

    return nodes;
  }, [createNoiseBuffer]);

  const createChimes = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(349.23, ctx.currentTime);
    padGain.gain.setValueAtTime(0.03, ctx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);

    const playChime = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const chimeFreqs = [880, 1046.5, 1174.66, 1318.51, 1567.98];
      chimeFreqs.slice(0, 2 + Math.floor(Math.random() * 3)).forEach((freq, i) => {
        setTimeout(() => {
          const chimeOsc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(freq * (0.98 + Math.random() * 0.04), ctx.currentTime);
          chimeGain.gain.setValueAtTime(0.06, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
          chimeOsc.connect(chimeGain);
          chimeGain.connect(gainNode);
          chimeOsc.start();
          chimeOsc.stop(ctx.currentTime + 3);
        }, i * 100);
      });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.4) playChime();
    }, 2500);
    intervalsRef.current.push(interval);
    playChime();

    return nodes;
  }, []);

  const createSingingBowls = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];

    const playSingingBowl = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const bowlFreqs = [256, 384, 512];
      const baseFreq = bowlFreqs[Math.floor(Math.random() * bowlFreqs.length)];
      
      const bowlOsc = ctx.createOscillator();
      const bowlGain = ctx.createGain();
      bowlOsc.type = 'sine';
      bowlOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      bowlGain.gain.setValueAtTime(0.12, ctx.currentTime);
      bowlGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 8);
      bowlOsc.connect(bowlGain);
      bowlGain.connect(gainNode);
      bowlOsc.start();
      bowlOsc.stop(ctx.currentTime + 8);

      [2, 3].forEach((harmonic, i) => {
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(baseFreq * harmonic, ctx.currentTime);
        overtoneGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
        overtone.connect(overtoneGain);
        overtoneGain.connect(gainNode);
        overtone.start();
        overtone.stop(ctx.currentTime + 6);
      });
    };

    const interval = setInterval(playSingingBowl, 5000);
    intervalsRef.current.push(interval);
    playSingingBowl();

    return nodes;
  }, []);

  const createWater = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const noiseBuffer = createNoiseBuffer(ctx, 2);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
    lfoGain.gain.setValueAtTime(150, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gainNode);
    noise.start();

    return [];
  }, [createNoiseBuffer]);

  // ==========================================
  // PLAY & STOP CONTROLS
  // ==========================================

  const play = useCallback((options: DivineAudioOptions) => {
    const ctx = initAudioContext();
    stop();

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Get mood-specific volume or use provided volume
    const moodVolume = options.mood ? MOOD_VOLUMES[options.mood] : 0.5;
    const finalVolume = (options.volume ?? 1) * moodVolume;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(finalVolume, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;

    let nodes: AudioNode[] = [];

    if (options.instrument) {
      switch (options.instrument) {
        case 'om': nodes = createDevotionalSound(ctx, gainNode); break;
        case 'bells': nodes = createTempleBells(ctx, gainNode); break;
        case 'tanpura': nodes = createTanpura(ctx, gainNode); break;
        case 'flute': nodes = createFlute(ctx, gainNode); break;
        case 'nature': nodes = createNature(ctx, gainNode); break;
        case 'water': nodes = createWater(ctx, gainNode); break;
        case 'wind': nodes = createNature(ctx, gainNode); break;
        case 'chimes': nodes = createChimes(ctx, gainNode); break;
        case 'singing-bowls': nodes = createSingingBowls(ctx, gainNode); break;
        case 'mantra-rhythm': nodes = createDevotionalSound(ctx, gainNode); break;
      }
    } else if (options.mood) {
      switch (options.mood) {
        case 'peaceful': nodes = createPeacefulSound(ctx, gainNode); break;
        case 'stressed': nodes = createStressReliefSound(ctx, gainNode); break;
        case 'sad': case 'emotional': nodes = createSadSound(ctx, gainNode); break;
        case 'angry': nodes = createAngryCalming(ctx, gainNode); break;
        case 'anxious': nodes = createAnxiousRelief(ctx, gainNode); break;
        case 'happy': nodes = createHappySound(ctx, gainNode); break;
        case 'devotional': case 'divine': nodes = createDevotionalSound(ctx, gainNode); break;
        case 'sleep': nodes = createSleepSound(ctx, gainNode); break;
        case 'focus': nodes = createFocusSound(ctx, gainNode); break;
        case 'energy': case 'powerful': nodes = createEnergySound(ctx, gainNode); break;
      }
    }

    nodesRef.current = nodes;
    setIsPlaying(true);
    setCurrentMood(options.mood || null);

    // Sound evolution - subtle changes every 5-7 minutes
    evolutionIntervalRef.current = setInterval(() => {
      if (gainNodeRef.current && audioContextRef.current) {
        const currentTime = audioContextRef.current.currentTime;
        const currentGain = gainNodeRef.current.gain.value;
        // Subtle volume breathing
        gainNodeRef.current.gain.setValueAtTime(currentGain, currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(currentGain * 0.9, currentTime + 10);
        gainNodeRef.current.gain.linearRampToValueAtTime(currentGain, currentTime + 20);
      }
    }, 300000 + Math.random() * 120000); // 5-7 minutes

  }, [
    initAudioContext,
    createPeacefulSound,
    createStressReliefSound,
    createSadSound,
    createAngryCalming,
    createAnxiousRelief,
    createHappySound,
    createDevotionalSound,
    createSleepSound,
    createFocusSound,
    createEnergySound,
    createTempleBells,
    createTanpura,
    createFlute,
    createNature,
    createChimes,
    createSingingBowls,
    createWater
  ]);

  const stop = useCallback(() => {
    clearAllIntervals();

    nodesRef.current.forEach(node => {
      try {
        if (node instanceof OscillatorNode) {
          node.stop();
        }
        node.disconnect();
      } catch (e) {}
    });
    nodesRef.current = [];

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    setIsPlaying(false);
    setCurrentMood(null);
  }, [clearAllIntervals]);

  const setVolume = useCallback((volume: number) => {
    if (gainNodeRef.current && audioContextRef.current) {
      const moodMultiplier = currentMood ? MOOD_VOLUMES[currentMood] : 0.5;
      gainNodeRef.current.gain.setValueAtTime(volume * moodMultiplier, audioContextRef.current.currentTime);
    }
  }, [currentMood]);

  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [stop]);

  return {
    play,
    stop,
    setVolume,
    isPlaying,
    currentMood,
  };
};

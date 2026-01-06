import { useRef, useState, useCallback, useEffect } from 'react';

export type MoodType = 
  | 'peaceful' 
  | 'stressed' 
  | 'sad' 
  | 'angry' 
  | 'anxious' 
  | 'happy' 
  | 'devotional'
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
  | 'mantra-rhythm';

interface DivineAudioOptions {
  mood?: MoodType;
  instrument?: InstrumentType;
  volume?: number;
}

export const useDivineAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Create a smooth, loopable noise generator
  const createNoiseBuffer = useCallback((ctx: AudioContext, seconds: number = 2) => {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }, []);

  // Peaceful: Soft drone with gentle harmonics
  const createPeacefulSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Base frequency (C3 - grounding)
    const frequencies = [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.08 / (i + 1), ctx.currentTime);
      
      // Gentle LFO for breathing effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.05 + i * 0.01, ctx.currentTime);
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

  // Stressed Relief: Water + soft bells
  const createStressReliefSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Water-like sound using filtered noise
    const noiseBuffer = createNoiseBuffer(ctx, 2);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, ctx.currentTime);
    
    // Modulate for flowing water effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
    lfoGain.gain.setValueAtTime(100, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gainNode);
    noise.start();
    
    // Soft pad for comfort
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(220, ctx.currentTime);
    padGain.gain.setValueAtTime(0.06, ctx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);
    
    return nodes;
  }, [createNoiseBuffer]);

  // Sad/Emotional: Minor key, gentle
  const createSadSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // A minor chord with gentle movement
    const frequencies = [220, 261.63, 329.63, 440]; // A3, C4, E4, A4
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.05 / (i + 1), ctx.currentTime);
      
      // Slow, melancholic vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(0.08, ctx.currentTime);
      vibGain.gain.setValueAtTime(2, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });
    
    return nodes;
  }, []);

  // Angry Calming: Deep grounding tones
  const createAngryCalming = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Very low frequencies to ground and calm
    const baseFreq = 65.41; // C2 - very grounding
    
    [1, 2, 3].forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq * harmonic, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.1 / (i + 1), ctx.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });
    
    // Add wind-like noise for release
    const noiseBuffer = createNoiseBuffer(ctx);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.02, ctx.currentTime);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gainNode);
    noise.start();
    
    return nodes;
  }, [createNoiseBuffer]);

  // Anxious Relief: Binaural beats for calm
  const createAnxiousRelief = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Alpha waves (8-12 Hz) for relaxation
    const baseFreq = 200;
    const binauralDiff = 10; // 10 Hz alpha wave
    
    // Left ear
    const leftOsc = ctx.createOscillator();
    const leftGain = ctx.createGain();
    const leftPan = ctx.createStereoPanner();
    
    leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    leftGain.gain.setValueAtTime(0.1, ctx.currentTime);
    leftPan.pan.setValueAtTime(-1, ctx.currentTime);
    
    leftOsc.connect(leftGain);
    leftGain.connect(leftPan);
    leftPan.connect(gainNode);
    leftOsc.start();
    nodes.push(leftOsc);
    
    // Right ear
    const rightOsc = ctx.createOscillator();
    const rightGain = ctx.createGain();
    const rightPan = ctx.createStereoPanner();
    
    rightOsc.frequency.setValueAtTime(baseFreq + binauralDiff, ctx.currentTime);
    rightGain.gain.setValueAtTime(0.1, ctx.currentTime);
    rightPan.pan.setValueAtTime(1, ctx.currentTime);
    
    rightOsc.connect(rightGain);
    rightGain.connect(rightPan);
    rightPan.connect(gainNode);
    rightOsc.start();
    nodes.push(rightOsc);
    
    // Ambient pad
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(174.61, ctx.currentTime); // F3 - soothing
    padGain.gain.setValueAtTime(0.04, ctx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    nodes.push(padOsc);
    
    return nodes;
  }, []);

  // Happy/Uplifting: Major key, bright tones
  const createHappySound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // C major with bright harmonics
    const frequencies = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.06 / (i + 1), ctx.currentTime);
      
      // Gentle shimmer
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.frequency.setValueAtTime(4 + i, ctx.currentTime);
      shimmerGain.gain.setValueAtTime(3, ctx.currentTime);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(osc.frequency);
      shimmer.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });
    
    return nodes;
  }, []);

  // Devotional: Om drone with temple atmosphere
  const createDevotionalSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Om frequency (136.1 Hz - Earth's frequency)
    const omFreq = 136.1;
    
    [1, 2, 3, 4].forEach((harmonic, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(omFreq * harmonic, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.12 / (i + 1), ctx.currentTime);
      
      // Sacred vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(0.1, ctx.currentTime);
      vibGain.gain.setValueAtTime(2, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });
    
    return nodes;
  }, []);

  // Powerful: Strong, uplifting energy
  const createPowerfulSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Power chord style
    const frequencies = [110, 165, 220, 330]; // A2, E3, A3, E4
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = i < 2 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime);
      
      // Filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      nodes.push(osc);
    });
    
    return nodes;
  }, []);

  // Divine: Ethereal, celestial sounds
  const createDivineSound = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Celestial frequencies
    const frequencies = [396, 417, 528, 639]; // Solfeggio frequencies
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
      
      // Slow ethereal movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.03 + i * 0.01, ctx.currentTime);
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

  // Mantra Rhythm: Steady, meditative pulse
  const createMantraRhythm = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Base drone
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(136.1, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.1, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(gainNode);
    droneOsc.start();
    nodes.push(droneOsc);
    
    // Rhythmic pulse (like a slow heartbeat for mantra timing)
    const playPulse = () => {
      if (!isPlaying) return;
      
      const pulseOsc = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      
      pulseOsc.type = 'sine';
      pulseOsc.frequency.setValueAtTime(272.2, ctx.currentTime);
      
      pulseGain.gain.setValueAtTime(0, ctx.currentTime);
      pulseGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      pulseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      
      pulseOsc.connect(pulseGain);
      pulseGain.connect(gainNode);
      pulseOsc.start();
      pulseOsc.stop(ctx.currentTime + 1);
    };
    
    // Pulse every 2 seconds for slow mantra pace
    intervalRef.current = setInterval(playPulse, 2000);
    playPulse();
    
    return nodes;
  }, [isPlaying]);

  // Temple bells with random intervals
  const createTempleBells = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Background pad
    const padOsc = ctx.createOscillator();
    const padGain = ctx.createGain();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(220, ctx.currentTime);
    padGain.gain.setValueAtTime(0.05, ctx.currentTime);
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
      
      bellGain.gain.setValueAtTime(0.15, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
      
      bellOsc.connect(bellGain);
      bellGain.connect(gainNode);
      bellOsc.start();
      bellOsc.stop(ctx.currentTime + 4);
    };
    
    // Random bells
    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.5) playBell();
    }, 3000);
    playBell();
    
    return nodes;
  }, []);

  // Tanpura drone
  const createTanpura = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Sa-Pa-Sa-Sa pattern
    const frequencies = [130.81, 196.00, 261.63, 261.63];
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.06, ctx.currentTime);
      
      // Characteristic tanpura buzz
      const buzz = ctx.createOscillator();
      const buzzGain = ctx.createGain();
      buzz.frequency.setValueAtTime(freq * 2.01, ctx.currentTime);
      buzzGain.gain.setValueAtTime(0.015, ctx.currentTime);
      buzz.connect(buzzGain);
      buzzGain.connect(gainNode);
      buzz.start();
      
      // Pulsing effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + i * 0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
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

  // Bansuri flute melody
  const createFlute = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Drone
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(130.81, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.06, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(gainNode);
    droneOsc.start();
    nodes.push(droneOsc);
    
    const playNote = () => {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
      
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const duration = 2 + Math.random() * 2;
      
      const noteOsc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.2);
      noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      
      // Breath vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(5, ctx.currentTime);
      vibGain.gain.setValueAtTime(4, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(noteOsc.frequency);
      vib.start();
      vib.stop(ctx.currentTime + duration);
      
      noteOsc.connect(noteGain);
      noteGain.connect(gainNode);
      noteOsc.start();
      noteOsc.stop(ctx.currentTime + duration);
    };
    
    intervalRef.current = setInterval(playNote, 3500);
    setTimeout(playNote, 500);
    
    return nodes;
  }, []);

  // Nature sounds (wind + water)
  const createNature = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Wind
    const windBuffer = createNoiseBuffer(ctx, 3);
    const wind = ctx.createBufferSource();
    wind.buffer = windBuffer;
    wind.loop = true;
    
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(400, ctx.currentTime);
    
    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.04, ctx.currentTime);
    
    const windLfo = ctx.createOscillator();
    const windLfoGain = ctx.createGain();
    windLfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    windLfoGain.gain.setValueAtTime(150, ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start();
    
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(gainNode);
    wind.start();
    
    // Water stream
    const waterBuffer = createNoiseBuffer(ctx, 2);
    const water = ctx.createBufferSource();
    water.buffer = waterBuffer;
    water.loop = true;
    
    const waterFilter = ctx.createBiquadFilter();
    waterFilter.type = 'bandpass';
    waterFilter.frequency.setValueAtTime(800, ctx.currentTime);
    waterFilter.Q.setValueAtTime(2, ctx.currentTime);
    
    const waterGain = ctx.createGain();
    waterGain.gain.setValueAtTime(0.02, ctx.currentTime);
    
    water.connect(waterFilter);
    waterFilter.connect(waterGain);
    waterGain.connect(gainNode);
    water.start();
    
    return nodes;
  }, [createNoiseBuffer]);

  // Wind chimes
  const createChimes = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const nodes: AudioNode[] = [];
    
    // Ambient pad
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
          
          chimeGain.gain.setValueAtTime(0.08, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
          
          chimeOsc.connect(chimeGain);
          chimeGain.connect(gainNode);
          chimeOsc.start();
          chimeOsc.stop(ctx.currentTime + 3);
        }, i * 100);
      });
    };
    
    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.4) playChime();
    }, 2500);
    playChime();
    
    return nodes;
  }, []);

  const play = useCallback((options: DivineAudioOptions) => {
    const ctx = initAudioContext();
    
    // Stop existing
    stop();
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Master gain
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(options.volume ?? 0.5, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;
    
    let nodes: AudioNode[] = [];
    
    // If instrument is specified, use that
    if (options.instrument) {
      switch (options.instrument) {
        case 'om': nodes = createDevotionalSound(ctx, gainNode); break;
        case 'bells': nodes = createTempleBells(ctx, gainNode); break;
        case 'tanpura': nodes = createTanpura(ctx, gainNode); break;
        case 'flute': nodes = createFlute(ctx, gainNode); break;
        case 'nature': nodes = createNature(ctx, gainNode); break;
        case 'water': nodes = createStressReliefSound(ctx, gainNode); break;
        case 'wind': nodes = createNature(ctx, gainNode); break;
        case 'chimes': nodes = createChimes(ctx, gainNode); break;
        case 'mantra-rhythm': nodes = createMantraRhythm(ctx, gainNode); break;
      }
    } else if (options.mood) {
      // Use mood-based sound
      switch (options.mood) {
        case 'peaceful': nodes = createPeacefulSound(ctx, gainNode); break;
        case 'stressed': nodes = createStressReliefSound(ctx, gainNode); break;
        case 'sad': case 'emotional': nodes = createSadSound(ctx, gainNode); break;
        case 'angry': nodes = createAngryCalming(ctx, gainNode); break;
        case 'anxious': nodes = createAnxiousRelief(ctx, gainNode); break;
        case 'happy': nodes = createHappySound(ctx, gainNode); break;
        case 'devotional': nodes = createDevotionalSound(ctx, gainNode); break;
        case 'powerful': nodes = createPowerfulSound(ctx, gainNode); break;
        case 'divine': nodes = createDivineSound(ctx, gainNode); break;
      }
    }
    
    nodesRef.current = nodes;
    setIsPlaying(true);
    setCurrentMood(options.mood || null);
  }, [
    initAudioContext, 
    createPeacefulSound, 
    createStressReliefSound, 
    createSadSound,
    createAngryCalming,
    createAnxiousRelief,
    createHappySound,
    createDevotionalSound,
    createPowerfulSound,
    createDivineSound,
    createMantraRhythm,
    createTempleBells,
    createTanpura,
    createFlute,
    createNature,
    createChimes
  ]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
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
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, []);

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

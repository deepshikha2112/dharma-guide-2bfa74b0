import { useRef, useState, useCallback, useEffect } from 'react';

type SoundType = 'om' | 'bells' | 'tanpura' | 'flute' | 'nature' | 'meditation';

interface AmbientSoundOptions {
  type: SoundType;
  volume?: number;
}

export const useAmbientSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentType, setCurrentType] = useState<SoundType | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createOmDrone = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    // Base Om frequency (136.1 Hz - Earth's frequency)
    const baseFreq = 136.1;
    
    // Create multiple harmonics for rich drone sound
    [1, 2, 3, 4, 5].forEach((harmonic, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * harmonic, ctx.currentTime);
      
      // Decrease volume for higher harmonics
      oscGain.gain.setValueAtTime(0.3 / (index + 1), ctx.currentTime);
      
      // Add subtle vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + index * 0.02, ctx.currentTime);
      lfoGain.gain.setValueAtTime(2, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      
      oscillators.push(osc);
    });
    
    return oscillators;
  }, []);

  const createBells = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    const playBell = () => {
      if (!isPlaying) return;
      
      const bellFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
      
      const osc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      bellGain.gain.setValueAtTime(0.3, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      
      osc.connect(bellGain);
      bellGain.connect(gainNode);
      osc.start();
      osc.stop(ctx.currentTime + 3);
      
      // Schedule next bell
      setTimeout(playBell, 3000 + Math.random() * 4000);
    };
    
    // Start with ambient pad
    const padOsc = ctx.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
    
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.1, ctx.currentTime);
    
    padOsc.connect(padGain);
    padGain.connect(gainNode);
    padOsc.start();
    oscillators.push(padOsc);
    
    playBell();
    
    return oscillators;
  }, [isPlaying]);

  const createTanpura = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    // Tanpura frequencies (Sa-Pa-Sa-Sa pattern)
    const frequencies = [130.81, 196.00, 261.63, 261.63]; // C3, G3, C4, C4
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      // Create rich harmonic content
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Stagger the volume changes for flowing effect
      const cycleDuration = 4;
      const offset = index * (cycleDuration / frequencies.length);
      
      oscGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      // Create pulsing effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.1, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start(ctx.currentTime + offset);
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      
      oscillators.push(osc);
    });
    
    return oscillators;
  }, []);

  const createFlute = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    // Pentatonic scale for meditation
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00]; // C4, D4, E4, G4, A4
    
    const playNote = () => {
      if (!isPlaying) return;
      
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const duration = 2 + Math.random() * 3;
      
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Gentle attack and release
      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
      noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      
      // Add breath-like vibrato
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.frequency.setValueAtTime(5, ctx.currentTime);
      vibratoGain.gain.setValueAtTime(3, ctx.currentTime);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start();
      vibrato.stop(ctx.currentTime + duration);
      
      osc.connect(noteGain);
      noteGain.connect(gainNode);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      
      setTimeout(playNote, duration * 1000 + Math.random() * 2000);
    };
    
    // Background drone
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(130.81, ctx.currentTime);
    
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.08, ctx.currentTime);
    
    droneOsc.connect(droneGain);
    droneGain.connect(gainNode);
    droneOsc.start();
    oscillators.push(droneOsc);
    
    playNote();
    
    return oscillators;
  }, [isPlaying]);

  const createNature = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    // Create wind-like white noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    // Filter for softer wind sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
    
    // Modulate for wind gusts
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(noiseGain.gain);
    lfo.start();
    
    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(gainNode);
    whiteNoise.start();
    
    // Add gentle water/stream sound
    const streamOsc = ctx.createOscillator();
    streamOsc.type = 'sine';
    streamOsc.frequency.setValueAtTime(200, ctx.currentTime);
    
    const streamGain = ctx.createGain();
    streamGain.gain.setValueAtTime(0.02, ctx.currentTime);
    
    const streamLfo = ctx.createOscillator();
    const streamLfoGain = ctx.createGain();
    streamLfo.frequency.setValueAtTime(3, ctx.currentTime);
    streamLfoGain.gain.setValueAtTime(50, ctx.currentTime);
    streamLfo.connect(streamLfoGain);
    streamLfoGain.connect(streamOsc.frequency);
    streamLfo.start();
    
    streamOsc.connect(streamGain);
    streamGain.connect(gainNode);
    streamOsc.start();
    oscillators.push(streamOsc);
    
    return oscillators;
  }, []);

  const createMeditation = useCallback((ctx: AudioContext, gainNode: GainNode) => {
    const oscillators: OscillatorNode[] = [];
    
    // Binaural beats for deep meditation (Theta waves: 4-8 Hz)
    const baseFreq = 200;
    const binauralDiff = 6; // 6 Hz theta wave
    
    // Left channel
    const leftOsc = ctx.createOscillator();
    const leftGain = ctx.createGain();
    const leftPanner = ctx.createStereoPanner();
    
    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    leftGain.gain.setValueAtTime(0.15, ctx.currentTime);
    leftPanner.pan.setValueAtTime(-1, ctx.currentTime);
    
    leftOsc.connect(leftGain);
    leftGain.connect(leftPanner);
    leftPanner.connect(gainNode);
    leftOsc.start();
    oscillators.push(leftOsc);
    
    // Right channel
    const rightOsc = ctx.createOscillator();
    const rightGain = ctx.createGain();
    const rightPanner = ctx.createStereoPanner();
    
    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(baseFreq + binauralDiff, ctx.currentTime);
    rightGain.gain.setValueAtTime(0.15, ctx.currentTime);
    rightPanner.pan.setValueAtTime(1, ctx.currentTime);
    
    rightOsc.connect(rightGain);
    rightGain.connect(rightPanner);
    rightPanner.connect(gainNode);
    rightOsc.start();
    oscillators.push(rightOsc);
    
    // Add ambient pad
    const padFreqs = [130.81, 164.81, 196.00]; // C3, E3, G3 (C major)
    padFreqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0.05, ctx.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      oscillators.push(osc);
    });
    
    return oscillators;
  }, []);

  const play = useCallback((options: AmbientSoundOptions) => {
    const ctx = initAudioContext();
    
    // Stop any existing sounds
    stop();
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create master gain node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(options.volume ?? 0.5, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodeRef.current = gainNode;
    
    // Create oscillators based on type
    let oscillators: OscillatorNode[] = [];
    
    switch (options.type) {
      case 'om':
        oscillators = createOmDrone(ctx, gainNode);
        break;
      case 'bells':
        oscillators = createBells(ctx, gainNode);
        break;
      case 'tanpura':
        oscillators = createTanpura(ctx, gainNode);
        break;
      case 'flute':
        oscillators = createFlute(ctx, gainNode);
        break;
      case 'nature':
        oscillators = createNature(ctx, gainNode);
        break;
      case 'meditation':
        oscillators = createMeditation(ctx, gainNode);
        break;
    }
    
    oscillatorsRef.current = oscillators;
    setIsPlaying(true);
    setCurrentType(options.type);
  }, [initAudioContext, createOmDrone, createBells, createTanpura, createFlute, createNature, createMeditation]);

  const stop = useCallback(() => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
    
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    
    setIsPlaying(false);
    setCurrentType(null);
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stop]);

  return {
    play,
    stop,
    setVolume,
    isPlaying,
    currentType,
  };
};

export type { SoundType };

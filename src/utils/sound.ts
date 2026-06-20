// High-end synthesized organic UI audio feedback for a luxury experience
// Synthesized purely through Web Audio API to guarantee 100% reliability, zero-byte overhead, and instant load.

let soundEnabled = localStorage.getItem('portfolio-sound-enabled') === 'true';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    // Standard and vendor-prefixed AudioContext for perfect cross-browser support
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundSystem = {
  isEnabled(): boolean {
    return soundEnabled;
  },
  
  toggle(): boolean {
    soundEnabled = !soundEnabled;
    localStorage.setItem('portfolio-sound-enabled', String(soundEnabled));
    return soundEnabled;
  },

  playHover(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      const startTime = ctx.currentTime;
      
      // Super delicate high-frequency UI transient "ping"
      osc.frequency.setValueAtTime(1300, startTime);
      osc.frequency.exponentialRampToValueAtTime(1050, startTime + 0.04);
      
      // Extremely low volume, soft spatial glow (amplitude envelope)
      gain.gain.setValueAtTime(0.015, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.04);
    } catch (e) {
      // Graceful fallback for browser permission blocks
    }
  },

  playClick(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const startTime = ctx.currentTime;
      
      // Elegant, physical tactical double-frequency mechanical switch simulator
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      
      // Base organic body frequency
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(650, startTime);
      osc1.frequency.exponentialRampToValueAtTime(450, startTime + 0.05);
      gain1.gain.setValueAtTime(0.02, startTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.05);
      
      // Metallic luxury keycap release tick
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1800, startTime);
      osc2.frequency.exponentialRampToValueAtTime(1450, startTime + 0.07);
      gain2.gain.setValueAtTime(0.01, startTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.07);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + 0.07);
      osc2.stop(startTime + 0.07);
    } catch (e) {
      // Graceful fallback
    }
  }
};

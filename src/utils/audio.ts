// Web Audio API synthesizer for child-friendly educational sounds
// Generates clean, pleasant audio tones locally without external MP3 files.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const playSound = {
  click: (enabled: boolean) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback silent
    }
  },

  correct: (enabled: boolean) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Cheerful 2-tone chime: C5 (523Hz) -> G5 (784Hz)
      const now = ctx.currentTime;
      const notes = [
        { freq: 523.25, start: now, dur: 0.12 },
        { freq: 659.25, start: now + 0.1, dur: 0.14 },
        { freq: 783.99, start: now + 0.22, dur: 0.25 },
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, n.start);

        gain.gain.setValueAtTime(0.12, n.start);
        gain.gain.exponentialRampToValueAtTime(0.001, n.start + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(n.start);
        osc.stop(n.start + n.dur);
      });
    } catch {
      // Audio fallback silent
    }
  },

  tryAgain: (enabled: boolean) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Gentle, supportive low marimba tone (not a harsh buzzer)
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio fallback silent
    }
  },

  celebrate: (enabled: boolean) => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Joyful arpeggio: C5, E5, G5, C6
      const now = ctx.currentTime;
      const arpeggio = [523.25, 659.25, 783.99, 1046.5];
      arpeggio.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;
        const dur = 0.3;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + dur);
      });
    } catch {
      // Audio fallback silent
    }
  },
};

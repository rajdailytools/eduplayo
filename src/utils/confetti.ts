import confetti from 'canvas-confetti';

export function triggerConfetti() {
  if (typeof window === 'undefined') return;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#4338CA', '#7C3AED', '#FACC15', '#10B981', '#38BDF8'],
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
}

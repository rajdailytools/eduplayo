import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { playSound } from '../utils/audio';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playTryAgain: () => void;
  playCelebrate: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);
const STORAGE_KEY = 'eduplayo_sound_pref';

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setSoundEnabled(saved === 'true');
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const playClick = () => playSound.click(soundEnabled);
  const playCorrect = () => playSound.correct(soundEnabled);
  const playTryAgain = () => playSound.tryAgain(soundEnabled);
  const playCelebrate = () => playSound.celebrate(soundEnabled);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playClick,
        playCorrect,
        playTryAgain,
        playCelebrate,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

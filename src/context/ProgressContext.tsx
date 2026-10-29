import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProgress, Badge } from '../types';
import { BADGES } from '../data/curriculum';

interface ProgressContextType {
  progress: UserProgress;
  recentUnlockedBadge: Badge | null;
  clearRecentBadge: () => void;
  awardXp: (amount: number, gameId?: string) => void;
  recordGameCompletion: (gameId: string, score: number, maxScore: number, xpReward: number) => void;
  recordDailyChallengeCompletion: (challengeDateStr: string, xpReward: number) => void;
  resetProgress: () => void;
}

const STORAGE_KEY = 'eduplayo_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  version: 1,
  xp: 0,
  level: 1,
  streakDays: 1,
  lastPlayedDate: null,
  completedGameIds: [],
  gameHighScores: {},
  completedDailyChallenges: [],
  completedChapters: [],
  unlockedBadgeIds: [],
};

// Calculate level from XP: each level is 100 XP
export function calculateLevel(xp: number): number {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [recentUnlockedBadge, setRecentUnlockedBadge] = useState<Badge | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.xp === 'number' && parsed.version === 1) {
          setProgress(parsed);
          return;
        }
      }
    } catch {
      // Corrupted or blocked localStorage: fallback gracefully to initial
    }
  }, []);

  // Save changes to localStorage
  const saveProgress = (newProg: UserProgress) => {
    setProgress(newProg);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProg));
    } catch {
      // Local storage quota or unavailable
    }
  };

  const checkBadgeUnlocks = (newProg: UserProgress): UserProgress => {
    const updatedUnlocked = [...newProg.unlockedBadgeIds];
    let newlyFound: Badge | null = null;

    BADGES.forEach((badge) => {
      if (updatedUnlocked.includes(badge.id)) return;

      let qualified = false;
      if (badge.requiredGames && newProg.completedGameIds.length >= badge.requiredGames) {
        qualified = true;
      }
      if (badge.requiredXp && newProg.xp >= badge.requiredXp) {
        qualified = true;
      }
      if (badge.id === 'streak-master' && newProg.completedDailyChallenges.length >= 1) {
        qualified = true;
      }

      if (qualified) {
        updatedUnlocked.push(badge.id);
        newlyFound = badge;
      }
    });

    if (newlyFound) {
      setRecentUnlockedBadge(newlyFound);
    }

    return {
      ...newProg,
      unlockedBadgeIds: updatedUnlocked,
    };
  };

  const awardXp = (amount: number, gameId?: string) => {
    if (amount <= 0) return;
    const today = new Date().toISOString().split('T')[0];
    const newXp = progress.xp + amount;
    const newLevel = calculateLevel(newXp);

    let updatedCompletedGames = [...progress.completedGameIds];
    if (gameId && !updatedCompletedGames.includes(gameId)) {
      updatedCompletedGames.push(gameId);
    }

    const updated: UserProgress = {
      ...progress,
      xp: newXp,
      level: newLevel,
      lastPlayedDate: today,
      completedGameIds: updatedCompletedGames,
    };

    saveProgress(checkBadgeUnlocks(updated));
  };

  const recordGameCompletion = (gameId: string, score: number, maxScore: number, xpReward: number) => {
    const today = new Date().toISOString().split('T')[0];
    const currentHigh = progress.gameHighScores[gameId] || 0;
    const isNewHigh = score > currentHigh;
    const alreadyCompleted = progress.completedGameIds.includes(gameId);

    // Award XP: base reward if first time, or proportional incremental reward for improvement
    const earnedXp = alreadyCompleted ? (isNewHigh ? Math.round(xpReward * 0.5) : Math.round(xpReward * 0.2)) : xpReward;

    const newXp = progress.xp + earnedXp;
    const newLevel = calculateLevel(newXp);

    let updatedCompleted = [...progress.completedGameIds];
    if (!alreadyCompleted) {
      updatedCompleted.push(gameId);
    }

    const updatedHighScores = {
      ...progress.gameHighScores,
      [gameId]: Math.max(currentHigh, score),
    };

    // Specific badge checks
    const updatedBadges = [...progress.unlockedBadgeIds];
    let specialBadge: Badge | null = null;

    if (gameId === 'count-objects' && score >= maxScore && !updatedBadges.includes('counting-champion')) {
      updatedBadges.push('counting-champion');
      specialBadge = BADGES.find((b) => b.id === 'counting-champion') || null;
    }
    if (gameId === 'number-matching' && score >= maxScore && !updatedBadges.includes('matching-master')) {
      updatedBadges.push('matching-master');
      specialBadge = BADGES.find((b) => b.id === 'matching-master') || null;
    }
    if (gameId === 'number-order' && score >= maxScore && !updatedBadges.includes('order-wizard')) {
      updatedBadges.push('order-wizard');
      specialBadge = BADGES.find((b) => b.id === 'order-wizard') || null;
    }

    if (specialBadge) {
      setRecentUnlockedBadge(specialBadge);
    }

    const updated: UserProgress = {
      ...progress,
      xp: newXp,
      level: newLevel,
      lastPlayedDate: today,
      completedGameIds: updatedCompleted,
      gameHighScores: updatedHighScores,
      unlockedBadgeIds: updatedBadges,
    };

    saveProgress(checkBadgeUnlocks(updated));
  };

  const recordDailyChallengeCompletion = (challengeDateStr: string, xpReward: number) => {
    if (progress.completedDailyChallenges.includes(challengeDateStr)) {
      return; // Already completed today's challenge
    }

    const today = new Date().toISOString().split('T')[0];
    const newXp = progress.xp + xpReward;
    const newLevel = calculateLevel(newXp);

    const updatedChallenges = [...progress.completedDailyChallenges, challengeDateStr];

    const updated: UserProgress = {
      ...progress,
      xp: newXp,
      level: newLevel,
      lastPlayedDate: today,
      completedDailyChallenges: updatedChallenges,
      streakDays: progress.streakDays + 1,
    };

    saveProgress(checkBadgeUnlocks(updated));
  };

  const resetProgress = () => {
    saveProgress(INITIAL_PROGRESS);
    setRecentUnlockedBadge(null);
  };

  const clearRecentBadge = () => {
    setRecentUnlockedBadge(null);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        recentUnlockedBadge,
        clearRecentBadge,
        awardXp,
        recordGameCompletion,
        recordDailyChallengeCompletion,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

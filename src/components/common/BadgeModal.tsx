import React, { useEffect } from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { triggerConfetti } from '../../utils/confetti';
import { Trophy, X } from 'lucide-react';

export const BadgeModal: React.FC = () => {
  const { recentUnlockedBadge, clearRecentBadge } = useProgress();
  const { language } = useLanguage();
  const { playCelebrate } = useSound();

  useEffect(() => {
    if (recentUnlockedBadge) {
      playCelebrate();
      triggerConfetti();
    }
  }, [recentUnlockedBadge]);

  if (!recentUnlockedBadge) return null;

  const title = language === 'hi' ? recentUnlockedBadge.titleHi : recentUnlockedBadge.title;
  const description = language === 'hi' ? recentUnlockedBadge.descriptionHi : recentUnlockedBadge.description;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-amber-200 relative">
        <button
          type="button"
          onClick={clearRecentBadge}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Close celebration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-amber-300 shadow-inner text-4xl">
          {recentUnlockedBadge.icon}
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>New Badge Unlocked!</span>
        </div>

        <h3 id="badge-modal-title" className="text-xl font-extrabold text-slate-900 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-600 mb-6">
          {description}
        </p>

        <button
          type="button"
          onClick={clearRecentBadge}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          Awesome! Continue
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementStrip: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-indigo-900 text-indigo-50 px-4 py-2 text-xs md:text-sm font-medium border-b border-indigo-800 flex items-center justify-between gap-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-1">
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
        <span>{t('announcementText')}</span>
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="text-indigo-200 hover:text-white p-1 rounded hover:bg-indigo-800 transition-colors shrink-0"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

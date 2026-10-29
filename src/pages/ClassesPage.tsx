import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CLASSES } from '../data/curriculum';
import { ClassCard } from '../components/cards/ClassCard';
import { BookOpen, Sparkles, Compass } from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'available' | 'upcoming'>('all');

  const filteredClasses = CLASSES.filter((cls) => {
    if (filter === 'available') return cls.isAvailable;
    if (filter === 'upcoming') return !cls.isAvailable;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          {t('classesTitle')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t('classesSubtitle')} Designed to build fundamental literacy and numeracy through interactive, anxiety-free learning games.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Classes ({CLASSES.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('available')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'available'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Pilot (Class 1)
        </button>
        <button
          type="button"
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            filter === 'upcoming'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Coming Soon (Classes 2–5)
        </button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <ClassCard key={cls.id} classInfo={cls} />
        ))}
      </div>

      {/* Future Roadmap Note */}
      <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-indigo-950 text-sm mb-1 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-600" />
            Curriculum Expansion Roadmap
          </h3>
          <p className="text-xs text-indigo-800 leading-relaxed max-w-2xl">
            Following the primary school pilot (Classes 1–5), EduPlayo is architected to expand to Middle & Secondary School (Classes 6–12) and competitive exam foundations (SSC, Railway, state boards).
          </p>
        </div>
      </div>
    </div>
  );
};

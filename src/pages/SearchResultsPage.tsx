import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CLASS_1_MATHS_COUNTING_CHAPTER, CLASSES } from '../data/curriculum';
import { GameCard } from '../components/cards/GameCard';
import { GameMetadata, Difficulty } from '../types';
import { Search, Filter, X, Sparkles } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  // Collect all available games from curriculum
  const allAvailableGames: GameMetadata[] = useMemo(() => {
    return CLASS_1_MATHS_COUNTING_CHAPTER.games.filter((g) => g.isAvailable);
  }, []);

  // Filtered games
  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allAvailableGames.filter((game) => {
      // Difficulty match
      if (selectedDifficulty !== 'All' && game.difficulty !== selectedDifficulty) {
        return false;
      }

      // Subject match
      if (selectedSubject !== 'All' && game.subjectId !== selectedSubject) {
        return false;
      }

      // Query match across title, topic, subject, class, description
      if (!q) return true;

      const titleMatch = game.title.toLowerCase().includes(q) || game.titleHi.toLowerCase().includes(q);
      const topicMatch = game.topic.toLowerCase().includes(q) || game.topicHi.toLowerCase().includes(q);
      const classMatch = game.className.toLowerCase().includes(q);
      const subjectMatch = game.subjectName.toLowerCase().includes(q) || game.subjectNameHi.toLowerCase().includes(q);
      const descMatch = game.description.toLowerCase().includes(q);

      return titleMatch || topicMatch || classMatch || subjectMatch || descMatch;
    });
  }, [allAvailableGames, query, selectedDifficulty, selectedSubject]);

  const handleClearFilters = () => {
    setQuery('');
    setSelectedDifficulty('All');
    setSelectedSubject('All');
  };

  const hasActiveFilters = query.trim() !== '' || selectedDifficulty !== 'All' || selectedSubject !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Search Educational Games
        </h1>
        <p className="text-sm text-slate-600">
          Find games by title, topic, subject, or learning keyword.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none shadow-sm transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filters:</span>
        </div>

        {/* Difficulty Filter */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-white border border-slate-200 text-xs font-medium text-slate-700 py-2 px-3 rounded-xl focus:border-indigo-600 outline-none shadow-sm cursor-pointer"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
        </select>

        {/* Subject Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-white border border-slate-200 text-xs font-medium text-slate-700 py-2 px-3 rounded-xl focus:border-indigo-600 outline-none shadow-sm cursor-pointer"
        >
          <option value="All">All Subjects</option>
          <option value="maths">Mathematics</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t('clearFilters')}</span>
          </button>
        )}
      </div>

      {/* Suggested Search Keywords */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>Popular topics:</span>
        {['Counting', 'Numbers', 'Matching', 'Train Order', 'Ascending'].map((word) => (
          <button
            key={word}
            type="button"
            onClick={() => setQuery(word)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium cursor-pointer transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Results Grid or Empty State */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {filteredGames.length} Game(s) Found
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto border border-slate-200">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t('noResultsTitle')}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('noResultsDesc')}
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

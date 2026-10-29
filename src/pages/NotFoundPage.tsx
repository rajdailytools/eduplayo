import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home, Search, Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-5xl">
        🧭
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
        404 Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
        Oops! Looks Like We Took a Wrong Turn
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
        The educational page or game you are looking for might have been moved, renamed, or is currently in development.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/search"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Search Available Games</span>
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 text-xs text-slate-500">
        Looking for our pilot games? Try{' '}
        <Link to="/chapters/class-1-maths-counting" className="text-indigo-600 font-bold hover:underline">
          Class 1 Numbers & Counting
        </Link>
      </div>
    </div>
  );
};

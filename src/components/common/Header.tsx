import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { useProgress } from '../../context/ProgressContext';
import {
  Volume2,
  VolumeX,
  Search,
  Menu,
  X,
  Star,
  Globe,
  Flame,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { soundEnabled, toggleSound, playClick } = useSound();
  const { progress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSoundToggle = () => {
    toggleSound();
  };

  const handleLanguageToggle = () => {
    playClick();
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-indigo-600 ${
      isActive ? 'text-indigo-700 font-semibold border-b-2 border-indigo-600 pb-1' : 'text-slate-600'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Logo */}
        <div className="flex items-center gap-6">
          <Logo size="md" />

          {/* Zone 2: Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className={navLinkStyle}>
              {t('navHome')}
            </NavLink>
            <NavLink to="/classes" className={navLinkStyle}>
              {t('navClasses')}
            </NavLink>
            <NavLink to="/classes/class-1" className={navLinkStyle}>
              {t('navSubjects')}
            </NavLink>
            <NavLink to="/chapters/class-1-maths-counting" className={navLinkStyle}>
              {t('navGames')}
            </NavLink>
            <NavLink to="/challenges" className={navLinkStyle}>
              {t('navChallenges')}
            </NavLink>
            <NavLink to="/revision" className={navLinkStyle}>
              {t('navRevision')}
            </NavLink>
          </nav>
        </div>

        {/* Zone 3: Actions & Status (Search, Language, Sound, Local XP) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search quick button */}
          <button
            type="button"
            onClick={() => {
              playClick();
              navigate('/search');
            }}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            title={t('navSearch')}
            aria-label={t('navSearch')}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className={`p-2 rounded-lg transition-colors ${
              soundEnabled
                ? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Sound is On' : 'Sound is Muted'}
            aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Selector */}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Switch Language"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Local Learner XP indicator (real from localStorage) */}
          <Link
            to="/challenges"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-900 hover:bg-amber-100/80 transition-colors"
            title={`Level ${progress.level} · ${progress.xp} Total XP`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-xs font-bold tabular-nums">{progress.xp} XP</span>
            {progress.streakDays > 0 && (
              <span className="hidden sm:inline-flex items-center gap-0.5 text-xs font-semibold text-orange-600 ml-1">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span className="tabular-nums">{progress.streakDays}d</span>
              </span>
            )}
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navHome')}
            </Link>
            <Link
              to="/classes"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navClasses')}
            </Link>
            <Link
              to="/classes/class-1"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navSubjects')}
            </Link>
            <Link
              to="/chapters/class-1-maths-counting"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navGames')}
            </Link>
            <Link
              to="/challenges"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navChallenges')}
            </Link>
            <Link
              to="/revision"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navRevision')}
            </Link>
            <Link
              to="/search"
              onClick={closeMenu}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {t('navSearch')}
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Local Progress: Level {progress.level}</span>
            <span className="font-semibold text-indigo-700 tabular-nums">{progress.xp} XP</span>
          </div>
        </div>
      )}
    </header>
  );
};

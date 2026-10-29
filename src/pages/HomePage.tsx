import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { CLASSES, CLASS_1_MATHS_COUNTING_CHAPTER, DAILY_CHALLENGES } from '../data/curriculum';
import { ClassCard } from '../components/cards/ClassCard';
import { GameCard } from '../components/cards/GameCard';
import { SubjectCard } from '../components/cards/SubjectCard';
import { AdBanner } from '../components/common/AdBanner';
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Gamepad2,
  Trophy,
  BrainCircuit,
  Compass,
  RotateCcw,
} from 'lucide-react';

interface HomePageProps {
  onOpenResetModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenResetModal }) => {
  const { language, t } = useLanguage();
  const { progress } = useProgress();

  // Pick today's daily challenge based on current day of week (0 to 6)
  const currentDay = new Date().getDay();
  const todaysChallenge = DAILY_CHALLENGES.find((c) => c.dayOfWeek === currentDay) || DAILY_CHALLENGES[0];
  const isChallengeDone = progress.completedDailyChallenges.includes(new Date().toISOString().split('T')[0]);

  const playableGames = CLASS_1_MATHS_COUNTING_CHAPTER.games;
  const class1 = CLASSES[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 md:py-16 bg-gradient-to-b from-indigo-50/60 via-slate-50 to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>CBSE / NCERT Aligned Primary Learning</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                {t('heroTitle')}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  to="/chapters/class-1-maths-counting"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <span>{t('btnStartLearning')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/classes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base rounded-2xl border border-slate-200 shadow-sm transition-all"
                >
                  <span>{t('btnExploreClasses')}</span>
                </Link>
              </div>

              {/* Trust & Transparency Note */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Free Core Lessons
                </span>
                <span aria-hidden="true">·</span>
                <span>No Account Required to Play</span>
                <span aria-hidden="true">·</span>
                <span>Child-Friendly & Safe</span>
              </div>
            </div>

            {/* Right Column: Original SVG & CSS Educational Composition */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-700 p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Decorative background grid and circles */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-purple-500/20 blur-xl pointer-events-none" />

                {/* Top Strip inside Hero Card */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                    <span>🎮 Game Station</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-amber-400/20 px-2.5 py-1 rounded-full">
                    <span>⭐ 30+ XP Available</span>
                  </div>
                </div>

                {/* Central Visual Composition: EduPlayo Mascot & Number Tiles */}
                <div className="relative my-auto flex flex-col items-center justify-center py-6 z-10">
                  {/* Mascot / Robot Owl Friend */}
                  <div className="relative w-28 h-28 bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/30 flex items-center justify-center shadow-inner mb-4 group hover:scale-105 transition-transform">
                    <span className="text-5xl select-none" role="img" aria-label="EduPlayo Mascot">
                      🦉
                    </span>
                    <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                      HI!
                    </div>
                  </div>

                  {/* Floating Number Cards */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white text-indigo-900 rounded-xl font-extrabold text-xl flex items-center justify-center shadow-md transform -rotate-6">
                      1
                    </div>
                    <div className="w-11 h-11 bg-amber-400 text-amber-950 rounded-xl font-extrabold text-xl flex items-center justify-center shadow-md transform rotate-3">
                      2
                    </div>
                    <div className="w-11 h-11 bg-emerald-400 text-emerald-950 rounded-xl font-extrabold text-xl flex items-center justify-center shadow-md transform -rotate-3">
                      3
                    </div>
                    <div className="w-11 h-11 bg-sky-400 text-sky-950 rounded-xl font-extrabold text-xl flex items-center justify-center shadow-md transform rotate-6">
                      4
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Play Link inside hero card */}
                <div className="z-10 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="text-indigo-100">Class 1 · Joyful Maths</span>
                  <Link
                    to="/games/count-objects"
                    className="font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Play Count The Objects →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenge Highlight Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{t('dailyChallengeTitle')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              {language === 'hi' ? todaysChallenge.titleHi : todaysChallenge.title}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
              {language === 'hi' ? todaysChallenge.descriptionHi : todaysChallenge.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-amber-100 block">Reward</span>
              <span className="font-extrabold text-lg text-white tabular-nums">+{todaysChallenge.xpReward} XP</span>
            </div>
            <Link
              to="/challenges"
              className="px-6 py-3 bg-white hover:bg-amber-50 text-amber-900 font-bold text-sm rounded-xl transition-all shadow-md"
            >
              {isChallengeDone ? 'View Completed' : 'Start Challenge'}
            </Link>
          </div>
        </div>
      </section>

      {/* Class Selection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {t('classesTitle')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('classesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLASSES.slice(0, 3).map((cls) => (
            <ClassCard key={cls.id} classInfo={cls} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/classes"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-800"
          >
            <span>View All Available Classes (Class 1 to 5)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Playable Games Catalogue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
              {t('popularGamesTitle')}
            </h2>
            <p className="text-sm text-slate-600">
              {t('popularGamesSubtitle')}
            </p>
          </div>

          <Link
            to="/chapters/class-1-maths-counting"
            className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1 shrink-0"
          >
            <span>Explore All Chapter Activities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playableGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Subject Exploration Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {t('subjectsTitle')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('subjectsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {class1.subjects.map((sub) => (
            <SubjectCard key={sub.id} subject={sub} classId={class1.id} />
          ))}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-100/70 rounded-3xl border border-slate-200/80">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {t('howItWorksTitle')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('howItWorksSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('step1Title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('step1Desc')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('step2Title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('step2Desc')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t('step3Title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Honest Learning Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {t('benefitsTitle')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('benefitsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{t('benefit1Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('benefit1Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{t('benefit2Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('benefit2Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{t('benefit3Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('benefit3Desc')}</p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">{t('benefit4Title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('benefit4Desc')}</p>
          </div>
        </div>

        {/* Local Progress Management Link */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Current device progress: <strong>{progress.xp} XP</strong> · Level {progress.level} · Streak: {progress.streakDays} day(s)
          </div>
          <button
            type="button"
            onClick={onOpenResetModal}
            className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetProgress')}</span>
          </button>
        </div>
      </section>

      {/* Monetization placeholder (disabled by default) */}
      <AdBanner placement="footer-above" />
    </div>
  );
};

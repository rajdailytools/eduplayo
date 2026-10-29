import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { DAILY_CHALLENGES, BADGES } from '../data/curriculum';
import { QuestionCard } from '../components/practice/QuestionCard';
import { triggerConfetti } from '../utils/confetti';
import {
  Flame,
  Star,
  Trophy,
  CheckCircle2,
  Calendar,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { progress, recordDailyChallengeCompletion } = useProgress();

  const currentDay = new Date().getDay();
  const todaysChallenge = DAILY_CHALLENGES.find((c) => c.dayOfWeek === currentDay) || DAILY_CHALLENGES[0];
  const todayStr = new Date().toISOString().split('T')[0];
  const isCompletedToday = progress.completedDailyChallenges.includes(todayStr);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});
  const [justFinished, setJustFinished] = useState(false);

  const questions = todaysChallenge.questions;

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentIdx(0);
    setCorrectCount(0);
    setAnsweredMap({});
    setJustFinished(false);
  };

  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (answeredMap[currentIdx] !== undefined) return;
    setAnsweredMap((prev) => ({ ...prev, [currentIdx]: isCorrect }));
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setJustFinished(true);
      triggerConfetti();
      recordDailyChallengeCompletion(todayStr, todaysChallenge.xpReward);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Banner: Streak and Level */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Daily Streak: {progress.streakDays} Day(s)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            Daily Learning Challenges
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Complete today's quick 4-question mission to sharpen your math skills, maintain your streak, and earn bonus XP.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="text-center px-2">
            <span className="text-[11px] text-amber-100 uppercase tracking-wider block font-semibold">Your Level</span>
            <span className="text-2xl font-black text-white tabular-nums">Lvl {progress.level}</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-2">
            <span className="text-[11px] text-amber-100 uppercase tracking-wider block font-semibold">Total XP</span>
            <span className="text-2xl font-black text-white tabular-nums">{progress.xp}</span>
          </div>
        </div>
      </div>

      {/* Main Challenge Area */}
      {!isPlaying ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                  Today's Challenge
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                {language === 'hi' ? todaysChallenge.titleHi : todaysChallenge.title}
              </h2>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                {language === 'hi' ? todaysChallenge.descriptionHi : todaysChallenge.description}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                +{todaysChallenge.xpReward} XP Reward
              </span>

              {isCompletedToday ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Completed for Today!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStart}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:scale-[1.02]"
                >
                  Start Today's Challenge
                </button>
              )}
            </div>
          </div>

          {/* Badges Showcase */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Your Achievement Badges</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {progress.unlockedBadgeIds.length} of {BADGES.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BADGES.map((badge) => {
                const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                      isUnlocked
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-slate-50/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                      {badge.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {language === 'hi' ? badge.titleHi : badge.title}
                        </h4>
                        {isUnlocked && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'hi' ? badge.descriptionHi : badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : justFinished ? (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-200">
            🔥
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2 inline-block">
            Challenge Solved!
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Streak Maintained!
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            You completed today's challenge with {correctCount} out of {questions.length} correct answers!
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Questions Correct</span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {correctCount} / {questions.length}
              </span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <span className="text-xs text-amber-700 font-medium block">Daily Reward</span>
              <span className="text-2xl font-extrabold text-amber-900 tabular-nums">
                +{todaysChallenge.xpReward} XP
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            Back to Challenges Hub
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Daily Mission · Question {currentIdx + 1} of {questions.length}
            </span>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel Challenge
            </button>
          </div>

          <QuestionCard
            key={questions[currentIdx].id}
            question={questions[currentIdx]}
            index={currentIdx}
            total={questions.length}
            onAnswered={handleQuestionAnswered}
          />

          {answeredMap[currentIdx] !== undefined && (
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                {currentIdx + 1 < questions.length ? t('nextQuestion') : 'Complete Mission'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

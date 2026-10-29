import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../context/ProgressContext';
import { CLASS_1_MATHS_COUNTING_CHAPTER } from '../data/curriculum';
import { QuestionCard } from '../components/practice/QuestionCard';
import { ArrowLeft, BookCheck, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export const PracticePage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { language, t } = useLanguage();
  const { awardXp } = useProgress();
  const navigate = useNavigate();

  const chapter = CLASS_1_MATHS_COUNTING_CHAPTER;
  const questions = chapter.practiceQuestions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

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
      setIsCompleted(true);
      triggerConfetti();
      awardXp(40);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setCorrectCount(0);
    setAnsweredMap({});
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/chapters/class-1-maths-counting')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chapter Details</span>
        </button>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
            Practice Session
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {language === 'hi' ? chapter.titleHi : chapter.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
          <BookCheck className="w-4 h-4 text-indigo-600" />
          <span>Correct: {correctCount} / {questions.length}</span>
        </div>
      </div>

      {!isCompleted ? (
        <div>
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
                {currentIdx + 1 < questions.length ? t('nextQuestion') : 'View Final Summary'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
          <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-200">
            ⭐
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2 inline-block">
            Practice Complete
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            Fantastic Effort!
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            You completed all practice questions for this chapter and reinforced your number skills!
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Final Score</span>
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {correctCount} / {questions.length}
              </span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <span className="text-xs text-amber-700 font-medium block">Bonus XP</span>
              <span className="text-2xl font-extrabold text-amber-900 tabular-nums">
                +40 XP
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Practice</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/chapters/class-1-maths-counting')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              Back to Chapter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

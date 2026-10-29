import React, { useState } from 'react';
import { PracticeQuestion } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, HelpCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface QuestionCardProps {
  question: PracticeQuestion;
  index: number;
  total: number;
  onAnswered?: (isCorrect: boolean) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  total,
  onAnswered,
}) => {
  const { language, t } = useLanguage();
  const { playClick, playCorrect, playTryAgain } = useSound();
  const { awardXp } = useProgress();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const prompt = language === 'hi' ? question.promptHi : question.prompt;
  const explanation = language === 'hi' ? question.explanationHi : question.explanation;
  const hint = language === 'hi' ? question.hintHi : question.hint;

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    playClick();
    setSelectedOptionId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isAnswered) return;

    setIsAnswered(true);
    const chosen = question.options.find((o) => o.id === selectedOptionId);
    const correct = !!chosen?.isCorrect;

    if (correct) {
      playCorrect();
      awardXp(10);
    } else {
      playTryAgain();
    }

    if (onAnswered) {
      onAnswered(correct);
    }
  };

  const renderVisuals = () => {
    if (!question.visualCount || !question.visualType) return null;

    let emoji = '🍎';
    if (question.visualType === 'stars') emoji = '⭐';
    if (question.visualType === 'balloons') emoji = '🎈';

    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 my-4 flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: question.visualCount }).map((_, i) => (
          <span key={i} className="text-3xl sm:text-4xl drop-shadow-sm select-none">
            {emoji}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
          {t('question')} {index + 1} {t('of')} {total}
        </span>

        {hint && (
          <button
            type="button"
            onClick={() => {
              playClick();
              setShowHint(!showHint);
            }}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
        {prompt}
      </h3>

      {showHint && hint && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs mb-4">
          💡 <strong>Hint:</strong> {hint}
        </div>
      )}

      {renderVisuals()}

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let btnStyle = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800';

          if (isAnswered) {
            if (option.isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500';
            } else if (isSelected && !option.isCorrect) {
              btnStyle = 'bg-red-50 border-red-400 text-red-950 font-semibold';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500 text-indigo-950 font-bold';
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(option.id)}
              className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-base font-semibold">
                {language === 'hi' && option.textHi ? option.textHi : option.text}
              </span>
              {isAnswered && option.isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {!isAnswered ? (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!selectedOptionId}
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
          >
            {t('submit')}
          </button>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 animate-in fade-in duration-150">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Explanation
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

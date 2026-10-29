import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameMetadata } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../../utils/confetti';
import {
  Sparkles,
  Trophy,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Volume2,
} from 'lucide-react';

interface CountObjectsGameProps {
  game: GameMetadata;
}

type ItemType = 'apple' | 'star' | 'balloon' | 'pencil' | 'butterfly';

interface QuestionRound {
  count: number;
  itemType: ItemType;
  options: number[];
}

const ITEM_CONFIG: Record<ItemType, { emoji: string; nameEn: string; nameHi: string; color: string }> = {
  apple: { emoji: '🍎', nameEn: 'apples', nameHi: 'सेब', color: 'bg-red-50 text-red-700 border-red-200' },
  star: { emoji: '⭐', nameEn: 'stars', nameHi: 'सितारे', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  balloon: { emoji: '🎈', nameEn: 'balloons', nameHi: 'गुब्बारे', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  pencil: { emoji: '✏️', nameEn: 'pencils', nameHi: 'पेंसिलें', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  butterfly: { emoji: '🦋', nameEn: 'butterflies', nameHi: 'तितलियाँ', color: 'bg-purple-50 text-purple-700 border-purple-200' },
};

function generateRounds(): QuestionRound[] {
  const counts = [3, 5, 2, 7, 4];
  const items: ItemType[] = ['apple', 'star', 'balloon', 'pencil', 'butterfly'];

  return counts.map((count, index) => {
    const itemType = items[index % items.length];
    // Generate 4 unique options including the correct answer
    const optionsSet = new Set<number>([count]);
    while (optionsSet.size < 4) {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const opt = Math.max(1, Math.min(9, count + delta));
      optionsSet.add(opt);
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      count,
      itemType,
      options,
    };
  });
}

export const CountObjectsGame: React.FC<CountObjectsGameProps> = ({ game }) => {
  const { language, t } = useLanguage();
  const { playClick, playCorrect, playTryAgain, playCelebrate } = useSound();
  const { recordGameCompletion } = useProgress();
  const navigate = useNavigate();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'feedback' | 'completed'>('ready');
  const [rounds, setRounds] = useState<QuestionRound[]>([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [countedIndices, setCountedIndices] = useState<number[]>([]);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);

  // Initialize rounds
  useEffect(() => {
    setRounds(generateRounds());
  }, []);

  const currentRound = rounds[currentRoundIdx];

  const startGame = () => {
    playClick();
    setScore(0);
    setCurrentRoundIdx(0);
    setAnsweredCurrent(false);
    setSelectedAnswer(null);
    setCountedIndices([]);
    setRounds(generateRounds());
    setGameState('playing');
  };

  const handleItemTap = (idx: number) => {
    playClick();
    if (countedIndices.includes(idx)) {
      setCountedIndices(countedIndices.filter((i) => i !== idx));
    } else {
      setCountedIndices([...countedIndices, idx]);
    }
  };

  const handleSelectAnswer = (chosen: number) => {
    if (answeredCurrent || gameState !== 'playing') return;

    setSelectedAnswer(chosen);
    setAnsweredCurrent(true);

    const isCorrect = chosen === currentRound.count;
    if (isCorrect) {
      playCorrect();
      setScore((prev) => prev + 1);
    } else {
      playTryAgain();
    }

    setGameState('feedback');
  };

  const handleNext = () => {
    playClick();
    if (currentRoundIdx + 1 < rounds.length) {
      setCurrentRoundIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnsweredCurrent(false);
      setCountedIndices([]);
      setGameState('playing');
    } else {
      // Completed game
      setGameState('completed');
      playCelebrate();
      triggerConfetti();
      recordGameCompletion(game.id, score + (selectedAnswer === currentRound.count ? 0 : 0), rounds.length, game.xpReward);
    }
  };

  // State: READY
  if (gameState === 'ready') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 border border-amber-200">
          🍎
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {language === 'hi' ? game.titleHi : game.title}
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          {language === 'hi' ? game.descriptionHi : game.description}
        </p>

        {/* Step by step tips */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block">
            How to Play:
          </span>
          {(language === 'hi' ? game.instructionsHi : game.instructions).map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={startGame}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        >
          {t('btnStartLearning')}
        </button>
      </div>
    );
  }

  // State: COMPLETED
  if (gameState === 'completed') {
    const isPerfect = score === rounds.length;
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg animate-in fade-in duration-200">
        <div className="w-20 h-20 mx-auto mb-4 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl border border-amber-200">
          🏆
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Game Completed!
        </span>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {isPerfect ? 'Magnificent Counting!' : 'Great Practice Session!'}
        </h2>

        <p className="text-sm text-slate-600 mb-6">
          {isPerfect
            ? 'You counted every single item with 100% accuracy!'
            : 'You are improving your counting skills with every round! Keep practicing.'}
        </p>

        {/* Score Card */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Correct Count</span>
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {score} / {rounds.length}
            </span>
          </div>
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <span className="text-xs text-amber-700 font-medium block">XP Earned</span>
            <span className="text-2xl font-extrabold text-amber-900 tabular-nums">
              +{game.xpReward} XP
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('replay')}</span>
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
    );
  }

  // Active round during PLAYING or FEEDBACK
  if (!currentRound) return null;

  const itemMeta = ITEM_CONFIG[currentRound.itemType];
  const isCorrect = selectedAnswer === currentRound.count;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Top Header Strip: Question X of Y, Score, Progress */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {t('question')} {currentRoundIdx + 1} {t('of')} {rounds.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md tabular-nums">
            Score: {score}
          </span>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 tabular-nums">
            +{game.xpReward} XP
          </span>
        </div>
      </div>

      {/* Question prompt */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
          {language === 'hi'
            ? `कितने ${itemMeta.nameHi} हैं? गिनें और बताएं!`
            : `How many ${itemMeta.nameEn} are there? Count carefully!`}
        </h3>
        <p className="text-xs text-slate-500">
          Tip: Tap on any item to highlight it as you count out loud!
        </p>
      </div>

      {/* Interactive Object Stage */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 min-h-[180px] flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-lg">
          {Array.from({ length: currentRound.count }).map((_, idx) => {
            const isTapped = countedIndices.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleItemTap(idx)}
                aria-label={`${itemMeta.nameEn} ${idx + 1}`}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl border-2 transition-all cursor-pointer ${
                  isTapped
                    ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:scale-102'
                }`}
              >
                <span>{itemMeta.emoji}</span>
                {isTapped && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer Option Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {currentRound.options.map((opt) => {
          let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50';

          if (gameState === 'feedback') {
            if (opt === currentRound.count) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold ring-2 ring-emerald-500';
            } else if (opt === selectedAnswer && !isCorrect) {
              btnStyle = 'bg-red-50 border-red-400 text-red-900 font-semibold';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={opt}
              type="button"
              disabled={gameState === 'feedback'}
              onClick={() => handleSelectAnswer(opt)}
              className={`p-4 rounded-2xl border-2 font-bold text-2xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer ${btnStyle}`}
            >
              <span className="tabular-nums">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {gameState === 'feedback' && (
        <div
          className={`p-5 rounded-2xl border mb-6 animate-in fade-in duration-150 ${
            isCorrect
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">
                {isCorrect ? t('greatJob') : t('notQuite')}
              </h4>
              <p className="text-xs leading-relaxed">
                {language === 'hi'
                  ? `यहाँ कुल ${currentRound.count} ${itemMeta.nameHi} हैं। जब हम एक-एक करके गिनते हैं, तो उत्तर ${currentRound.count} होता है!`
                  : `There are exactly ${currentRound.count} ${itemMeta.nameEn}. When counted one by one (1, 2, ...), the final number is ${currentRound.count}!`}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <span>{currentRoundIdx + 1 < rounds.length ? t('nextQuestion') : t('finish')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

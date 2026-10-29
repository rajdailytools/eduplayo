import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameMetadata } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../../utils/confetti';
import {
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface NumberOrderGameProps {
  game: GameMetadata;
}

interface RoundConfig {
  initial: number[];
  target: number[];
}

const ROUNDS_DATA: RoundConfig[] = [
  { initial: [4, 1, 3, 2], target: [1, 2, 3, 4] },
  { initial: [6, 2, 5, 3], target: [2, 3, 5, 6] },
  { initial: [8, 5, 7, 6], target: [5, 6, 7, 8] },
];

export const NumberOrderGame: React.FC<NumberOrderGameProps> = ({ game }) => {
  const { language, t } = useLanguage();
  const { playClick, playCorrect, playTryAgain, playCelebrate } = useSound();
  const { recordGameCompletion } = useProgress();
  const navigate = useNavigate();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'feedback' | 'completed'>('ready');
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [currentOrder, setCurrentOrder] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRoundCorrect, setIsRoundCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  const startRound = (roundIdx: number) => {
    setCurrentRoundIdx(roundIdx);
    setCurrentOrder([...ROUNDS_DATA[roundIdx].initial]);
    setSelectedIndex(null);
    setIsRoundCorrect(false);
    setAttempts(0);
    setGameState('playing');
  };

  const handleStartGame = () => {
    playClick();
    setScore(0);
    startRound(0);
  };

  const handleCardClick = (index: number) => {
    playClick();
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      // Swap items at selectedIndex and index
      const updated = [...currentOrder];
      const temp = updated[selectedIndex];
      updated[selectedIndex] = updated[index];
      updated[index] = temp;
      setCurrentOrder(updated);
      setSelectedIndex(null);
    }
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    playClick();
    const updated = [...currentOrder];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setCurrentOrder(updated);
    setSelectedIndex(null);
  };

  const moveRight = (index: number) => {
    if (index === currentOrder.length - 1) return;
    playClick();
    const updated = [...currentOrder];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setCurrentOrder(updated);
    setSelectedIndex(null);
  };

  const handleCheckOrder = () => {
    const target = ROUNDS_DATA[currentRoundIdx].target;
    const isMatched = currentOrder.every((num, idx) => num === target[idx]);

    setAttempts((prev) => prev + 1);

    if (isMatched) {
      playCorrect();
      setIsRoundCorrect(true);
      setScore((prev) => prev + (attempts === 0 ? 1 : 0.5));
      setGameState('feedback');
    } else {
      playTryAgain();
      setIsRoundCorrect(false);
      setGameState('feedback');
    }
  };

  const handleNextRound = () => {
    playClick();
    if (currentRoundIdx + 1 < ROUNDS_DATA.length) {
      startRound(currentRoundIdx + 1);
    } else {
      setGameState('completed');
      playCelebrate();
      triggerConfetti();
      recordGameCompletion(game.id, Math.round(score + 1), ROUNDS_DATA.length, game.xpReward);
    }
  };

  if (gameState === 'ready') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 border border-indigo-200">
          🚂
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {language === 'hi' ? game.titleHi : game.title}
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          {language === 'hi' ? game.descriptionHi : game.description}
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block">
            Instructions:
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
          onClick={handleStartGame}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
        >
          {t('btnStartLearning')}
        </button>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg animate-in fade-in duration-200">
        <div className="w-20 h-20 mx-auto mb-4 bg-amber-50 rounded-3xl flex items-center justify-center text-4xl border border-amber-200">
          🎉
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Train Sequence Mastered!
        </span>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          All Carriages in Perfect Order!
        </h2>

        <p className="text-sm text-slate-600 mb-6">
          The toy train is departing right on track thanks to your ordering skills!
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Tracks Cleared</span>
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {ROUNDS_DATA.length} / {ROUNDS_DATA.length}
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
            onClick={handleStartGame}
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

  const currentRound = ROUNDS_DATA[currentRoundIdx];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Train Track {currentRoundIdx + 1} of {ROUNDS_DATA.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => startRound(currentRoundIdx)}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Track
          </button>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 tabular-nums">
            +{game.xpReward} XP
          </span>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {language === 'hi'
            ? 'संख्याओं को छोटे से बड़े (आरोही) क्रम में लगाएं'
            : 'Arrange the carriages from Smallest to Largest (Ascending Order)'}
        </h3>
        <p className="text-xs text-slate-500">
          Tap two carriages to swap them, or use the ◀ / ▶ arrow buttons.
        </p>
      </div>

      {/* Train Track Visualization */}
      <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 overflow-x-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[320px]">
          {/* Train Engine Head */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-14 h-16 bg-indigo-700 text-white rounded-l-2xl rounded-r-md flex flex-col items-center justify-center font-bold text-sm shadow-md border-r-2 border-indigo-900">
              <span className="text-xs">🚂</span>
              <span className="text-[10px] tracking-tighter">LEAD</span>
            </div>
            <div className="flex gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-slate-800" />
              <div className="w-3 h-3 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* Carriages */}
          {currentOrder.map((num, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <div key={idx} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleCardClick(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 flex items-center justify-center font-extrabold text-2xl sm:text-3xl transition-all shadow-sm cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500 scale-105'
                      : 'border-slate-200 bg-white text-slate-900 hover:border-indigo-300'
                  }`}
                  aria-label={`Carriage ${idx + 1} with number ${num}. ${isSelected ? 'Selected' : 'Tap to swap'}`}
                >
                  <span className="tabular-nums">{num}</span>
                </button>

                {/* Accessible Shift buttons */}
                <div className="flex items-center gap-1 mt-2">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveLeft(idx)}
                    className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs"
                    title="Move carriage left"
                    aria-label={`Move number ${num} left`}
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === currentOrder.length - 1}
                    onClick={() => moveRight(idx)}
                    className="p-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs"
                    title="Move carriage right"
                    aria-label={`Move number ${num} right`}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Train wheels */}
                <div className="flex gap-4 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Check Order Action */}
      {gameState === 'playing' && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleCheckOrder}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:scale-[1.01]"
          >
            Check Order
          </button>
        </div>
      )}

      {/* Feedback Panel */}
      {gameState === 'feedback' && (
        <div
          className={`p-5 rounded-2xl border mb-6 animate-in fade-in duration-150 ${
            isRoundCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {isRoundCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">
                {isRoundCorrect ? t('greatJob') : 'Not quite in order yet!'}
              </h4>
              <p className="text-xs leading-relaxed">
                {isRoundCorrect
                  ? `Correct! The order is ${currentRound.target.join(' < ')}. Each carriage is larger than the previous one.`
                  : `Look at the carriages: ${currentOrder.join(', ')}. The correct ascending order is ${currentRound.target.join(', ')}. Tap carriages to swap and try again!`}
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            {!isRoundCorrect ? (
              <button
                type="button"
                onClick={() => setGameState('playing')}
                className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Try Again
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextRound}
                className="inline-flex items-center gap-1.5 py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <span>{currentRoundIdx + 1 < ROUNDS_DATA.length ? 'Next Track' : t('finish')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

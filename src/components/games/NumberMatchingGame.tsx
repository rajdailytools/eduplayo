import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameMetadata } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useSound } from '../../context/SoundContext';
import { useProgress } from '../../context/ProgressContext';
import { triggerConfetti } from '../../utils/confetti';
import {
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Trophy,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface NumberMatchingGameProps {
  game: GameMetadata;
}

interface MatchPair {
  id: string;
  number: number;
  emoji: string;
  count: number;
  label: string;
  labelHi: string;
}

const PAIR_DATABASE: MatchPair[] = [
  { id: 'p1', number: 2, emoji: '🎈', count: 2, label: 'Two Balloons', labelHi: 'दो गुब्बारे' },
  { id: 'p2', number: 4, emoji: '🍎', count: 4, label: 'Four Apples', labelHi: 'चार सेब' },
  { id: 'p3', number: 6, emoji: '⭐', count: 6, label: 'Six Stars', labelHi: 'छह सितारे' },
  { id: 'p4', number: 3, emoji: '🦋', count: 3, label: 'Three Butterflies', labelHi: 'तीन तितलियाँ' },
];

export const NumberMatchingGame: React.FC<NumberMatchingGameProps> = ({ game }) => {
  const { language, t } = useLanguage();
  const { playClick, playCorrect, playTryAgain, playCelebrate } = useSound();
  const { recordGameCompletion } = useProgress();
  const navigate = useNavigate();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [shuffledCards, setShuffledCards] = useState<MatchPair[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [matchedNumbers, setMatchedNumbers] = useState<number[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    const freshPairs = [...PAIR_DATABASE];
    const shuffled = [...freshPairs].sort(() => Math.random() - 0.5);
    setPairs(freshPairs);
    setShuffledCards(shuffled);
    setSelectedNumber(null);
    setMatchedNumbers([]);
    setWrongAttempt(false);
    setScore(0);
    setGameState('playing');
  };

  const handleStart = () => {
    playClick();
    initGame();
  };

  const handleSelectNumber = (num: number) => {
    if (matchedNumbers.includes(num)) return;
    playClick();
    setSelectedNumber(num);
    setWrongAttempt(false);
  };

  const handleSelectObjectCard = (pair: MatchPair) => {
    if (matchedNumbers.includes(pair.number)) return;
    if (selectedNumber === null) {
      // Prompt user to pick a number first
      playClick();
      return;
    }

    if (selectedNumber === pair.number) {
      // Correct match!
      playCorrect();
      const updated = [...matchedNumbers, pair.number];
      setMatchedNumbers(updated);
      setSelectedNumber(null);
      setWrongAttempt(false);
      setScore((prev) => prev + 1);

      if (updated.length === pairs.length) {
        // All matched!
        setTimeout(() => {
          setGameState('completed');
          playCelebrate();
          triggerConfetti();
          recordGameCompletion(game.id, pairs.length, pairs.length, game.xpReward);
        }, 500);
      }
    } else {
      // Incorrect match
      playTryAgain();
      setWrongAttempt(true);
      setTimeout(() => {
        setWrongAttempt(false);
        setSelectedNumber(null);
      }, 1000);
    }
  };

  if (gameState === 'ready') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5 border border-sky-200">
          🔍
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          {language === 'hi' ? game.titleHi : game.title}
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          {language === 'hi' ? game.descriptionHi : game.description}
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase font-bold text-slate-500 tracking-wider block">
            How to Match:
          </span>
          {(language === 'hi' ? game.instructionsHi : game.instructions).map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleStart}
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
          ⭐
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          All Pairs Matched!
        </span>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          Superb Matching Skills!
        </h2>

        <p className="text-sm text-slate-600 mb-6">
          You successfully matched all numbers with their object groups!
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-8">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Matches</span>
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {matchedNumbers.length} / {pairs.length}
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
            onClick={initGame}
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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Top Header Strip */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Pairs Matched: {matchedNumbers.length} / {pairs.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={initGame}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Board
          </button>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 tabular-nums">
            +{game.xpReward} XP
          </span>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          {selectedNumber === null
            ? (language === 'hi' ? '1. बाईं ओर किसी संख्या कार्ड को चुनें' : '1. Select a Number Card on the left')
            : (language === 'hi' ? `2. अब ${selectedNumber} से मेल खाने वाले समूह पर टैप करें` : `2. Now tap the matching group with ${selectedNumber} items`)}
        </h3>
        <p className="text-xs text-slate-500">
          Tap a number card first, then tap its matching group of items.
        </p>
      </div>

      {wrongAttempt && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl text-center font-medium animate-bounce">
          Not a match! Count the items carefully and try again.
        </div>
      )}

      {/* Two Columns: Numbers on Left, Object Groups on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column: Number Cards */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Numbers (Click to Select)
          </span>
          {pairs.map((p) => {
            const isMatched = matchedNumbers.includes(p.number);
            const isSelected = selectedNumber === p.number;

            return (
              <button
                key={`num-${p.id}`}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectNumber(p.number)}
                className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500 text-indigo-900 scale-[1.02] shadow-md'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-800 font-extrabold text-xl flex items-center justify-center">
                    {p.number}
                  </span>
                  <span className="text-sm font-semibold">
                    {language === 'hi' ? p.labelHi : p.label}
                  </span>
                </div>
                {isMatched && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Shuffled Object Groups */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Item Groups (Click to Match)
          </span>
          {shuffledCards.map((p) => {
            const isMatched = matchedNumbers.includes(p.number);

            return (
              <button
                key={`card-${p.id}`}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectObjectCard(p)}
                className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 opacity-80 cursor-default'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 p-1">
                  {Array.from({ length: p.count }).map((_, i) => (
                    <span key={i} className="text-2xl drop-shadow-sm">
                      {p.emoji}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  {isMatched ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                      Matched ✓
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Tap to pair
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { CLASS_1_MATHS_COUNTING_CHAPTER } from '../data/curriculum';
import { CountObjectsGame } from '../components/games/CountObjectsGame';
import { NumberMatchingGame } from '../components/games/NumberMatchingGame';
import { NumberOrderGame } from '../components/games/NumberOrderGame';
import { ArrowLeft, Volume2, VolumeX, HelpCircle } from 'lucide-react';

export const GamePlayerPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { language } = useLanguage();
  const { soundEnabled, toggleSound } = useSound();
  const navigate = useNavigate();

  const game = CLASS_1_MATHS_COUNTING_CHAPTER.games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Game Not Found</h2>
        <p className="text-sm text-slate-600">The requested learning game is not available.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const title = language === 'hi' ? game.titleHi : game.title;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar for Game Player */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => navigate('/chapters/class-1-maths-counting')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game to Chapter</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-xl transition-colors ${
              soundEnabled ? 'text-indigo-700 bg-indigo-50' : 'text-slate-400 bg-slate-100'
            }`}
            title={soundEnabled ? 'Sound is On' : 'Sound is Muted'}
            aria-label={soundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Render Active Game Component */}
      <div className="py-2">
        {game.id === 'count-objects' && <CountObjectsGame game={game} />}
        {game.id === 'number-matching' && <NumberMatchingGame game={game} />}
        {game.id === 'number-order' && <NumberOrderGame game={game} />}
      </div>
    </div>
  );
};

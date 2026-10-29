import React from 'react';
import { Link } from 'react-router-dom';
import { GameMetadata } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useProgress } from '../../context/ProgressContext';
import { Clock, Trophy, Play, Star, Sparkles } from 'lucide-react';

interface GameCardProps {
  game: GameMetadata;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { language, t } = useLanguage();
  const { progress } = useProgress();

  const title = language === 'hi' ? game.titleHi : game.title;
  const topic = language === 'hi' ? game.topicHi : game.topic;
  const description = language === 'hi' ? game.descriptionHi : game.description;

  const highScore = progress.gameHighScores[game.id];
  const isCompleted = progress.completedGameIds.includes(game.id);

  // Distinctive illustrated game icon based on game ID
  const getGameVisual = () => {
    switch (game.id) {
      case 'count-objects':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
            🍎
          </div>
        );
      case 'number-matching':
        return (
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-2xl shadow-inner">
            🔍
          </div>
        );
      case 'number-order':
        return (
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl shadow-inner">
            🚂
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-2xl shadow-inner">
            🎯
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        {/* Header with visual icon and duration/XP */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {getGameVisual()}

          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>+{game.xpReward} XP</span>
            </span>

            {isCompleted && (
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Completed {highScore ? `· Best: ${highScore}` : ''}
              </span>
            )}
          </div>
        </div>

        {/* Clean metadata without pill clutter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
          <span>{game.className}</span>
          <span aria-hidden="true">·</span>
          <span>{language === 'hi' ? game.subjectNameHi : game.subjectName}</span>
          <span aria-hidden="true">·</span>
          <span>{game.difficulty}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-1.5">
          {title}
        </h3>

        <p className="text-xs font-medium text-indigo-700 mb-2">
          Topic: {topic}
        </p>

        <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>~{game.durationMinutes} mins</span>
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100">
        <Link
          to={`/games/${game.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm group-hover:shadow"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isCompleted ? t('replay') : t('btnPlayNow')}</span>
        </Link>
      </div>
    </div>
  );
};

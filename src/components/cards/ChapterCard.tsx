import React from 'react';
import { Link } from 'react-router-dom';
import { ChapterInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { BookCheck, Gamepad2, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChapterCardProps {
  chapter: ChapterInfo;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const { language, t } = useLanguage();
  const title = language === 'hi' ? chapter.titleHi : chapter.title;
  const topic = language === 'hi' ? chapter.topicHi : chapter.topic;
  const description = language === 'hi' ? chapter.descriptionHi : chapter.description;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
            Chapter {chapter.chapterNumber} · {topic}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified Alignment
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-900 transition-colors mb-2">
          {title}
        </h3>

        <p className="text-xs text-slate-500 font-mono mb-3">
          {chapter.curriculumReference}
        </p>

        <p className="text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Feature counters */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6">
          <span className="flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4 text-indigo-600" />
            <strong className="text-slate-800 tabular-nums">{chapter.games.length}</strong> Games
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <BookCheck className="w-4 h-4 text-sky-600" />
            <strong className="text-slate-800 tabular-nums">{chapter.practiceQuestions.length}</strong> Practice Quizzes
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-slate-100">
        <Link
          to={`/chapters/${chapter.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
        >
          <span>Explore Chapter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={`/practice/${chapter.id}`}
          className="inline-flex items-center justify-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
        >
          {t('btnPractice')}
        </Link>
      </div>
    </div>
  );
};

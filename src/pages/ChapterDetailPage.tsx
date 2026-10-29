import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CLASS_1_MATHS_COUNTING_CHAPTER } from '../data/curriculum';
import { GameCard } from '../components/cards/GameCard';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  BookCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ChapterDetailPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // For the pilot release, the chapter is CLASS_1_MATHS_COUNTING_CHAPTER
  const chapter = CLASS_1_MATHS_COUNTING_CHAPTER;

  const title = language === 'hi' ? chapter.titleHi : chapter.title;
  const topic = language === 'hi' ? chapter.topicHi : chapter.topic;
  const description = language === 'hi' ? chapter.descriptionHi : chapter.description;
  const objectives = language === 'hi' ? chapter.learningObjectivesHi : chapter.learningObjectives;
  const keyPoints = language === 'hi' ? chapter.explanation.keyPointsHi : chapter.explanation.keyPoints;
  const summary = language === 'hi' ? chapter.explanation.summaryHi : chapter.explanation.summary;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/classes/class-1/maths')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Class 1 Mathematics</span>
        </button>
      </div>

      {/* Chapter Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md">
              Chapter {chapter.chapterNumber} · {topic}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified NCERT Alignment
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/practice/${chapter.id}`}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <BookCheck className="w-4 h-4" />
              <span>Practice Questions</span>
            </Link>
            <Link
              to="/revision"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Revision Notes</span>
            </Link>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          {title}
        </h1>

        <p className="text-xs text-slate-500 font-mono">
          {chapter.curriculumReference}
        </p>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Learning Objectives & Pedagogical Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <span>Learning Objectives</span>
          </h2>
          <ul className="space-y-2.5">
            {objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bite-sized Explanation & Core Concept */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-indigo-950 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Core Concept Summary</span>
          </h2>
          <p className="text-xs sm:text-sm text-indigo-900 mb-4 leading-relaxed">
            {summary}
          </p>
          <ul className="space-y-2">
            {keyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-indigo-800">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Playable Games for this Chapter */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-600" />
            <span>Playable Educational Games</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Interactive, anxiety-free learning games to build number sense through play.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapter.games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </div>
    </div>
  );
};

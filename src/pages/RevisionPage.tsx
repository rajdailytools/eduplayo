import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CLASS_1_MATHS_COUNTING_CHAPTER } from '../data/curriculum';
import { BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const RevisionPage: React.FC = () => {
  const { language, t } = useLanguage();
  const chapter = CLASS_1_MATHS_COUNTING_CHAPTER;

  const [activeCardIdx, setActiveCardIdx] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Active Recall & Revision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          Quick Concept Revision
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Short, clear summaries of key mathematical concepts for fast recall before practicing or playing.
        </p>
      </div>

      {/* Revision Flashcards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chapter.revisionNotes.map((note, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 font-extrabold text-sm flex items-center justify-center mb-4">
                0{idx + 1}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {language === 'hi' ? note.titleHi : note.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {language === 'hi' ? note.contentHi : note.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Class 1 Maths</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Key Rule
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Number Line Visual Explorer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Visual Number Line (1 to 9)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Numbers grow larger as you move from left to right. Tap any number to view its quantity!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
            const isSelected = activeCardIdx === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setActiveCardIdx(num)}
                className={`w-12 h-14 sm:w-16 sm:h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-700 text-white font-black text-2xl scale-105 shadow-md'
                    : 'bg-white border-slate-200 text-slate-800 font-bold text-xl hover:border-indigo-300'
                }`}
              >
                <span>{num}</span>
              </button>
            );
          })}
        </div>

        {activeCardIdx > 0 && (
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-center">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2">
              Visual Quantity for {activeCardIdx}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-2xl">
              {Array.from({ length: activeCardIdx }).map((_, i) => (
                <span key={i}>🍎</span>
              ))}
            </div>
            <p className="text-xs text-indigo-800 mt-2 font-medium">
              Counting: {Array.from({ length: activeCardIdx }, (_, i) => i + 1).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Action links */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-slate-100/80 rounded-2xl border border-slate-200">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Ready to put your revision to the test?</h4>
          <p className="text-xs text-slate-500">Play one of our three interactive games or try the practice quiz.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/games/count-objects"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Play Games
          </Link>
          <Link
            to="/practice/class-1-maths-counting"
            className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
          >
            Practice Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

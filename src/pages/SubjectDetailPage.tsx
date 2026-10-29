import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CLASSES } from '../data/curriculum';
import { ChapterCard } from '../components/cards/ChapterCard';
import { ArrowLeft, BookOpen, Calculator, Sparkles } from 'lucide-react';

export const SubjectDetailPage: React.FC = () => {
  const { classId, subjectId } = useParams<{ classId: string; subjectId: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const currentClass = CLASSES.find((c) => c.id === classId) || CLASSES[0];
  const subject = currentClass.subjects.find((s) => s.id === subjectId) || currentClass.subjects[0];

  const subName = language === 'hi' ? subject.nameHi : subject.name;
  const subDesc = language === 'hi' ? subject.descriptionHi : subject.description;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back to Class */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/classes/${currentClass.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {language === 'hi' ? currentClass.nameHi : currentClass.name}</span>
        </button>
      </div>

      {/* Subject Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
          <span>{language === 'hi' ? currentClass.nameHi : currentClass.name}</span>
          <span aria-hidden="true">·</span>
          <span>{subName}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          {subName}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {subDesc}
        </p>
      </div>

      {/* Chapters list */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            Curriculum Chapters & Learning Activities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Each chapter includes interactive games, conceptual practice, and revision cards.
          </p>
        </div>

        {subject.chapters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subject.chapters.map((chap) => (
              <ChapterCard key={chap.id} chapter={chap} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <h3 className="font-bold text-slate-800 text-base mb-1">
              Chapter Content in Development
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We are actively developing and verifying games for {subName}. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

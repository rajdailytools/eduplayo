import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CLASSES } from '../data/curriculum';
import { SubjectCard } from '../components/cards/SubjectCard';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

export const ClassDetailPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const currentClass = CLASSES.find((c) => c.id === classId) || CLASSES[0];
  const name = language === 'hi' ? currentClass.nameHi : currentClass.name;
  const description = language === 'hi' ? currentClass.descriptionHi : currentClass.description;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/classes')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Classes</span>
        </button>
      </div>

      {/* Class Overview Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center">
              {currentClass.number}
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {name}
              </h1>
              <span className="text-xs text-slate-500 font-medium">
                Age Range: {currentClass.ageRange} · NCERT / CBSE Aligned
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          {currentClass.isAvailable ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Active Pilot Release
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              Curriculum in Active Development
            </span>
          )}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
            Core Subjects for {name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select a subject to view available learning chapters, games, and practice modules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentClass.subjects.map((sub) => (
            <SubjectCard key={sub.id} subject={sub} classId={currentClass.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

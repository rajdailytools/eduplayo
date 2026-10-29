import React from 'react';
import { Link } from 'react-router-dom';
import { SubjectInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calculator,
  BookOpen,
  Languages,
  Compass,
  Sparkles,
  ChevronRight,
  FlaskConical,
} from 'lucide-react';

interface SubjectCardProps {
  subject: SubjectInfo;
  classId: string;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, classId }) => {
  const { language, t } = useLanguage();
  const name = language === 'hi' ? subject.nameHi : subject.name;
  const description = language === 'hi' ? subject.descriptionHi : subject.description;

  const getIcon = () => {
    switch (subject.id) {
      case 'maths':
        return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'english':
        return <BookOpen className="w-6 h-6 text-sky-600" />;
      case 'hindi':
        return <Languages className="w-6 h-6 text-purple-600" />;
      case 'evs':
        return <Compass className="w-6 h-6 text-emerald-600" />;
      default:
        return <FlaskConical className="w-6 h-6 text-indigo-600" />;
    }
  };

  const hasContent = subject.chapters && subject.chapters.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getIcon()}
          </div>
          {hasContent ? (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Active Topics
            </span>
          ) : (
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              In Development
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-2">
          {name}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed">
          {description}
        </p>
      </div>

      <div>
        {hasContent ? (
          <Link
            to={`/classes/${classId}/${subject.id}`}
            className="w-full inline-flex items-center justify-between py-2.5 px-4 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-indigo-700 font-semibold text-sm rounded-xl transition-all"
          >
            <span>{subject.chapters.length} Active Chapter(s)</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="text-xs text-slate-500 italic block py-2">
            Coming in the next syllabus release
          </span>
        )}
      </div>
    </div>
  );
};

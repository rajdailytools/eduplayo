import React from 'react';
import { Link } from 'react-router-dom';
import { ClassInfo } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { BookOpen, Sparkles, ChevronRight, Lock } from 'lucide-react';

interface ClassCardProps {
  classInfo: ClassInfo;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classInfo }) => {
  const { language, t } = useLanguage();
  const name = language === 'hi' ? classInfo.nameHi : classInfo.name;
  const description = language === 'hi' ? classInfo.descriptionHi : classInfo.description;

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 ${
        classInfo.isAvailable
          ? 'bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-lg'
          : 'bg-slate-50 border-slate-200/80 opacity-90'
      }`}
    >
      <div>
        {/* Top Kicker & Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-lg flex items-center justify-center border border-indigo-100 group-hover:scale-105 transition-transform">
              {classInfo.number}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-900 transition-colors">
                {name}
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {classInfo.ageRange}
              </span>
            </div>
          </div>

          {classInfo.isAvailable ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{t('badgeAvailable')}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Coming Soon</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
          {description}
        </p>

        {/* Subjects overview */}
        {classInfo.subjects.length > 0 && (
          <div className="mb-6 pt-4 border-t border-slate-100">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Subjects Available
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-600">
              {classInfo.subjects.map((s) => (
                <span
                  key={s.id}
                  className="bg-slate-100/80 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                >
                  {language === 'hi' ? s.nameHi : s.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        {classInfo.isAvailable ? (
          <Link
            to={`/classes/${classInfo.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm group-hover:shadow"
          >
            <span>{t('btnStartLearning')}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div className="text-xs text-slate-500 bg-slate-100/90 rounded-xl p-2.5 text-center font-medium">
            {t('comingSoonNote')}
          </div>
        )}
      </div>
    </div>
  );
};

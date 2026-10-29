import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/common/Logo';
import {
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Heart,
  Target,
  Award,
  BookOpen,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Educational Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About EduPlayo
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          "Learn It. Play It. Master It." — Turning foundational school concepts into interactive adventures where every child builds confidence through play.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          <span>Our Pedagogical Mission</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          EduPlayo was created to solve a persistent classroom problem: abstract concepts, repetitive worksheets, and rote memorization frequently induce early academic anxiety in children. By anchoring formal CBSE / NCERT learning outcomes inside playful, sensory-rich micro-games, we transform passive reading into active, hands-on understanding.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          In our pilot release, we focus deeply on Class 1 Mathematics (Joyful Mathematics framework). Young learners don't just read numerals; they tap, group, order, and match concrete visual objects like apples, stars, and balloons, grounding mathematical thinking in physical intuition.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Play-First Pedagogy</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every game is built around a specific cognitive objective—not arbitrary mini-games attached to quiz popups.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Child Safety by Design</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Zero intrusive tracking, no public chat, no third-party behavioral ads, and device-local progress storage.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Kind, Supportive Feedback</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Learners are never penalized or shamed for incorrect answers. Mistakes are treated as invitations to explore and recount.
          </p>
        </div>
      </div>

      {/* Transparency & Owner Placeholders */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 text-sm">Deployment & Operator Notice</h4>
        <p>
          EduPlayo is hosted at <strong>eduplayo.fun</strong>. Content is independently authored and aligned with public educational syllabi.
        </p>
        <p className="text-slate-500 italic">
          [Site Operator Placeholder: Insert organization or developer credentials, verified registration status, and official administrative headquarters prior to public release].
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { AlertCircle, BookCheck } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
          Transparency & Attribution
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Educational Disclaimer
        </h1>
        <p className="text-xs text-slate-500">
          Curriculum Standards Alignment Statement · Domain: eduplayo.fun
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-indigo-600" />
            <span>1. Curriculum Alignment vs. Official Affiliation</span>
          </h2>
          <p>
            EduPlayo is an <strong>independent educational gaming platform</strong>. Our learning objectives, topics, and question structures are designed in alignment with the National Council of Educational Research and Training (NCERT) and Central Board of Secondary Education (CBSE) learning guidelines for Class 1 (such as the <em>Joyful Mathematics</em> syllabus).
          </p>
          <p>
            However, EduPlayo is <strong>not affiliated with, endorsed by, sponsored by, or connected to NCERT, CBSE, or any government ministry or department</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            2. Original Content & Fair Use
          </h2>
          <p>
            All game interactive mechanics, digital illustrations, question phrasing, and audio cues on EduPlayo are original works designed specifically for our gamified engine. We do not reproduce copyrighted textbook images, scanning excerpts, or proprietary test papers without express permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            3. Supplementary Learning Tool
          </h2>
          <p>
            EduPlayo is engineered as an enriching, interactive supplement to formal classroom schooling and parental instruction. While designed to foster deep conceptual understanding, it is not a substitute for formal curriculum completion or registered school enrollment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            4. Future Examination Modules
          </h2>
          <p>
            References to future modules for Classes 6–12 or competitive examinations (SSC, Railway, etc.) reflect conceptual architecture and roadmaps. Any future test preparation content will remain independently authored.
          </p>
        </section>
      </div>
    </div>
  );
};

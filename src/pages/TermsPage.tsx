import React from 'react';
import { Scale, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Terms and Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 · Official Domain: eduplayo.fun
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By visiting or using EduPlayo (accessible at <strong>eduplayo.fun</strong>), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            2. Educational Purpose & Permitted Use
          </h2>
          <p>
            EduPlayo is provided for educational and non-commercial learning purposes. Students, parents, and educators may freely use our games, activities, and practice modules to support school concept comprehension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            3. Intellectual Property Rights
          </h2>
          <p>
            All original code, interactive game mechanics, brand identifiers, logo marks, sound designs, and written pedagogical explanations are the exclusive property of EduPlayo. You may not scrape, redistribute, or mirror the games on commercial platforms without prior written authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            4. Limitation of Liability
          </h2>
          <p>
            EduPlayo is offered on an "as is" and "as available" basis without warranties of any kind. While we strive for rigorous pedagogical accuracy and continuous uptime, we are not liable for any disruptions or hardware incompatibilities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            5. Modifications to Terms
          </h2>
          <p>
            We may revise these Terms as we release new classes or features. Continued use of the platform after updates signifies acceptance of the amended terms.
          </p>
        </section>
      </div>
    </div>
  );
};

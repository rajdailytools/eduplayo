import React from 'react';
import { Eye, Keyboard, Sparkles, CheckCircle2 } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
          Inclusive Design
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Accessibility Statement
        </h1>
        <p className="text-xs text-slate-500">
          Target: WCAG 2.1 AA Standards · Domain: eduplayo.fun
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" />
            <span>1. Our Accessibility Commitment</span>
          </h2>
          <p>
            EduPlayo believes every child deserves joyful, accessible education. We actively develop our platform to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA conformance, ensuring children with varied physical, visual, and cognitive needs can participate comfortably.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>2. Key Accessibility Features Implemented</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 text-sm block">Keyboard Navigable:</strong>
              <p className="text-xs text-slate-600">
                All game controls, answer cards, and navigation links support full Tab / Shift+Tab keyboard traversal with visible focus outlines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 text-sm block">Non-Color State Indicators:</strong>
              <p className="text-xs text-slate-600">
                Correct and incorrect answers are always accompanied by textual labels, icons (✓ and !), and distinct shapes—never color alone.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 text-sm block">Reduced Motion Support:</strong>
              <p className="text-xs text-slate-600">
                We honor the system <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">prefers-reduced-motion</code> setting, disabling celebratory confetti and animations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 text-sm block">Large Touch Targets:</strong>
              <p className="text-xs text-slate-600">
                Interactive buttons meet or exceed the minimum 44×44px mobile touch target requirement for small fingers on touchscreen devices.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-indigo-600" />
            <span>3. Multilingual Support</span>
          </h2>
          <p>
            EduPlayo provides one-click switching between English and Hindi for primary navigation, instructional labels, and game feedback, accommodating bilingual learners and parents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            4. Accessibility Feedback
          </h2>
          <p>
            If you encounter an accessibility barrier on any screen or game, please let us know at <span className="font-mono text-indigo-700">accessibility@eduplayo.fun</span>. We welcome your recommendations.
          </p>
        </section>
      </div>
    </div>
  );
};

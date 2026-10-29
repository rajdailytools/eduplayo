import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
          Legal & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 · Official Domain: eduplayo.fun
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>1. Commitment to Child Safety & Privacy</span>
          </h2>
          <p>
            EduPlayo is committed to providing a safe, joyful, and privacy-preserving learning environment for young learners, parents, and educators. Because our initial platform is designed for primary school students (Classes 1–5), we enforce strict data minimization practices in accordance with global child privacy standards, including the Children’s Online Privacy Protection Act (COPPA) principles and India’s Digital Personal Data Protection (DPDP) Act.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-indigo-600" />
            <span>2. No Collection of Personal Identifiable Information</span>
          </h2>
          <p>
            In this initial release, EduPlayo does <strong>not</strong> require user registration, logins, or accounts. We do not ask for, collect, or store:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600">
            <li>Children’s names, ages, birthdays, or photos</li>
            <li>School names, student roll numbers, or physical addresses</li>
            <li>Parent or guardian telephone numbers</li>
            <li>Payment credentials or financial details</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <span>3. How Progress is Stored (Local Browser Storage)</span>
          </h2>
          <p>
            Game scores, XP points, learner levels, daily streaks, and unlocked badges are stored <strong>strictly on your personal device</strong> using your browser’s standard <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs text-indigo-800">localStorage</code>.
          </p>
          <p>
            This data never leaves your device and is not transmitted to our servers or any third-party analytics company. You can reset or delete this progress at any time using the "Reset Progress" button in the footer or by clearing your browser cache.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            4. Third-Party Services and Advertising
          </h2>
          <p>
            EduPlayo does not inject behavioral tracking pixels, third-party cookies, or targeted advertising networks in this release. If an approved educational sponsor or child-safe advertising partner is integrated in the future, it will be strictly contextual and compliant with children’s safety standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            5. Contact and Legal Inquiries
          </h2>
          <p>
            For questions regarding our privacy practices or data handling, please contact our privacy coordinator at:
          </p>
          <p className="font-mono text-xs text-indigo-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            Email: privacy@eduplayo.fun · Domain: eduplayo.fun
          </p>
        </section>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Sparkles, BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-800/80 p-2 rounded-xl inline-block">
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe for Children · Zero Invasive Ads · Local Browser Storage</span>
            </div>
            <p className="text-xs text-slate-500">
              Domain: <span className="text-indigo-400 font-mono">eduplayo.fun</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">{t('navHome')}</Link>
              </li>
              <li>
                <Link to="/classes" className="hover:text-white transition-colors">{t('navClasses')}</Link>
              </li>
              <li>
                <Link to="/chapters/class-1-maths-counting" className="hover:text-white transition-colors">{t('navGames')}</Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-white transition-colors">{t('navChallenges')}</Link>
              </li>
              <li>
                <Link to="/revision" className="hover:text-white transition-colors">{t('navRevision')}</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">{t('navSearch')}</Link>
              </li>
            </ul>
          </div>

          {/* Curriculum */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">{t('curriculumLinks')}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/classes/class-1" className="hover:text-white transition-colors">Class 1 (Primary Pilot)</Link>
              </li>
              <li>
                <Link to="/classes/class-1/maths" className="hover:text-white transition-colors">Class 1 Mathematics</Link>
              </li>
              <li>
                <Link to="/chapters/class-1-maths-counting" className="hover:text-white transition-colors">Numbers & Counting</Link>
              </li>
              <li>
                <Link to="/classes/class-2" className="hover:text-white transition-colors text-slate-500">Class 2 (Coming Soon)</Link>
              </li>
              <li>
                <Link to="/classes/class-3" className="hover:text-white transition-colors text-slate-500">Class 3 (Coming Soon)</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Transparency */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">{t('legalLinks')}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">{t('navAbout')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">{t('navContact')}</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('navPrivacy')}</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">{t('navTerms')}</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">{t('navDisclaimer')}</Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors">{t('navAccessibility')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© EduPlayo. {t('rightsReserved')}</span>
            <span aria-hidden="true">·</span>
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for curious minds</span>
          </div>

          <div className="text-center md:text-right text-slate-500">
            Educational syllabus alignment based on official NCERT / CBSE curriculum documents.
          </div>
        </div>
      </div>
    </footer>
  );
};

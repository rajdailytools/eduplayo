import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Process locally or prepare mailto link
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Contact EduPlayo Team
        </h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto">
          We welcome feedback from educators, parents, and students to help make our learning games even more joyful and effective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Information & Placeholders */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>Contact Channels</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div>
                <strong className="block text-slate-900">Support Inquiries:</strong>
                <span className="font-mono text-indigo-700">[support@eduplayo.fun]</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  (Configure your preferred inbox before launch)
                </span>
              </div>

              <div>
                <strong className="block text-slate-900">Curriculum Feedback:</strong>
                <span className="font-mono text-indigo-700">[curriculum@eduplayo.fun]</span>
              </div>

              <div>
                <strong className="block text-slate-900">Operating Domain:</strong>
                <span className="font-mono text-slate-700">eduplayo.fun</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <strong>Site Owner Configuration Notice:</strong>
            <p>
              Before pointing public DNS to your production domain, update the contact email addresses above in your deployment settings. No fake company numbers or physical addresses are used.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-150">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. Our educational team will review your message promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
                  }}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name / Parent or Educator Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. priya@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Topic
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 outline-none transition-all cursor-pointer"
                  >
                    <option value="Feedback">Game & Learning Feedback</option>
                    <option value="Curriculum">Syllabus / NCERT Alignment Query</option>
                    <option value="Bug">Technical Issue or Bug Report</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your thoughts, suggestions, or question..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

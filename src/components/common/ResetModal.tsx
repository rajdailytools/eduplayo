import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose }) => {
  const { resetProgress } = useProgress();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleConfirm = () => {
    resetProgress();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 id="reset-modal-title" className="text-lg font-bold text-slate-900 mb-2">
          {t('resetConfirmTitle')}
        </h3>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {t('resetConfirmDesc')}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {t('resetCancel')}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            {t('resetConfirmBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};

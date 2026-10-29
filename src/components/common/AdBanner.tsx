import React from 'react';

interface AdBannerProps {
  placement?: 'sidebar' | 'footer-above' | 'results-below';
  className?: string;
}

// In the initial release, monetization is disabled by default to maintain clean child-safe UX.
// Site owners can enable this once official ad network approval is secured.
export const ADS_ENABLED = false;

export const AdBanner: React.FC<AdBannerProps> = ({ placement = 'results-below', className = '' }) => {
  if (!ADS_ENABLED) {
    // Renders nothing when disabled as per child-safety guidelines
    return null;
  }

  return (
    <div
      className={`my-6 p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center ${className}`}
      role="complementary"
      aria-label="Sponsored Content Area"
    >
      <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
        Sponsored Learning Partner
      </span>
      <div className="h-24 flex items-center justify-center text-xs text-slate-500">
        Configured Advertising Placeholder ({placement})
      </div>
    </div>
  );
};

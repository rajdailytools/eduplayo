import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none rounded-lg p-0.5 ${className}`}
      aria-label="EduPlayo Home"
    >
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        {/* Original EduPlayo Logo Mark: Graduation cap + Game controller wings + Spark star */}
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        >
          {/* Base gamepad-curved shield in vibrant indigo & purple */}
          <rect
            x="2"
            y="6"
            width="40"
            height="32"
            rx="12"
            fill="url(#eduplayoGrad)"
          />
          {/* Graduation cap diamond crest */}
          <polygon
            points="22,11 36,17 22,23 8,17"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* Cap under-arch / Controller bridge */}
          <path
            d="M13 19.5V25C13 28 17 31 22 31C27 31 31 28 31 25V19.5L22 23.5L13 19.5Z"
            fill="#E0E7FF"
          />
          {/* Tassel cord and bead */}
          <path
            d="M31 19V27C31 28 30 28.5 29.5 28"
            stroke="#FACC15"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Playful spark star of knowledge */}
          <path
            d="M22 6L23.2 9.5L26.5 10.8L23.2 12L22 15.5L20.8 12L17.5 10.8L20.8 9.5L22 6Z"
            fill="#FACC15"
          />
          {/* Dual game d-pad & action dots subtle tactile highlights */}
          <circle cx="16" cy="25" r="1.5" fill="#4338CA" />
          <circle cx="28" cy="25" r="1.5" fill="#4338CA" />

          <defs>
            <linearGradient id="eduplayoGrad" x1="2" y1="6" x2="42" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4338CA" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className={`font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-900 transition-colors ${textSizes[size]}`}>
            Edu<span className="text-indigo-700">Playo</span>
          </span>
          <span className="ml-0.5 text-xs font-bold text-amber-500 uppercase tracking-wider">.fun</span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 leading-tight">
            Learn It. Play It. Master It.
          </span>
        )}
      </div>
    </Link>
  );
};

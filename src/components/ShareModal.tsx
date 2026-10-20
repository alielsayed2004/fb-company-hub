import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, Share2 } from 'lucide-react';
import { IconTile } from './ui';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://fbassets.com/';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}>
      <div className="animate-scaleIn bg-white rounded-3xl max-w-md w-full max-h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <IconTile size="lg">
            <Share2 className="w-5 h-5" />
          </IconTile>
          <div>
            <h3 className="text-lg font-bold text-[#0B3C49]">Share Official Hub</h3>
            <p className="text-xs text-slate-500">Verified Institutional Resource</p>
          </div>
        </div>

        {/* QR Code Illustration */}
        <div className="my-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-40 h-40 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-center mb-3">
            <QrCode className="w-32 h-32 text-[#0B3C49]" />
          </div>
          <span className="text-xs font-medium text-slate-600 max-w-xs">
            Scan the QR code or copy the permanent URL to share with clients & partners.
          </span>
        </div>

        {/* Link display & Copy Button */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 font-mono-code text-xs text-slate-700 overflow-x-auto">
            <span className="truncate">{currentUrl}</span>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0B3C49] hover:bg-[#114B5F] text-white shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Portal Link</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
          <span>F.B Company — Official Verified Gateway</span>
        </div>
      </div>
    </div>
  );
};

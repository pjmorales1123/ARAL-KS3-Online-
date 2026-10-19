import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle, Share, ExternalLink, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // If already installed and launched from phone home screen, don't show install banner
  if (isInstalled || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      {/* Top Banner Alert on Mobile */}
      <div className="bg-linear-to-r from-rose-600 via-rose-700 to-indigo-800 text-white px-3.5 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs border-b border-rose-500/30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-bold leading-tight">
              <span className="truncate">Install as Real Android App</span>
              <span className="bg-amber-400 text-amber-950 text-[9px] px-1.5 py-0.2 rounded-full font-black tracking-wide uppercase">
                APK/PWA
              </span>
            </div>
            <p className="text-[11px] text-rose-100 truncate">
              Runs fullscreen on your phone with offline access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 bg-white text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-extrabold shadow-sm active:scale-95 transition-all flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Manual Installation Guide Modal (when browser prompt is deferred or on iOS/Android manual) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Install Real Phone App</h3>
                  <p className="text-xs text-slate-500">Add to your Android or iPhone device</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isAndroid || !isIOS ? (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                    ✓
                  </span>
                  On Android (Chrome / Edge / Samsung Internet):
                </span>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-1 leading-relaxed">
                  <li>
                    Tap the <strong>three dots menu (⋮)</strong> at the top-right or bottom of your browser.
                  </li>
                  <li>
                    Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </li>
                  <li>
                    Confirm <strong>"Install"</strong>. The app icon will appear on your phone's home screen and app drawer!
                  </li>
                </ol>
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 font-medium">
                  🚀 Once installed, it launches full-screen without any web browser address bar, exactly like a Play Store app.
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Share className="w-4 h-4 text-rose-600" />
                  On iPhone / iPad (Safari):
                </span>
                <ol className="list-decimal list-inside space-y-2 text-slate-600 pl-1 leading-relaxed">
                  <li>
                    Tap the <strong>Share</strong> button at the bottom of Safari.
                  </li>
                  <li>
                    Scroll down and tap <strong>"Add to Home Screen"</strong>.
                  </li>
                  <li>
                    Tap <strong>"Add"</strong> at the top right.
                  </li>
                </ol>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 active:scale-98 transition shadow-xs"
            >
              Got it, close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToasts: React.FC = () => {
  const { notifications, dismissNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {notifications.map((notif) => {
        const isSuccess = notif.type === 'success';
        const isAlert = notif.type === 'alert';

        return (
          <div
            key={notif.id}
            className={`pointer-events-auto rounded-2xl p-4 shadow-xl border backdrop-blur-md flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${
              isSuccess
                ? 'bg-emerald-900/95 text-white border-amber-400/80 shadow-emerald-950/20'
                : isAlert
                ? 'bg-red-900/95 text-white border-red-400 shadow-red-950/20'
                : 'bg-amber-950/95 text-amber-50 border-amber-500/60 shadow-amber-950/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-300" />}
              {isAlert && <AlertCircle className="w-5 h-5 text-red-300" />}
              {!isSuccess && !isAlert && <Info className="w-5 h-5 text-amber-300" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-heading font-bold text-sm tracking-wide text-amber-200">
                  {notif.title}
                </h4>
                <span className="text-[10px] text-emerald-200 opacity-80">{notif.time}</span>
              </div>
              <p className="text-xs mt-1 text-emerald-50 leading-relaxed font-medium">
                {notif.message}
              </p>
            </div>

            <button
              onClick={() => dismissNotification(notif.id)}
              className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

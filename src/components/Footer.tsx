import React from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, Heart, ShieldCheck, MapPin, Truck, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/initialData';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🥭</span>
              <span className="font-heading font-black text-2xl text-white">
                Mango <span className="text-amber-400">Fresh</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-md">
              Tienda virtual especializada en la comercialización de Mango Biche tradicional y vasos locos con limón fresco, sal marina, pimienta, tajín, chamoy agridulce y gomitas ácidas.
            </p>
            <div className="text-xs text-amber-300 font-medium">
              Anteproyecto académico de emprendimiento • Institución Educativa Marco Fidel Suárez (Grado 11, Colombia 2026).
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-heading font-black text-sm text-amber-300 uppercase tracking-wider mb-2">
              Navegación
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setCurrentView('catalog')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Menú Oficial de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('customizer')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Arma Tu Vaso a Tu Gusto
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('tracker')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Seguimiento de Envíos en Vivo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('feedback')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Auto-Retroalimentación & Votaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-amber-300 font-bold hover:underline"
                >
                  Realm Cloud: Inventarios & Ventas
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Orders */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-black text-sm text-amber-300 uppercase tracking-wider mb-2">
              Atención Inmediata
            </h4>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-3 py-2 rounded-xl border border-emerald-600 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>
              <p className="text-emerald-300 text-[11px]">
                Pago por Nequi oficial: <strong>322 356 0164</strong> o Efectivo contra entrega.
              </p>
              <p className="text-[11px] text-stone-400">
                Sara Sofía Arciniegas & Marlon Santos Reyes
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-emerald-900 text-center text-xs text-emerald-400/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Mango Fresh — Todos los derechos reservados.</span>
          <span>Desarrollado para el fortalecimiento de competencias emprendedoras.</span>
        </div>
      </div>
    </footer>
  );
};

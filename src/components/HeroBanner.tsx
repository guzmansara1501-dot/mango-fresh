import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChefHat, Flame, ShieldAlert, Award, Clock, ArrowRight } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/initialData';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, openCustomizer, products } = useApp();

  const handleCustomCup = () => {
    const customProduct = products.find((p) => p.id === 'mango-personalizado') || products[2];
    openCustomizer(customProduct);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100/60 to-emerald-50/40 border-b border-amber-200/80">
      {/* Background decorative tropical shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Academic badge / verified project */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 px-3.5 py-1.5 rounded-full shadow-sm">
              <Award className="w-4 h-4 text-emerald-800" />
              <span className="text-xs font-bold text-emerald-950">
                Emprendimiento Oficial • Institución Educativa Marco Fidel Suárez
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-emerald-950 tracking-tight leading-[1.1]">
                El auténtico sabor del <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-amber-500">
                  Mango Biche
                </span>{' '}
                <span className="text-amber-500">fresco</span> 🥭
              </h1>
              <p className="text-base sm:text-lg text-stone-700 max-w-xl mx-auto lg:mx-0 font-medium">
                Crocante, ácido y jugoso. Disfrútalo en tiras finas estilo espiral o cubos frescos, calibrado a tu gusto con{' '}
                <strong className="text-emerald-800 font-bold">sal marina</strong>,{' '}
                <strong className="text-emerald-800 font-bold">limón natural recién exprimido</strong>,{' '}
                <strong className="text-emerald-800 font-bold">pimienta negra</strong>,{' '}
                <strong className="text-amber-600 font-bold">chile Tajín</strong>,{' '}
                <strong className="text-red-600 font-bold">salsa agridulce chamoy</strong> y{' '}
                <strong className="text-purple-700 font-bold">gomitas ácidas</strong>.
              </p>
            </div>

            {/* Quick feature pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-bold text-emerald-950">
              <span className="bg-amber-200/80 border border-amber-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🍋 Limón 100% Natural
              </span>
              <span className="bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🧂 Sal & Pimienta al Gusto
              </span>
              <span className="bg-red-100 text-red-950 border border-red-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🔥 Tajín & Chamoy
              </span>
              <span className="bg-purple-100 text-purple-950 border border-purple-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🍬 Gomitas Ácidas
              </span>
              <span className="bg-yellow-200 text-yellow-950 border border-yellow-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🟣 Nequi / 💵 Efectivo
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleCustomCup}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 text-base border-2 border-emerald-400"
              >
                <ChefHat className="w-5 h-5 text-amber-300" />
                <span>Armar Mi Vaso Personalizado</span>
              </button>

              <button
                onClick={() => setCurrentView('catalog')}
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base border-2 border-amber-300"
              >
                <span>Ver Menú & Precios</span>
                <ArrowRight className="w-4 h-4 text-emerald-900" />
              </button>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pedidos y atención inmediata al WhatsApp:</span>
              <a
                href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
              >
                {DISPLAY_PHONE}
              </a>
            </div>

          </div>

          {/* Right Column: Visual Showcase Badge Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400 transform hover:scale-[1.02] transition-transform">
              
              {/* Highlight Ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-emerald-950 font-black text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md border border-amber-200">
                Especialidad de la Casa
              </div>

              <div className="flex items-center justify-between mt-2 border-b border-emerald-700/60 pb-3">
                <div>
                  <h3 className="font-heading font-black text-xl text-amber-300">
                    Vaso ManGuss Loco
                  </h3>
                  <p className="text-xs text-emerald-200">Explosión de sabor & texturas</p>
                </div>
                <div className="bg-amber-400 text-emerald-950 font-black text-lg px-3 py-1 rounded-xl shadow-inner">
                  $15.000 COP
                </div>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🥭</span>
                  <span>Mango biche en cubos crujientes recién cortados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">🍬</span>
                  <span>Gomitas ácidas + perlas explosivas de fruta</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">💉</span>
                  <span>Inyección concentrada de salsa agridulce chamoy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">🍭</span>
                  <span>Paleta de caramelo y chupeta para mezclar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">🛵</span>
                  <span>¡Seguimiento de envío en tiempo real a tu puerta!</span>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-700/60 flex items-center justify-between">
                <div className="text-[11px] text-amber-200">
                  <span className="font-bold">Pago:</span> Nequi o Efectivo
                </div>
                <button
                  onClick={handleCustomCup}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 text-xs font-black px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  ¡Quiero Probarlo!
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

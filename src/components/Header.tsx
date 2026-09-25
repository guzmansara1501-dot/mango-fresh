import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Bell, User, Sparkles, ChefHat, Truck, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/initialData';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    customer,
    activeOrder,
    products,
    openCustomizer,
  } = useApp();

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 text-white shadow-md border-b-4 border-amber-400">
      {/* Top micro bar with Colombian info */}
      <div className="bg-emerald-950/80 px-4 py-1 text-xs font-medium text-amber-200 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>🥭 Mango Biche 100% Fresco Colombiano • Sal Marina, Limón Natural, Tajín & Gomitas</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-100">
          <a
            href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>WhatsApp Directo: <strong className="text-amber-300">{DISPLAY_PHONE}</strong></span>
          </a>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline text-amber-200">Sara Sofía & Marlon • Grado 11</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          onClick={() => setCurrentView('catalog')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-inner border-2 border-amber-200 transform group-hover:scale-105 transition-transform">
            <span className="text-2xl sm:text-3xl select-none filter drop-shadow">🥭</span>
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-amber-200 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
              Biche
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm">
                Mango <span className="text-amber-300">Fresh</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200 font-medium tracking-wide">
              ¡Sabor tropical que enamora!
            </p>
          </div>
        </button>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-800/60 p-1 rounded-2xl border border-emerald-600/50">
          <button
            onClick={() => setCurrentView('catalog')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
              currentView === 'catalog'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            Menú Oficial
          </button>
          <button
            onClick={() => {
              const customProd = products.find((p) => p.id === 'mango-personalizado') || products[0];
              openCustomizer(customProd);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'customizer'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            <ChefHat className="w-4 h-4 text-amber-300" />
            <span>Arma Tu Vaso</span>
          </button>
          <button
            onClick={() => setCurrentView('tracker')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'tracker'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-300" />
            <span>Rastreo En Vivo</span>
            {activeOrder && activeOrder.status !== 'entregado' && (
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
            )}
          </button>
          <button
            onClick={() => setCurrentView('feedback')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
              currentView === 'feedback'
                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Retroalimentación</span>
          </button>
          <button
            onClick={() => setCurrentView('nosotros')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              currentView === 'nosotros'
                ? 'bg-emerald-900 text-amber-300 font-bold'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Anteproyecto
          </button>
        </nav>

        {/* Action icons & buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Cloud Realm Button */}
          <button
            onClick={() => setCurrentView('admin')}
            title="Panel de Inventarios y Ventas en la Nube (Realm)"
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                : 'bg-emerald-900/60 text-amber-300 border-emerald-600 hover:bg-emerald-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Panel Nube</span>
            <span className="sm:hidden">Admin</span>
          </button>

          {/* Customer Profile Icon */}
          <button
            onClick={() => setCurrentView('profile')}
            title="Registro y Datos del Cliente"
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
              currentView === 'profile'
                ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow'
                : 'bg-emerald-800/80 text-emerald-100 border-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-semibold hidden xl:inline">
              {customer ? customer.name.split(' ')[0] : 'Registro'}
            </span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setCurrentView('cart')}
            className="relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform active:scale-95 border border-amber-300"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-950" />
            <span className="hidden sm:inline text-sm font-extrabold">Mi Pedido</span>
            {totalCartCount > 0 && (
              <span className="bg-emerald-900 text-amber-300 text-xs font-black px-2 py-0.5 rounded-full border border-amber-300 animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-emerald-900/90 border-t border-emerald-800 text-xs">
        <button
          onClick={() => setCurrentView('catalog')}
          className={`px-2 py-1 rounded-lg font-bold ${
            currentView === 'catalog' ? 'text-amber-300 bg-emerald-800' : 'text-emerald-200'
          }`}
        >
          Menú
        </button>
        <button
          onClick={() => {
            const customProd = products.find((p) => p.id === 'mango-personalizado') || products[0];
            openCustomizer(customProd);
          }}
          className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${
            currentView === 'customizer' ? 'text-amber-300 bg-emerald-800' : 'text-emerald-200'
          }`}
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span>Armar</span>
        </button>
        <button
          onClick={() => setCurrentView('tracker')}
          className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${
            currentView === 'tracker' ? 'text-amber-300 bg-emerald-800' : 'text-emerald-200'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Rastreo</span>
        </button>
        <button
          onClick={() => setCurrentView('feedback')}
          className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 ${
            currentView === 'feedback' ? 'text-amber-300 bg-emerald-800' : 'text-emerald-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Opinión</span>
        </button>
        <button
          onClick={() => setCurrentView('nosotros')}
          className={`px-2 py-1 rounded-lg ${
            currentView === 'nosotros' ? 'text-amber-300 font-bold' : 'text-emerald-300'
          }`}
        >
          Proyecto
        </button>
      </div>
    </header>
  );
};

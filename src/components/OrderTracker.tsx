import React from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  Truck,
  ChefHat,
  PackageCheck,
  ShoppingBag,
  MapPin,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Flame,
  RotateCcw,
} from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE, TOPPINGS_AVAILABLE } from '../data/initialData';

export const OrderTracker: React.FC = () => {
  const { activeOrder, updateOrderStatus, setCurrentView, orders, setActiveOrder } = useApp();

  if (!activeOrder) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
          <Truck className="w-10 h-10 text-emerald-800" />
        </div>
        <h3 className="font-heading font-black text-2xl text-emerald-950 mb-2">
          No hay ningún pedido activo en seguimiento
        </h3>
        <p className="text-stone-600 text-sm mb-6">
          Cuando realices un pedido de mango biche, aquí podrás ver cómo lo picamos, preparamos y despachamos en tiempo real.
        </p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="bg-emerald-700 text-white font-black px-6 py-3 rounded-2xl shadow-md"
        >
          Ir al Menú y Ordenar
        </button>
      </div>
    );
  }

  const stages: { key: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'recibido',
      label: '1. Pedido Recibido',
      desc: 'Comprobado en el sistema de cocina',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: 'preparando',
      label: '2. En Barra de Picado',
      desc: 'Pelando mango verde, sal, limón y aderezos',
      icon: <ChefHat className="w-4 h-4" />,
    },
    {
      key: 'empacado',
      label: '3. Empacado & Sellado',
      desc: 'Tapa domo higiénica y tenedores listos',
      icon: <PackageCheck className="w-4 h-4" />,
    },
    {
      key: 'en_camino',
      label: '4. Domiciliario en Camino',
      desc: 'Marlon en moto va hacia tu dirección',
      icon: <Truck className="w-4 h-4" />,
    },
    {
      key: 'entregado',
      label: '5. ¡Entregado!',
      desc: '¡A disfrutar tu auténtico Mango Biche!',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  const getStageIndex = (st: OrderStatus) => {
    switch (st) {
      case 'recibido':
        return 0;
      case 'preparando':
        return 1;
      case 'empacado':
        return 2;
      case 'en_camino':
        return 3;
      case 'entregado':
        return 4;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(activeOrder.status);

  const handleNextStage = () => {
    if (activeOrder.status === 'recibido') updateOrderStatus(activeOrder.id, 'preparando');
    else if (activeOrder.status === 'preparando') updateOrderStatus(activeOrder.id, 'empacado');
    else if (activeOrder.status === 'empacado') updateOrderStatus(activeOrder.id, 'en_camino');
    else if (activeOrder.status === 'en_camino') updateOrderStatus(activeOrder.id, 'entregado');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Tracker Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping"></span>
              Seguimiento en Tiempo Real
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-300">
              Pedido #{activeOrder.orderNumber}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Cliente: <strong className="text-white">{activeOrder.customer.name}</strong> • Entrega en:{' '}
              <strong className="text-amber-200">{activeOrder.customer.neighborhood}</strong>
            </p>
          </div>

          {/* Real-time Stage Pill & Fast-forward simulator */}
          <div className="flex flex-col items-end gap-2">
            <div className="bg-emerald-950/70 border border-amber-300/40 px-4 py-2 rounded-2xl text-right">
              <span className="text-[10px] text-amber-200 block uppercase font-bold tracking-wider">
                Tiempo Estimado
              </span>
              <span className="font-heading font-black text-xl text-amber-300">
                {activeOrder.status === 'entregado' ? '¡Entregado!' : '15-20 min'}
              </span>
            </div>

            {activeOrder.status !== 'entregado' && (
              <button
                onClick={handleNextStage}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-xl shadow transition-all flex items-center gap-1"
                title="Acelera la simulación para verificar las etapas"
              >
                <span>Avanzar Etapa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Step-by-step progress bar */}
        <div className="mt-8 pt-6 border-t border-emerald-600/60">
          <div className="grid grid-cols-5 gap-2 relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-emerald-900/60 -z-0">
              <div
                className="h-full bg-amber-400 transition-all duration-700"
                style={{ width: `${(currentIndex / 4) * 100}%` }}
              ></div>
            </div>

            {stages.map((stage, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={stage.key} className="flex flex-col items-center text-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isCurrent
                        ? 'bg-amber-400 text-emerald-950 ring-4 ring-amber-300/40 scale-110'
                        : isPast
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-900 text-emerald-400 border border-emerald-700'
                    }`}
                  >
                    {stage.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 leading-tight ${
                      isCurrent
                        ? 'text-amber-300 font-black'
                        : isPast
                        ? 'text-white'
                        : 'text-emerald-300/70'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Animated Map & Driver Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Map Simulation Graphic */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <h3 className="font-heading font-black text-lg text-emerald-950">
                Ruta del Domicilio en Vivo
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              GPS Activo
            </span>
          </div>

          {/* Visual Map Canvas Simulation */}
          <div className="relative aspect-[16/9] bg-gradient-to-br from-emerald-100 via-amber-50 to-green-100 rounded-2xl overflow-hidden border-2 border-emerald-200 p-4 shadow-inner flex flex-col justify-between">
            {/* Simulated streets grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Origin: Mango Fresh Workshop */}
            <div className="relative z-10 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-emerald-300 w-fit">
              <span className="text-xl">🏪</span>
              <div>
                <span className="text-[10px] font-black text-emerald-950 block">Cocina Mango Fresh</span>
                <span className="text-[9px] text-stone-500">Sede Principal</span>
              </div>
            </div>

            {/* Path Graphic with moving Bike / Truck */}
            <div className="relative w-full my-auto px-4 py-3">
              <div className="h-2 w-full bg-stone-300/70 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-amber-500 transition-all duration-1000"
                  style={{ width: `${activeOrder.driverLocation?.progressPercent || 20}%` }}
                ></div>
              </div>

              {/* Driver Icon */}
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 transform -translate-x-1/2"
                style={{ left: `${Math.min(92, Math.max(8, activeOrder.driverLocation?.progressPercent || 20))}%` }}
              >
                <div className="w-10 h-10 bg-amber-400 text-emerald-950 rounded-full border-2 border-emerald-900 flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-lg">🛵</span>
                </div>
              </div>
            </div>

            {/* Destination: Customer Address */}
            <div className="relative z-10 flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-amber-300 w-fit ml-auto">
              <span className="text-xl">🏠</span>
              <div>
                <span className="text-[10px] font-black text-emerald-950 block">Tu Casa</span>
                <span className="text-[9px] text-stone-600 truncate max-w-[120px] inline-block">
                  {activeOrder.customer.address}
                </span>
              </div>
            </div>
          </div>

          {/* Driver details card */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-300 flex items-center justify-center font-black text-xl shadow-xs">
                MS
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                  {activeOrder.driverName || 'Marlon Santos'}
                </h4>
                <p className="text-[11px] text-stone-500">
                  Repartidor Oficial Mango Fresh • Moto Express
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent(
                `Hola Marlon, sobre mi pedido #${activeOrder.orderNumber}...`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-amber-300" />
              <span>Contactar</span>
            </a>
          </div>

        </div>

        {/* Right Column: Order Details & Timeline History */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Order items recap */}
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
            <h3 className="font-heading font-black text-lg text-emerald-950 pb-2 border-b border-stone-100 flex items-center justify-between">
              <span>Detalle de tus Vasos</span>
              <span className="text-xs text-stone-500 font-normal">
                {activeOrder.items.length} ítems
              </span>
            </h3>

            <div className="space-y-3">
              {activeOrder.items.map((item) => (
                <div key={item.cartItemId} className="text-xs border-b border-stone-100 pb-2 space-y-1">
                  <div className="flex justify-between font-bold text-stone-900">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-emerald-800">
                      ${item.totalPrice.toLocaleString('es-CO')}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Corte {item.customization.cut} • Sal {item.customization.salt} • Limón {item.customization.lemon}
                  </p>
                  {item.customization.toppings.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.customization.toppings.map((tId) => {
                        const top = TOPPINGS_AVAILABLE.find((x) => x.id === tId);
                        return (
                          <span
                            key={tId}
                            className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded"
                          >
                            {top?.name || tId}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between font-black text-sm text-emerald-950">
              <span>Total Pagado / A Pagar:</span>
              <span className="text-base text-amber-600">
                ${activeOrder.total.toLocaleString('es-CO')} COP
              </span>
            </div>
            <div className="text-[11px] text-stone-500">
              Método: <strong className="text-stone-800 capitalize">{activeOrder.paymentMethod}</strong>
              {activeOrder.nequiReference && ` (Ref: ${activeOrder.nequiReference})`}
            </div>
          </div>

          {/* Timeline of events */}
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-3">
            <h3 className="font-heading font-black text-base text-emerald-950">
              Historial de Notificaciones
            </h3>
            <div className="space-y-3 text-xs">
              {activeOrder.statusHistory.map((hist, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block">{hist.timestamp}</span>
                    <p className="text-stone-700 font-medium">{hist.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt to feedback if delivered */}
          {activeOrder.status === 'entregado' && (
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-5 rounded-3xl text-emerald-950 shadow-md border-2 border-amber-300 space-y-3 text-center">
              <span className="text-3xl">🎉</span>
              <h4 className="font-heading font-black text-lg">
                ¡Esperamos que disfrutes tu Mango Biche!
              </h4>
              <p className="text-xs font-medium">
                Ayúdanos a mejorar nuestro emprendimiento del Marco Fidel Suárez calificando tu experiencia.
              </p>
              <button
                onClick={() => setCurrentView('feedback')}
                className="bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow"
              >
                Dejar Retroalimentación y Calificación ⭐
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import {
  OFFICIAL_PHONE,
  DISPLAY_PHONE,
  NEQUI_ACCOUNT,
  NEQUI_HOLDER,
} from '../data/initialData';
import {
  Check,
  Copy,
  QrCode,
  DollarSign,
  Smartphone,
  MapPin,
  User,
  Phone,
  ShieldCheck,
  Send,
  ArrowLeft,
  AlertCircle,
  Truck,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    deliveryFee,
    customer,
    saveCustomer,
    createOrder,
    sendWhatsAppOrderMessage,
    setCurrentView,
  } = useApp();

  // Form State
  const [name, setName] = useState<string>(customer?.name || '');
  const [phone, setPhone] = useState<string>(customer?.phone || '');
  const [address, setAddress] = useState<string>(customer?.address || '');
  const [neighborhood, setNeighborhood] = useState<string>(customer?.neighborhood || '');
  const [notes, setNotes] = useState<string>(customer?.notes || '');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('nequi');
  const [nequiRef, setNequiRef] = useState<string>('');
  const [copiedNequi, setCopiedNequi] = useState<boolean>(false);
  const [cashBillAmount, setCashBillAmount] = useState<number>(50000);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4">
        <p className="text-stone-600 mb-4">No tienes productos en el carrito para ordenar.</p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold"
        >
          Volver al Menú
        </button>
      </div>
    );
  }

  const handleCopyNequi = () => {
    navigator.clipboard.writeText(NEQUI_ACCOUNT);
    setCopiedNequi(true);
    setTimeout(() => setCopiedNequi(false), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setErrorMessage('Por favor ingresa un número de teléfono celular válido.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Por favor ingresa la dirección de entrega.');
      return;
    }
    if (!neighborhood.trim()) {
      setErrorMessage('Por favor indica tu barrio o sector.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save customer profile
      saveCustomer({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        neighborhood: neighborhood.trim(),
        notes: notes.trim() ? notes.trim() : undefined,
      });

      // 2. Create the order
      const newOrder = createOrder(paymentMethod, {
        nequiReference: paymentMethod === 'nequi' ? (nequiRef.trim() || undefined) : undefined,
        cashAmountPaid: paymentMethod === 'efectivo' ? cashBillAmount : undefined,
      });

      // 3. Open WhatsApp with pre-filled message
      sendWhatsAppOrderMessage(newOrder);

      // 4. Switch to real-time tracker view
      setCurrentView('tracker');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error procesando tu orden.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatedCashChange = Math.max(0, cashBillAmount - cartTotal);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('cart')}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-emerald-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al carrito de compras</span>
      </button>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customer registration & details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section: Customer info */}
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-emerald-950">
                  Registro del Cliente & Domicilio
                </h3>
                <p className="text-xs text-stone-500">
                  Datos para llevarte tu mango biche bien fresco y contactarte
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-800 p-3 rounded-xl border border-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej: Sara Sofía Guzmán"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Celular / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 3223560164"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Dirección de Entrega *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej: Calle 45 # 12-34 Torre 2 Apt 301"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Barrio / Sector *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Kennedy / Bosa / Soacha / Alrededores"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Instrucciones de Entrega (Opcional)</label>
              <textarea
                rows={2}
                placeholder="Ej: Casa esquinera frente al parque, timbrar dos veces o dejar en portería."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Section: Payment Gateway (Nequi or Cash) */}
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
              <div className="p-2 bg-amber-100 text-amber-900 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-emerald-950">
                  Pasarela de Pago
                </h3>
                <p className="text-xs text-stone-500">
                  Transferencia inmediata en Nequi o Efectivo contra entrega
                </p>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('nequi')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  paymentMethod === 'nequi'
                    ? 'border-purple-600 bg-purple-50 text-purple-950 shadow-sm ring-2 ring-purple-400/30'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-900 text-white flex items-center justify-center font-black text-sm shrink-0">
                  NQ
                </div>
                <div>
                  <div className="font-black text-sm">Transferencia Nequi</div>
                  <div className="text-[11px] text-purple-800 font-medium">Inmediato & Sin Comisión</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('efectivo')}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                  paymentMethod === 'efectivo'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-400/30'
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center font-black text-sm shrink-0">
                  💵
                </div>
                <div>
                  <div className="font-black text-sm">Efectivo</div>
                  <div className="text-[11px] text-emerald-800 font-medium">Contra Entrega en Casa</div>
                </div>
              </button>
            </div>

            {/* NEQUI DETAILS BOX */}
            {paymentMethod === 'nequi' && (
              <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-5 space-y-4 shadow-lg border border-purple-400/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="bg-purple-800/80 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Datos Oficiales de Nequi
                    </span>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                      <span>{NEQUI_ACCOUNT}</span>
                      <button
                        type="button"
                        onClick={handleCopyNequi}
                        className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
                        title="Copiar número"
                      >
                        {copiedNequi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span className="text-[10px]">{copiedNequi ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-purple-200">
                      Titular: <strong className="text-white">{NEQUI_HOLDER}</strong>
                    </p>
                  </div>

                  {/* QR Code representation */}
                  <div className="bg-white p-2.5 rounded-2xl shrink-0 shadow-md text-center">
                    <div className="w-24 h-24 bg-purple-950 text-white rounded-xl flex flex-col items-center justify-center p-1">
                      <QrCode className="w-12 h-12 text-amber-300" />
                      <span className="text-[9px] font-bold mt-1 text-purple-200">NEQUI QR</span>
                    </div>
                    <span className="text-[9px] text-stone-600 font-bold block mt-1">Escanea desde tu App</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-purple-700/50">
                  <label className="text-xs font-bold text-purple-200">
                    Número de Comprobante / Referencia de Nequi (Opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: M1234567 o últimos 4 dígitos"
                    value={nequiRef}
                    onChange={(e) => setNequiRef(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/50 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                  <p className="text-[11px] text-purple-200/80">
                    *Al enviar la orden a WhatsApp se enviará automáticamente la confirmación a Sara Sofía (+57 322 356 0164).
                  </p>
                </div>
              </div>
            )}

            {/* CASH DETAILS BOX */}
            {paymentMethod === 'efectivo' && (
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">
                    ¿Con qué denominación vas a pagar?
                  </span>
                  <span className="text-xs text-stone-500">Para que el repartidor lleve devuelta</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[cartTotal, 20000, 50000, 100000].map((amt) => {
                    if (amt < cartTotal) return null;
                    const isSelected = cashBillAmount === amt;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setCashBillAmount(amt)}
                        className={`py-2 px-2 text-xs font-black rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {amt === cartTotal ? 'Exacto' : `$${(amt / 1000).toFixed(0)}k`}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block">Total pedido:</span>
                    <strong className="text-sm font-black text-emerald-950">
                      ${cartTotal.toLocaleString('es-CO')}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Devuelta a recibir:</span>
                    <strong className="text-sm font-black text-amber-600">
                      ${calculatedCashChange.toLocaleString('es-CO')} COP
                    </strong>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Order Summary & WhatsApp Confirmation CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-5 sticky top-28">
            <h3 className="font-heading font-black text-xl text-emerald-950 border-b border-stone-100 pb-3">
              Resumen del Pedido
            </h3>

            {/* Micro items list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex justify-between text-xs items-start gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-stone-900 block truncate">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-[11px] text-stone-500 capitalize">
                      {item.customization.cut} • Sal {item.customization.salt} • Limón {item.customization.lemon}
                    </span>
                  </div>
                  <span className="font-black text-emerald-900 shrink-0">
                    ${item.totalPrice.toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">${cartSubtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span>Domicilio Express:</span>
                <span className="font-bold text-emerald-700">${deliveryFee.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between text-base font-black text-emerald-950 pt-2 border-t border-stone-200">
                <span>Total:</span>
                <span className="text-xl text-amber-600">${cartTotal.toLocaleString('es-CO')} COP</span>
              </div>
            </div>

            {/* Confirm button */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-black py-4 px-4 rounded-2xl shadow-xl hover:shadow-emerald-900/25 transition-all transform active:scale-98 flex items-center justify-center gap-2.5 text-sm sm:text-base border-2 border-emerald-400"
              >
                <Send className="w-5 h-5 text-amber-300" />
                <span>Confirmar Pedido en WhatsApp</span>
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-stone-500">
                  📱 Se enviará el pedido a <strong className="text-emerald-800">{DISPLAY_PHONE}</strong>
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Seguimiento en vivo habilitado tras ordenar</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};

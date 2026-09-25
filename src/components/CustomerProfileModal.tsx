import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, CheckCircle, RotateCcw, Clock, ShoppingBag } from 'lucide-react';

export const CustomerProfileModal: React.FC = () => {
  const { customer, saveCustomer, orders, setCurrentView, addToCart } = useApp();

  const [name, setName] = useState<string>(customer?.name || '');
  const [phone, setPhone] = useState<string>(customer?.phone || '');
  const [address, setAddress] = useState<string>(customer?.address || '');
  const [neighborhood, setNeighborhood] = useState<string>(customer?.neighborhood || '');
  const [notes, setNotes] = useState<string>(customer?.notes || '');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    saveCustomer({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      neighborhood: neighborhood.trim() || 'Sector Local',
      notes: notes.trim() ? notes.trim() : undefined,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.customization, item.quantity);
    });
    setCurrentView('cart');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-400 text-emerald-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">
            {customer ? customer.name.charAt(0).toUpperCase() : <User className="w-7 h-7" />}
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-300">
              {customer ? `Hola, ${customer.name}` : 'Registro de Cliente'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Guarda tus datos de contacto y dirección para pedir más rápido tu mango biche favorito
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading font-black text-lg text-emerald-950 pb-2 border-b border-stone-100">
            Datos Personales & Dirección
          </h3>

          {savedSuccess && (
            <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Tus datos fueron guardados exitosamente!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Nombre Completo</label>
              <input
                type="text"
                required
                placeholder="Ej: Sara Sofía Guzmán"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">WhatsApp / Teléfono Móvil</label>
              <input
                type="tel"
                required
                placeholder="Ej: 3223560164"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Dirección Exacta</label>
              <input
                type="text"
                required
                placeholder="Ej: Calle 45 # 12-34 Torre 2 Apt 301"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Barrio / Localidad</label>
              <input
                type="text"
                required
                placeholder="Ej: Marco Fidel Suárez / Kennedy"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700">Notas de Entrega Habituales</label>
              <input
                type="text"
                placeholder="Ej: Casa blanca con reja negra"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Guardar Perfil de Cliente
            </button>
          </form>
        </div>

        {/* Right Column: Order History & Repeat Order */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
          <h3 className="font-heading font-black text-lg text-emerald-950 pb-2 border-b border-stone-100 flex items-center justify-between">
            <span>Historial de Pedidos</span>
            <span className="text-xs text-stone-400 font-normal">{orders.length} pedidos</span>
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {orders.length === 0 ? (
              <p className="text-xs text-stone-400 text-center py-8">
                No tienes pedidos registrados aún. ¡Prueba nuestro Vaso ManGuss Loco!
              </p>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-950">
                      Pedido #{ord.orderNumber}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full capitalize">
                      {ord.status}
                    </span>
                  </div>

                  <p className="text-stone-600">
                    {ord.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                    <span className="font-black text-emerald-900">
                      ${ord.total.toLocaleString('es-CO')} COP
                    </span>

                    <button
                      onClick={() => handleReorder(ord)}
                      className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Pedir de Nuevo</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

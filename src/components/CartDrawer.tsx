import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TOPPINGS_AVAILABLE } from '../data/initialData';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, SlidersHorizontal, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    setCurrentView,
    openCustomizer,
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-300">
          <span className="text-5xl">🥭</span>
        </div>
        <h3 className="font-heading font-black text-2xl text-emerald-950 mb-2">
          Tu carrito de Mango Fresh está vacío
        </h3>
        <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
          ¿Se te antoja un vaso de mango biche crocante con limón, sal y tajín? Explora nuestro menú o arma tu vaso desde cero.
        </p>
        <button
          onClick={() => setCurrentView('catalog')}
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Explorar Menú de Mango Biche
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-amber-300 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-400 text-emerald-950 rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-emerald-950">
              Tu Pedido Actual
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {cart.reduce((a, b) => a + b.quantity, 0)} productos listos para sazonar
            </p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 hover:underline font-bold"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4 mb-8">
        {cart.map((item) => {
          return (
            <div
              key={item.cartItemId}
              className="bg-white rounded-3xl p-5 border-2 border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-amber-300"
            >
              {/* Product Info */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-amber-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-heading font-black text-base text-emerald-950 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-stone-600 space-y-0.5 mt-0.5">
                    <p>
                      <strong className="text-emerald-800">Corte:</strong>{' '}
                      <span className="capitalize">{item.customization.cut}</span> •{' '}
                      <strong>Sal:</strong> {item.customization.salt} •{' '}
                      <strong>Limón:</strong> {item.customization.lemon} •{' '}
                      <strong>Pimienta:</strong> {item.customization.pepper}
                    </p>
                    {item.customization.toppings.length > 0 && (
                      <p className="text-[11px] text-amber-800 font-medium">
                        <strong>Toppings:</strong>{' '}
                        {item.customization.toppings
                          .map((tId) => TOPPINGS_AVAILABLE.find((x) => x.id === tId)?.name || tId)
                          .join(', ')}
                      </p>
                    )}
                    {item.customization.specialNotes && (
                      <p className="text-[11px] text-stone-500 italic">
                        "{item.customization.specialNotes}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity & Price Controls */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                  <button
                    onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                    className="p-1.5 text-stone-600 hover:bg-stone-200 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-black text-emerald-950">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                    className="p-1.5 text-stone-600 hover:bg-stone-200 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="font-heading font-black text-base text-emerald-950 block">
                    ${item.totalPrice.toLocaleString('es-CO')}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    (${item.unitPrice.toLocaleString('es-CO')} c/u)
                  </span>
                </div>

                <button
                  onClick={() => removeCartItem(item.cartItemId)}
                  className="text-stone-400 hover:text-red-600 p-1.5 transition-colors"
                  title="Eliminar vaso"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bill Summary */}
      <div className="bg-stone-50 rounded-3xl p-6 border-2 border-stone-200 space-y-3 mb-6">
        <div className="flex justify-between text-sm text-stone-600">
          <span>Subtotal productos:</span>
          <span className="font-bold text-stone-900">${cartSubtotal.toLocaleString('es-CO')} COP</span>
        </div>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Domicilio local (Bogotá/Soacha):</span>
          <span className="font-bold text-emerald-700">${deliveryFee.toLocaleString('es-CO')} COP</span>
        </div>
        <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-lg">
          <span className="font-heading font-black text-emerald-950">Total a Pagar:</span>
          <span className="font-heading font-black text-2xl text-amber-600">
            ${cartTotal.toLocaleString('es-CO')} COP
          </span>
        </div>
      </div>

      {/* Action to Proceed to Checkout */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => setCurrentView('catalog')}
          className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-6 py-3.5 rounded-2xl transition-colors text-sm"
        >
          Seguir Comprando
        </button>

        <button
          onClick={() => setCurrentView('checkout')}
          className="w-full flex-1 bg-gradient-to-r from-emerald-600 via-green-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-black px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 text-base border-2 border-emerald-400"
        >
          <span>Ir a Datos de Entrega y Pasarela de Pago</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
      </div>

    </div>
  );
};

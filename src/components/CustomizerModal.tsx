import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CutType, SaltLevel, LemonLevel, PepperLevel, CustomizationSelection } from '../types';
import { TOPPINGS_AVAILABLE } from '../data/initialData';
import { X, Check, Flame, Sparkles, Plus, Minus, Info, Heart } from 'lucide-react';

export const CustomizerModal: React.FC = () => {
  const { customizingProduct, closeCustomizer, addToCart } = useApp();

  if (!customizingProduct) return null;

  const defaultValues = customizingProduct.defaultCustomization || {};

  const [cut, setCut] = useState<CutType>(defaultValues.cut || 'tiras');
  const [salt, setSalt] = useState<SaltLevel>(defaultValues.salt || 'normal');
  const [lemon, setLemon] = useState<LemonLevel>(defaultValues.lemon || 'abundante');
  const [pepper, setPepper] = useState<PepperLevel>(defaultValues.pepper || 'pizca');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(defaultValues.toppings || []);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Sync state if product changes
  useEffect(() => {
    if (customizingProduct) {
      const def = customizingProduct.defaultCustomization || {};
      setCut(def.cut || 'tiras');
      setSalt(def.salt || 'normal');
      setLemon(def.lemon || 'abundante');
      setPepper(def.pepper || 'pizca');
      setSelectedToppings(def.toppings || []);
      setQuantity(1);
      setSpecialNotes('');
    }
  }, [customizingProduct]);

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
    );
  };

  // Calculate dynamic unit and total price
  const toppingsPrice = selectedToppings.reduce((sum, tId) => {
    const top = TOPPINGS_AVAILABLE.find((t) => t.id === tId);
    return sum + (top ? top.price : 0);
  }, 0);

  const unitPrice = customizingProduct.price + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const customization: CustomizationSelection = {
      cut,
      salt,
      lemon,
      pepper,
      toppings: selectedToppings,
      specialNotes: specialNotes.trim() ? specialNotes.trim() : undefined,
    };
    addToCart(customizingProduct, customization, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 px-6 py-4 text-white flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🥭</span>
            <div>
              <h3 className="font-heading font-black text-xl text-amber-300">
                Personaliza Tu Mango Biche
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {customizingProduct.name}
              </p>
            </div>
          </div>
          <button
            onClick={closeCustomizer}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* Interactive Cup Preview Card */}
          <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl p-4 border border-amber-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-24 bg-white/80 rounded-2xl border-2 border-dashed border-emerald-400 p-2 flex flex-col items-center justify-center relative shadow-inner">
              <span className="text-3xl animate-bounce">🥭</span>
              <div className="absolute bottom-1 text-[10px] font-black text-emerald-800 uppercase tracking-tighter">
                {cut}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <h4 className="font-heading font-black text-emerald-950 text-sm">
                Receta de tu Vaso:
              </h4>
              <p className="text-xs text-stone-600">
                Corte <strong className="text-emerald-800 capitalize">{cut}</strong> •{' '}
                Sal: <strong className="text-stone-800">{salt}</strong> •{' '}
                Limón: <strong className="text-stone-800">{lemon}</strong> •{' '}
                Pimienta: <strong className="text-stone-800">{pepper}</strong>
              </p>
              <div className="flex flex-wrap gap-1 mt-1 justify-center sm:justify-start">
                {selectedToppings.map((topId) => {
                  const t = TOPPINGS_AVAILABLE.find((x) => x.id === topId);
                  return (
                    <span
                      key={topId}
                      className="bg-amber-200 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-300"
                    >
                      {t?.icon} {t?.name}
                    </span>
                  );
                })}
                {selectedToppings.length === 0 && (
                  <span className="text-[11px] text-stone-400 italic">Sin toppings adicionales aún</span>
                )}
              </div>
            </div>
          </div>

          {/* Step 1: Corte del Mango Biche */}
          <div className="space-y-2.5">
            <label className="font-heading font-black text-sm text-emerald-950 flex items-center gap-1.5">
              <span>1. Tipo de Corte del Mango Biche</span>
              <span className="text-xs text-amber-600 font-bold">*Obligatorio</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'tiras', name: 'Tiras Spaghetto', desc: 'Finas y largas, absorben jugo', emoji: '🍜' },
                { id: 'cubos', name: 'Cubos Crujientes', desc: 'Mordisco jugoso y fresco', emoji: '🧊' },
                { id: 'rallado', name: 'Rallado Helado', desc: 'Extra frío y refrescante', emoji: '🍧' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCut(c.id as CutType)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all ${
                    cut === c.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-amber-300 text-stone-700'
                  }`}
                >
                  <div className="text-xl mb-1">{c.emoji}</div>
                  <div className="font-bold text-xs">{c.name}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{c.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Sazón Básica (Sal, Limón, Pimienta) */}
          <div className="space-y-4 bg-stone-50/80 p-4 rounded-2xl border border-stone-200">
            <h4 className="font-heading font-black text-sm text-emerald-950 flex items-center gap-1.5">
              <span>2. Sazón Clásica (Sal Marina, Limón Natural & Pimienta)</span>
            </h4>

            {/* Sal */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-700 flex items-center gap-1">
                  🧂 Sal Marina:
                </span>
                <span className="font-extrabold text-emerald-700 capitalize">{salt}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['sin', 'poca', 'normal', 'extra'] as SaltLevel[]).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setSalt(level)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      salt === level
                        ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Limón */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-700 flex items-center gap-1">
                  🍋 Jugo de Limón Fresco:
                </span>
                <span className="font-extrabold text-emerald-700 capitalize">{lemon}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['sin', 'suave', 'normal', 'abundante'] as LemonLevel[]).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setLemon(level)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      lemon === level
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Pimienta */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-stone-700 flex items-center gap-1">
                  🌶️ Pimienta Negra Molida:
                </span>
                <span className="font-extrabold text-emerald-700 capitalize">{pepper}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['sin', 'pizca', 'normal', 'extra'] as PepperLevel[]).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setPepper(level)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      pepper === level
                        ? 'bg-stone-800 text-amber-200 border-stone-900 shadow-xs'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Toppings & Aderezos (Tajín, Gomitas, Chamoy, etc.) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-heading font-black text-sm text-emerald-950 flex items-center gap-1.5">
                <span>3. Toppings & Aderezos Especiales</span>
              </label>
              <span className="text-[11px] text-stone-500">Puedes elegir varios</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TOPPINGS_AVAILABLE.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <div
                    key={topping.id}
                    onClick={() => toggleTopping(topping.id)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-2xl shrink-0">{topping.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                          <span className="truncate">{topping.name}</span>
                          {topping.badge && (
                            <span className="bg-emerald-100 text-emerald-900 text-[9px] font-black px-1.5 py-0.2 rounded">
                              {topping.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-500 truncate">{topping.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-xs text-emerald-800">
                        +${topping.price.toLocaleString('es-CO')}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center ml-auto mt-1 ${
                          isSelected
                            ? 'bg-amber-500 border-amber-600 text-emerald-950'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Special notes for kitchen */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <span>Notas especiales para el preparador (opcional):</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Tajín en el fondo del vaso, sin semillas de limón..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

        </div>

        {/* Modal Footer with live price & Add Button */}
        <div className="bg-stone-50 px-6 py-4 border-t-2 border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls & Unit Price */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-black text-emerald-950">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-bold block">
                Total vaso
              </span>
              <span className="font-heading font-black text-2xl text-emerald-950">
                ${totalPrice.toLocaleString('es-CO')} COP
              </span>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-green-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-black px-6 py-3 rounded-2xl shadow-lg hover:shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 border-2 border-emerald-400"
          >
            <span>Agregar al Pedido</span>
            <span className="bg-emerald-950/40 text-amber-200 text-xs px-2 py-0.5 rounded-lg">
              ${totalPrice.toLocaleString('es-CO')}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { SlidersHorizontal, Plus, Sparkles, Check, Flame, IceCream } from 'lucide-react';
import { TOPPINGS_AVAILABLE } from '../data/initialData';

export const ProductCatalog: React.FC = () => {
  const { products, openCustomizer, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'especial') return p.category === 'especial' || p.category === 'personalizado';
    if (selectedCategory === 'clasico') return p.category === 'clasico';
    if (selectedCategory === 'helado') return p.category === 'helado';
    if (selectedCategory === 'paleta') return p.category === 'paleta';
    return true;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick add with default customization
    const defaultCust = product.defaultCustomization || {
      cut: 'tiras',
      salt: 'normal',
      lemon: 'normal',
      pepper: 'normal',
      toppings: ['tajin'],
    };
    addToCart(product, {
      cut: defaultCust.cut || 'tiras',
      salt: defaultCust.salt || 'normal',
      lemon: defaultCust.lemon || 'normal',
      pepper: defaultCust.pepper || 'normal',
      toppings: defaultCust.toppings || [],
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-amber-200 pb-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Catálogo Oficial de Productos
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-emerald-950">
            Menú de <span className="text-amber-500">Mango Biche</span> 🥭
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1">
            Antojos refrescantes, cítricos y picantes listos para disfrutar en casa o en el colegio.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'todos', label: 'Todo el Menú' },
            { id: 'especial', label: 'Locos & Especiales' },
            { id: 'clasico', label: 'Tradicionales' },
            { id: 'helado', label: 'Helados & Fríos' },
            { id: 'paleta', label: 'Paletas Artesanales' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-amber-300 shadow-md border border-emerald-800'
                  : 'bg-white text-stone-700 hover:bg-amber-100/60 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border-2 border-stone-200/80 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image and Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-amber-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge if available */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-xs text-amber-300 text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md border border-amber-300/40">
                    {product.badge}
                  </span>
                )}

                {/* Price tag pill */}
                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-black text-base px-3 py-1 rounded-xl shadow-lg border border-amber-300">
                  ${product.price.toLocaleString('es-CO')}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-black text-lg text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* "Incluye" Box matching original menu */}
                  <div className="bg-emerald-50/80 border-l-3 border-emerald-600 p-2.5 rounded-r-xl">
                    <p className="text-[11px] text-emerald-900 leading-relaxed">
                      <strong className="font-bold text-emerald-950">Incluye: </strong>
                      {product.includes}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 space-y-2">
                  {/* Personalize Button */}
                  <button
                    onClick={() => openCustomizer(product)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm py-2.5 px-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 border border-emerald-600"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-amber-300" />
                    <span>Personalizar (Sal, Limón, Toppings)</span>
                  </button>

                  {/* Quick Add with default settings */}
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    className="w-full bg-amber-100 hover:bg-amber-200 text-emerald-950 font-bold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 border border-amber-300"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Pedir con receta recomendada</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Customizer Callout Banner */}
      <div className="mt-12 bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            ¡Tú eres el chef!
          </div>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-amber-300">
            ¿Quieres un vaso totalmente personalizado?
          </h3>
          <p className="text-sm text-emerald-100 max-w-xl">
            Elige corte en tiras, en cubos o rallado helado. Modula el limón al máximo, sal marina, pimienta molida, y añade gomitas, chile tajín, salsa agridulce o perlas popping.
          </p>
        </div>

        <button
          onClick={() => {
            const customProduct = products.find((p) => p.id === 'mango-personalizado') || products[0];
            openCustomizer(customProduct);
          }}
          className="shrink-0 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black px-6 py-3.5 rounded-2xl shadow-lg transition-transform transform hover:scale-105 border-2 border-amber-200 text-sm flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-950" />
          <span>Abrir Creador de Vasos</span>
        </button>
      </div>

    </section>
  );
};

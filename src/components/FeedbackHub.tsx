import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FeedbackEntry } from '../types';
import {
  Sparkles,
  Star,
  ThumbsUp,
  MessageSquarePlus,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Award,
  Zap,
} from 'lucide-react';

export const FeedbackHub: React.FC = () => {
  const { feedbackList, addFeedback, voteFeedback, applyFeedbackImprovement, customer } = useApp();

  // Form state
  const [customerName, setCustomerName] = useState<string>(customer?.name || '');
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<'sabor' | 'frescura' | 'empaque' | 'entrega' | 'general'>('sabor');
  const [comment, setComment] = useState<string>('');
  const [suggestedTopping, setSuggestedTopping] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addFeedback({
      customerName: customerName.trim() || 'Cliente Mango Fresh',
      rating,
      category,
      comment: comment.trim(),
      suggestedTopping: suggestedTopping.trim() ? suggestedTopping.trim() : undefined,
    });

    setComment('');
    setSuggestedTopping('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  // Metrics calculation
  const totalReviews = feedbackList.length;
  const avgRating = totalReviews > 0 ? (feedbackList.reduce((a, b) => a + b.rating, 0) / totalReviews).toFixed(1) : '5.0';
  const implementedCount = feedbackList.filter((f) => f.status === 'implementado').length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-900" />
              Auto-Retroalimentación & Mejora Continua
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-amber-300">
              Tu Opinión Mejora a Mango Fresh
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Fase 5 de nuestro Anteproyecto en la I.E. Marco Fidel Suárez: analizamos tus comentarios y sugerencias para ajustar recetas, inventario y tiempos de entrega en tiempo real.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-amber-300/40 text-center">
              <span className="text-[10px] text-amber-200 font-bold uppercase block">Calificación</span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-heading font-black text-2xl text-white">{avgRating}</span>
                <span className="text-xs text-stone-300">/ 5</span>
              </div>
            </div>

            <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-amber-300/40 text-center">
              <span className="text-[10px] text-amber-200 font-bold uppercase block">Mejoras Aplicadas</span>
              <span className="font-heading font-black text-2xl text-amber-300 block mt-0.5">
                {implementedCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form to submit feedback / suggestion */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
              <div className="p-2 bg-amber-100 text-amber-900 rounded-xl">
                <MessageSquarePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-emerald-950">
                  Cuéntanos Tu Experiencia
                </h3>
                <p className="text-xs text-stone-500">¿Cómo estuvo el sabor y el servicio?</p>
              </div>
            </div>

            {submitted && (
              <div className="bg-emerald-50 text-emerald-900 p-3.5 rounded-2xl border border-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>¡Gracias! Tu retroalimentación fue registrada y aportará al análisis de mejora.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Tu Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Carolina Morales"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Star Rating */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">Calificación General (1 a 5 estrellas)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-emerald-800 ml-2">
                    {rating === 5 ? '¡Excelente!' : rating === 4 ? 'Muy Bueno' : rating === 3 ? 'Aceptable' : 'Por mejorar'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Categoría a Evaluar</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="sabor">Sabor & Sazón (Sal, Limón, Pimienta)</option>
                  <option value="frescura">Frescura del Mango Biche</option>
                  <option value="empaque">Presentación & Empaque</option>
                  <option value="entrega">Tiempo de Entrega & Domicilio</option>
                  <option value="general">Propuesta General</option>
                </select>
              </div>

              {/* Comment text */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Comentario o Reseña *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cuéntanos qué te pareció el nivel de limón, el crocante del mango o la rapidez..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Suggest a new topping / idea */}
              <div className="space-y-1 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>¿Qué nuevo topping o sabor te gustaría que añadamos?</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: Salsa de maracuyá agridulce, papitas fosforito..."
                  value={suggestedTopping}
                  onChange={(e) => setSuggestedTopping(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-600 hover:to-green-600 text-white font-black py-3 rounded-2xl shadow-md transition-all text-xs sm:text-sm"
              >
                Enviar Retroalimentación
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Community Feedback Feed & Auto-Improvement Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div>
                <h3 className="font-heading font-black text-lg text-emerald-950">
                  Muro de Opiniones de Clientes
                </h3>
                <p className="text-xs text-stone-500">
                  Vota por las ideas que más te gusten para que las apliquemos
                </p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full">
                {feedbackList.length} Aportes
              </span>
            </div>

            {/* List */}
            <div className="space-y-4">
              {feedbackList.map((entry) => {
                const isImplemented = entry.status === 'implementado';

                return (
                  <div
                    key={entry.id}
                    className="p-4 rounded-2xl border border-stone-200 hover:border-amber-300 transition-all bg-stone-50/50 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-stone-900">{entry.customerName}</h4>
                          <span className="text-[10px] text-stone-400">• {entry.createdAt}</span>
                          {isImplemented && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              ¡Mejora Aplicada!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < entry.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                          <span className="text-[10px] text-stone-500 ml-1 uppercase font-bold">
                            ({entry.category})
                          </span>
                        </div>
                      </div>

                      {/* Vote button */}
                      <button
                        onClick={() => voteFeedback(entry.id)}
                        className="bg-white hover:bg-amber-100 text-stone-700 hover:text-emerald-950 border border-stone-300 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                        <span>{entry.votes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-normal">
                      "{entry.comment}"
                    </p>

                    {entry.suggestedTopping && (
                      <div className="bg-amber-100/70 p-2.5 rounded-xl border border-amber-300 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>
                            <strong>Propuesta: </strong>
                            {entry.suggestedTopping}
                          </span>
                        </div>

                        {!isImplemented && (
                          <button
                            onClick={() => applyFeedbackImprovement(entry.id)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto"
                            title="Aprobar e implementar en la tienda"
                          >
                            <Zap className="w-3 h-3 text-amber-300" />
                            <span>Aplicar al Menú</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

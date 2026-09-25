import React from 'react';
import { Award, BookOpen, Heart, Users, Target, CheckCircle } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/initialData';

export const NosotrosModal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400">
        <div className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5 text-emerald-900" />
          Anteproyecto de Emprendimiento Escolar
        </div>
        <h2 className="font-heading font-black text-3xl sm:text-4xl text-amber-300">
          Mango Fresh 🥭
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
          Comercialización organizada y fresca de mangos biches y tradicionales. Iniciativa desarrollada en la Institución Educativa Marco Fidel Suárez (Grado 11, Colombia 2026).
        </p>
      </div>

      {/* Authors Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center font-black text-lg">
              SG
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-emerald-950">
                Sara Sofía Arciniegas Guzmán
              </h4>
              <p className="text-xs text-stone-500">Fundadora & Gestión Comercial y Recetas</p>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Lidera la formulación de producto, combinación de condimentos cítricos (limón y sal marina) y la atención directa al cliente por WhatsApp.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-900 rounded-2xl flex items-center justify-center font-black text-lg">
              MS
            </div>
            <div>
              <h4 className="font-heading font-black text-base text-emerald-950">
                Marlon Santos Reyes
              </h4>
              <p className="text-xs text-stone-500">Cofundador & Logística y Entregas en Tiempo Real</p>
            </div>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Encargado de la logística de abastecimiento de mango biche criollo de primera calidad, costeo de materias primas y despacho de domicilios.
          </p>
        </div>
      </div>

      {/* Institutional Details */}
      <div className="bg-amber-50/80 rounded-3xl p-6 border-2 border-amber-200 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h3 className="font-heading font-black text-lg text-emerald-950">
            Ficha Técnica del Proyecto
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="bg-white p-3.5 rounded-xl border border-amber-200">
            <span className="text-stone-400 font-bold block text-[10px] uppercase">Institución</span>
            <strong className="text-emerald-950">I.E. Marco Fidel Suárez</strong>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200">
            <span className="text-stone-400 font-bold block text-[10px] uppercase">Grado & Docente</span>
            <strong className="text-emerald-950">Grado 11 • Prof. Yair Fernando Merchán Lesmes</strong>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200">
            <span className="text-stone-400 font-bold block text-[10px] uppercase">Ubicación y Año</span>
            <strong className="text-emerald-950">Colombia, 2026</strong>
          </div>
        </div>
      </div>

      {/* Methodology Phases from PDF */}
      <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm space-y-4">
        <h3 className="font-heading font-black text-lg text-emerald-950">
          Las 5 Fases Metodológicas de Mango Fresh
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          {[
            { num: '1', title: 'Diagnóstico', desc: 'Identificación de preferencias de consumo de mango verde en la comunidad.' },
            { num: '2', title: 'Diseño', desc: 'Presentación en tiras y cubos, marca Mango Fresh y aderezos especiales.' },
            { num: '3', title: 'Costeo', desc: 'Cálculo de costo de mango, empaques, limón y fijación de precios justos.' },
            { num: '4', title: 'Aceptación', desc: 'Degustación y recepción de pedidos con pagos Nequi y Efectivo.' },
            { num: '5', title: 'Mejora Continua', desc: 'Módulo de auto-retroalimentación para adaptar el menú en tiempo real.' },
          ].map((f) => (
            <div key={f.num} className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-1">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-amber-300 font-black text-xs flex items-center justify-center">
                {f.num}
              </span>
              <h5 className="font-black text-emerald-950 pt-1">{f.title}</h5>
              <p className="text-[11px] text-stone-500 leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

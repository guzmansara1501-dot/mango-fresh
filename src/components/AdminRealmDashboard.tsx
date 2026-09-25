import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  Cloud,
  RefreshCw,
  Download,
  Upload,
  Layers,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Plus,
  Check,
  Truck,
  Clock,
  Eye,
  CheckCircle2,
  FileText,
  Search,
  MessageCircle,
} from 'lucide-react';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/initialData';

export const AdminRealmDashboard: React.FC = () => {
  const {
    inventory,
    updateInventoryStock,
    restockItem,
    orders,
    updateOrderStatus,
    cloudSyncStatus,
    syncWithCloud,
    exportDataJSON,
    importDataJSON,
    setCurrentView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventario' | 'ventas' | 'nube'>('inventario');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [restockAmount, setRestockAmount] = useState<number>(10);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string>('');

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'cancelado' ? ord.total : 0), 0);
  const totalOrdersCount = orders.length;
  const avgTicket = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const nequiOrders = orders.filter((o) => o.paymentMethod === 'nequi');
  const cashOrders = orders.filter((o) => o.paymentMethod === 'efectivo');

  const lowStockItems = inventory.filter((i) => i.stock <= i.minThreshold);

  const filteredInventory = inventory.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const ok = importDataJSON(jsonInput);
    if (ok) {
      setImportStatus('¡Datos importados con éxito a la nube local!');
      setJsonInput('');
      setTimeout(() => setImportStatus(''), 3000);
    } else {
      setImportStatus('Error en formato JSON. Verifica e intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Realm Admin Top Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-3 border-amber-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Cloud className="w-3.5 h-3.5" />
              <span>Realm Cloud Enterprise • Mango Fresh</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-amber-300">
              Panel de Gestión de Inventarios y Ventas en la Nube
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Control de stock en tiempo real, comanda de pedidos y sincronización para Sara Sofía & Marlon
            </p>
          </div>

          {/* Cloud Sync Status & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-emerald-950/80 border border-emerald-600 px-3.5 py-1.5 rounded-2xl flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  cloudSyncStatus === 'sincronizado'
                    ? 'bg-emerald-400 animate-pulse'
                    : cloudSyncStatus === 'sincronizando'
                    ? 'bg-amber-400 animate-spin'
                    : 'bg-red-400'
                }`}
              ></span>
              <span className="text-xs font-bold capitalize text-amber-200">
                {cloudSyncStatus === 'sincronizado' ? 'Nube Activa & Sincronizada' : 'Sincronizando...'}
              </span>
            </div>

            <button
              onClick={syncWithCloud}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-3.5 py-2 rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sincronizar Nube</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Realm */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-emerald-700/60 overflow-x-auto">
          {[
            { id: 'inventario', label: `Inventario (${inventory.length} insumos)`, icon: <Layers className="w-4 h-4" /> },
            { id: 'ventas', label: `Ventas & Pedidos (${orders.length})`, icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'nube', label: 'Respaldo Cloud & JSON', icon: <Cloud className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-1">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
            Ventas Totales
          </span>
          <div className="font-heading font-black text-2xl text-emerald-800">
            ${totalRevenue.toLocaleString('es-CO')} COP
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            {orders.length} pedidos registrados
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-1">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
            Ticket Promedio
          </span>
          <div className="font-heading font-black text-2xl text-amber-600">
            ${avgTicket.toLocaleString('es-CO')} COP
          </div>
          <span className="text-[11px] text-stone-500 block">Por orden de vaso</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-1">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
            Nequi vs Efectivo
          </span>
          <div className="font-heading font-black text-xl text-purple-900">
            {nequiOrders.length} Nequi / {cashOrders.length} Efec.
          </div>
          <span className="text-[11px] text-purple-700 block">
            ${nequiOrders.reduce((s, o) => s + o.total, 0).toLocaleString('es-CO')} en Nequi
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm space-y-1">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
            Alertas de Stock
          </span>
          <div
            className={`font-heading font-black text-2xl ${
              lowStockItems.length > 0 ? 'text-red-600' : 'text-emerald-700'
            }`}
          >
            {lowStockItems.length} insumos bajos
          </div>
          <span className="text-[11px] text-stone-500 block">
            {lowStockItems.length > 0 ? 'Requiere compra inmediata' : 'Stock en niveles óptimos'}
          </span>
        </div>
      </div>

      {/* TAB 1: INVENTARIO */}
      {activeTab === 'inventario' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-heading font-black text-xl text-emerald-950">
                Inventario Operativo en Tiempo Real
              </h3>
              <p className="text-xs text-stone-500">
                Se descuenta automáticamente con cada vaso vendido. Control de mermas y costos.
              </p>
            </div>

            {/* Search filter */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar insumo o topping..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-700 uppercase font-black border-b border-stone-200">
                <tr>
                  <th className="p-3">Insumo / Materia Prima</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Stock Actual</th>
                  <th className="p-3">Mínimo</th>
                  <th className="p-3">Costo Unit.</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acción Reabastecer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-medium">
                {filteredInventory.map((item) => {
                  const isLow = item.stock <= item.minThreshold;

                  return (
                    <tr key={item.id} className="hover:bg-amber-50/50 transition-colors">
                      <td className="p-3 font-bold text-stone-900">
                        {item.name}
                        <span className="block text-[10px] text-stone-400 font-normal">
                          Act: {item.lastUpdated}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded uppercase text-[10px] font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3 font-black text-sm">
                        <span className={isLow ? 'text-red-600' : 'text-emerald-800'}>
                          {item.stock} {item.unit}
                        </span>
                      </td>
                      <td className="p-3 text-stone-500">
                        {item.minThreshold} {item.unit}
                      </td>
                      <td className="p-3 text-stone-700 font-bold">
                        ${item.costPerUnit.toLocaleString('es-CO')}
                      </td>
                      <td className="p-3">
                        {isLow ? (
                          <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 w-fit border border-red-200">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            Stock Bajo
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit">
                            Abastecido
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => restockItem(item.id, 5)}
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors border border-emerald-300"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => restockItem(item.id, 20)}
                          className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-lg text-[11px] transition-colors border border-amber-300"
                        >
                          +20
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: VENTAS & PEDIDOS EN TIEMPO REAL */}
      {activeTab === 'ventas' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-heading font-black text-xl text-emerald-950">
                Comanda de Pedidos y Despacho
              </h3>
              <p className="text-xs text-stone-500">
                Cambia de estado para que el cliente reciba la notificación en su pantalla y en WhatsApp
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full">
              {orders.length} Pedidos en Total
            </span>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center py-8 text-stone-500 text-xs">Aún no se han generado pedidos.</p>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-base text-emerald-950">
                        Pedido #{ord.orderNumber}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          ord.paymentMethod === 'nequi'
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                      >
                        {ord.paymentMethod.toUpperCase()}
                      </span>
                      <span className="text-xs text-stone-400">• {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <p className="text-xs text-stone-700">
                      Cliente: <strong>{ord.customer.name}</strong> ({ord.customer.phone}) • {ord.customer.address}, {ord.customer.neighborhood}
                    </p>

                    <div className="text-[11px] text-stone-600">
                      <strong>Vasos: </strong>
                      {ord.items.map((it) => `${it.quantity}x ${it.product.name} (${it.customization.cut})`).join(', ')}
                    </div>
                  </div>

                  {/* Price & Status Controls */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <span className="font-heading font-black text-lg text-emerald-950 block">
                        ${ord.total.toLocaleString('es-CO')}
                      </span>
                      <span className="text-[10px] text-stone-500 capitalize">
                        Estado actual: <strong>{ord.status}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold p-2 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="recibido">1. Recibido</option>
                        <option value="preparando">2. Preparando</option>
                        <option value="empacado">3. Empacado</option>
                        <option value="en_camino">4. En Camino</option>
                        <option value="entregado">5. Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>

                      <a
                        href={`https://wa.me/${ord.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `¡Hola ${ord.customer.name}! Tu pedido #${ord.orderNumber} de Mango Fresh está en estado: ${ord.status.toUpperCase()}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-700 text-white p-2 rounded-xl hover:bg-emerald-800 transition-colors"
                        title="Enviar actualización a WhatsApp del cliente"
                      >
                        <MessageCircle className="w-4 h-4 text-amber-300" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: RESPALDO CLOUD & JSON */}
      {activeTab === 'nube' && (
        <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-sm p-6 space-y-6">
          <div className="pb-4 border-b border-stone-200">
            <h3 className="font-heading font-black text-xl text-emerald-950">
              Sincronización en la Nube & Copias de Seguridad (Backup)
            </h3>
            <p className="text-xs text-stone-500">
              Permite exportar e importar las bases de datos de inventario, ventas y opiniones de Mango Fresh para mantener todo respaldado en la nube.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-sm text-stone-900">Exportar Copia de la Nube (JSON)</h4>
              </div>
              <p className="text-xs text-stone-600">
                Descarga un archivo con todo el historial de ventas, stock de insumos y retroalimentación para guardar en Google Drive o tu computador.
              </p>
              <button
                onClick={exportDataJSON}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Descargar Respaldo JSON</span>
              </button>
            </div>

            {/* Import */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-stone-900">Importar / Restaurar Respaldo</h4>
              </div>
              <p className="text-xs text-stone-600">
                Pega el código JSON exportado previamente para restablecer inventario y órdenes.
              </p>
              <textarea
                rows={3}
                placeholder="Pega el contenido JSON aquí..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-stone-300 font-mono bg-white"
              />
              {importStatus && (
                <p className="text-xs font-bold text-emerald-700">{importStatus}</p>
              )}
              <button
                onClick={handleImport}
                className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Restaurar Datos
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

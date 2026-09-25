import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Product,
  CartItem,
  CustomizationSelection,
  Customer,
  Order,
  OrderStatus,
  InventoryItem,
  FeedbackEntry,
  PaymentMethod,
} from '../types';
import {
  PRODUCTS_CATALOG,
  TOPPINGS_AVAILABLE,
  INITIAL_INVENTORY,
  INITIAL_FEEDBACK,
  OFFICIAL_PHONE,
  NEQUI_ACCOUNT,
} from '../data/initialData';

interface AppContextType {
  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;

  // Catalog & Customizer
  products: Product[];
  customizingProduct: Product | null;
  openCustomizer: (product: Product, existingCartItem?: CartItem) => void;
  closeCustomizer: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, customization: CustomizationSelection, quantity?: number) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartTotal: number;

  // Customer
  customer: Customer | null;
  saveCustomer: (cust: Omit<Customer, 'id' | 'registeredAt'>) => Customer;

  // Orders & Real-time Tracking
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (paymentMethod: PaymentMethod, paymentDetails: { cashAmountPaid?: number; nequiReference?: string }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, customMessage?: string) => void;
  sendWhatsAppOrderMessage: (order: Order) => void;

  // Real-time notifications
  notifications: { id: string; title: string; message: string; type: 'info' | 'success' | 'alert'; time: string }[];
  dismissNotification: (id: string) => void;

  // Inventory & Sales (Admin Realm)
  inventory: InventoryItem[];
  updateInventoryStock: (itemId: string, newStock: number) => void;
  restockItem: (itemId: string, amount: number) => void;
  cloudSyncStatus: 'sincronizado' | 'sincronizando' | 'offline';
  syncWithCloud: () => Promise<void>;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;

  // Feedback & Auto-Improvement
  feedbackList: FeedbackEntry[];
  addFeedback: (fb: Omit<FeedbackEntry, 'id' | 'votes' | 'createdAt' | 'status'>) => void;
  voteFeedback: (id: string) => void;
  applyFeedbackImprovement: (feedbackId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('catalog');
  const [products] = useState<Product[]>(PRODUCTS_CATALOG);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mango_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer Profile
  const [customer, setCustomer] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem('mango_customer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mango_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mango_active_order_id');
    } catch {
      return null;
    }
  });

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('mango_inventory');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    } catch {
      return INITIAL_INVENTORY;
    }
  });

  // Feedback State
  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(() => {
    try {
      const saved = localStorage.getItem('mango_feedback');
      return saved ? JSON.parse(saved) : INITIAL_FEEDBACK;
    } catch {
      return INITIAL_FEEDBACK;
    }
  });

  // Cloud Sync Status
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'sincronizado' | 'sincronizando' | 'offline'>('sincronizado');

  // Real-time notifications
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string; type: 'info' | 'success' | 'alert'; time: string }[]>([]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('mango_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (customer) {
      localStorage.setItem('mango_customer', JSON.stringify(customer));
    }
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('mango_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (activeOrderId) {
      localStorage.setItem('mango_active_order_id', activeOrderId);
    } else {
      localStorage.removeItem('mango_active_order_id');
    }
  }, [activeOrderId]);

  useEffect(() => {
    localStorage.setItem('mango_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('mango_feedback', JSON.stringify(feedbackList));
  }, [feedbackList]);

  // Derived Active Order
  const activeOrder = orders.find((o) => o.id === activeOrderId) || (orders.length > 0 ? orders[0] : null);

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const newNotif = {
      id: 'notif-' + Date.now() + Math.random().toString(36).substring(2, 6),
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = cart.length > 0 ? 3000 : 0; // standard Colombian local delivery 3k COP
  const cartTotal = cartSubtotal + deliveryFee;

  // Customizer actions
  const openCustomizer = (product: Product, existingCartItem?: CartItem) => {
    setCustomizingProduct(product);
    setEditingCartItem(existingCartItem || null);
    setCurrentView('customizer');
  };

  const closeCustomizer = () => {
    setCustomizingProduct(null);
    setEditingCartItem(null);
    if (currentView === 'customizer') {
      setCurrentView('catalog');
    }
  };

  const addToCart = (product: Product, customization: CustomizationSelection, quantity = 1) => {
    // calculate toppings price
    const toppingsExtra = customization.toppings.reduce((sum, topId) => {
      const top = TOPPINGS_AVAILABLE.find((t) => t.id === topId);
      return sum + (top ? top.price : 0);
    }, 0);

    const unitPrice = product.price + toppingsExtra;
    const totalPrice = unitPrice * quantity;

    if (editingCartItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.cartItemId === editingCartItem.cartItemId
            ? { ...item, customization, quantity, unitPrice, totalPrice }
            : item
        )
      );
      addNotification('Vaso Actualizado', `Se guardó tu personalización de ${product.name}`, 'success');
    } else {
      const newItem: CartItem = {
        cartItemId: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        product,
        quantity,
        unitPrice,
        customization,
        totalPrice,
      };
      setCart((prev) => [...prev, newItem]);
      addNotification('¡Añadido al Carrito!', `${product.name} listo para preparar`, 'success');
    }

    closeCustomizer();
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Customer Management
  const saveCustomer = (custData: Omit<Customer, 'id' | 'registeredAt'>): Customer => {
    const updated: Customer = {
      id: customer?.id || 'cust-' + Date.now(),
      registeredAt: customer?.registeredAt || new Date().toISOString(),
      ...custData,
    };
    setCustomer(updated);
    return updated;
  };

  // Create Order & Connect to Nequi / Cash + WhatsApp
  const createOrder = (
    paymentMethod: PaymentMethod,
    paymentDetails: { cashAmountPaid?: number; nequiReference?: string }
  ): Order => {
    if (!customer) {
      throw new Error('Debe ingresar los datos de entrega del cliente.');
    }

    const orderNumber = 'MF-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      customer: { ...customer },
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      paymentMethod,
      nequiReference: paymentDetails.nequiReference || (paymentMethod === 'nequi' ? 'NQ-' + Math.floor(100000 + Math.random() * 900000) : undefined),
      cashAmountPaid: paymentDetails.cashAmountPaid,
      cashChange: paymentDetails.cashAmountPaid ? Math.max(0, paymentDetails.cashAmountPaid - cartTotal) : 0,
      status: 'recibido',
      statusHistory: [
        {
          status: 'recibido',
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message: 'Tu orden fue recibida exitosamente en el taller de Mango Fresh.',
        },
      ],
      createdAt: now.toISOString(),
      estimatedDeliveryMinutes: 25,
      driverName: 'Marlon Santos (Domicilios Mango Fresh)',
      driverPhone: OFFICIAL_PHONE,
      driverLocation: {
        lat: 4.711,
        lng: -74.072,
        progressPercent: 5,
      },
    };

    // Auto deduct inventory
    deductInventoryForOrder(newOrder);

    // Save orders
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();

    // Trigger visual confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#eab308', '#f59e0b', '#dc2626'],
      });
    } catch {
      // ignore
    }

    addNotification(
      '¡Pedido Confirmado!',
      `Orden #${newOrder.orderNumber} por $${newOrder.total.toLocaleString('es-CO')}. Enviando a WhatsApp...`,
      'success'
    );

    return newOrder;
  };

  // Deduct inventory items intelligently
  const deductInventoryForOrder = (order: Order) => {
    setInventory((prev) => {
      const updated = [...prev];
      let cupsNeeded = 0;
      let mangoKgNeeded = 0;
      let lemonCountNeeded = 0;
      let paletasNeeded = 0;

      order.items.forEach((item) => {
        if (item.product.id === 'paleta-casera') {
          paletasNeeded += item.quantity;
        } else {
          cupsNeeded += item.quantity;
          mangoKgNeeded += 0.35 * item.quantity; // ~350g mango per cup
          lemonCountNeeded += item.customization.lemon === 'abundante' ? 2 * item.quantity : 1 * item.quantity;
        }
      });

      return updated.map((inv) => {
        if (inv.id === 'inv-vasos-16') return { ...inv, stock: Math.max(0, inv.stock - cupsNeeded) };
        if (inv.id === 'inv-mango') return { ...inv, stock: Math.max(0, Number((inv.stock - mangoKgNeeded).toFixed(1))) };
        if (inv.id === 'inv-limon') return { ...inv, stock: Math.max(0, inv.stock - lemonCountNeeded) };
        if (inv.id === 'inv-paletas') return { ...inv, stock: Math.max(0, inv.stock - paletasNeeded) };
        if (inv.id === 'inv-tenedores') return { ...inv, stock: Math.max(0, inv.stock - cupsNeeded) };
        return inv;
      });
    });
  };

  // Update order status with history & real-time notification
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, customMessage?: string) => {
    const statusMessages: Record<OrderStatus, string> = {
      recibido: 'Pedido recibido y registrado.',
      preparando: '¡En barra! Pelando y cortando mango biche fresco, exprimiendo limones y aderezando.',
      empacado: 'Empacado con tapa domo, sellado higiénico y tenedores listos.',
      en_camino: '¡El domiciliario va en camino a tu dirección! Mantén tu celular atento.',
      entregado: '¡Entregado con éxito! ¡Que disfrutes tu delicioso Mango Biche!',
      cancelado: 'El pedido fue cancelado.',
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const message = customMessage || statusMessages[newStatus];
          const updatedHistory = [...ord.statusHistory, { status: newStatus, timestamp, message }];

          let progress = 10;
          if (newStatus === 'preparando') progress = 35;
          if (newStatus === 'empacado') progress = 60;
          if (newStatus === 'en_camino') progress = 85;
          if (newStatus === 'entregado') progress = 100;

          return {
            ...ord,
            status: newStatus,
            statusHistory: updatedHistory,
            driverLocation: ord.driverLocation
              ? { ...ord.driverLocation, progressPercent: progress }
              : undefined,
          };
        }
        return ord;
      })
    );

    addNotification(
      `Estado de Orden Actualizado`,
      statusMessages[newStatus],
      newStatus === 'entregado' ? 'success' : 'info'
    );
  };

  // Automated Real-time order simulation progress for live orders
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'entregado' || activeOrder.status === 'cancelado') {
      return;
    }

    const timer = setTimeout(() => {
      if (activeOrder.status === 'recibido') {
        updateOrderStatus(activeOrder.id, 'preparando');
      } else if (activeOrder.status === 'preparando') {
        updateOrderStatus(activeOrder.id, 'empacado');
      } else if (activeOrder.status === 'empacado') {
        updateOrderStatus(activeOrder.id, 'en_camino');
      } else if (activeOrder.status === 'en_camino') {
        updateOrderStatus(activeOrder.id, 'entregado');
      }
    }, 18000); // changes status every 18 seconds for interactive demo

    return () => clearTimeout(timer);
  }, [activeOrder?.status, activeOrder?.id]);

  // Send WhatsApp message to +573223560164
  const sendWhatsAppOrderMessage = (order: Order) => {
    const itemsText = order.items
      .map((item, idx) => {
        const topNames = item.customization.toppings
          .map((id) => TOPPINGS_AVAILABLE.find((t) => t.id === id)?.name || id)
          .join(', ');

        return (
          `*${idx + 1}. ${item.product.name}* (x${item.quantity}) - $${item.totalPrice.toLocaleString('es-CO')}\n` +
          `   - Corte: ${item.customization.cut.toUpperCase()}\n` +
          `   - Sal: ${item.customization.salt} | Limón: ${item.customization.lemon} | Pimienta: ${item.customization.pepper}\n` +
          (topNames ? `   - Toppings: ${topNames}\n` : '') +
          (item.customization.specialNotes ? `   - Notas: ${item.customization.specialNotes}\n` : '')
        );
      })
      .join('\n');

    const paymentInfo =
      order.paymentMethod === 'nequi'
        ? `🟣 *Pago por NEQUI*\n   - Ref: ${order.nequiReference}\n   - Cuenta Nequi: ${NEQUI_ACCOUNT}`
        : `💵 *Pago en EFECTIVO contra entrega*\n   - Paga con: $${(order.cashAmountPaid || order.total).toLocaleString('es-CO')}\n   - Cambio a devolver: $${(order.cashChange || 0).toLocaleString('es-CO')}`;

    const text =
      `🥭 *¡HOLA MANGO FRESH! NUEVO PEDIDO VIRTUAL*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📌 *Pedido:* #${order.orderNumber}\n` +
      `👤 *Cliente:* ${order.customer.name}\n` +
      `📱 *Teléfono:* ${order.customer.phone}\n` +
      `📍 *Dirección:* ${order.customer.address} (${order.customer.neighborhood})\n` +
      (order.customer.notes ? `📝 *Indicaciones:* ${order.customer.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🛒 *DETALLE DEL PEDIDO:*\n` +
      itemsText +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *Subtotal:* $${order.subtotal.toLocaleString('es-CO')}\n` +
      `🛵 *Domicilio:* $${order.deliveryFee.toLocaleString('es-CO')}\n` +
      `✨ *TOTAL A PAGAR:* $${order.total.toLocaleString('es-CO')} COP\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      paymentInfo +
      `\n\n🛵 *Seguimiento en Vivo:* En espera de confirmación y salida de cocina.\n` +
      `_Emprendimiento I.E. Marco Fidel Suárez - Mango Fresh_`;

    const encoded = encodeURIComponent(text);
    const cleanPhone = OFFICIAL_PHONE.replace('+', '');
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  // Inventory & Realm Admin Management
  const updateInventoryStock = (itemId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, stock: Math.max(0, newStock), lastUpdated: 'Modificado recién' }
          : item
      )
    );
  };

  const restockItem = (itemId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, stock: item.stock + amount, lastUpdated: 'Reabastecido recién' }
          : item
      )
    );
    addNotification('Inventario Reabastecido', `Se añadieron +${amount} unidades/kg al stock`, 'success');
  };

  const syncWithCloud = async () => {
    setCloudSyncStatus('sincronizando');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setCloudSyncStatus('sincronizado');
    addNotification('Nube Sincronizada', 'Inventario, ventas y datos de clientes respaldados en la nube con éxito.', 'success');
  };

  const exportDataJSON = () => {
    const data = {
      app: 'Mango Fresh',
      exportDate: new Date().toISOString(),
      inventory,
      orders,
      feedbackList,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mango-fresh-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.inventory && Array.isArray(parsed.inventory)) {
        setInventory(parsed.inventory);
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      if (parsed.feedbackList && Array.isArray(parsed.feedbackList)) {
        setFeedbackList(parsed.feedbackList);
      }
      addNotification('Datos Restaurados', 'El respaldo en la nube se importó correctamente.', 'success');
      return true;
    } catch {
      addNotification('Error de Importación', 'El archivo no tiene el formato JSON válido.', 'alert');
      return false;
    }
  };

  // Feedback Hub actions
  const addFeedback = (fb: Omit<FeedbackEntry, 'id' | 'votes' | 'createdAt' | 'status'>) => {
    const newEntry: FeedbackEntry = {
      id: 'fb-' + Date.now(),
      votes: 1,
      createdAt: 'Hace un momento',
      status: 'pendiente',
      ...fb,
    };
    setFeedbackList((prev) => [newEntry, ...prev]);
    addNotification('¡Gracias por tu opinión!', 'Tu retroalimentación nos ayuda a mejorar nuestros vasos y servicio.', 'success');
  };

  const voteFeedback = (id: string) => {
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );
  };

  const applyFeedbackImprovement = (feedbackId: string) => {
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === feedbackId ? { ...item, status: 'implementado' } : item))
    );
    addNotification('Mejora Implementada', 'La sugerencia fue aprobada y aplicada a la operación del negocio.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        products,
        customizingProduct,
        openCustomizer,
        closeCustomizer,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        customer,
        saveCustomer,
        orders,
        activeOrder,
        setActiveOrder: (ord) => setActiveOrderId(ord ? ord.id : null),
        createOrder,
        updateOrderStatus,
        sendWhatsAppOrderMessage,
        notifications,
        dismissNotification,
        inventory,
        updateInventoryStock,
        restockItem,
        cloudSyncStatus,
        syncWithCloud,
        exportDataJSON,
        importDataJSON,
        feedbackList,
        addFeedback,
        voteFeedback,
        applyFeedbackImprovement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

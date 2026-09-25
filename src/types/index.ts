export type CutType = 'tiras' | 'cubos' | 'rallado';
export type SaltLevel = 'sin' | 'poca' | 'normal' | 'extra';
export type LemonLevel = 'sin' | 'suave' | 'normal' | 'abundante';
export type PepperLevel = 'sin' | 'pizca' | 'normal' | 'extra';

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  category: 'chile' | 'dulce' | 'adicional';
  description: string;
  icon: string;
  badge?: string;
}

export interface CustomizationSelection {
  cut: CutType;
  salt: SaltLevel;
  lemon: LemonLevel;
  pepper: PepperLevel;
  toppings: string[]; // topping ids
  specialNotes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'especial' | 'clasico' | 'helado' | 'paleta' | 'personalizado';
  price: number;
  description: string;
  includes: string;
  image: string;
  badge?: string;
  customizable: boolean;
  defaultCustomization?: Partial<CustomizationSelection>;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  customization: CustomizationSelection;
  totalPrice: number;
}

export type PaymentMethod = 'nequi' | 'efectivo';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  notes?: string;
  registeredAt: string;
}

export type OrderStatus = 'recibido' | 'preparando' | 'empacado' | 'en_camino' | 'entregado' | 'cancelado';

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  nequiReference?: string;
  cashAmountPaid?: number;
  cashChange?: number;
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    message: string;
  }[];
  createdAt: string;
  estimatedDeliveryMinutes: number;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: {
    lat: number;
    lng: number;
    progressPercent: number;
  };
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'fruta' | 'salsas' | 'dulces' | 'especias' | 'empaques';
  stock: number;
  unit: string;
  minThreshold: number;
  costPerUnit: number;
  lastUpdated: string;
}

export interface FeedbackEntry {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  category: 'sabor' | 'frescura' | 'empaque' | 'entrega' | 'general';
  comment: string;
  suggestedTopping?: string;
  votes: number;
  createdAt: string;
  status: 'pendiente' | 'revisado' | 'implementado';
}

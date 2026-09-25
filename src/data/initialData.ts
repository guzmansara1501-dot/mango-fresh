import { Product, ToppingOption, InventoryItem, FeedbackEntry } from '../types';

import imgVasoLoco from '../assets/images/mango_vaso_loco_1790361729096.jpg';
import imgTajinLimon from '../assets/images/mango_tajin_limon_1790361743281.jpg';
import imgTradicional from '../assets/images/mango_tradicional_1790361756617.jpg';
import imgPaletaCasera from '../assets/images/mango_paleta_casera_1790361768620.jpg';

export const OFFICIAL_PHONE = '+573223560164';
export const DISPLAY_PHONE = '+57 322 356 0164';
export const NEQUI_ACCOUNT = '3223560164';
export const NEQUI_HOLDER = 'Sara Sofía Arciniegas / Mango Fresh';

export const TOPPINGS_AVAILABLE: ToppingOption[] = [
  {
    id: 'tajin',
    name: 'Chile Tajín Clásico',
    price: 1500,
    category: 'chile',
    description: 'Polvo de chile mexicano ligeramente cítrico y salado',
    icon: '🌶️',
    badge: '¡El infaltable!'
  },
  {
    id: 'salsa_chile',
    name: 'Salsa de Chile Chamoy',
    price: 2000,
    category: 'chile',
    description: 'Salsa artesanal líquida agridulce picantita con tamarindo',
    icon: '🔥',
    badge: 'Popular'
  },
  {
    id: 'gomitas',
    name: 'Gomitas Ácidas',
    price: 2500,
    category: 'dulce',
    description: 'Gusanitos y aros ácidos cubiertos de azúcar cítrico',
    icon: '🍬',
    badge: 'Favorito'
  },
  {
    id: 'perlas_popping',
    name: 'Perlas Explosivas Popping',
    price: 3000,
    category: 'dulce',
    description: 'Perlas que estallan en tu boca con néctar de maracuyá',
    icon: '✨',
  },
  {
    id: 'paleta_caramelo',
    name: 'Paleta / Chupeta de Caramelo',
    price: 1500,
    category: 'dulce',
    description: 'Paleta dulce tradicional para sumergir en el limón',
    icon: '🍭',
  },
  {
    id: 'jeringa_salsa',
    name: 'Inyección de Salsa Agridulce',
    price: 2000,
    category: 'chile',
    description: 'Jeringa concentrada dosificadora de salsa agridulce',
    icon: '💉',
  },
  {
    id: 'lecherita',
    name: 'Lecherita (Leche Condensada)',
    price: 2000,
    category: 'dulce',
    description: 'Cremoso toque dulce de leche condensada',
    icon: '🥛',
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'vaso-loco',
    name: 'Vaso ManGuss Loco con Dulces',
    category: 'especial',
    price: 15000,
    description: 'Una explosión de sabor que combina trozos frescos de mango biche crujiente con gomitas ácidas, perlas explosivas de sabor, paleta de caramelo y una inyección concentrada de salsa agridulce.',
    includes: 'Mango en cubos, gomitas, perlas popping, paleta, chupeta y jeringa de salsa.',
    image: imgVasoLoco,
    badge: '¡El Más Vendido!',
    customizable: true,
    defaultCustomization: {
      cut: 'cubos',
      salt: 'normal',
      lemon: 'abundante',
      pepper: 'pizca',
      toppings: ['gomitas', 'perlas_popping', 'jeringa_salsa', 'paleta_caramelo']
    }
  },
  {
    id: 'mango-helado-tajin',
    name: 'Mango Helado con Tajín y Limón',
    category: 'helado',
    price: 13000,
    description: 'La clásica combinación mexicana-colombiana. Vaso helado de mango biche rallado y en tiras finas, bañado generosamente en zumo de limón fresco, sal y espolvoreado con chile Tajín.',
    includes: 'Tiras de mango congelado, rodajas de limón, sal y chile Tajín Clásico.',
    image: imgTajinLimon,
    badge: 'Ultra Refrescante',
    customizable: true,
    defaultCustomization: {
      cut: 'rallado',
      salt: 'normal',
      lemon: 'abundante',
      pepper: 'sin',
      toppings: ['tajin']
    }
  },
  {
    id: 'mango-tradicional',
    name: 'Vaso de Mango Biche Tradicional',
    category: 'clasico',
    price: 10000,
    description: 'El favorito de siempre. Mango biche verde cortado en finas tiras o espirales estilo spaghetto, servido bien frío con abundantes gotas de limón, sal marina y pimienta al gusto.',
    includes: 'Mango biche en tiras, jugo natural de limón, sal y aderezo a elección.',
    image: imgTradicional,
    badge: 'Clásico Colombiano',
    customizable: true,
    defaultCustomization: {
      cut: 'tiras',
      salt: 'normal',
      lemon: 'normal',
      pepper: 'normal',
      toppings: ['tajin']
    }
  },
  {
    id: 'paleta-casera',
    name: 'Paleta Casera de Mango Biche',
    category: 'paleta',
    price: 3000,
    description: 'Deliciosa paleta helada artesanal elaborada con pulpa 100% natural de mango biche, escarchada en la parte superior con chile en polvo Tajín y toque cítrico para combatir el calor.',
    includes: 'Pulpa de mango congelada, borde escarchado con Tajín y limón.',
    image: imgPaletaCasera,
    badge: 'Económico & Delicioso',
    customizable: true,
    defaultCustomization: {
      cut: 'rallado',
      salt: 'poca',
      lemon: 'suave',
      pepper: 'sin',
      toppings: ['tajin']
    }
  },
  {
    id: 'mango-personalizado',
    name: 'Arma Tu Vaso a Tu Gusto',
    category: 'personalizado',
    price: 10000,
    description: 'Crea tu obra maestra de mango biche desde cero: elige el tipo de corte (tiras, cubos o rallado), calibra los niveles exactos de sal marina, limón y pimienta negra, y añade tus aderezos y dulces preferidos.',
    includes: 'Vaso de 16oz con base de mango biche fresco + condimentos + toppings seleccionados.',
    image: imgTradicional,
    badge: '100% Personalizable',
    customizable: true,
    defaultCustomization: {
      cut: 'tiras',
      salt: 'normal',
      lemon: 'abundante',
      pepper: 'pizca',
      toppings: []
    }
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-mango',
    name: 'Mango Biche Fresco (Criollo y Tommy verde)',
    category: 'fruta',
    stock: 48,
    unit: 'kg',
    minThreshold: 15,
    costPerUnit: 4200,
    lastUpdated: 'Hoy 08:30 AM'
  },
  {
    id: 'inv-limon',
    name: 'Limón de Castilla Jugoso',
    category: 'fruta',
    stock: 140,
    unit: 'unidades',
    minThreshold: 30,
    costPerUnit: 350,
    lastUpdated: 'Hoy 08:30 AM'
  },
  {
    id: 'inv-sal',
    name: 'Sal Marina Fina',
    category: 'especias',
    stock: 8.5,
    unit: 'kg',
    minThreshold: 2.0,
    costPerUnit: 1800,
    lastUpdated: 'Ayer'
  },
  {
    id: 'inv-pimienta',
    name: 'Pimienta Negra Molida Fresca',
    category: 'especias',
    stock: 3.2,
    unit: 'kg',
    minThreshold: 1.0,
    costPerUnit: 9500,
    lastUpdated: 'Ayer'
  },
  {
    id: 'inv-tajin',
    name: 'Chile Tajín Clásico (Polvo)',
    category: 'salsas',
    stock: 24,
    unit: 'frascos',
    minThreshold: 5,
    costPerUnit: 8500,
    lastUpdated: 'Hoy'
  },
  {
    id: 'inv-chamoy',
    name: 'Salsa de Chile Chamoy Agridulce',
    category: 'salsas',
    stock: 16,
    unit: 'litros',
    minThreshold: 4,
    costPerUnit: 12000,
    lastUpdated: 'Hoy'
  },
  {
    id: 'inv-gomitas',
    name: 'Gomitas Ácidas (Gusanitos/Aros)',
    category: 'dulces',
    stock: 32,
    unit: 'bolsas 250g',
    minThreshold: 8,
    costPerUnit: 4500,
    lastUpdated: 'Hoy'
  },
  {
    id: 'inv-popping',
    name: 'Perlas Popping Explosivas de Fruta',
    category: 'dulces',
    stock: 14,
    unit: 'tarros 500g',
    minThreshold: 4,
    costPerUnit: 16000,
    lastUpdated: 'Hace 2 días'
  },
  {
    id: 'inv-jeringas',
    name: 'Jeringas Dosificadoras Agridulces',
    category: 'salsas',
    stock: 65,
    unit: 'unidades',
    minThreshold: 20,
    costPerUnit: 1100,
    lastUpdated: 'Hoy'
  },
  {
    id: 'inv-paletas',
    name: 'Paletas Artesanales de Mango Biche',
    category: 'fruta',
    stock: 45,
    unit: 'unidades',
    minThreshold: 15,
    costPerUnit: 1200,
    lastUpdated: 'Hoy 07:00 AM'
  },
  {
    id: 'inv-vasos-16',
    name: 'Vasos Transparentes 16oz + Tapa Domo',
    category: 'empaques',
    stock: 180,
    unit: 'unidades',
    minThreshold: 40,
    costPerUnit: 450,
    lastUpdated: 'Hoy'
  },
  {
    id: 'inv-tenedores',
    name: 'Tenedores y Palillos Ecológicos',
    category: 'empaques',
    stock: 350,
    unit: 'unidades',
    minThreshold: 60,
    costPerUnit: 90,
    lastUpdated: 'Hoy'
  }
];

export const INITIAL_FEEDBACK: FeedbackEntry[] = [
  {
    id: 'fb-1',
    customerName: 'Valentina Restrepo',
    rating: 5,
    category: 'sabor',
    comment: '¡El Vaso ManGuss Loco es de otro mundo! El contraste entre lo ácido del mango biche y las gomitas con tajín es espectacular. Llegó súper frío.',
    votes: 28,
    createdAt: 'Hace 2 horas',
    status: 'revisado'
  },
  {
    id: 'fb-2',
    customerName: 'Camilo Andrés Duque',
    rating: 5,
    category: 'entrega',
    comment: 'Excelente que permitan pagar con Nequi rápido y manden el WhatsApp de confirmación de inmediato. El seguimiento en tiempo real me dio total tranquilidad.',
    votes: 19,
    createdAt: 'Hace 4 horas',
    status: 'revisado'
  },
  {
    id: 'fb-3',
    customerName: 'Mariana Gómez',
    rating: 5,
    category: 'general',
    comment: 'Apoyando el emprendimiento del Marco Fidel Suárez. Mucha calidad y mango biche 100% fresco, crujiente y bien cortado en tiritas finas.',
    suggestedTopping: 'Topping de Miguelito en polvo o salsa de mora ácida',
    votes: 34,
    createdAt: 'Ayer',
    status: 'implementado'
  },
  {
    id: 'fb-4',
    customerName: 'Juan Pablo Morales',
    rating: 4,
    category: 'sabor',
    comment: 'Muy rico todo, propongo que agreguen opción de mango pintón o más maduro para los que nos gusta un poquito más dulce.',
    suggestedTopping: 'Cilantro fresco picado y sal rosada del Himalaya',
    votes: 15,
    createdAt: 'Hace 2 días',
    status: 'pendiente'
  }
];

# 🥭 Mango Fresh — Tienda Virtual de Mango Biche & Gestión Cloud

> **Anteproyecto de Emprendimiento Escolar**  
> **Institución Educativa Marco Fidel Suárez — Grado 11 (Colombia, 2026)**  
> **Autores:** Sara Sofía Arciniegas Guzmán & Marlon Santos Reyes  
> **Docente Asesor:** Prof. Yair Fernando Merchán Lesmes  
> **Contacto Oficial WhatsApp:** [+57 322 356 0164](https://wa.me/573223560164)  
> **Cuenta Nequi Oficial:** `3223560164` (Titular: *Sara Sofía Arciniegas Guzmán*)

---

## 📑 Tabla de Contenido
1. [Descripción General](#-descripción-general)
2. [Guía de Instalación](#-guía-de-instalación)
3. [Configuración del Entorno](#-configuración-del-entorno)
4. [Base de Datos: Arquitectura Firebase Firestore](#-base-de-datos-arquitectura-firebase-firestore)
5. [Ficha Técnica de Diseño Frontend](#-ficha-técnica-de-diseño-frontend)
6. [Ficha Técnica del Backend y Lógica de Negocio](#-ficha-técnica-del-backend-y-lógica-de-negocio)
7. [Infraestructura y Despliegue con Vercel](#-infraestructura-y-despliegue-con-vercel)
8. [Estructura del Proyecto](#-estructura-del-proyecto)
9. [Licencia y Créditos](#-licencia-y-créditos)

---

## 🌟 Descripción General

**Mango Fresh** es una solución e-commerce completa y progresiva concebida para la venta, personalización y distribución de **Mango Biche colombiano** (verde, crujiente y cítrico) y sus especialidades de autor. 

La aplicación integra:
- **Catálogo Oficial:** Vasos gourmet (*ManGuss Loco con Dulces*, *Mango Helado con Tajín y Limón*, *Mango Biche Tradicional en Espirales*, *Paleta Casera Escarchada*).
- **Personalizador de Vasos:** Selección de corte (*tiras spaghetto, cubos, rallado*), calibración milimétrica de sazón (*sal marina, jugo natural de limón, pimienta negra molida*) y toppings premium (*chile Tajín, salsa chamoy agridulce, gomitas ácidas, perlas popping, paleta de caramelo, jeringa de salsa dosificadora y lecherita*).
- **Pasarela de Pago Dual:** Transferencia directa por **Nequi** con copia rápida y comprobante, o **Efectivo contra entrega** con calculadora de devuelta para el domiciliario.
- **Confirmación Inmediata por WhatsApp (+57 322 356 0164):** Generación automática de comanda formateada con los datos de entrega y personalización exacta.
- **Rastreo en Tiempo Real:** Seguimiento dinámico de 5 fases de entrega con mapa interactivo y notificaciones en vivo.
- **Módulo de Auto-Retroalimentación (Fase 5 de Metodología):** Muro de votación comunitaria y aprobación de mejoras para adaptar la oferta a las demandas del cliente.
- **Realm Cloud Dashboard:** Panel de administración para el control de inventario con deducción automática por gramaje, alertas de stock bajo y respaldo de datos en JSON.

---

## 🚀 Guía de Instalación

### Requisitos Previos
- **Node.js**: Versión `v20.x` o superior (Recomendado LTS `v22.x`).
- **Gestor de Paquetes**: `npm` (v10+), `pnpm` o `bun`.
- **Git**: Instalado en el sistema operativo.

### Pasos de Instalación Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/mango-fresh-store.git
   cd mango-fresh-store
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```
   *O alternativamente con Bun:*
   ```bash
   bun install
   ```

3. **Verificar tipos y validación de sintaxis:**
   ```bash
   npm run lint
   ```

4. **Compilar los assets para producción:**
   ```bash
   npm run build
   ```

5. **Iniciar el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible de inmediato en `http://localhost:3000`.

---

## ⚙️ Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto duplicando la plantilla `.env.example`:

```bash
cp .env.example .env
```

### Variables de Entorno Disponibles

| Variable | Tipo | Obligatoria | Descripción / Valor por Defecto |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | String | Opcional | Clave para integraciones inteligentes de Google Gen AI. |
| `APP_URL` | URL | Opcional | URL base de la aplicación (inyectada en producción). |
| `VITE_WHATSAPP_PHONE` | String | Sí | Número de WhatsApp oficial: `573223560164`. |
| `VITE_NEQUI_NUMBER` | String | Sí | Cuenta de Nequi oficial para transferencias: `3223560164`. |
| `VITE_STORE_OWNER` | String | Sí | Nombre del titular: `Sara Sofía Arciniegas Guzmán`. |
| `VITE_FIREBASE_API_KEY` | String | Condicional | API Key de Firebase Project. |
| `VITE_FIREBASE_AUTH_DOMAIN` | String | Condicional | `mango-fresh-store.firebaseapp.com`. |
| `VITE_FIREBASE_PROJECT_ID` | String | Condicional | ID del proyecto en Google Cloud / Firebase. |
| `VITE_FIREBASE_STORAGE_BUCKET`| String | Condicional | Bucket de almacenamiento de Firebase. |
| `VITE_FIREBASE_APP_ID` | String | Condicional | Identificador de aplicación Web en Firebase. |

---

## 🗄️ Base de Datos: Arquitectura Firebase Firestore

Mango Fresh utiliza una arquitectura de persistencia **híbrida y Offline-First**: los datos operan de inmediato mediante un estado global reactivo persistido en `localStorage`, con capacidad nativa de sincronización hacia **Google Cloud Firebase Firestore** y exportación/importación en formato estándar JSON (Realm Cloud Sync).

### 1. Esquema de Colecciones en Firestore

```
firestore/
├── products/              # Catálogo oficial de productos y especialidades
│   └── {productId}
├── orders/                # Órdenes de compra generadas en la tienda
│   └── {orderId}
├── inventory/             # Stock de materias primas e insumos (Realm)
│   └── {itemId}
├── customers/             # Perfiles registrados de clientes frecuentes
│   └── {customerId}
└── feedback/              # Retroalimentación, sugerencias y votaciones
    └── {feedbackId}
```

### 2. Definición de Modelos de Datos

#### Colección `products`
```json
{
  "id": "vaso-loco",
  "name": "Vaso ManGuss Loco con Dulces",
  "category": "especial",
  "price": 15000,
  "description": "Una explosión de sabor que combina trozos frescos...",
  "includes": "Mango en cubos, gomitas, perlas popping, paleta...",
  "image": "https://storage.googleapis.com/.../vaso_loco.jpg",
  "badge": "¡El Más Vendido!",
  "customizable": true,
  "defaultCustomization": {
    "cut": "cubos",
    "salt": "normal",
    "lemon": "abundante",
    "pepper": "pizca",
    "toppings": ["gomitas", "perlas_popping", "jeringa_salsa"]
  }
}
```

#### Colección `orders`
```json
{
  "id": "ord-1743123456",
  "orderNumber": "MF-4821",
  "customer": {
    "id": "cust-01",
    "name": "Carlos Mendoza",
    "phone": "3201234567",
    "address": "Calle 45 # 12-34 Torre 2 Apt 301",
    "neighborhood": "Marco Fidel Suárez"
  },
  "items": [
    {
      "cartItemId": "item-1",
      "product": { "id": "mango-tradicional", "name": "Vaso de Mango Biche Tradicional" },
      "quantity": 2,
      "unitPrice": 11500,
      "totalPrice": 23000,
      "customization": {
        "cut": "tiras",
        "salt": "normal",
        "lemon": "abundante",
        "pepper": "pizca",
        "toppings": ["tajin"]
      }
    }
  ],
  "subtotal": 23000,
  "deliveryFee": 3000,
  "total": 26000,
  "paymentMethod": "nequi",
  "nequiReference": "NQ-847291",
  "status": "en_camino",
  "statusHistory": [
    { "status": "recibido", "timestamp": "12:15 PM", "message": "Pedido recibido." },
    { "status": "preparando", "timestamp": "12:18 PM", "message": "Picando mango biche fresco." },
    { "status": "en_camino", "timestamp": "12:28 PM", "message": "Repartidor en moto en camino." }
  ],
  "driverLocation": {
    "lat": 4.711,
    "lng": -74.072,
    "progressPercent": 65
  },
  "createdAt": "2026-09-25T17:15:00.000Z"
}
```

#### Colección `inventory`
```json
{
  "id": "inv-mango",
  "name": "Mango Biche Fresco (Criollo y Tommy verde)",
  "category": "fruta",
  "stock": 48.0,
  "unit": "kg",
  "minThreshold": 15.0,
  "costPerUnit": 4200,
  "lastUpdated": "2026-09-25T12:00:00Z"
}
```

#### Colección `feedback`
```json
{
  "id": "fb-01",
  "customerName": "Valentina Restrepo",
  "rating": 5,
  "category": "sabor",
  "comment": "¡El Vaso ManGuss Loco es espectacular! Súper ácido y frío.",
  "suggestedTopping": "Salsa de mora silvestre con chile",
  "votes": 28,
  "status": "implementado",
  "createdAt": "2026-09-25T10:00:00Z"
}
```

### 3. Reglas de Seguridad de Firestore (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Regla para productos: lectura pública, escritura reservada a administradores
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Regla para pedidos: creación pública validada, lectura con ID o auth
    match /orders/{orderId} {
      allow create: if request.resource.data.total > 0
                    && request.resource.data.customer.phone != null;
      allow read: if true;
      allow update, delete: if request.auth != null;
    }

    // Regla para inventarios: lectura y actualización en local/nube
    match /inventory/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Retroalimentación: cualquier usuario puede sugerir y votar
    match /feedback/{feedbackId} {
      allow read, create: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys().hasOnly(['votes', 'status']);
    }
  }
}
```

---

## 🎨 Ficha Técnica de Diseño Frontend

### 1. Sistema Visual y Filosofía de Diseño
El diseño de **Mango Fresh** obedece a un concepto **"Warm Tropical Citric"**, inspirado en la comida callejera artesanal colombiana y el contraste entre el ácido vibrante del mango biche y los matices dulces/picantes del tajín y las salsas agridulces.

- **Ausencia de Slop Genérico:** Se eliminan barras de estado aburridas y gradientes grises; la interfaz evoca apetito, frescura e inmediatez.
- **Tipografía Expresiva:**
  - *Headings y Precios:* **Fredoka** (`wght@400;600;700`) — redondeada, amigable, con impacto visual comercial.
  - *Cuerpo y Datos:* **Plus Jakarta Sans** (`wght@400;500;700;800`) — legibilidad técnica, moderna y limpia.

### 2. Tabla Semántica de Color

| Token | Código HEX | Utilidad en la UI |
| :--- | :--- | :--- |
| **Mango Biche Verde Oscuro** | `#064e3b` / `#047857` | Encabezados principales, barras de navegación y botones de compra |
| **Verde Fresco Botánico** | `#10b981` / `#22c55e` | Indicadores de stock óptimo, etapas de envío exitosas |
| **Amarillo Mango Maduro** | `#f59e0b` / `#fbbf24` | Acentos, llamadas a la acción, bordes activos y botones destacados |
| **Rojo Tajín / Chamoy** | `#dc2626` / `#ef4444` | Etiquetas picantes, alertas de inventario bajo, insignias de descuento |
| **Púrpura Nequi** | `#3b0764` / `#581c87` | Botones de pago por Nequi, modales de transferencia y códigos QR |
| **Fondo Crema Tropical** | `#FFFDF5` | Lienzo principal del body para evitar fatiga visual blanca pura |

### 3. Componentes Modulares de Frontend

```
src/
├── components/
│   ├── Header.tsx              # Barra superior con enlaces rápidos y acceso al carrito
│   ├── HeroBanner.tsx          # Presentación comercial, badges de la I.E. y CTA directo
│   ├── ProductCatalog.tsx      # Cuadrícula responsive con filtro por categoría y badges
│   ├── CustomizerModal.tsx     # Modal interactivo para corte, sal, limón, pimienta y toppings
│   ├── CartDrawer.tsx          # Vista detallada de la cesta con recálculo en tiempo real
│   ├── CheckoutModal.tsx       # Registro del cliente y pasarela Nequi / Efectivo
│   ├── OrderTracker.tsx        # Rastreo en 5 etapas con simulador de avance y mapa GPS
│   ├── FeedbackHub.tsx         # Muro interactivo de opiniones y sistema de mejora continua
│   ├── AdminRealmDashboard.tsx # Panel administrativo de inventarios, stock y ventas
│   ├── CustomerProfileModal.tsx# Gestión del perfil del usuario y compras históricas
│   ├── NosotrosModal.tsx       # Ficha técnica académica del anteproyecto escolar
│   ├── NotificationToasts.tsx  # Sistema global de notificaciones no invasivas
│   └── Footer.tsx              # Pie de página institucional con contacto oficial
```

---

## ⚙️ Ficha Técnica del Backend y Lógica de Negocio

La arquitectura de la aplicación combina procesamiento en el cliente con un servicio Node.js / Express integrado:

```
[Cliente Web / Móvil] 
        │
        ├── 1. Selección y Calibración (Corte, Sal, Limón, Toppings)
        ├── 2. Validación de Carrito y Cálculo de Precios Unitarios
        ├── 3. Selección de Pasarela (Nequi o Efectivo con devuelta)
        ├── 4. Descuento Automático de Inventario (Kg Mango, Vasos, Limones)
        ├── 5. Disparo de Enlace Webhook hacia WhatsApp API (+57 322 356 0164)
        └── 6. Registro en Realm Cloud y Envío de Notificaciones en Vivo
```

### 1. Algoritmo de Cálculo Dinámico de Precios
Cada producto parte de un precio base al que se le suman los toppings seleccionados de forma aditiva:

$$\text{Precio Unitario} = P_{\text{base}} + \sum_{i=1}^{n} \text{Precio}(\text{Topping}_i)$$

$$\text{Total del Pedido} = \left(\sum_{j=1}^{m} \text{Precio Unitario}_j \times \text{Cantidad}_j\right) + \text{Tarifa Domicilio}$$

### 2. Deducción Inteligente de Inventario por Gramaje
Con cada orden procesada, el sistema descuenta automáticamente:
- **Vasos de 16oz y tenedores ecológicos:** 1 unidad por cada vaso ordenado.
- **Mango Biche en bruto:** 0.35 kg (350 gramos) por vaso tradicional o loco.
- **Limón natural:** 1 unidad si el nivel es `normal`, 2 unidades si el nivel es `abundante`.
- **Paletas artesanales:** 1 unidad de stock congelado por cada paleta.

### 3. Generador de Mensaje Oficial para WhatsApp
El payload enviado a WhatsApp incluye formato estándar con emojis, saltos de línea codificados en URI y los datos exactos del cliente:

```text
🥭 *¡HOLA MANGO FRESH! NUEVO PEDIDO VIRTUAL*
━━━━━━━━━━━━━━━━━━━━━━
📌 *Pedido:* #MF-5821
👤 *Cliente:* Sara Sofía Guzmán
📱 *Teléfono:* 3223560164
📍 *Dirección:* Calle 45 # 12-34 Torre 2 (Marco Fidel Suárez)
━━━━━━━━━━━━━━━━━━━━━━
🛒 *DETALLE DEL PEDIDO:*
*1. Vaso ManGuss Loco con Dulces* (x1) - $15.000
   - Corte: CUBOS
   - Sal: normal | Limón: abundante | Pimienta: pizca
   - Toppings: Gomitas Ácidas, Perlas Popping, Inyección de Salsa
━━━━━━━━━━━━━━━━━━━━━━
💰 *Subtotal:* $15.000
🛵 *Domicilio:* $3.000
✨ *TOTAL A PAGAR:* $18.000 COP
━━━━━━━━━━━━━━━━━━━━━━
🟣 *Pago por NEQUI*
   - Ref: NQ-918273
   - Cuenta Nequi: 3223560164
```

---

## ☁️ Infraestructura y Despliegue con Vercel

La aplicación está preparada para ser desplegada en **Vercel** como una SPA optimizada de alto rendimiento y baja latencia a través de su red global Edge CDN.

### 1. Archivo `vercel.json` (Incluido en la Raíz)
Garantiza el enrutamiento correcto del lado del cliente (evitando errores 404 en recargas) y habilita encabezados de caché inmutable para los bundles de Vite:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. Despliegue Mediante Git (GitHub / GitLab / Bitbucket)
1. Sube tu código a un repositorio en GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Mango Fresh store complete release"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/mango-fresh-store.git
   git push -u origin main
   ```
2. Ingresa a [vercel.com](https://vercel.com/) e inicia sesión.
3. Haz clic en **"Add New Project"** e importa el repositorio `mango-fresh-store`.
4. En la sección **Build and Output Settings**, Vercel detectará automáticamente **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. En la sección **Environment Variables**, añade las variables de `.env.example` según requieras.
6. Presiona **Deploy**. En menos de 45 segundos el sitio estará activo en una URL con certificado SSL gratuito (ej: `https://mango-fresh-store.vercel.app`).

### 3. Despliegue Mediante Vercel CLI
Si prefieres desplegar directamente desde la terminal:

```bash
# 1. Instalar Vercel CLI globalmente
npm i -g vercel

# 2. Iniciar sesión
vercel login

# 3. Desplegar en entorno de preview
vercel

# 4. Desplegar directamente a producción
vercel --prod
```

---

## 📁 Estructura del Proyecto

```
mango-fresh-store/
├── .env.example              # Plantilla de variables de entorno
├── .gitignore                # Reglas de exclusión de Git
├── index.html                # Entrypoint HTML con metadatos SEO y tipografías
├── metadata.json             # Manifiesto de capacidades y configuración de AI Studio
├── package.json              # Dependencias y scripts de construcción
├── tsconfig.json             # Configuración del compilador de TypeScript
├── vercel.json               # Configuración de despliegue para Vercel
├── vite.config.ts            # Configuración de Vite y Tailwind CSS v4
├── src/
│   ├── assets/
│   │   └── images/           # Fotografías en alta resolución de los productos
│   ├── components/           # Componentes modulares de interfaz de usuario
│   ├── context/
│   │   └── AppContext.tsx    # Proveedor de estado global (carrito, pedidos, inventario)
│   ├── data/
│   │   └── initialData.ts    # Datos iniciales del catálogo, toppings e inventario
│   ├── types/
│   │   └── index.ts          # Definiciones e interfaces estrictas de TypeScript
│   ├── App.tsx               # Componente raíz y orquestador de vistas
│   ├── index.css             # Importación de Tailwind CSS y estilos base
│   └── main.tsx              # Punto de arranque de React 19
└── README.md                 # Esta ficha técnica completa
```

---

## 🏆 Licencia y Créditos

Este proyecto fue desarrollado en el marco del **Programa de Emprendimiento Escolar de la Institución Educativa Marco Fidel Suárez** (Grado 11, Colombia, 2026).

- **Gestión Comercial & Producto:** Sara Sofía Arciniegas Guzmán
- **Logística & Operaciones:** Marlon Santos Reyes
- **Tutoría Metodológica:** Prof. Yair Fernando Merchán Lesmes
- **Licencia:** Apache License 2.0 (Código Abierto para Fines Educativos y de Emprendimiento).

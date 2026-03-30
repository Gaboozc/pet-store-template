# [NOMBRE DE LA TIENDA] — Template de Tienda de Mascotas

Template premium para tienda especializada en acuarios, peces, aves y pequeñas mascotas. Construido con React + Vite + Tailwind CSS.

## Stack técnico

- **Framework**: React 18 + Vite
- **Estilos**: Tailwind CSS 3
- **Estado global**: Context API (CartContext)
- **Routing**: React Router DOM v6
- **Deploy**: Vercel

## Instalación local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env

# 3. Editar .env con tus datos reales
# VITE_WHATSAPP_NUMBER=5491112345678
# VITE_STORE_NAME=Mi Tienda de Mascotas

# 4. Correr en desarrollo
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp sin + ni espacios | `5491112345678` |
| `VITE_STORE_NAME` | Nombre de tu tienda | `Aqua Paradise` |

> **Importante**: El archivo `.env` NUNCA debe subirse a Git. Solo `.env.example` se versiona.

## Personalización rápida

### Cambiar el nombre de la tienda
1. Edita `VITE_STORE_NAME` en tu `.env`
2. En producción, agrega la variable en el dashboard de Vercel

### Agregar/editar productos
Edita el archivo `src/data/products.js`. Cada producto tiene:
```js
{
  id: 1,                    // ID único
  name: 'Nombre del producto',
  category: 'peces',        // peces | acuarios | aves | pequeñas-mascotas
  price: 2800,              // Precio en números
  stock: 8,                 // Stock inicial
  careLevel: 'fácil',       // fácil | medio | difícil
  badge: 'Nuevo',           // Nuevo | Oferta | Stock limitado | null
  image: 'https://...',     // URL de imagen (Unsplash recomendado)
  description: '...',       // Descripción corta
}
```

### Cambiar colores
Edita `tailwind.config.js` → `theme.extend.colors`. Los colores principales son:
- `ocean`: azules del océano
- `aqua`: verdes acuáticos
- `coral`: toques cálidos
- `deep`: fondos oscuros

## Deploy en Vercel

### Primera vez (manual)
1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project
3. Importa tu repositorio
4. En **Environment Variables**, agrega:
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_STORE_NAME`
5. Click **Deploy**

### CI/CD automático (GitHub Actions)
Para activar el workflow `.github/workflows/deploy.yml`:

1. En Vercel: Settings → Tokens → Create Token → copia el token
2. En GitHub: Settings → Secrets and variables → Actions → New secret:
   - `VERCEL_TOKEN`: el token de Vercel
   - `VERCEL_ORG_ID`: tu Org ID (en Vercel: Settings → General)
   - `VERCEL_PROJECT_ID`: el Project ID (en Vercel: Project Settings → General)
   - `VITE_WHATSAPP_NUMBER`: tu número de WhatsApp
   - `VITE_STORE_NAME`: nombre de tu tienda

A partir de ahí, cada push a `main` despliega a producción y cada PR genera un preview.

## Funcionalidades

- **Carrito** con manejo de stock en tiempo real
- **Filtros** por categoría, nivel de cuidado y precio
- **WhatsApp** con mensaje prellenado y detalle del pedido
- **Responsive** con menú hamburguesa para móvil
- **Animaciones** acuáticas (burbujas, transiciones suaves)

## Estructura de carpetas

```
src/
├── components/
│   ├── layout/       → Navbar, Footer, WhatsAppButton
│   ├── catalog/      → ProductCard, ProductGrid, FilterBar
│   ├── cart/         → CartDrawer, CartItem
│   └── sections/     → Hero, Categories, Services, Gallery, FAQ
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   └── Contact.jsx
└── App.jsx
```

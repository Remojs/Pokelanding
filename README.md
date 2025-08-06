# 🎮 Pokelanding

Una Pokédex interactiva con diseño retro de Game Boy, construida con React y estilizada completamente con CSS Modules.

## ✨ Funcionalidades

### 🔍 **Búsqueda y Filtrado**
- **Búsqueda global**: Busca cualquier Pokémon por nombre o número de Pokédex
- **Filtros por tipo**: 18 tipos de Pokémon disponibles (Fire, Water, Grass, etc.)
- **Ordenamiento**: Pokédex Number (Low to High / High to Low)
- **Búsqueda dinámica**: Busca en toda la base de datos, no solo en los Pokémon cargados

### 🎨 **Sistema de Temas**
- **9 temas únicos**: Game Boy Clásico, Fuego, Agua, Planta, Eléctrico, Hielo, Psíquico, Fantasma, Dragón
- **Cambio dinámico**: Todos los colores de la interfaz cambian según el tema seleccionado
- **Persistencia**: El tema seleccionado se guarda en localStorage

### 📱 **Interfaz Retro**
- **Diseño Game Boy**: Inspirado en la estética clásica de Nintendo Game Boy
- **Efectos 8-bit**: Scanlines, animaciones pixeladas y efectos de glow
- **Responsive**: Adaptado para móviles y escritorio
- **Modal de detalles**: Información detallada de cada Pokémon

### 🚀 **Rendimiento**
- **Infinite Scroll**: Carga progresiva de Pokémon
- **Cache inteligente**: 5 minutos de cache para búsquedas
- **Optimización**: Solo carga datos cuando es necesario

## 🛠️ Tecnologías

### **Frontend**
- **React 18.3.1** - Biblioteca principal de UI
- **Vite 5.4.1** - Build tool y dev server
- **CSS Modules** - Estilos modulares y aislados
- **Press Start 2P** - Fuente retro de Google Fonts

### **Gestión de Estado**
- **TanStack Query (React Query)** - Manejo de estado del servidor
- **React Hooks** - Estado local de componentes

### **Herramientas de Desarrollo**
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **npm** - Gestor de paquetes

## 🌐 Fuente de Datos

Los datos de Pokémon provienen de la API personalizada:
```
https://gottafetchthemall.onrender.com
```

### **Endpoints utilizados:**
- `/pokedex/between?min={id}&max={id}` - Rango de Pokémon
- `/pokedex/{id}` - Pokémon específico por ID
- Búsqueda global implementada con filtrado del lado cliente

### **Datos incluidos:**
- Información básica: nombre, ID, imagen
- Estadísticas: altura, peso, habilidades
- Tipos: primario y secundario
- Sprites oficiales de alta calidad

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/Remojs/Pokelanding.git

# Instalar dependencias
cd Pokelanding
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── features/pokemon/          # Componentes específicos de Pokémon
│   ├── PokemonCard.jsx       # Tarjeta individual de Pokémon
│   ├── PokemonFilters.jsx    # Sistema de filtros y búsqueda
│   └── PokemonGrid.jsx       # Grid principal con infinite scroll
├── shared/
│   ├── components/           # Componentes reutilizables
│   ├── hooks/               # Custom hooks (usePokemonData)
│   ├── services/            # API de Pokémon
│   └── utils/               # Utilidades de transformación
└── pages/                   # Páginas principales
    └── Index.jsx            # Página principal
```

## 🎯 Características Técnicas

- **Arquitectura modular** con separación clara de responsabilidades
- **Custom hooks** para lógica de negocio reutilizable
- **Infinite scroll** optimizado para grandes conjuntos de datos
- **Transformación de datos** para consistencia entre API y UI
- **Sistema de temas** con variables CSS dinámicas
- **Responsive design** con CSS Grid y Flexbox

---

Desarrollado por [Remojs](https://github.com/Remojs)

# 🌿 Aura Derm | Plataforma E-commerce & Gestión

¡Bienvenido al repositorio oficial de **Aura Derm**! Este proyecto es una aplicación web moderna orientada al cuidado de la piel (*skincare*), que combina un catálogo interactivo de productos con un panel administrativo completo para la gestión interna del inventario.

Desarrollada de manera modular bajo la premisa de **Diseño Responsivo y UX/UI**, la interfaz se adapta fluidamente a cualquier dispositivo garantizando una experiencia ágil y centrada en el usuario.

---

## 🚀 Características Clave

* **Diseño Mobile-First**: Estructura de grilla adaptativa implementando componentes estilizados y layouts optimizados para smartphones, tablets y pantallas de escritorio.
* **Menú Hamburguesa Interactivo**: Navbar colapsable dinámica en dispositivos móviles para una navegación táctil limpia y accesible.
* **Persistencia de Datos**: Conexión robusta en tiempo real con **Firebase Firestore** para la lectura y escritura dinámica del catálogo de productos.
* **Panel de Gestión de Productos**: CRUD interno protegido con roles que permite a los administradores agregar, editar (con previsualización de imagen actual) y eliminar productos.
* **Subida de Imágenes Externa**: Integración con la API de ImgBB para almacenar y enlazar de forma transparente las imágenes del catálogo.
* **Navegación Virtual Segura**: Enrutamiento optimizado mediante `React Router` con manejo de redirecciones en producción para evitar páginas no encontradas (404).

---

## 🛠️ Tecnologías y Librerías Utilizadas

* **React JS** (Entorno de compilación ultra rápido impulsado por **Vite**)
* **Firebase** (Firestore Database & Authentication)
* **React-Bootstrap** (Sistema de grillas responsivas y componentes de UI)
* **Styled-components** (Estilos modulares y personalizados encapsulados)
* **React Icons** (Iconografía vectorial interactiva y accesible)
* **React Helmet** (Optimización de SEO, etiquetas meta y títulos dinámicos)

---

## 💻 Instalación y Ejecución en un Entorno Local

Para ejecutar el proyecto en tu computadora, seguí estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/FlorenciaCha/proyecto-integrador-aura-derm.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd proyecto-integrador-aura-derm
```

### 3. Instalar las dependencias

```bash
npm install
```

Este comando instalará automáticamente todas las librerías necesarias definidas en el archivo `package.json`.

### 4. Configurar las variables de entorno

Creá un archivo `.env` o `.env.local` en la raíz del proyecto y agregá tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en una dirección similar a:

```
http://localhost:5173
```

---

## 📦 Compilar para producción

Para generar la versión optimizada del proyecto ejecutá:

```bash
npm run build
```

Los archivos listos para su despliegue se generarán en la carpeta `dist`.

---

## 🌐 Despliegue

El proyecto está preparado para aplicaciones SPA (Single Page Application) utilizando **React Router**.

Incluye el archivo `_redirects` dentro de la carpeta `public`, lo que permite que las rutas funcionen correctamente en **Netlify**, evitando errores **404** al recargar páginas o acceder directamente mediante una URL.
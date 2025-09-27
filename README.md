# Node.js CLI CRUD de Productos

Este proyecto es un **CRUD de productos** simulado desde línea de comandos utilizando Node.js y la Fake Store API. Permite obtener, crear y eliminar productos de manera sencilla, con un enrutamiento interno tipo mini-router.

---

## 🗂 Estructura del Proyecto

```
mi-proyecto/
│
├─ index.js           # Punto de entrada de la aplicación; procesa comandos CLI
├─ package.json       # Configuración del proyecto y scripts
├─ services/
│   └─ products.js    # Funciones para interactuar con la API de productos
├─ utils/
│   └─ helpers.js     # Funciones auxiliares, como manejo de errores
└─ README.md          # Documentación del proyecto
```

---

## ⚡ Requisitos

- Node.js >= 18
- Conexión a internet para consumir la Fake Store API

---

## 📦 Comandos Disponibles

### 1️⃣ Obtener todos los productos

```bash
npm run start GET products
```

- Método: `GET`
- Recurso: `products`
- Descripción: Muestra todos los productos disponibles en la API.
- Ejemplo de salida: Lista de objetos de productos en consola.

---

### 2️⃣ Obtener un producto por ID

```bash
npm run start GET products/15
```

- Método: `GET`
- Recurso: `products/:id`
- Parámetro:
  - `id`: ID del producto que se desea obtener.
- Descripción: Muestra la información de un producto específico.
- Ejemplo de salida: Objeto con los datos del producto solicitado.

---

### 3️⃣ Crear un nuevo producto

```bash
npm run start POST products "T-Shirt-Rex" 300 remeras
```

- Método: `POST`
- Recurso: `products`
- Parámetros:
  - `title`: Nombre del producto
  - `price`: Precio del producto (número)
  - `category`: Categoría del producto
- Descripción: Crea un nuevo producto en la API.
- Ejemplo de salida: Confirmación de creación con ID del producto.

---

### 4️⃣ Eliminar un producto

```bash
npm run start DELETE products/7
```

- Método: `DELETE`
- Recurso: `products/:id`
- Parámetro:
  - `id`: ID del producto a eliminar
- Descripción: Elimina un producto específico de la API.
- Ejemplo de salida: Confirmación de eliminación del producto.

---

## 🛠 Funcionalidades

- Enrutamiento interno tipo mini-router con soporte de **placeholders** (`:id`)  
- Manejo centralizado de errores con `handleError`  
- Validaciones básicas de parámetros antes de ejecutar operaciones  
- Salidas en consola claras y amigables para el usuario  

---

## 🔧 Cómo Ejecutar

1. Clonar el repositorio:

```bash
git clone <URL_REPO>
cd mi-proyecto
```

2. Instalar dependencias (si las hubiera):

```bash
npm install
```

3. Ejecutar comandos según lo deseado:

```bash
npm run start <METHOD> <RESOURCE> [ARGS...]
```

Ejemplo:

```bash
npm run start POST products "New Product" 150 "category"
```

---

## 📌 Notas

- Esta aplicación está pensada como **CLI de prueba**, no como API completa.
- La Fake Store API se utiliza solo con fines de demostración; no persiste los cambios de manera real.
- Las funciones y rutas están documentadas al estilo **NatSpec** para facilitar su mantenimiento y escalabilidad.

---

## 👨‍💻 Autor

**Juan Manuel Pinto** 
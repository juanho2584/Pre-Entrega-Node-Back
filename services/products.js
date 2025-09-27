// services/products.js

/// @notice URL base de la API externa utilizada para gestionar productos.
/// @dev En este caso, se utiliza la Fake Store API para simular operaciones CRUD.
const BASE_URL = "https://fakestoreapi.com";

/// @notice Obtiene todos los productos disponibles en la API.
/// @dev Realiza una petición GET a `${BASE_URL}/products`.
/// @return Imprime en consola la lista completa de productos obtenidos.
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  console.log("📦 Lista de productos:", data);
}

/// @notice Obtiene un producto específico por su ID.
/// @dev Realiza una petición GET a `${BASE_URL}/products/{id}`.
/// @param id ID del producto a buscar.
/// @return Imprime en consola el producto solicitado. Si no se pasa un ID, muestra advertencia.
export async function getProductById(id) {
  if (!id) {
    console.log("⚠️ Debes ingresar un ID de producto.");
    return;
  }
  const res = await fetch(`${BASE_URL}/products/${id}`);
  const data = await res.json();
  console.log(`📦 Producto ID ${id}:`, data);
}

/// @notice Crea un nuevo producto en la API.
/// @dev Realiza una petición POST a `${BASE_URL}/products`.
/// @param title Nombre o título del producto.
/// @param price Precio del producto (se convierte a número antes de enviarse).
/// @param category Categoría a la que pertenece el producto.
/// @return Imprime en consola el ID del producto creado. Si faltan parámetros, muestra advertencia.
export async function createProduct(title, price, category) {
  if (!title || !price || !category) {
    console.log("⚠️ Debes ingresar: <title> <price> <category>");
    return;
  }

  const body = { title, price: Number(price), category };

  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log("✅ Producto creado con ID:", data.id);
}

/// @notice Elimina un producto específico de la API.
/// @dev Realiza una petición DELETE a `${BASE_URL}/products/{id}`.
/// @param id ID del producto a eliminar.
/// @return Imprime en consola el resultado de la operación. Si no se pasa un ID, muestra advertencia.
export async function deleteProduct(id) {
  if (!id) {
    console.log("⚠️ Debes ingresar un ID de producto.");
    return;
  }

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(`🗑️ Producto ID ${id} eliminado:`, data);
}

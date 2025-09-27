// index.js

import { getProducts, getProductById, createProduct, deleteProduct } from "./services/products.js";
import { handleError } from "./utils/helpers.js";

/// @notice Obtiene los argumentos pasados por línea de comandos.
/// @dev Se usa la desestructuración para extraer `method`, `resource` y los parámetros adicionales.
/// @param method Método HTTP simulado (ej: GET, POST, DELETE).
/// @param resource Recurso solicitado (ej: products, products/15).
/// @param args Argumentos adicionales (ej: datos para crear un producto).
const [, , method, resource, ...args] = process.argv;

/// @notice Definición de las rutas disponibles.
/// @dev Cada objeto define un `method`, un `path` y una `action` que se ejecutará si la ruta coincide.
/// @dev El `path` puede incluir placeholders como `:id` para parámetros dinámicos.
const routes = [
  {
    /// @notice Ruta para obtener todos los productos.
    /// @dev Acción válida solo si no se pasan argumentos adicionales.
    method: "GET",
    path: "products",
    action: async () => {
      if (args.length === 0) {
        await getProducts();
      } else {
        console.log("⚠️ Demasiados argumentos para GET products");
      }
    },
  },
  {
    /// @notice Ruta para obtener un producto específico por su ID.
    /// @param params.id ID del producto solicitado.
    method: "GET",
    path: "products/:id",
    action: async (params) => {
      await getProductById(params.id);
    },
  },
  {
    /// @notice Ruta para crear un nuevo producto.
    /// @param args[0] title Nombre o título del producto.
    /// @param args[1] price Precio del producto.
    /// @param args[2] category Categoría del producto.
    method: "POST",
    path: "products",
    action: async () => {
      const [title, price, category] = args;
      await createProduct(title, price, category);
    },
  },
  {
    /// @notice Ruta para eliminar un producto por su ID.
    /// @param params.id ID del producto a eliminar.
    method: "DELETE",
    path: "products/:id",
    action: async (params) => {
      await deleteProduct(params.id);
    },
  },
];

/// @notice Busca la ruta que coincida con el método y recurso solicitados.
/// @dev Compara `resource` con los `path` definidos en `routes`, soportando placeholders como `:id`.
/// @param method Método HTTP simulado (ej: GET, POST, DELETE).
/// @param resource Recurso solicitado (ej: products, products/15).
/// @return La ruta coincidente junto con los parámetros extraídos, o `null` si no hay match.
function matchRoute(method, resource) {
  for (const route of routes) {
    if (route.method !== method) continue;

    const routeParts = route.path.split("/");
    const resourceParts = resource.split("/");

    if (routeParts.length !== resourceParts.length) continue;

    const params = {};
    let isMatch = true;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = resourceParts[i];
      } else if (routeParts[i] !== resourceParts[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) return { ...route, params };
  }

  return null;
}

/// @notice Función principal que procesa el comando recibido desde CLI.
/// @dev Intenta hacer match con una ruta definida en `routes` y ejecutar la acción correspondiente.
/// @dev Si no existe la ruta, muestra ejemplos de uso válido.
/// @return No devuelve valores, ejecuta las acciones definidas en las rutas.
async function main() {
  try {
    const matched = matchRoute(method, resource);

    if (matched) {
      await matched.action(matched.params || {});
    } else {
      console.log("⚠️ Comando inválido. Ejemplos:");
      console.log("  npm run start GET products");
      console.log("  npm run start GET products/15");
      console.log("  npm run start POST products T-Shirt-Rex 300 remeras");
      console.log("  npm run start DELETE products/7");
    }
  } catch (err) {
    handleError(err);
  }
}

/// @notice Punto de entrada de la aplicación.
/// @dev Llama a `main()` para procesar los argumentos recibidos por CLI.
main();

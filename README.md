# Sistemas-Abiertos-ts
# GuitarLA-TS

## Vision General del Proyecto
- **Proposito:** Aplicacion web e-commerce para una tienda de guitarras (GuitarLA). Resuelve la necesidad de explorar un catalogo de productos en tiempo real, gestionar un carrito de compras interactivo (agregar, incrementar, decrementar, eliminar e indicar el total a pagar) y mantener la informacion guardada en el navegador.
- **Demostracion:** 
  ![captura de la aplicacion](./public/img/captura.png)
- **Despliegue:** https://github.com/Anshel502/GuitarLA-TSS.git

---

## Ficha Tecnica y Tecnologias
- **Lenguajes:** TypeScript / JavaScript ES6+ (Tipado de datos e interfaces).
- **Librerias UI & Framework:** React v18+, Bootstrap / Clases de utilidades CSS.
- **Entorno y Tooling:** Vite (Bundler y entorno de desarrollo), npm / pnpm / yarn.
- **Dependencias Clave:** Archivo de datos local (`db.ts`), React Hooks nativos.

---

## Arquitectura e Implementacion en React

### Hooks Nativos
El proyecto hace uso de los siguientes hooks nativos de React dentro de la logica del carrito:
- **`useState`**: Utilizado para gestionar el estado del carrito (`cart`), la carga del catalogo de guitarras (`data`), el total a pagar y estados auxiliares.
- **`useEffect`**: Implementado para la persistencia de datos. Cada vez que el estado de `cart` se modifica, un `useEffect` actualiza la clave `'cart'` en el `localStorage` del navegador.
- **`useMemo`**: Utilizado para memorizar el valor derivado `isEmpty` (`cart.length === 0`). Esto evita que se vuelva a calcular la longitud del arreglo en renders innecesarios, optimizando el rendimiento.

### Custom Hooks (Hooks Personalizados)
Se ha desacoplado toda la logica de negocio en un Custom Hook principal:
- **`useCart`**:
  - **Logica encapsulada**: Centraliza el almacenamiento local, la inicializacion desde `localStorage` (`initialCart`), la adicion de items (`handlerClick`), el incremento de cantidad hasta un limite (`max_items = 5`), el decremento de cantidad con limite inferior (`min_items = 1`), la eliminacion individual (`removeFromCart`), el vaciado total (`emptyCart`), el calculo del total acumulado (`calculateTotal`) y la verificacion de carrito vacio (`isEmpty`).
  - **Reutilizacion y Exposicion**: Se invoca en `App.tsx` y expone los siguientes datos y metodos:
    `{ cart, setCart, data, handlerClick, decreaseQuantity, increaseQuantity, removeFromCart, emptyCart, calculateTotal, isEmpty }`.

### Estructura de Componentes
- **Componentes Inteligentes vs Tontos**:
  - **`App` (Smart Component / Contenedor):** Utiliza el hook `useCart` y distribuye el estado y las funciones hacia los componentes hijos.
  - **`Header` (Dumb Component / Presentacional):** Recibe como props la informacion del carrito (`cart`, `total`, `isEmpty`) y las funciones para manipular las cantidades y eliminar items.
  - **`Guitar` (Dumb Component / Presentacional):** Recibe la informacion individual de cada guitarra (`guitar`) y la funcion `handlerClick` para agregar el producto al carrito.
- **Tipado de Props e Inmutabilidad**: Se garantiza la inmutabilidad del estado en las operaciones del carrito utilizando metodos como `.map()`, `.filter()` y el operador spread (`...`) al actualizar el estado con `setCart`.

---

## Patrones, Estado y Persistencia
- **Estrategia de manejo de estado**: Se aplica el patron de elevacion de estado (State Lifting) centralizado dentro del Custom Hook `useCart`, compartiendo datos a los componentes `Header` y `Guitar` mediante props desde `App`.
- **Persistencia en el navegador**: Se utiliza `window.localStorage` con la clave `'cart'`. Al cargar la aplicacion, la funcion `initialCart` lee los datos en formato JSON; ante cualquier cambio en `cart`, el efecto secundario `useEffect` guarda la version actualizada.
- **Manejo de estados asincronos y limites**: 
  - Reglas de negocio integradas: limite maximo de 5 unidades por producto (`max_items`) y limite minimo de 1 unidad (`min_items`). Si la cantidad llega a 0 al decrementar, el item se remueve automaticamente usando `removeFromCart`.
  - Manejo de coleccion vacia mediante la propiedad reactiva `isEmpty`.

---

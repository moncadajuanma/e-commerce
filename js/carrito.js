const notificacionCompraExitosa = document.querySelector("#buy-sucess");
const notificacionCarritoVacio = document.querySelector("#empty-cart");
let botonesEliminar = document.querySelectorAll(".delete-product");
let botonesRestar = document.querySelectorAll(".resta-producto");
let botonesSumar = document.querySelectorAll(".suma-producto");
const eventosCarrito = document.querySelector(".events-cart");
const precioTotal = document.querySelector("#amount-total");
const vaciarCarrito = document.querySelector("#drop-cart");
const comprarCarrito = document.querySelector("#btn-buy");
const imagenEmpty = document.getElementById("img-empty");
const imagenFull = document.getElementById("img-full");

const numeritoCompras = JSON.parse(localStorage.getItem("cantidad-compras"));
const carrito = JSON.parse(localStorage.getItem("carrito"));

if (carrito) {
  notificacionCarritoVacio.classList.add("disabled");
  eventosCarrito.classList.remove("disabled");
  cargarProductosCarrito(carrito);
  totalizarCompra(productosEnCarrito);
} else {
  eventosCarrito.classList.add("disabled");
  notificacionCarritoVacio.classList.remove("disabled");
  imagenEmpty.classList.remove("disabled");
  actualizarNumeroCarrito();
}

// funcion que carga los productos en el carrito cuando se agregarn
function cargarProductosCarrito(productos) {
  contenedorProductosCarrito.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("products-cart");
    let titulo = producto.titulo
    let cantidad = producto.cantidad
    let precio = producto.precio
    let subtotal = producto.precio * producto.cantidad
    let id = producto.id

    div.innerHTML = `
      <div class="product-cart">
      <img class="product-cart-img" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="product-cart-title">
        <small>Producto</small>
        <h3>${titulo}</h3>
      </div>
      <div class="product-cart-quantity">
        <small>Cantidad</small>
      <div class="quantity">
        <button class="resta-producto" id="${id}">-</button>
        <p>${cantidad}</p>
        <button class="suma-producto" id="${id}">+</button>
      </div>
        </div>
      <div class="product-cart-price">
        <small>Precio</small>
        <p>${precio.toLocaleString("es-CO")} COP</p>
      </div>
      <div class="product-cart-subtotal">
          <small>Subtotal</small>
          <p>${(subtotal).toLocaleString("es-CO")} COP</p>
      </div>
      <div>
        <button class="delete-product" id="${id}"><i class="bi bi-trash3"></i></button>
      </div>
      </div>`;
      contenedorProductosCarrito.append(div);
  });
  actualizarBotonEliminar();
  actualizarBotonRestar();
  actualizarBotonSumar();
}

// Funcion que captura los botones cada vez que se actaulizan
function actualizarBotonEliminar() {
  botonesEliminar = document.querySelectorAll(".delete-product");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", EliminarDelCarrito);
  });
}

function actualizarBotonRestar() {
  botonesRestar = document.querySelectorAll(".resta-producto");
  botonesRestar.forEach((boton) => {
    boton.addEventListener("click", disminuirProducto);
  });
}

function actualizarBotonSumar() {
  botonesSumar = document.querySelectorAll(".suma-producto");
  botonesSumar.forEach((boton) => {
    boton.addEventListener("click", aumentarProducto);
  });
}

// Funcion que me elimina un producto del carrito
function EliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAEliminar = productosEnCarrito.find((producto) => producto.id === idBoton);
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === productoAEliminar.id
    );
    //eliminamos el elemento del carrito
    productosEnCarrito.splice(index, 1);
        
    localStorage.setItem("cantidad-compras", JSON.stringify(productosEnCarrito.length)); // actualizamos cantidad de compras
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)); // Eliminamos el elemento del localstorage
    cargarProductosCarrito(productosEnCarrito); //cargamos de nuevo el carrito
    actualizarNumeroCarrito(); //Actualizamos el numero de carrito
    totalizarCompra();
    if(!productosEnCarrito.length) {
      notificacionCarritoVacio.classList.remove("disabled")
      eventosCarrito.classList.add("disabled");
    }
  } 
}

// Funcion que disminuye la cantidad del producto en el carrito de compras
function disminuirProducto(e) {
  const idBoton = e.currentTarget.id;
  const productoADisminuir = productosEnCarrito.find((producto) => producto.id === idBoton);
  if (productoADisminuir.cantidad > 0) {
    productoADisminuir.cantidad--;
    cantidadCompras--;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarNumeroCarrito();
    totalizarCompra();
    cargarProductosCarrito(productosEnCarrito);
  }
  if (productoADisminuir.cantidad === 0) {
    EliminarDelCarrito(e);
    localStorage.clear();
  }
}

// Funcion que aumenta la cantidad del producto en el carrito de compras
function aumentarProducto(e) {
  const idBoton = e.currentTarget.id;
  const productoAAumentar = productosEnCarrito.find((producto) => producto.id === idBoton);
  
  if (productoAAumentar.cantidad >= 0) {
    productoAAumentar.cantidad++;
    cantidadCompras++;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarNumeroCarrito();
    totalizarCompra();
    cargarProductosCarrito(productosEnCarrito);
  }
}

// Funcion que busca los subtotales de cada producto y los suma
function totalizarCompra() {
  let totalCompra = productosEnCarrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
  precioTotal.innerHTML = totalCompra.toLocaleString("es-CO");
  localStorage.setItem("total-compra", JSON.stringify(totalCompra));
}

// Funcion que simula la compra de lo que hay en el carrito
comprarCarrito.addEventListener("click", () => {
  let compras = JSON.parse(localStorage.getItem("cantidad-compras"));
  let valorCarrito = JSON.parse(localStorage.getItem("cantidad-compras"));
  if (compras > 0 && valorCarrito > 0 ) {
    localStorage.clear();
    notificacionCompraExitosa.classList.remove("disabled");
    contenedorProductosCarrito.classList.add("disabled");
    numeroCantidadCompras.innerHTML = 0;
    numeroCantidadCompras.classList.remove("disabled");
    eventosCarrito.classList.add("disabled");
    imagenFull.classList.remove("disabled");
    cargarProductosCarrito();
  } else alert("Agregue al menos 1 cantidad de 1 producto")
});

// Funcion vacia el carrito por completo eliminando el localstorage
vaciarCarrito.addEventListener("click", () => {
  // localStorage.clear();
  numeroCantidadCompras.innerHTML = 0;
  numeroCantidadCompras.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  notificacionCarritoVacio.classList.remove("disabled");
  imagenEmpty.classList.remove("disabled");
  cargarProductosCarrito();
});


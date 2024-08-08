const numeritoCompras = JSON.parse(localStorage.getItem("cantidad-compras"));
const notificacionCompraExitosa = document.querySelector("#buy-sucess");
let botonesEliminar = document.querySelectorAll(".delete-product");
const eventosCarrito = document.querySelector(".events-cart");
const precioTotal = document.querySelector("#amount-total");
const notificacionCarritoVacio = document.querySelector("#empty-cart");
const vaciarCarrito = document.querySelector("#drop-cart");
const comprarCarrito = document.querySelector("#btn-buy");

// const carrito = JSON.parse(localStorage.getItem("carrito")); // NO HACE FALTA, porque se puede utilizar variables de otros archivos.

if (productosEnCarrito) {
  notificacionCarritoVacio.classList.add("disabled");
  eventosCarrito.classList.remove("disabled");
  cargarProductosCarrito(productosEnCarrito);
  totalizarCompra(productosEnCarrito);
} else {
  notificacionCarritoVacio.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
}

// Funcion que busca los subtotales de cada procto y los suma]
function totalizarCompra() {
  let totalCompra = productosEnCarrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );
  precioTotal.innerHTML = totalCompra.toLocaleString("es-CO");
  localStorage.setItem("total-compra", JSON.stringify(totalCompra));
}

// funcion que muestra los productos en el carrito cuando
function cargarProductosCarrito(productos) {
  contenedorProductosCarrito.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("products-cart");

    div.innerHTML = `
      <div class="product-cart">
      <img class="product-cart-img" src="${producto.imagen}" alt="${
      producto.titulo
    }">
      <div class="product-cart-title">
        <small>Producto</small>
        <h3>${producto.titulo}</h3>
      </div>
      <div class="product-cart-quantity">
        <small>Cantidad</small>
        <button id="sum-${producto.id}">+</button>
        <p>${producto.cantidad}</p>
        <button id="res-${producto.id}">-</button>
        </div>
      <div class="product-cart-price">
        <small>Precio</small>
        <p>${producto.precio.toLocaleString("es-CO")} COP</p>
      </div>
      <div class="product-cart-subtotal">
          <small>Subtotal</small>
          <p>${(producto.precio * producto.cantidad).toLocaleString(
            "es-CO"
          )} COP</p>
      </div>
      <div>
        <button class="delete-product" id="${
          producto.id
        }"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
      `;
    contenedorProductosCarrito.append(div);
  });
  actualizarBtnEliminar();
}

// Funcion que me elimina todo del carrito
vaciarCarrito.addEventListener("click", () => {
  localStorage.clear();
  notificacionCarritoVacio.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled");
  numeroCantidadCompras.classList.add("disabled");
});

// Funcion que simula la compra de lo que hay en el carrito
comprarCarrito.addEventListener("click", () => {
  localStorage.clear();
  notificacionCompraExitosa.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled");
});

function actualizarBtnEliminar() {
  botonesEliminar = document.querySelectorAll(".delete-product");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", EliminarDelCarrito);
  });
}

function EliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAEliminar = productosEnCarrito.find(
    (producto) => producto.id === idBoton
  );
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === productoAEliminar.id
    );
    //eliminamos el elemento del carrito
    productosEnCarrito.splice(index, 1);
        
    localStorage.setItem("cantidad-compras", JSON.stringify(productosEnCarrito.length)); // actualizamos
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





const numeritoCompras = JSON.parse(localStorage.getItem("cantidad-compras"))
const notificacionCompraExitosa = document.querySelector("#buy-sucess");
let botonesEliminar = document.querySelectorAll(".delete-product");
const eventosCarrito = document.querySelector(".events-cart");
const precioTotal = document.querySelector("#amount-total");  
const carritoVacio = document.querySelector("#empty-cart");
const vaciarCarrito = document.querySelector("#drop-cart");
const comprarCarrito = document.querySelector("#btn-buy");



const carrito = JSON.parse(localStorage.getItem("carrito"));


if (carrito) {
  carritoVacio.classList.add("disabled");
  eventosCarrito.classList.remove("disabled");
  cargarProductosCarrito(carrito);
  totalizarCompra(carrito);

} else {
  carritoVacio.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
}

function totalizarCompra() {
  let totalCompra = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
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
      <img class="product-cart-img" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="product-cart-title">
        <small>Producto</small>
        <h3>${producto.titulo}</h3>
      </div>
      <div class="product-cart-quantity">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>
      </div>
      <div class="product-cart-price">
        <small>Precio</small>
        <p>${producto.precio.toLocaleString("es-CO")} COP</p>
      </div>
      <div class="product-cart-subtotal">
          <small>Subtotal</small>
          <p>${(producto.precio * producto.cantidad).toLocaleString("es-CO")} COP</p>
      </div>
      <div>
        <button class="delete-product" id="${producto.id}"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
      `;
    contenedorProductosCarrito.append(div);
  });
  actualizarBtnEliminar();
}

vaciarCarrito.addEventListener("click", () => { localStorage.clear();
  carritoVacio.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled");
  numeroCantidadCompras.classList.add("disabled");
})

comprarCarrito.addEventListener("click", () => { localStorage.clear();
  notificacionCompraExitosa.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled");
  numeroCantidadCompras.classList.add("disabled");
})

function actualizarBtnEliminar() {
  botonesEliminar = document.querySelectorAll(".delete-product");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", EliminarDelCarrito);
  });
}

// function EliminarDelCarrito() {
//   const idBoton = e.currentTarget.id;
//   const productoAEliminar = carrito.find(
//     (producto) => producto.id === idBoton
//   );
//   //Si el producto que se elimina tiene cantidad mayor que 1, se disminuye la cantidad en 1
//   if (carrito.some((producto) => producto.id === idBoton)) {
//     const index = carrito.findIndex(producto => producto.cantidad === idBoton);
//     carrito[index].cantidad--;
//     cantidadCompras--;

//   }
//   else {  //si el producto no existe en el carrito, se agrega al array del carrito
//     productoAgregado.cantidad = 1;
//     productosEnCarrito.push(productoAgregado);
//     cantidadCompras++;
//   }
//   actualizarNumeroCarrito();
//   localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
// }
// }
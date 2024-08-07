
const numeritoCompras = JSON.parse(localStorage.getItem("cantidad-compras"))
const carrito = JSON.parse(localStorage.getItem("carrito"));
const eventosCarrito = document.querySelector(".events-cart");
const precioTotal = document.querySelector("#amount-total");  
const carritoVacio = document.querySelector("#empty-cart");
const vaciarCarrito = document.querySelector("#drop-cart");

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
}


// funcion que muestra los productos en el carrito cuando se agregan
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
        <button class="delete-product-cart" id="${producto.id}"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
      `;
    contenedorProductosCarrito.append(div);
  });
}

vaciarCarrito.addEventListener("click", () => { localStorage.clear();
  carritoVacio.classList.remove("disabled");
  eventosCarrito.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled");
  numeroCantidadCompras.classList.add("disabled");
})
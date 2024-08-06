
numeroCantidadCompras = JSON.parse(localStorage.getItem("cantidad-compras"))
productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
const eventosCarrito = document.getElementById("events-car");
const precioTotal = document.getElementById("total-price");  
const carritoVacio = document.getElementById("empty-cart");  //Notificacion de carrito vacio


// funcion que muestra los productos en el carrito cuando se agregan
function cargarProductosCarrito(productosEnCarrito) {
  contenedorProductosCarrito.innerHTML = "";

  productosEnCarrito.forEach((producto) => {
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
        <p>${producto.precio}</p>
      </div>
      <div class="product-cart-subtotal">
          <small>Subtotal</small>
          <p>${producto.precio * producto.cantidad}</p>
      </div>
      <div>
        <button class="delete-product-cart"><i class="bi bi-trash3"></i></button>
      </div>
    </div>
      `;
    contenedorProductosCarrito.append(div);
  });
}

// mostrarProductoCarrito();


if (numeroCantidadCompras > 0) {
  mostrarProductoCarrito()
} else {
  carritoVacio.classList.remove("disabled");
  numeroCantidadCompras.classList.add("disabled");
  contenedorProductosCarrito.classList.add("disabled")
  eventosCarrito.classList.add("disabled")
  numeroCantidadCompras.innerText = numeroCantidadCompras;
}

function mostrarProductoCarrito() {
  carritoVacio.classList.add("disabled");
  numeroCantidadCompras.classList.remove("disabled");
  contenedorProductosCarrito.classList.remove("disabled")
  eventosCarrito.classList.remove("disabled")
  numeroCantidadCompras.innerText = numeroCantidadCompras;
}

console.log(productosEnCarrito);
console.log(numeroCantidadCompras);
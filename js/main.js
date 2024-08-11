const contenedorProductosCarrito = document.querySelector("#products-cart"); //container del carrito
let numeroCantidadCompras = document.querySelector(".cantidad-compras");  //numerito carrito
let contenedorProductos = document.querySelector("#products-container");  // container de productos
const botonesCategorias = document.querySelectorAll(".btn-category");  //botones de menu categoria
let botonesAgregar = document.querySelectorAll(".product-add");
const titulo = document.querySelector("#main-title");
let productosEnCarrito = [];
let cantidadCompras;

let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
let numeritoLocalStorage = JSON.parse(localStorage.getItem("cantidad-compras"));

if (carritoLocalStorage) {
  productosEnCarrito = carritoLocalStorage;
  numerito = numeritoLocalStorage;
  actualizarNumeroCarrito();
  cargarProductos(productos);
} else {
  cargarProductos(productos);
  actualizarNumeroCarrito();
}

// Funcion que carga los todos los productos dependiendo la categoria que se seleccione
function cargarProductos(productos) {
  // contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <img class="product-img" src="${producto.imagen}" alt="${producto.imagen}">
    <div class="product-datail">
      <h3 class="product-title">${producto.titulo}</h3>
      <p class="product-price">$ ${producto.precio.toLocaleString("es-CO")}</p>
      <button class="product-add" id="${producto.id}" >Agregar al Carrito</button>
    </div>
    `;
    contenedorProductos.append(div);
  });
  actualizarBtnAgregar();
}

// Funcion para capturar los botones de agregar cada vez que se actualizan
function actualizarBtnAgregar() {
  botonesAgregar = document.querySelectorAll(".product-add");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// Evento para escuchar los botones de menu y mostrar las categorias
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => {
      boton.classList.remove("active");
      e.currentTarget.classList.add("active");
      titulo.innerHTML = e.currentTarget.id;
    });
    contenedorProductos.innerHTML = "";
    // Filtra los objetos que tengan la categoria del boton donde se da click
    const productosCategoria = productos.filter((producto) => {
      return producto.categoria.id === e.currentTarget.id;
    });
    if (e.currentTarget.id != "todos") cargarProductos(productosCategoria);
    else {
      cargarProductos(productos);
      titulo.innerHTML = "todos los productos";
    }
  });
});

// Funcion para agregar los productos al carrito
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id === idBoton);
  //Si el producto que se agrega ya existe en el carrito, se incrementa la cantidad en 1
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
    cantidadCompras++;
  }
  else {  //si el producto no existe en el carrito, se agrega al array del carrito
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
    cantidadCompras++;
  }
  actualizarNumeroCarrito();
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

// Funcion que me acumula las compras y las muestra en la notificacion del carrito
function actualizarNumeroCarrito() {
  let numerito = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
  numeroCantidadCompras.innerHTML = numerito;
  numeroCantidadCompras.classList.remove("disabled");
  localStorage.setItem("cantidad-compras", JSON.stringify(numerito));
}

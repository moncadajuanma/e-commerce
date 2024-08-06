// PRODUCTOS
const productos = [
  // Abrigos
  {
    id: "abrigo-01",
    titulo: "Abrigo 01",
    imagen: "img/abrigos/01.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos",
    },
    precio: 135000,
  },
  {
    id: "abrigo-02",
    titulo: "Abrigo 02",
    imagen: "img/abrigos/02.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos",
    },
    precio: 110000,
  },
  {
    id: "abrigo-03",
    titulo: "Abrigo 03",
    imagen: "img/abrigos/03.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos",
    },
    precio: 159900,
  },
  {
    id: "abrigo-04",
    titulo: "Abrigo 04",
    imagen: "img/abrigos/04.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos",
    },
    precio: 140000,
  },
  {
    id: "abrigo-05",
    titulo: "Abrigo 05",
    imagen: "img/abrigos/05.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos",
    },
    precio: 125000,
  },
  // Camisetas
  {
    id: "camiseta-01",
    titulo: "Camiseta 01",
    imagen: "img/camisetas/01.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 29900,
  },
  {
    id: "camiseta-02",
    titulo: "Camiseta 02",
    imagen: "img/camisetas/02.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 40000,
  },
  {
    id: "camiseta-03",
    titulo: "Camiseta 03",
    imagen: "img/camisetas/03.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 35600,
  },
  {
    id: "camiseta-04",
    titulo: "Camiseta 04",
    imagen: "img/camisetas/04.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 31000,
  },
  {
    id: "camiseta-05",
    titulo: "Camiseta 05",
    imagen: "img/camisetas/05.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 39900,
  },
  {
    id: "camiseta-06",
    titulo: "Camiseta 06",
    imagen: "img/camisetas/06.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 29900,
  },
  {
    id: "camiseta-07",
    titulo: "Camiseta 07",
    imagen: "img/camisetas/07.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 38900,
  },
  {
    id: "camiseta-08",
    titulo: "Camiseta 08",
    imagen: "img/camisetas/08.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 45500,
  },
  // Pantalones
  {
    id: "pantalon-01",
    titulo: "Pantalón 01",
    imagen: "img/pantalones/01.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 90500,
  },
  {
    id: "pantalon-02",
    titulo: "Pantalón 02",
    imagen: "img/pantalones/02.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 89900,
  },
  {
    id: "pantalon-03",
    titulo: "Pantalón 03",
    imagen: "img/pantalones/03.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 115500,
  },
  {
    id: "pantalon-04",
    titulo: "Pantalón 04",
    imagen: "img/pantalones/04.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 120000,
  },
  {
    id: "pantalon-05",
    titulo: "Pantalón 05",
    imagen: "img/pantalones/05.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 100000,
  },
];

const contenedorProductosCarrito = document.getElementById("products-cart"); //container del carrito
let numeroCantidadCompras = document.getElementById("cantidad-compras");  //numerito carrito
let contenedorProductos = document.getElementById("products-container");  // container de productos
const botonesCategorias = document.querySelectorAll(".btn-category");  //botones de menu categoria
let botonesAgregar = document.querySelectorAll(".product-add");
const titulo = document.getElementById("main-title");
let productosEnCarrito = [];
let cantidadCompras = 0;


// Funcion que carga los todos los productos dependiendo la categoria que se seleccione
function cargarProductos(productos) {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <img class="product-img" src="${producto.imagen}" alt="${producto.imagen}">
    <div class="product-datail">
      <h3 class="product-title">${producto.titulo}</h3>
      <p class="product-price">$ ${producto.precio}</p>
      <button class="product-add" id="${producto.id}" >Agregar</button>
    </div>
    `;
    contenedorProductos.append(div);
  });
  actualizarBtnAgregar();
}



// Carga Inicial de todos los productos
cargarProductos(productos);


// Funcion para capturar los botones de agregar cada vez que se actualizan
function actualizarBtnAgregar() {
  botonesAgregar = document.querySelectorAll(".product-add");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// Funcion para agregar los productos al carrito
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );
  //Si el producto que se agrega ya existe en el carrito, se incrementa la cantidad en 1
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
    actualizarNumeroCarrito();
    guardarCarritoStorage(productosEnCarrito);
  }
  else {  //si el producto no existe en el carrito, se agrega al array del carrito
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
    actualizarNumeroCarrito();
    guardarCarritoStorage(productosEnCarrito);
  }
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

function actualizarNumeroCarrito() {
  cantidadCompras++;
  numeroCantidadCompras.innerHTML = cantidadCompras;
  numeroCantidadCompras.classList.remove("disabled");
  localStorage.setItem("cantidad-compras", JSON.stringify(cantidadCompras));
}

function guardarCarritoStorage(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

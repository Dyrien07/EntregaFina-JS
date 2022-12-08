let losProductos = await getProductos();
let carrito = [];
const carritoCompras = document.getElementById("Carrito");
const cards = document.getElementById("cards");
const compras = document.getElementById("carrito");

export function mostrarinfo(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}
export function Logeado(elementosToggeables, usuario) {
  if (usuario) {
    saludar(usuario);
    mostrarinfo(elementosToggeables, "d-none");
  }
}
async function mostarCards(productos) {
  cards.innerHTML = "";
  productos.forEach((element) => {
    let html = `<div class="card" style="width; id="card${element.nombre}">
      <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
      <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">$${element.precio}</p>
        <p class="card-text ${element.class}">Stock:${element.Stock}</p>
        <button class="btn btn-primary addcar" id="btn${element.id}" value="${element.id}">Agregar al Carrito</button>
      </div>
    </div>`;
    cards.innerHTML += html;
  });
  const btns = document.querySelectorAll(".addcar");
  btns.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      agregarAlCarrito(e.target.value, carrito);
      mostrarCarrito(carrito);
    });
  });
}
export function saludar(usuario) {
  Toastify({
    text: "Bienvenido " + usuario.name,
    position: "center",
    gravity: "top",
    duration: 3000,
  }).showToast();
}
export function guardarDatos(datos, storage) {
  const usuario = {
    name: datos.nombre,
    user: datos.usuario,
    pwd: datos.pwd,
  };
  storage.setItem("usuario", JSON.stringify(usuario));
}
function borrarDatos() {
  localStorage.clear();
  sessionStorage.clear();
}
export function recuperarDatosUsuario(storage) {
  return JSON.parse(storage.getItem("usuario"));
}
async function agregarAlCarrito(unProducto) {
  let stockActual = losProductos[unProducto - 1].Stock;
  if (stockActual == 0) {
    Toastify({
      text: "Imposible, Realizar no tenemos mas stock disponible",
      className: "info",
      style: {
        background: "red",
      },
    }).showToast();
  } else {
    const producto = losProductos[unProducto - 1];
    let productoNuevoStock = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      Stock: producto.Stock - 1,
      class: producto.class,
    };
    let nuevosProductos = losProductos.filter(
      (product) => product.id !== producto.id
    );
    nuevosProductos.push(productoNuevoStock);
    losProductos = nuevosProductos;
    carrito.push(producto);
    mostrarCarrito(carrito);
    mostrarProductos();
  }
}
async function getProductos() {
  const respose = await fetch("./Productos.JSON");
  const result = await respose.json();
  return result;
}
function mostrarCarrito() {
  if (carrito) {
    carritoCompras.innerHTML = "";
    carrito.forEach((element) => {
      let html = `<div class="card" style="width; id="card${losProductos[element.id-1].nombre}">
      <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
      <div class="card-body">
        <h5 class="card-title">${losProductos[element.id-1].nombre}</h5>
        <p class="card-text">$${losProductos[element.id-1].precio}</p>
        <button class="btn btn-primary addcar" id="btn${losProductos[element.id-1]}" value="${losProductos[element.id-1]}">Eliminar Del carrito</button>
      </div>
    </div>`;

      carritoCompras.innerHTML += html;
    });
  }
}
export function validarUsuario(user, pwd, datos) {
  let encontrado = datos.find((datos) => datos.usuario === user);
  if (encontrado === undefined) {
    Toastify({
      text: "Credenciales Incorrectas",
      position: "center",
      gravity: "top",
      duration: 5000,
      style: {
        background: "red",
      },
      avatar: "./assets/x-circle.svg",
    }).showToast();
    return false;
  } else {
    if (encontrado.pwd != pwd) {
      Toastify({
        text: "Credenciales Incorrectas",
        position: "center",
        gravity: "top",
        duration: 5000,
        style: {
          background: "red",
        },
        avatar: "./assets/x-circle.svg",
      }).showToast();
      return false;
    } else {
      return encontrado;
    }
  }
}
export const mostrarProductos = async () => {
  mostarCards(losProductos);
};
export const vaciarCarrito = () => {
  carrito.forEach((producto) => {
    let auxProductos = losProductos.filter(
      (product) => product.id !== producto.id
    );
    const auxObj = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      Stock: producto.Stock + losProductos[producto.id - 1].Stock,
      class: producto.class,
    };
    auxProductos.push(auxObj);
    losProductos = auxProductos;
  });
  carrito = [];
  carritoCompras.innerHTML = "";
};

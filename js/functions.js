let losProductos = await getProductos();
export let carrito = [];
const carritoCompras = document.getElementById("Carrito");
const cards = document.getElementById("cards");
const compras = document.getElementById("carrito");
export const elementosToggeables = document.querySelectorAll(".toggeable");
let i = 0;

export function mostrarinfo(array, clase) {
  array.forEach((element) => {
    element.classList.toggle(clase);
  });
}
export function Logeado(usuario) {
  if (usuario) {
    saludar(usuario);
    mostrarinfo(elementosToggeables, "d-none");
  }
}
async function mostarCards(productos) {
  cards.innerHTML = "";
  productos.forEach((element) => {
    i++;
    let html = `<div class="card" style="width; id="card${element.nombre}">
      <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
      <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">$${element.precio}</p>
        <button class="btn btn-primary addcar" id="${element.id}" value="${i}">Agregar al Carrito</button>
      </div>
    </div>`;
    cards.innerHTML += html;
  });
  const btns = document.querySelectorAll(".addcar");
  btns.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      agregarAlCarrito(e.target.id -1, carrito);
      mostarCards(losProductos);
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
export function borrarDatos() {
  localStorage.clear();
  sessionStorage.clear();
}
export function recuperarDatosUsuario(storage) {
  return JSON.parse(storage.getItem("usuario"));
}
async function agregarAlCarrito(unProducto) {
 carrito.push(losProductos[unProducto])
 console.log(carrito)
}
async function getProductos() {
  const respose = await fetch("./Productos.JSON");
  const result = await respose.json();
  return result;
}
function mostrarCarrito() {
  let i = -1;
  carritoCompras.innerHTML = "";
  carrito.forEach((element) => {
    i++;
    let html = `<div class="card" style="width; id="card${element.nombre}">
      <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
      <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">$${element.precio}</p>
        <button class="btn btn-primary removecar" id="btn${
          element.id - 1
        }" value="${i}">Eliminar Del carrito</button>
      </div>
    </div>`;

    carritoCompras.innerHTML += html;
  });

  const btnseliminar = document.querySelectorAll(".removecar");

  btnseliminar.forEach((botonEli) => {
    botonEli.addEventListener("click", (e) => {
      e.preventDefault();
      eliminarProductoCarrito(e.target.value);
      mostrarCarrito(carrito);
    });
  });
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
  carrito = [];
  carritoCompras.innerHTML = "";
};

function eliminarProductoCarrito(unaPosicion) {
  let posMas1 = parseInt(unaPosicion)+1;
  console.log("la poss " + unaPosicion );
  console.log("elimino hasta :  " +  posMas1);
  carrito.splice(unaPosicion , parseInt( unaPosicion)+1 );

console.log(carrito.length);

  
   
}

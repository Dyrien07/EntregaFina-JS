import {elementosToggeables, mostrarinfo, vaciarCarrito, guardarDatos, saludar, mostrarProductos, Logeado, recuperarDatosUsuario, validarUsuario,carrito,borrarDatos } from "./functions.js";
// Constantes
const usuario = document.getElementById("usuario");
const pwd = document.getElementById("pw");
const recordarme = document.getElementById("chklogin");
const btnlogin = document.getElementById("btnlogin");

const btnFin = document.getElementById("btnFin");
const btnVaciar = document.getElementById("btnVaciar");
const btndeslog = document.getElementById("btn-deslog");
mostrarProductos();



const usuarios = [
  {
    usuario: "admin",
    pwd: "admin",
    nombre: "Nacho",

  }
];

btndeslog.addEventListener("click", (event)=> {
borrarDatos();
window.location.reload();

})
btnlogin.addEventListener("click", (event) => {
  event.preventDefault();
  if (!usuario.value || !pwd.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Complete todos los campos",
    });
  } else {
    let data = validarUsuario(usuario.value, pwd.value, usuarios);

    if (!data) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay registros",
      });
    } else {
      if (recordarme.checked) {

        guardarDatos(data,localStorage);
        saludar(recuperarDatosUsuario(localStorage));
      } else {
        guardarDatos(data, sessionStorage);
        saludar(recuperarDatosUsuario(sessionStorage));
      }
      mostrarinfo(elementosToggeables, "d-none");
    }
  }
});

window.onload = () => {
  
  Logeado(recuperarDatosUsuario(localStorage));
 
};
window.onload()
btnVaciar.addEventListener("click", (event) => {
  event.preventDefault();
  vaciarCarrito();
});

btnFin.addEventListener("click", async (event) => {
  event.preventDefault();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Desea Terminar la compra?",
      text: "Gracias por visitar la pagina",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        let compraTotal = carrito.reduce((acc, item) => {
          return acc + item.precio;
        }, 0);

        swalWithBootstrapButtons.fire(
          "success",
          "El total de su compra es " + compraTotal,
          "success"
        );
        carrito = [];
        mostrarCarrito(carrito);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Siga Comprando :)",
          "error"
        );
      }
    });
});
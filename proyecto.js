const contenedorSillas = document.querySelector("#contenedorSillas");
const contenedorAgregadas = document.querySelector("#contenedorAgregadas");
let carrito = [];

//MOSTRAR SILLAS
function mostrarSillas() {
  for(const silla of sillas) {
    let caja = document.createElement("div");
    caja.setAttribute("id", "contenedor");
    caja.innerHTML = `
    <div class="estilo">
    <img class="imagenSilla" src="${silla.img}"
    </div>
    <h2>${silla.nombre}</h2>
    <h3>$${silla.precio}</h3>
    <button class="boton" id="btn${silla.id}">Agregar al carrito</button>`
    contenedorSillas.append(caja);
    let btnFavorito = document.getElementById(`btn${silla.id}`)
    btnFavorito.onclick = function () {
      agregarCarrito(silla.id);
      let arreglo_JSON = JSON.stringify(carrito);
      localStorage.setItem("carrito" , arreglo_JSON);
    }
  }
}
//AGREGAR CARRITO
function agregarCarrito(id) {
  const sillaAgregada = sillas.find(function (silla) {
    return silla.id === id;
  });
  carrito.push(sillaAgregada);
  mostrarSillasAgregadas(carrito);
}
//MOSTRAR CARRITO
function mostrarSillasAgregadas(agregadas) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  Toastify({
    text: `Agregado al carrito!`,
    duration: 1700,
    position: 'left',
    gravity: "top",
    style: {
      background: "linear-gradient(to right, #0e7c9e, blue)",
    },
}).showToast()
  contenedorAgregadas.innerHTML = "";
  agregadas.forEach(function (silla) {
    const divSilla = document.createElement("div");
    divSilla.classList.add("estilo_carro");
    const imagenSilla = document.createElement("img");
    imagenSilla.src = silla.img;
    imagenSilla.className = "imagenSilla";
    const tituloSilla = document.createElement("h2");
    tituloSilla.textContent = silla.nombre;
    const parrafoSilla = document.createElement("h3");
    parrafoSilla.textContent = `$${silla.precio}`;
    const btn_eliminar = document.createElement("button");
    btn_eliminar.textContent = "borrar";
    btn_eliminar.classList.add("borrar");
    sumaCarrito();
    divSilla.appendChild(imagenSilla);
    divSilla.appendChild(parrafoSilla);
    divSilla.appendChild(tituloSilla);
    divSilla.appendChild(btn_eliminar);
    contenedorAgregadas.appendChild(divSilla);
    let botones_borrar = document.getElementsByClassName("borrar");
    for(let btn of botones_borrar){
      btn.addEventListener("click" , eliminar)
    }
  }
)}

function eliminar (e){
  let target = e.target.parentNode;
  let nombres = e.target.parentNode.getElementsByTagName("h2");
  target.remove()
  for(let nombre of nombres){
    carrito = carrito.filter((e) => e.nombre !== nombre.innerText)
    sumaCarrito();
    return carrito;
  }
mostrarSillasAgregadas(carrito);
}

function sumaCarrito() {
  let venta_total = carrito.reduce(calcular_total , 0 );
  let total = document.getElementById("totalCarrito");
  total.innerHTML = `El total a pagar es : $${venta_total}`;
}

function calcular_total(acu, producto) {
  acu = acu + parseInt(producto.precio);
  return acu
}
//FILTER
const sillasFiltradas = sillas.filter(function(silla){
  return silla.precio < 56000;
})

function cargarStorage() {
let storage = JSON.parse(localStorage.getItem("carrito"));
if(storage) {
  Swal.fire(
    'Tu carrito te espera!',
    'success'
  );
  carrito = storage;
  mostrarSillasAgregadas(carrito);
  localStorage.clear();
  }
}
cargarStorage();
mostrarSillas();

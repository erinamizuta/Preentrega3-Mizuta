let carrito = [];
let productos = [];
let gestor;

/*class Producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
} 
*/
/*if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}*/

const listadoProductos = "json/productos.json";
const contenedorProductos = document.getElementById("contenedorProductos");

document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse( localStorage.getItem('carrito') ) || [];
    gestor = new gestorProductos();
    gestor.iniciar();
}) 

function agregarAlCarrito (id){
    let card = document.querySelector('#row_'+ id);
    let producto = new Producto (   id,
                                card.querySelector('h3').textContent,
                                card.querySelector('p').textContent,
                                card.querySelector('img').src
                                );
    gestor.agregCarrito(producto);
}

function eliminarProd(id) {
	gestor.eliminarProducto(id);
}

/*const mostrarProductos = () => {
    productos.forEach((producto) =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card"> 
                <img src="${producto.img}" class="card-img-top imgProductos alt="${producto.nombre}">
                <div class="card-body">
                <h3 class="card-tittle"> ${producto.nombre} </h3>        
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id);
        })
    })
}

const agregarAlCarrito = (id) => {
    const producto = productos.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
} 

//mostrarProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card"> 
                <img src="${producto.img}" class="card-img-top imgProductos alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-tittle"> ${producto.nombre} </h5>        
                <p class="card-text"> ${producto.Precio} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar producto </button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", ()=>{
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito",JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", ()=>{
    eliminarCarrito();
})

const eliminarCarrito = ()=>{
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
} 

const total = document.getElementById("total");

const calcularTotal = ()=>{
    let totalCompra = 0;
    carrito.forEach((producto)=> {
        totalCompra += producto.precio *producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}
*/

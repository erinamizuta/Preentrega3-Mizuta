class Producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }
}

const sueter = new Producto(1, "Sueter 'Cardigan'", 4500, "img/sueter.png");
const buzoFolklore = new Producto(2, "Buzo 'Folklore'", 5500, "img/buzoFolk.png");
const totebagExile = new Producto(3, "Totebag 'Exile'", 1500, "img/totebagEx.png");
const buzoAugust = new Producto(4, "Buzo 'August'", 5500, "img/buzoAug.png");
const remeraFolklore = new Producto(5, "Remera 'Folklore'", 2000, "img/remeraFolk.png");
const remeraSeven = new Producto(6, "Remera 'Seven'", 2000, "img/remeraSev.png");
const buzoHoax = new Producto(7, "Buzo 'Hoax'", 4500, "img/buzoHoax.png");
const cd = new Producto(8, "CD", 4700, "img/cd.png");

const productos = [sueter, buzoFolklore, totebagExile, buzoAugust, remeraFolklore, remeraSeven, buzoHoax, cd];

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
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
    const producto = productos.find((producto) =>producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(producto);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

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
                <p class="card-text"> ${producto.precio} </p>
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


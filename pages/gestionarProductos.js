class gestorProductos {
    iniciar (){
        fetch(listadoProductos)
        .then(respuesta => respuesta.json())
        .then(datos => {
            datos.forEach(producto => {
                const card = document.createElement("div");
                card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
                card.setAttribute('id', 'row_'+ producto.id);
                card.innerHTML = 
                                `
                            <div class="card"> 
                                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3 class="card-tittle"> ${producto.nombre} </h3>        
                                    <p class="card-text"> $${producto.Precio} </p>
                                    <a href="javascript:agregarAlCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</a>
                                </div>
                            </div>
                            `
                contenedorProductos.appendChild(card);
            })

        })

    }
    agregCarrito(infoProducto) {
		const existeProducto = carrito.some(producto => producto.id === infoProducto.id);
		if (existeProducto) {
			const articulos = carrito.map(producto => {
				if (producto.id === infoProducto.id) {
					producto.cantidad++;
					return producto;
				} else {
					return producto;
				}
            
                carrito = articulos;
			});
			this.mostrar_notificacion('Se actualizó la cantidad del producto', 2000, 'bottom');
		} else {
			carrito.push(infoProducto);

			this.mostrar_notificacion('Se agregó el producto al carrito', 3000, 'bottom');
		}

		this.actualizarCarrito();
	}
    contarProductos() {
		let contadorProductos = 0;

		carrito.forEach(producto => {
			contadorProductos = contadorProductos + parseInt(producto.cantidad);
		});

		return contadorProductos;
	}

    actualizarCarrito(){
        this.actualizarContador();
        this.mostrarCarrito();
        this.guardarCarrito();
    }

    actualizarContador(){
        let totalProductos = this.contarProductos();
        let countCarrito = document.querySelector('#badgeCarrito');

        countCarrito.innerHTML = totalProductos;
    }

    mostrarCarrito() {
		let detalleCarrito = document.querySelector('#idCarrito');

		detalleCarrito.innerHTML = '';

		let total = 0;

		carrito.forEach(producto => {
			const { id, nombre, precio, img, cantidad } = producto;

			const row = document.createElement('div');
			row.classList.add('row');

			total += parseInt(precio);

			row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${img}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${nombre}
                        </div>

                        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                            $ ${precio}
                        </div>

                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${cantidad}
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminarProd(${id})">
                                <i class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
            `;

			detalleCarrito.appendChild(row);
		});

		let row = document.createElement('div');
		row.classList.add('row');

		row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;

		detalleCarrito.appendChild(row);
	}

    eliminarProducto(id) {
		Swal.fire({
			title: '"Estás seguro de eliminar el producto?"',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: `Cancelar`,
		}).then(result => {
			if (result.isConfirmed) {
				carrito = carrito.filter(articulo => articulo.id != id);
				this.actualizarCarrito();

				this.mostrar_notificacion('El artículo fue eliminado del carrito', 3000, 'bottom');
			}
		});
	}

    

}




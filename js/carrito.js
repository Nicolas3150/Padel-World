function cargarCarrito() {
    const listCarrito = document.querySelector('.productos-carrito');
    listCarrito.textContent = "";
    carrito.forEach((p) => {
        const add = document.createElement('div');
        add.setAttribute('class', 'producto');

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = "x"
        deleteBtn.setAttribute("id", p.producto.id);
        deleteBtn.addEventListener('click', eliminarProducto);

        listCarrito.appendChild(deleteBtn);

        let { producto: { id: PId, nombre: Pnombre, precio: PPrecio, img: Pimg }, cantidad: PCantidad } = p;
        add.innerHTML = `<div class="description-carrito-producto">
                            <p>${Pnombre}</p>
                            <div class="carrito-cantidad">
                                <p> <input type="number" class="inputNumber" id="cant${PId}" value="${PCantidad}" disabled> x ${PPrecio}</p>
                            </div>
                        </div>
                        <div class="img-carrito-producto" id="img${PId}">
                        </div>`;
        listCarrito.appendChild(add);
        const divImg = document.querySelector(`#img${PId}`);
        let img = document.createElement('img');
        const path = window.location.pathname;
        ((path.includes('index')) || path ==='/Padel-World/' || path.length === 1) ? img.setAttribute("src", Pimg) :
            img.setAttribute("src", "../" + Pimg);
        divImg.appendChild(img);
    });
    let total = document.querySelectorAll('.total');
    total.forEach((e) => e.textContent = calcularTotal());
    let cantDeProductosDistintos = document.querySelector('.carrito_nav_contador');
    cantDeProductosDistintos.textContent = carrito.length;
}

function agregarAlCarrito(e) {
    const productoBuscado = productos.find((producto) => e.target.id == producto.id);
    let itsInCarrito = carrito.find((p) => p.producto.id == productoBuscado.id);
    let cantidad = parseInt(document.querySelector('#num' + productoBuscado.id).value);
    if (cantidad > 0 && cantidad <= productoBuscado.stock) {
        if (typeof itsInCarrito === 'undefined') {
            let product = {
                producto: productoBuscado,
                cantidad: cantidad,
                total: cantidad * productoBuscado.precio
            }
            carrito.push(product);
            lanzarNotificacion(productoBuscado.nombre);
        } else {
            if ((itsInCarrito.cantidad + cantidad) <= itsInCarrito.producto.stock) {
                itsInCarrito.cantidad += cantidad;
                itsInCarrito.total += itsInCarrito.producto.precio;
                lanzarNotificacion(productoBuscado.nombre);
            } else {
                lanzarError();
            }
        }
    } else {
        lanzarError();
    }
    cargarCarrito();
    persistirDatos();
}

function buscarProductId(id) {
    let pos = -1;
    for (let i = 0; i < carrito.length; i++) {
        if (id === carrito[i].producto.id) {
            pos = i;
        }
    }
    return pos;
}

function eliminarProducto(e) {
    let pos = buscarProductId(parseInt(e.target.id));
    carrito.splice(pos, 1);
    cargarCarrito();
    persistirDatos();
}

function calcularTotal() {
    let total = 0;
    carrito.forEach((p) => total += p.total);
    return total.toFixed(2);
}

function completarCompra() {
    carrito.forEach((product) => {
        let productoBuscado = productos.find((p) => p.id == product.producto.id);
        productoBuscado.stock -= product.cantidad;
    });
    carrito = [];
    persistirDatos();
}

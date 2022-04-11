let filtroActual = "Todos";

function cargarProductos() {
    const nodoProducto = document.querySelector(".container_products");
    nodoProducto.textContent = "";
    if (productos.length != 0) {
        (filtroActual == 'Todos') ? productos.forEach(product => {
            crearCard(product, nodoProducto);
        }) :
            productos.forEach(product => {
                (filtroActual == product.tipo) && crearCard(product, nodoProducto);
            });
    }
}

function crearCard(product, nodoProducto) {
    const unidad = document.createElement('div');
    unidad.setAttribute('class', 'container-unidad');
    let { nombre, precio, id, img, stock } = product;
    unidad.innerHTML = `<div class="description_img">
                            <img class="description_img_img" src="${img}" alt="">
                         </div>
                        <div class="description">
                            <p class="product_name">${nombre}</p>
                            <p class="product_stock">stock: ${stock}</p>
                            <p class="product_price"><span>$${precio}</span></p>
                            <div class="container-cantidad${id}"> 
                            </div> 
                        </div>`;

    let nodoBtn = document.createElement('button');
    nodoBtn.classList.add('btnProduct', 'btn');
    nodoBtn.setAttribute("id", id);
    if (stock !== 0) {
        nodoBtn.classList.add('btn-primary');
        nodoBtn.textContent = "Agregar al carrito";
        nodoBtn.addEventListener('click', agregarAlCarrito);

        unidad.appendChild(nodoBtn);
        nodoProducto.appendChild(unidad);

        let nodoCantidad = document.querySelector('.container-cantidad' + id);
        let btnAdd = document.createElement('button');
        btnAdd.classList.add('btn', 'btn-add');
        btnAdd.textContent = "+";
        btnAdd.setAttribute("id", "add" + id);
        btnAdd.addEventListener('click', aumentarCantidad);

        let btnSub = document.createElement('button');
        btnSub.classList.add('btn', 'btn-sub');
        btnSub.textContent = "-";
        btnSub.setAttribute("id", "sub" + id);
        btnSub.addEventListener('click', disminuirCantidad);

        let i = document.createElement('input');
        i.setAttribute("id", "num" + id);
        i.setAttribute("value", "1");
        i.setAttribute("type", "number");

        nodoCantidad.appendChild(btnSub);
        nodoCantidad.appendChild(i);
        nodoCantidad.appendChild(btnAdd);
    } else {
        nodoBtn.classList.add('btn-secondary', 'disabled');
        nodoBtn.textContent = "Sin stock";

        unidad.appendChild(nodoBtn);
        nodoProducto.appendChild(unidad);
    }
}

function crearFiltrado() {
    const nodoFiltro = document.querySelector(".filter");

    let filterList = [];

    productos.forEach(product => {
        if (filterList.indexOf(product.tipo) == -1) {
            const filtro = document.createElement('p');
            filtro.textContent = product.tipo;
            filtro.addEventListener('click', filtrarProductos);
            filtro.setAttribute("id", product.tipo);

            nodoFiltro.appendChild(filtro);
            filterList.push(product.tipo);
        }
    });
    const filtro = document.createElement('p');
    filtro.textContent = 'Todos';
    filtro.addEventListener('click', filtrarProductos);
    filtro.setAttribute("id", "Todos");

    nodoFiltro.appendChild(filtro);
    filterList.push('Todos');
}

function filtrarProductos(p) {
    filtroActual = p.target.id;
    cargarProductos();
}

function aumentarCantidad(e) {
    const idP = e.target.id[3];
    const productoBuscado = productos.find((producto) => idP == producto.id);
    const iVal = document.querySelector('#num' + idP);
    (iVal.value < productoBuscado.stock) && (iVal.value = (parseInt(iVal.value)) + 1);
}

function disminuirCantidad(e) {
    const idP = e.target.id[3];
    const iVal = document.querySelector('#num' + idP);
    (iVal.value > 1) && (iVal.value = (parseInt(iVal.value)) - 1);
}

let productos = [];
let carrito = [];

url = 'https://my-json-server.typicode.com/Nicolas3150/API-PadelWorld/Productos';

function persistirDatos() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("productos", JSON.stringify(productos));
}

function precargarCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
}

function precargarProductos() {
    if (JSON.parse(localStorage.getItem("productos"))) {
        productos = JSON.parse(localStorage.getItem("productos"));
        linkeoCarga();
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then(data => {
                agregarStock(data);
            });
    }
}

const agregarStock = (items) => {
    items.forEach(item => {
        const producto = {
            nombre: item.nombre,
            precio: item.precio,
            id: item.id,
            tipo: item.tipo,
            img: item.img,
            stock: item.stock
        }
        productos.push(producto);
    });
    localStorage.setItem("productos", JSON.stringify(productos));
    linkeoCarga();
};

function linkeoCarga(){
    const path = window.location.pathname;
    ((path.includes('index')) || path ==='/Padel-World/' || path.length === 1) && (cargarProductos(), crearFiltrado());
}

function init() {
  precargarProductos();
  precargarCarrito();
  cargarCarrito();
  persistirDatos();
}

const btnToggle = document.querySelector('.carrito_nav');
btnToggle.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementById('fondo').classList.toggle('activate');
});

const btnCLose = document.querySelector('.close-btn');
btnCLose.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('active');
  document.getElementById('fondo').classList.toggle('activate');
});

const btnComprar = document.querySelector('.pay-btn');
btnComprar.addEventListener('click', function () {
  if (carrito.length != 0) {
    Swal.fire({
      title: 'Estas seguro que deseas finalizar la compra?',
      text: "Podras cancelar tu compra en las proximas 48hs",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar compra',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Gracias por su compra!',
          'La compra se realizo exitosamente.',
          'success'
        );
        completarCompra();
        cargarCarrito();
        const path = window.location.pathname;
        (((path.includes('index')) || path ==='/Padel-World/' || path.length === 1) && cargarProductos());
      }
    })
  } else {
    Swal.fire(
      'Oops...',
      'Tu carrito esta vacio!',
      'error'
    )
  }
});

function lanzarError() {
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    background: 'rgba(255, 0, 0 , 0.9)',
    color: 'white',
    iconColor: 'white'
  }).fire({
    icon: 'error',
    title: 'Error al agregar producto al carrito',
    text: 'Verifica que haya suficiente stock o ingrese una cantidad valida'
  })
}

function lanzarNotificacion(name) {
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    background: 'rgba(100, 255, 0 , 0.9)',
    color: 'white',
    iconColor: 'white'
  }).fire({
    icon: 'success',
    title: 'Se agrego <b>' + name + '</b> al carrito'
  })
}


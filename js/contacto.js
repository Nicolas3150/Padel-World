const btn = document.querySelector('#button');

let nombre = document.querySelector('#name');
let apellido = document.querySelector('#last');
let mail = document.querySelector('#email');
let mensaje = document.querySelector('#message');

document.querySelector('#form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_e7il84q';


        var templateParams = {
            name: nombre.value,
            last: apellido.value,
            email: mail.value,
            message: mensaje.value
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(function (response) {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'success',
                    title: `Gracias <b>${nombre.value}</b> por tu mensaje!
                    Te estaremos respondiendo a <b>${mail.value}</b>`
                })
                btn.value = "Enviar email";
                reset();
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    });

function reset() {
    nombre.value = "";
    apellido.value = "";
    mail.value = "";
    mensaje.value = "";
}



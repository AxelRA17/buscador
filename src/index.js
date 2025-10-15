import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SweetAlert2 from 'sweetalert2';

/* crear un buscador en donde se igresa una frase en un bloque de texto y en un input se coloca una palabra, el programa se encarga de remarcar esa palabra si esta la frase del bloque de texto */

const bloqueTexto = document.getElementById('bloque-texto');
const inputPalabra = document.getElementById('in_palabra');
const botonBuscar = document.getElementById('btn_buscar');
const resultado = document.getElementById('resultado');

botonBuscar.addEventListener('click', () => {
    const frase = bloqueTexto.value;
    const palabra = inputPalabra.value;
    if (frase === '' || palabra === '') {
        SweetAlert2.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa una frase y una palabra para buscar.',
        });
        return;
    }
    const regex = new RegExp(`(${palabra})`, 'gi');
    const fraseRemarcada = frase.replace(regex, '<mark>$1</mark>');
    resultado.innerHTML = fraseRemarcada;
});

// Limpiar el resaltado al cambiar la palabra o la frase
inputPalabra.addEventListener('input', () => {
    resultado.innerHTML = '';
});
bloqueTexto.addEventListener('input', () => {
    resultado.innerHTML = '';
});

// Limpiar el resaltado al hacer clic en el botón de limpiar
const botonLimpiar = document.getElementById('btn_limpiar');
botonLimpiar.addEventListener('click', () => {
    bloqueTexto.value = '';
    inputPalabra.value = '';
    resultado.innerHTML = '';
});

// Agregar funcionalidad para presionar "Enter" en el input de palabra
inputPalabra.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        botonBuscar.click();
    }
});
// Agregar funcionalidad para presionar "Enter" en el bloque de texto
bloqueTexto.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        botonBuscar.click();
    }
});


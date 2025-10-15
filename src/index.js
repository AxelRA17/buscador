import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SweetAlert2 from 'sweetalert2';

// Declaración de elementos del DOM
const bloqueTexto = document.getElementById('bloque-texto');
const inputPalabra = document.getElementById('in_palabra');
const botonBuscar = document.getElementById('btn_buscar');
const resultado = document.getElementById('resultado');
const botonLimpiar = document.getElementById('btn_limpiar');
const contadorCoincidencias = document.getElementById('contador-coincidencias'); // <-- NUEVO

// Evento principal para buscar y resaltar
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
    
    // --- LÓGICA DEL CONTADOR ---
    // 1. Contar las coincidencias
    const matches = frase.match(new RegExp(palabra, 'gi'));
    const numeroCoincidencias = matches ? matches.length : 0;

    // 2. Actualizar el badge en el HTML
    contadorCoincidencias.textContent = numeroCoincidencias;
    // --- FIN DE LA LÓGICA DEL CONTADOR ---

    // Reemplazar y mostrar resultado
    const fraseRemarcada = frase.replace(regex, '<mark>$1</mark>');
    resultado.innerHTML = fraseRemarcada;
});

// Función para limpiar el resultado y el contador
const limpiarResultado = () => {
    resultado.innerHTML = '<p class="text-muted">Aquí aparecerá el texto con la palabra resaltada.</p>';
    contadorCoincidencias.textContent = '0'; // <-- NUEVO
};

// Limpiar el resaltado al cambiar la palabra o la frase
inputPalabra.addEventListener('input', limpiarResultado);
bloqueTexto.addEventListener('input', limpiarResultado);

// Limpiar todo al hacer clic en el botón de limpiar
botonLimpiar.addEventListener('click', () => {
    bloqueTexto.value = '';
    inputPalabra.value = '';
    limpiarResultado(); // <-- ACTUALIZADO
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
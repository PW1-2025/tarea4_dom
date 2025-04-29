// 1. Crear tarjetas dinámicamente
const crearTarjeta = document.getElementById('crearTarjeta');
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

crearTarjeta.addEventListener('click', () => {
    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('tarjeta');
    nuevaTarjeta.textContent = 'Soy una nueva tarjeta creada dinámicamente.';
    contenedorTarjetas.appendChild(nuevaTarjeta);
});

// 2. Cambiar color de fondo
const selectorColor = document.getElementById('selectorColor');

selectorColor.addEventListener('input', (evento) => {
    document.body.style.backgroundColor = evento.target.value;
});

// 3. Mostrar / Ocultar sección
const botonMostrar = document.getElementById('botonMostrar');
const seccionOculta = document.getElementById('seccionOculta');

botonMostrar.addEventListener('click', () => {
    if (seccionOculta.style.display === 'none' || seccionOculta.style.display === '') {
        seccionOculta.style.display = 'block';
    } else {
        seccionOculta.style.display = 'none';
    }
});
// 4. Contador dinámico
const contadorElemento = document.getElementById('contador');
const botonContador = document.getElementById('botonContador');
let contador = 0;

botonContador.addEventListener('click', () => {
    contador++;
    contadorElemento.textContent = `Contador: ${contador}`;
});

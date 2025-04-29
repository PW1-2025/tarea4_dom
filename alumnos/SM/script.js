const tarjetasContainer = document.getElementById('tarjetas');

// Crear tarjeta vacía al inicio
const tarjeta = document.createElement('div');
tarjeta.classList.add('tarjeta');

// NUEVO: contenedor para la imagen con fondo
const imagenContainer = document.createElement('div');
imagenContainer.classList.add('imagen-container');

const img = document.createElement('img');
img.src = './imagenes/avatar1.png';
img.classList.add('avatar-img'); // para estilo adaptable

imagenContainer.appendChild(img);

const nombreElemento = document.createElement('h2');
nombreElemento.textContent = 'Nombre aquí';

const descripcionElemento = document.createElement('p');
descripcionElemento.textContent = 'Descripción aquí';

tarjeta.appendChild(imagenContainer);
tarjeta.appendChild(nombreElemento);
tarjeta.appendChild(descripcionElemento);
tarjetasContainer.appendChild(tarjeta);


// Función para actualizar tarjeta
function actualizarTarjeta() {
    const nombre = document.getElementById('nombre').value.trim();
    const colorNombre = document.getElementById('colorNombre').value;
    const tipografia = document.getElementById('tipografia').value;

    nombreElemento.textContent = nombre !== "" ? nombre : 'Nombre aquí';
    nombreElemento.style.color = colorNombre;
    nombreElemento.style.fontFamily = tipografia;
    descripcionElemento.style.fontFamily = tipografia;
}

// Asignar eventos correctos
document.getElementById('nombre').addEventListener('input', actualizarTarjeta);
document.getElementById('colorNombre').addEventListener('input', actualizarTarjeta);
document.getElementById('tipografia').addEventListener('change', actualizarTarjeta);

// Lógica para cambiar imagen con botón
const imagenes = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png', 'avatar6.png', 'avatar7.png', 'avatar8.png', 'avatar9.png', 'avatar10.png'];
let indiceImagen = 0;

document.getElementById('cambiarImagen').addEventListener('click', () => {
    indiceImagen = (indiceImagen + 1) % imagenes.length;
    img.src = `./imagenes/${imagenes[indiceImagen]}`;
});

// Lógica para cambiar descripción con un botón
const descripciones = [
    "Aventurero incansable.",
    "Amante de los libros.",
    "Soñador de día, creador de noche.",
    "Fanático de la tecnología.",
    "Explorador de mundos imaginarios.",
    "Afisionado a la naturaleza",
    "Visionario empedernido",
    "Revolucionario apasionado"
];
let indiceDescripcion = 0;

document.getElementById('cambiarDescripcion').addEventListener('click', () => {
    indiceDescripcion = (indiceDescripcion + 1) % descripciones.length;
    descripcionElemento.textContent = descripciones[indiceDescripcion];
});

//Logica para cambiar el fondo de la tarjeta
const fondos = [
    "#ffffff",
    "#BA9962",
    "#97E968",
    "url('./imagenes/fondo1.png')",
    "url('./imagenes/fondo2.png')",
    "url('./imagenes/fondo3.png')"
];
let indiceFondo = 0;

document.getElementById('fondoTarjeta').addEventListener('click', () => {
    indiceFondo = (indiceFondo + 1) % fondos.length;
    const fondoActual = fondos[indiceFondo];

    if (!fondoActual.startsWith("url")) {
        imagenContainer.style.backgroundColor = fondoActual;
        imagenContainer.style.backgroundImage = "";
    } else {
        imagenContainer.style.backgroundImage = fondoActual;
        imagenContainer.style.backgroundSize = "cover";
        imagenContainer.style.backgroundPosition = "center";
        imagenContainer.style.backgroundColor = "";
    }
});

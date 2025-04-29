
const lista = document.getElementById('lista');
const botonAgregar = document.getElementById('agregarFila');
const inputTexto = document.getElementById('textoFila');

let contadorFila = 1;

function generarColorAleatorio() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

function eliminarFila(event) {
  const item = event.target.closest('li');
  item.remove();
}

function cambiarColorFondo(event) {
  const item = event.target.closest('li');
  item.style.backgroundColor = generarColorAleatorio();
}

function cambiarColorTexto(event) {
  const item = event.target.closest('li');
  const texto = item.querySelector('span');
  texto.style.color = generarColorAleatorio();
}

function agregarFila() {
  const nuevaFila = document.createElement('li');

  const texto = document.createElement('span');
  const valorInput = inputTexto.value.trim();

  if (valorInput) {
    texto.textContent = valorInput;
  } else {
    texto.textContent = `Fila nueva ${contadorFila}`;
    contadorFila++;
  }

  const botonera = document.createElement('div');
  botonera.classList.add('button-group');

  const botonColorFondo = document.createElement('button');
  botonColorFondo.textContent = 'Color Fondo';
  botonColorFondo.addEventListener('click', cambiarColorFondo);

  const botonColorTexto = document.createElement('button');
  botonColorTexto.textContent = 'Color Texto';
  botonColorTexto.addEventListener('click', cambiarColorTexto);

  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', eliminarFila);

  botonera.appendChild(botonColorFondo);
  botonera.appendChild(botonColorTexto);
  botonera.appendChild(botonEliminar);

  nuevaFila.appendChild(texto);
  nuevaFila.appendChild(botonera);

  lista.appendChild(nuevaFila);

  inputTexto.value = '';
}

// Evento principal
botonAgregar.addEventListener('click', agregarFila);

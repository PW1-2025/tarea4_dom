
const frases = [
    "Cree en ti misma 🌟",
    "Eres capaz de cosas maravillosas 💖",
    "Sigue brillando como siempre ✨",
    "Sonríe, el mundo es tuyo 🌎",
    "La dulzura es tu superpoder 🍭"
  ];
  
  const colores = ["#f8bbd0", "#f48fb1", "#ce93d8", "#b39ddb", "#90caf9"];
  
  const fraseContainer = document.getElementById('frase-container');
  const btnAgregar = document.getElementById('btnAgregar');
  const btnEliminar = document.getElementById('btnEliminar');
  const btnCambiarColor = document.getElementById('btnCambiarColor');
  
  let indice = 0;
  
  btnAgregar.addEventListener('click', () => {
    if (indice < frases.length) {
      const nuevaFrase = document.createElement('p');
      nuevaFrase.textContent = frases[indice];
      fraseContainer.appendChild(nuevaFrase);
      indice++;
    } else {
      alert("Ya agregaste todas las frases ✨");
    }
  });
  
  btnEliminar.addEventListener('click', () => {
    if (fraseContainer.lastChild) {
      fraseContainer.removeChild(fraseContainer.lastChild);
      indice--;
    }
  });
  
  btnCambiarColor.addEventListener('click', () => {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = colorAleatorio;
  });
  
 

  
  
  const contenedor = document.querySelector('#contenedor');
  
  init();
  
  function init() {
    const botones = document.querySelectorAll("#botones button");
    botones.forEach(btn => {
      btn.addEventListener('click', crearElemento);
    });
    document.querySelector("#btnEliminarElemento")
      .addEventListener('click', eliminarElemento);
    document.querySelector('#elemento')
      .addEventListener('change', cargarPropiedades);
    document.querySelector('#propiedades')
      .addEventListener('change', cargarValores);
    document.querySelector("#btnAplicar")
      .addEventListener('click', aplicarCSS);
  }
  
  function crearElemento(e) {
    const nuevoElemento = document.createElement(e.target.id);
    switch (e.target.id) {
      case 'button':
        nuevoElemento.innerHTML = '✨ Un nuevo botón';
        break;
      case 'input':
        nuevoElemento.type = 'text';
        nuevoElemento.value = '🌸 Nuevo input';
        break;
      case 'table':
        for (let i = 0; i < 3; i++) {
          let fila = nuevoElemento.insertRow(i);
          for (let j = 0; j < 3; j++) {
            let celda = fila.insertCell(j);
            celda.innerHTML = '🌷 ' + i + ',' + j;
          }
        }
        break;
      case 'a':
        nuevoElemento.href = '#';
        nuevoElemento.innerHTML = '💖 Nuevo enlace';
        break;
      case 'select':
        for (let i = 1; i <= 5; i++) {
          nuevoElemento.add(new Option('🌼 Opción ' + i, i));
        }
        break;
    }
    contenedor.appendChild(nuevoElemento);
    cargarElementos();
  }
  
  function cargarElementos() {
    const selElemento = document.querySelector('#elemento');
    selElemento.innerHTML = '';
    selElemento.add(new Option('Seleccionar elemento', '-1'));
    [...contenedor.children].forEach((child, i) => {
      selElemento.add(new Option(child.localName, i));
    });
  }
  
  function eliminarElemento() {
    const selElemento = document.querySelector('#elemento');
    if (selElemento.value === '-1') {
      return alert('Seleccione un elemento a eliminar');
    }
    contenedor.removeChild(contenedor.children[selElemento.value]);
    cargarElementos();
  }
  
  function cargarPropiedades() {
    const selPropiedades = document.querySelector('#propiedades');
    selPropiedades.innerHTML = '';
    selPropiedades.add(new Option('Seleccionar propiedad', '-1'));
    selPropiedades.add(new Option('Borde', 'border'));
    selPropiedades.add(new Option('Color', 'color'));
    selPropiedades.add(new Option('Fondo', 'backgroundColor'));
    selPropiedades.add(new Option('Tamaño de fuente', 'fontSize'));
  }
  
  function cargarValores() {
    const selPropiedades = document.querySelector('#propiedades');
    const selValores = document.querySelector('#valor');
    selValores.innerHTML = '';
    selValores.add(new Option('Seleccionar valor', '-1'));
    switch (selPropiedades.value) {
      case 'border':
        selValores.add(new Option('2px solid pink'));
        selValores.add(new Option('3px dotted purple'));
        selValores.add(new Option('5px dashed violet'));
        break;
      case 'color':
        selValores.add(new Option('hotpink'));
        selValores.add(new Option('deeppink'));
        selValores.add(new Option('orchid'));
        break;
      case 'backgroundColor':
        selValores.add(new Option('lavenderblush'));
        selValores.add(new Option('mistyrose'));
        selValores.add(new Option('aliceblue'));
        break;
      case 'fontSize':
        selValores.add(new Option('16px'));
        selValores.add(new Option('20px'));
        selValores.add(new Option('24px'));
        break;
    }
  }
  
  function aplicarCSS() {
    const selElemento = document.querySelector('#elemento');
    const selPropiedades = document.querySelector('#propiedades');
    const selValores = document.querySelector('#valor');
  
    if (selElemento.value === '-1' || selPropiedades.value === '-1' || selValores.value === '-1') {
      alert('Seleccione todo correctamente antes de aplicar');
      return;
    }
  
    contenedor.children[selElemento.value].style[selPropiedades.value] = selValores.value;
  }
  
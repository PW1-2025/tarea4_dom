document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // VARIABLES Y REFERENCIAS DEL DOM
    // =============================================

    // Elementos de texto
    const botonAgregar = document.getElementById('agregarTexto');
    const botonEliminarUltimo = document.getElementById('eliminarUltimo');
    const botonEliminarTodos = document.getElementById('eliminarTodos');
    const colorSelector = document.getElementById('colorSelector');
    const tamanoSelector = document.getElementById('tamanoSelector');
    const contenedorTexto = document.getElementById('contenedorTexto');

    // Tablas dinámicas
    const crearTablaBtn = document.getElementById('crearTabla');
    const agregarFilaBtn = document.getElementById('agregarFila');
    const agregarColumnaBtn = document.getElementById('agregarColumna');
    const eliminarTablaBtn = document.getElementById('eliminarTabla');
    const agregarTextoBtn = document.getElementById('agregarTextoCelda');
    const limpiarCeldasBtn = document.getElementById('limpiarCeldas');
    const textoCeldaInput = document.getElementById('textoCelda');
    const contenedorTablas = document.getElementById('contenedorTablas');

    // Generadores
    const generarBotonBtn = document.getElementById('generarBoton');
    const eliminarUltimoBotonBtn = document.getElementById('eliminarUltimoBoton');
    const eliminarTodosBotonesBtn = document.getElementById('eliminarTodosBotones');
    const contenedorBotones = document.getElementById('contenedorBotones');
    const generarLinkBtn = document.getElementById('generarLink');
    const eliminarUltimoLinkBtn = document.getElementById('eliminarUltimoLink');
    const eliminarTodosLinksBtn = document.getElementById('eliminarTodosLinks');
    const contenedorLinks = document.getElementById('contenedorLinks');

    // Variables de estado
    let contador = 1;
    let contadorBotones = 1;
    let contadorLinks = 1;

    let tablaActual = null;
    let contadorTablas = 1;
    let contadorColumnas = 1;

    // Personalización
    const fondoPagina = document.getElementById('fondoPagina');
    const fondoContenedor = document.getElementById('fondoContenedor');
    const colorTitulo = document.getElementById('colorTitulo');
    const colorTextoNormal = document.getElementById('colorTextoNormal');
    const fuenteTexto = document.getElementById('fuenteTexto');
    const colorOpcionesSelect = document.getElementById('colorOpcionesSelect');
    const colorSelectNoDesplegado = document.getElementById('colorSelectNoDesplegado');


    function aplicarEstilosTexto() {
        document.querySelectorAll('.texto-agregado').forEach(texto => {
            texto.style.color = colorSelector.value;
            texto.style.fontSize = tamanoSelector.value;
        });
    }

    function habilitarControlesTablas(habilitar) {
        agregarFilaBtn.disabled = !habilitar;
        agregarColumnaBtn.disabled = !habilitar;
        eliminarTablaBtn.disabled = !habilitar;
        agregarTextoBtn.disabled = !habilitar;
        limpiarCeldasBtn.disabled = !habilitar;
    }

    function aplicarEstilosDinamicos() {
        // Aplicar a botones generados
        document.querySelectorAll('#contenedorBotones button').forEach(boton => {
            boton.style.fontFamily = fuenteTexto.value;
            boton.style.color = colorTextoNormal.value;
        });

        // Aplicar a links generados
        document.querySelectorAll('#contenedorLinks a').forEach(link => {
            link.style.fontFamily = fuenteTexto.value;
            link.style.color = colorTextoNormal.value;
        });
    }


    // =============================================
    // FUNCIONES DE MANIPULACIÓN DE TEXTO
    // =============================================

    function agregarTexto() {
        const nuevoTexto = document.createElement('p');
        nuevoTexto.className = 'texto-agregado';
        nuevoTexto.textContent = `${contador}. Texto Agregado`;
        nuevoTexto.style.color = colorSelector.value;
        nuevoTexto.style.fontSize = tamanoSelector.value;

        contenedorTexto.appendChild(nuevoTexto);
        contador++;
    }

    function eliminarUltimoTexto() {
        const textos = document.querySelectorAll('.texto-agregado');
        if (textos.length > 0) {
            contenedorTexto.removeChild(textos[textos.length - 1]);
            if (contador > 1) contador--;
        } else {
            alert('No hay textos para eliminar');
        }
    }

    function eliminarTodosTextos() {
        contenedorTexto.innerHTML = '';
        contador = 1;
    }

    //aca estaba aplicarestilostexto


    // =============================================
    // FUNCIONES DE GENERADORES
    // =============================================

    function generarBoton() {
        const nuevoBoton = document.createElement('button');
        nuevoBoton.className = 'boton';
        nuevoBoton.textContent = `Botón Generado ${contadorBotones++}`;
        contenedorBotones.appendChild(nuevoBoton);
        aplicarEstilosDinamicos(); // Aplicar estilos personalizados
    }

    function eliminarUltimoBoton() {
        const botones = contenedorBotones.querySelectorAll('button');
        if (botones.length > 0) {
            contenedorBotones.removeChild(botones[botones.length - 1]);
            if (contadorBotones > 1) contadorBotones--;
        }
    }

    function eliminarTodosBotones() {
        contenedorBotones.innerHTML = '';
        contadorBotones = 1;
    }

    function generarLink() {
        const nuevoLink = document.createElement('a');
        nuevoLink.href = '#';
        nuevoLink.className = 'link-generado';
        nuevoLink.textContent = `Link Generado ${contadorLinks++}`;
        contenedorLinks.appendChild(nuevoLink);
        aplicarEstilosDinamicos(); // Aplicar estilos personalizados
    }

    function eliminarUltimoLink() {
        const links = contenedorLinks.querySelectorAll('a');
        if (links.length > 0) {
            contenedorLinks.removeChild(links[links.length - 1]);
            if (contadorLinks > 1) contadorLinks--;
        }
    }

    function eliminarTodosLinks() {
        contenedorLinks.innerHTML = '';
        contadorLinks = 1;
    }

    // =============================================
    // FUNCIONES DE TABLAS DINÁMICAS
    // =============================================

    function crearTabla() {
        const tabla = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const th = document.createElement('th');

        th.textContent = `Col ${contadorColumnas++}`;
        tr.appendChild(th);
        thead.appendChild(tr);

        const fila = document.createElement('tr');
        fila.appendChild(document.createElement('td'));
        tbody.appendChild(fila);

        tabla.appendChild(thead);
        tabla.appendChild(tbody);

        const tituloTabla = document.createElement('h3');
        tituloTabla.textContent = `Tabla ${contadorTablas++}`;

        const contenedorTabla = document.createElement('div');
        contenedorTabla.className = 'tabla-wrapper';
        contenedorTabla.appendChild(tituloTabla);
        contenedorTabla.appendChild(tabla);

        contenedorTablas.appendChild(contenedorTabla);
        tablaActual = tabla;
        habilitarControlesTablas(true);
    }

    function agregarFila() {
        if (!tablaActual) return;

        const tbody = tablaActual.querySelector('tbody');
        const fila = document.createElement('tr');
        const columnCount = tablaActual.querySelector('thead tr').cells.length;

        for (let i = 0; i < columnCount; i++) {
            fila.appendChild(document.createElement('td'));
        }

        tbody.appendChild(fila);
    }

    function agregarColumna() {
        if (!tablaActual) return;

        const encabezado = tablaActual.querySelector('thead tr');
        const th = document.createElement('th');
        th.textContent = `Col ${contadorColumnas++}`;
        encabezado.appendChild(th);

        tablaActual.querySelectorAll('tbody tr').forEach(fila => {
            fila.appendChild(document.createElement('td'));
        });
    }

    function agregarTextoACelda() {
        if (!tablaActual || !textoCeldaInput.value) return;

        tablaActual.querySelectorAll('td.seleccionada').forEach(celda => {
            celda.textContent = textoCeldaInput.value;
            celda.classList.remove('seleccionada');
        });

        textoCeldaInput.value = '';
    }

    function eliminarTabla() {
        if (!tablaActual) return;

        const tablaWrapper = tablaActual.closest('.tabla-wrapper');
        contenedorTablas.removeChild(tablaWrapper);
        tablaActual = contenedorTablas.querySelector('table') || null;

        if (!tablaActual) {
            habilitarControlesTablas(false);
        }
    }

    function limpiarCeldas() {
        if (!tablaActual) return;

        tablaActual.querySelectorAll('td').forEach(celda => {
            celda.textContent = '';
            celda.classList.remove('seleccionada');
        });
    }

    //aca estava habilitarcontrolestabla

    // =============================================
    // FUNCIONES DE PERSONALIZACIÓN
    // =============================================

    //aca estaba aplicarEstilosDinamicos

    function aplicarPersonalizacion() {
        // Fondos
        document.body.style.backgroundColor = fondoPagina.value;
        document.querySelectorAll('.container, .panel-personalizacion, .generador-botones, .generador-links').forEach(el => {
            el.style.backgroundColor = fondoContenedor.value;
        });

        // Textos y fuentes
        document.querySelectorAll('h1, h2, h3').forEach(el => {
            el.style.color = colorTitulo.value;
            el.style.fontFamily = fuenteTexto.value;
        });

        document.body.style.color = colorTextoNormal.value;
        document.body.style.fontFamily = fuenteTexto.value;

        // Selects y botones
        document.querySelectorAll('select, button').forEach(el => {
            el.style.fontFamily = fuenteTexto.value;
            el.style.color = colorSelectNoDesplegado.value;
        });

        // Opciones de select
        document.querySelectorAll('option').forEach(el => {
            el.style.color = colorOpcionesSelect.value;
            el.style.fontFamily = fuenteTexto.value;
        });

        // Aplicar estilos a tablas
        if (tablaActual) {
            tablaActual.style.fontFamily = fuenteTexto.value;
            tablaActual.querySelectorAll('th').forEach(th => {
                th.style.color = colorTitulo.value;
            });
            tablaActual.querySelectorAll('td').forEach(td => {
                td.style.color = colorTextoNormal.value;
            });
        }

        // Aplicar a elementos dinámicos
        aplicarEstilosDinamicos();
        aplicarEstilosTexto();
    }


    // =============================================
    // EVENT LISTENERS
    // =============================================

    // Personalización
    fondoPagina.addEventListener('change', aplicarPersonalizacion);
    fondoContenedor.addEventListener('change', aplicarPersonalizacion);
    colorTitulo.addEventListener('change', aplicarPersonalizacion);
    colorTextoNormal.addEventListener('change', aplicarPersonalizacion);
    fuenteTexto.addEventListener('change', aplicarPersonalizacion);
    colorSelectNoDesplegado.addEventListener('change', aplicarPersonalizacion);
    //colorOpcionesSelect.addEventListener('change', aplicarPersonalizacion);

    // Texto
    botonAgregar.addEventListener('click', agregarTexto);
    botonEliminarUltimo.addEventListener('click', eliminarUltimoTexto);
    botonEliminarTodos.addEventListener('click', eliminarTodosTextos);
    colorSelector.addEventListener('change', aplicarEstilosTexto);
    tamanoSelector.addEventListener('change', aplicarEstilosTexto);

    // Generadores
    generarBotonBtn.addEventListener('click', generarBoton);
    eliminarUltimoBotonBtn.addEventListener('click', eliminarUltimoBoton);
    eliminarTodosBotonesBtn.addEventListener('click', eliminarTodosBotones);
    generarLinkBtn.addEventListener('click', generarLink);
    eliminarUltimoLinkBtn.addEventListener('click', eliminarUltimoLink);
    eliminarTodosLinksBtn.addEventListener('click', eliminarTodosLinks);

    // Tablas
    crearTablaBtn.addEventListener('click', crearTabla);
    agregarFilaBtn.addEventListener('click', agregarFila);
    agregarColumnaBtn.addEventListener('click', agregarColumna);
    eliminarTablaBtn.addEventListener('click', eliminarTabla);
    agregarTextoBtn.addEventListener('click', agregarTextoACelda);
    limpiarCeldasBtn.addEventListener('click', limpiarCeldas);
    contenedorTablas.addEventListener('click', function (e) {
        if (e.target.tagName === 'TD') {
            e.target.classList.toggle('seleccionada');
        }
    });

    /// Inicialización
    habilitarControlesTablas(false);
    aplicarPersonalizacion(); // Aplicar estilos al cargar la página
});
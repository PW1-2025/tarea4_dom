document.addEventListener("DOMContentLoaded", function () {
    const elementBtns = document.querySelectorAll(".element-btn");
    const previewContainer = document.getElementById("preview-container");
    const elementSelector = document.getElementById("element-selector");
    const propertySelector = document.getElementById("property-selector");
    const valueSelector = document.getElementById("value-selector");
    const applyStyleBtn = document.getElementById("apply-style");
    const resetStylesBtn = document.getElementById("reset-styles");
    const deleteElementBtn = document.getElementById("delete-element");
    const clearAllBtn = document.getElementById("clear-all");

    let selectedElement = null;

    // Crear elementos
    elementBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const elementType = btn.getAttribute("data-type");
            let newElement;

            switch (elementType) {
                case "container":
                    newElement = document.createElement("div");
                    newElement.classList.add("created-element");
                    newElement.innerHTML = `<p>Contenedor</p>`;
                    break;
                case "text":
                    newElement = document.createElement("p");
                    newElement.classList.add("created-element");
                    newElement.textContent = "Texto";
                    break;
                case "button":
                    newElement = document.createElement("button");
                    newElement.classList.add("created-element");
                    newElement.textContent = "Botón";
                    break;
                case "input":
                    newElement = document.createElement("input");
                    newElement.classList.add("created-element");
                    newElement.placeholder = "Entrada";
                    break;
                case "link":
                    newElement = document.createElement("a");
                    newElement.classList.add("created-element");
                    newElement.textContent = "Enlace";
                    newElement.href = "#";
                    break;
                case "list":
                    newElement = document.createElement("ul");
                    newElement.classList.add("created-element");
                    newElement.innerHTML = "<li>Elemento de lista</li>";
                    break;
                case "image":
                    newElement = document.createElement("img");
                    newElement.classList.add("created-element");
                    newElement.src = "https://via.placeholder.com/150";
                    newElement.alt = "Imagen";
                    break;
                case "section":
                    newElement = document.createElement("section");
                    newElement.classList.add("created-element");
                    newElement.innerHTML = "<h3>Sección</h3><p>Contenido de la sección</p>";
                    break;
            }

            previewContainer.appendChild(newElement);

            const elementNameMap = {
                container: "Contenedor",
                text: "Texto",
                button: "Botón",
                input: "Entrada",
                link: "Enlace",
                list: "Lista",
                image: "Imagen",
                section: "Sección"
            };

// Agregar el nuevo elemento al selector con nombre traducido
            const option = document.createElement("option");
            option.value = previewContainer.children.length - 1;
            option.textContent = `${elementNameMap[elementType]} ${previewContainer.children.length}`;
            elementSelector.appendChild(option);

        });
    });

    // Selección de elemento para editar
    elementSelector.addEventListener("change", function () {
        const selectedIndex = elementSelector.value;
        if (selectedIndex !== "-1") {
            selectedElement = previewContainer.children[selectedIndex];
        } else {
            selectedElement = null;
        }
    });

    // Aplicar estilo
    applyStyleBtn.addEventListener("click", function () {
        if (selectedElement) {
            const property = propertySelector.value;
            const value = valueSelector.value;

            if (property && value !== "-1") {
                selectedElement.style[property] = value;
            } else {
                alert("Por favor, selecciona una propiedad y un valor.");
            }
        }
    });

    // Reiniciar estilos
    resetStylesBtn.addEventListener("click", function () {
        if (selectedElement) {
            selectedElement.removeAttribute("style");
        }
    });

    // Eliminar elemento
    deleteElementBtn.addEventListener("click", function () {
        if (selectedElement) {
            selectedElement.remove();
            elementSelector.removeChild(elementSelector.selectedOptions[0]);
            selectedElement = null;
        }
    });

    // Limpiar todo
    clearAllBtn.addEventListener("click", function () {
        previewContainer.innerHTML = "";
        elementSelector.innerHTML = '<option value="-1">Seleccionar elemento</option>';
    });

    // Actualizar valores según propiedad seleccionada
    propertySelector.addEventListener("change", function () {
        const property = propertySelector.value;

        let values = [];

        switch (property) {
            case "color":
                values = ["#3498db", "#e74c3c", "#1abc9c", "#8e44ad"];
                break;
            case "background-color":
                values = ["#ecf0f1", "#bdc3c7", "#95a5a6"];
                break;
            case "font-size":
                values = ["12px", "16px", "20px", "24px", "30px"];
                break;
            case "font-family":
                values = ["Arial", "Verdana", "Times New Roman", "Roboto"];
                break;
            case "border":
                values = ["none", "2px solid #3498db", "2px dashed #8e44ad"];
                break;
        }

        valueSelector.innerHTML = '<option value="-1">Seleccionar valor</option>';
        values.forEach((val) => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val;
            valueSelector.appendChild(option);
        });
    });
});

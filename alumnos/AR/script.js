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
                    newElement.classList.add("created-element", "container-element");
                    newElement.innerHTML = "<p>Contenedor</p>";
                    break;
                case "text":
                    newElement = document.createElement("p");
                    newElement.classList.add("created-element", "text-element");
                    newElement.textContent = "Texto";
                    break;
                case "button":
                    newElement = document.createElement("button");
                    newElement.classList.add("created-element", "button-element");
                    newElement.textContent = "Botón";
                    break;
                case "input":
                    newElement = document.createElement("input");
                    newElement.classList.add("created-element", "input-element");
                    newElement.placeholder = "Entrada";
                    break;
                case "link":
                    newElement = document.createElement("a");
                    newElement.classList.add("created-element", "link-element");
                    newElement.textContent = "Enlace";
                    newElement.href = "#";
                    break;
                case "list":
                    newElement = document.createElement("ul");
                    newElement.classList.add("created-element", "list-element");
                    newElement.innerHTML = "<li>Elemento de lista</li>";
                    break;
                case "image":
                    newElement = document.createElement("img");
                    newElement.classList.add("created-element", "image-element");
                    newElement.src = "https://via.placeholder.com/150";
                    newElement.alt = "Imagen";
                    break;
                case "section":
                    newElement = document.createElement("section");
                    newElement.classList.add("created-element", "section-element");
                    newElement.innerHTML = "<h3>Sección</h3><p>Contenido de la sección</p>";
                    break;
            }

            // Añadir nuevo elemento al contenedor de vista previa
            previewContainer.appendChild(newElement);

            // Actualizar la lista del selector de elementos
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
            selectedElement.classList.add("selected-element");
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
                values = ["red", "green", "blue", "yellow", "black"];
                break;
            case "background-color":
                values = ["#ffeb3b", "#f44336", "#2196F3", "#4CAF50", "#FFC107"];
                break;
            case "font-size":
                values = ["12px", "16px", "20px", "24px", "30px"];
                break;
            case "font-family":
                values = ["Arial", "Verdana", "Helvetica", "Times New Roman", "Courier"];
                break;
            case "border":
                values = ["1px solid black", "2px dashed red", "3px dotted green"];
                break;
        }

        // Actualizar los valores en el selector de valores
        valueSelector.innerHTML = '<option value="-1">Seleccionar valor</option>';
        values.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            valueSelector.appendChild(option);
        });
    });
});




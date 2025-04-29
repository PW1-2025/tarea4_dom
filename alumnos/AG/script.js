document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elementTypeSelect = document.getElementById('elementType');
    const elementTextInput = document.getElementById('elementText');
    const createElementBtn = document.getElementById('createElementBtn');
    const elementsContainer = document.getElementById('elementsContainer');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const textColorPicker = document.getElementById('textColorPicker');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const applyStylesBtn = document.getElementById('applyStylesBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const hideAllBtn = document.getElementById('hideAllBtn');
    const textInputContainer = document.getElementById('textInputContainer');

    // State
    let selectedElement = null;
    let elements = [];

    // Initialize
    updateFontSizeValue();
    setupEventListeners();

    function setupEventListeners() {
        // Element creation
        createElementBtn.addEventListener('click', createElement);
        clearAllBtn.addEventListener('click', clearAllElements);
        
        // Style controls
        fontSizeSlider.addEventListener('input', updateFontSizeValue);
        applyStylesBtn.addEventListener('click', applyStyles);
        
        // Visibility controls
        showAllBtn.addEventListener('click', showAllElements);
        hideAllBtn.addEventListener('click', hideAllElements);
        
        // Element type change
        elementTypeSelect.addEventListener('change', handleElementTypeChange);
    }

    function updateFontSizeValue() {
        fontSizeValue.textContent = `${fontSizeSlider.value}px`;
    }

    function handleElementTypeChange() {
        const type = elementTypeSelect.value;
        if (type === 'image') {
            textInputContainer.classList.add('hidden');
            elementTextInput.required = false;
        } else {
            textInputContainer.classList.remove('hidden');
            elementTextInput.required = true;
        }
    }

    function createElement() {
        const type = elementTypeSelect.value;
        const text = elementTextInput.value;
        
        if (type !== 'image' && !text.trim()) {
            alert('Por favor ingresa un texto para el elemento');
            return;
        }
        
        const element = document.createElement('div');
        element.className = 'relative group p-4 rounded-lg border border-gray-200';
        
        switch (type) {
            case 'card':
                element.innerHTML = `
                    <div class="bg-white p-4 rounded-lg shadow-sm">
                        <h3 class="text-lg font-semibold mb-2">${text}</h3>
                        <p class="text-gray-600">Este es el contenido de la tarjeta.</p>
                    </div>
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button class="edit-btn p-1 text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn p-1 text-red-600 hover:text-red-800">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                break;
                
            case 'paragraph':
                element.innerHTML = `
                    <p>${text}</p>
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button class="edit-btn p-1 text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn p-1 text-red-600 hover:text-red-800">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                break;
                
            case 'image':
                element.innerHTML = `
                    <div class="flex flex-col items-center">
                        <img src="https://via.placeholder.com/300x200?text=Imagen" alt="Placeholder" class="rounded-lg mb-2">
                        <p class="text-gray-500 text-sm">Imagen de ejemplo</p>
                    </div>
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button class="edit-btn p-1 text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn p-1 text-red-600 hover:text-red-800">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                break;
                
            case 'button':
                element.innerHTML = `
                    <button class="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                        ${text}
                    </button>
                    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button class="edit-btn p-1 text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn p-1 text-red-600 hover:text-red-800">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                break;
        }
        
        // Add event listeners to the new element's buttons
        const deleteBtn = element.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteElement(element));
        
        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => selectElementForEdit(element));
        
        // Add click event to select the element
        element.addEventListener('click', (e) => {
            if (e.target === element || e.target.tagName === 'P' || e.target.tagName === 'H3' || e.target.tagName === 'DIV') {
                selectElementForEdit(element);
            }
        });
        
        // Add to DOM and state
        elementsContainer.appendChild(element);
        elements.push(element);
        
        // Clear input
        elementTextInput.value = '';
        
        // Update default message
        updateDefaultMessage();
    }

    function deleteElement(element) {
        if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            elementsContainer.removeChild(element);
            elements = elements.filter(el => el !== element);
            
            if (selectedElement === element) {
                selectedElement = null;
            }
            
            updateDefaultMessage();
        }
    }

    function clearAllElements() {
        if (elements.length === 0) return;
        
        if (confirm('¿Estás seguro de que quieres eliminar todos los elementos?')) {
            elements.forEach(element => {
                elementsContainer.removeChild(element);
            });
            
            elements = [];
            selectedElement = null;
            
            updateDefaultMessage();
        }
    }

    function selectElementForEdit(element) {
        // Deselect previous element
        if (selectedElement) {
            selectedElement.classList.remove('ring-2', 'ring-indigo-500');
        }
        
        // Select new element
        selectedElement = element;
        element.classList.add('ring-2', 'ring-indigo-500');
    }

    function applyStyles() {
        if (!selectedElement) {
            alert('Por favor selecciona un elemento primero');
            return;
        }
        
        const bgColor = bgColorPicker.value;
        const textColor = textColorPicker.value;
        const fontSize = `${fontSizeSlider.value}px`;
        
        // Apply styles to the selected element
        if (selectedElement.tagName === 'BUTTON') {
            selectedElement.style.backgroundColor = bgColor;
            selectedElement.style.color = textColor;
            selectedElement.style.fontSize = fontSize;
        } else {
            selectedElement.style.backgroundColor = bgColor;
            selectedElement.style.color = textColor;
            selectedElement.style.fontSize = fontSize;
            
            // For cards, apply text color to content
            const contentElements = selectedElement.querySelectorAll('p, h3');
            contentElements.forEach(el => {
                el.style.color = textColor;
            });
        }
    }

    function showAllElements() {
        elements.forEach(element => {
            element.style.display = 'block';
        });
    }

    function hideAllElements() {
        elements.forEach(element => {
            element.style.display = 'none';
        });
    }

    function updateDefaultMessage() {
        const defaultMessage = elementsContainer.querySelector('.text-gray-500.py-10');
        if (elements.length > 0 && defaultMessage) {
            elementsContainer.removeChild(defaultMessage);
        } else if (elements.length === 0 && !defaultMessage) {
            const message = document.createElement('p');
            message.className = 'text-center text-gray-500 py-10';
            message.textContent = 'Los elementos aparecerán aquí';
            elementsContainer.appendChild(message);
        }
    }
});
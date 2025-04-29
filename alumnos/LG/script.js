document.addEventListener('DOMContentLoaded', () => {
    const demoArea = document.getElementById('demo-area');
    const demoElement = document.getElementById('demo-element');
    let selectedElement = null;

    // Selección de elementos
    demoArea.addEventListener('click', (e) => {
        if (e.target !== demoArea && e.target.id !== 'demo-element') {
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
            selectedElement = e.target.closest('.content-box, p, a, div, table, ul, ol, img');
            if (selectedElement) {
                selectedElement.classList.add('selected');
                updateElementInfo(selectedElement);
            }
        }
    });

    // Actualizar información del elemento seleccionado
    function updateElementInfo(element) {
        document.getElementById('element-content').value = element.textContent;
        document.getElementById('element-class').value = element.className.replace('selected', '').trim();
    }

    // Creación de elementos
    document.getElementById('btn-add-text').addEventListener('click', () => {
        const content = document.getElementById('element-content').value || 'Texto de ejemplo';
        const className = document.getElementById('element-class').value;
        
        const p = document.createElement('p');
        p.textContent = content;
        p.className = className;
        demoElement.appendChild(p);
    });

    document.getElementById('btn-add-link').addEventListener('click', () => {
        const content = document.getElementById('element-content').value || 'Enlace de ejemplo';
        const className = document.getElementById('element-class').value;
        
        const a = document.createElement('a');
        a.textContent = content;
        a.href = '#';
        a.className = className;
        demoElement.appendChild(a);
    });

    document.getElementById('btn-add-div').addEventListener('click', () => {
        const content = document.getElementById('element-content').value || '';
        const className = document.getElementById('element-class').value;
        
        const div = document.createElement('div');
        div.className = `content-box ${className}`;
        div.innerHTML = content;
        demoElement.appendChild(div);
    });

    document.getElementById('btn-add-table').addEventListener('click', () => {
        const className = document.getElementById('element-class').value;
        
        const table = document.createElement('table');
        table.className = className;
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Columna 1</th>
                    <th>Columna 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dato 1</td>
                    <td>Dato 2</td>
                </tr>
                <tr>
                    <td>Dato 3</td>
                    <td>Dato 4</td>
                </tr>
            </tbody>
        `;
        demoElement.appendChild(table);
    });

    document.getElementById('btn-add-list').addEventListener('click', () => {
        const className = document.getElementById('element-class').value;
        
        const ul = document.createElement('ul');
        ul.className = className;
        ul.innerHTML = `
            <li>Elemento 1</li>
            <li>Elemento 2</li>
            <li>Elemento 3</li>
        `;
        demoElement.appendChild(ul);
    });

    document.getElementById('btn-add-image').addEventListener('click', () => {
        const className = document.getElementById('element-class').value;
        
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/150';
        img.alt = 'Imagen de ejemplo';
        img.className = className;
        demoElement.appendChild(img);
    });

    // Modificación de elementos
    document.getElementById('btn-remove-element').addEventListener('click', () => {
        if (selectedElement && selectedElement !== demoElement) {
            selectedElement.remove();
            selectedElement = null;
        }
    });


    document.getElementById('btn-clear-all').addEventListener('click', () => {
        demoElement.innerHTML = '<p>¡Área de trabajo! Crea elementos abajo.</p>';
        selectedElement = null;
    });

    document.getElementById('btn-apply-modification').addEventListener('click', () => {
        if (selectedElement) {
            const property = document.getElementById('modify-property').value;
            const value = document.getElementById('modify-value').value;
            
            if (property.includes('.')) {
                const [obj, prop] = property.split('.');
                selectedElement[obj][prop] = value;
            } else {
                selectedElement[property] = value;
            }
        }
    });
    document.getElementById('btn-toggle-visibility').addEventListener('click', () => {
        if (selectedElement) {
            selectedElement.style.display = 
                selectedElement.style.display === 'none' ? 'block' : 'none';
        }
    });

    // Estilos rápidos
    document.querySelectorAll('[data-style]').forEach(button => {
        button.addEventListener('click', () => {
            if (selectedElement) {
                const [prop, value] = button.dataset.style.split(':').map(s => s.trim());
                selectedElement.style[prop] = value.replace(/'/g, '');
            }
        });
    });

    document.getElementById('quick-color').addEventListener('input', (e) => {
        if (selectedElement) {
            selectedElement.style.color = e.target.value;
        }
    });

    document.getElementById('quick-bg').addEventListener('input', (e) => {
        if (selectedElement) {
            selectedElement.style.backgroundColor = e.target.value;
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        preview: document.getElementById('preview-container'),
        elSelect: document.getElementById('element-selector'),
        propSelect: document.getElementById('property-selector'),
        valSelect: document.getElementById('value-selector'),
        applyBtn: document.getElementById('apply-style'),
        resetBtn: document.getElementById('reset-styles'),
        deleteBtn: document.getElementById('delete-element'),
        clearBtn: document.getElementById('clear-all'),
        buttons: document.querySelectorAll('.element-btn')
    };

    const counters = { container: 0, text: 0, button: 0, input: 0, link: 0, list: 0 };

    const cssProps = {
        color: ['black', 'white', 'red'], backgroundColor: ['white', '#f8f9fa'],
        fontSize: ['14px', '16px', '18px'], border: ['none', '1px solid #ddd']
    };

    const config = {
        container: { tag: 'div', text: 'Contenedor', editable: true },
        text: { tag: 'p', text: 'Texto', editable: true },
        button: { tag: 'button', text: 'Botón' },
        input: { tag: 'input', attrs: { type: 'text', placeholder: 'Texto' } },
        link: { tag: 'a', text: 'Enlace', attrs: { href: '#' } },
        list: { tag: 'ul', children: ['Item 1', 'Item 2', 'Item 3'] }
    };

    function init() {
        elements.buttons.forEach(btn =>
            btn.addEventListener('click', () => createElement(btn.dataset.type)));
        elements.elSelect.addEventListener('change', highlightSelected);
        elements.propSelect.addEventListener('change', loadValues);
        elements.applyBtn.addEventListener('click', applyStyle);
        elements.resetBtn.addEventListener('click', resetStyle);
        elements.deleteBtn.addEventListener('click', deleteElement);
        elements.clearBtn.addEventListener('click', clearAll);
        loadProperties();
    }

    function createElement(type) {
        counters[type]++;
        const cfg = config[type];
        const el = document.createElement(cfg.tag);
        if (cfg.text) el.textContent = `${cfg.text} ${counters[type]}`;
        if (cfg.editable) el.contentEditable = true;
        if (cfg.attrs) Object.entries(cfg.attrs).forEach(([k, v]) => el.setAttribute(k, v));
        if (cfg.children) cfg.children.forEach(txt => {
            const li = document.createElement('li'); li.textContent = txt; el.appendChild(li);
        });

        el.className = 'created-element';
        el.dataset.name = `${type}${counters[type]}`;
        el.style.animation = 'fadeIn 0.5s ease';
        elements.preview.appendChild(el);
        updateSelector();
        elements.elSelect.value = elements.preview.children.length - 1;
        highlightSelected();
    }

    function updateSelector() {
        elements.elSelect.innerHTML = '<option value="-1">Seleccionar</option>';
        Array.from(elements.preview.children).forEach((el, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = el.tagName.toLowerCase() + ' ' + (i + 1);
            elements.elSelect.appendChild(opt);
        });
    }

    function highlightSelected() {
        Array.from(elements.preview.children).forEach(el => el.style.outline = 'none');
        if (elements.elSelect.value !== '-1') {
            const el = elements.preview.children[elements.elSelect.value];
            el.style.outline = '2px solid blue';
        }
    }

    function loadProperties() {
        elements.propSelect.innerHTML = '<option value="-1">Propiedad</option>';
        Object.keys(cssProps).forEach(prop => {
            const opt = document.createElement('option');
            opt.value = prop; opt.textContent = prop;
            elements.propSelect.appendChild(opt);
        });
    }

    function loadValues() {
        const prop = elements.propSelect.value;
        elements.valSelect.innerHTML = '<option value="-1">Valor</option>';
        cssProps[prop]?.forEach(val => {
            const opt = document.createElement('option');
            opt.value = val; opt.textContent = val;
            elements.valSelect.appendChild(opt);
        });
    }

    function applyStyle() {
        const i = elements.elSelect.value;
        const prop = elements.propSelect.value;
        const val = elements.valSelect.value;
        if (i === '-1' || prop === '-1' || val === '-1') return alert('Completa todas las opciones');
        const el = elements.preview.children[i];
        el.style[prop] = val;
    }

    function resetStyle() {
        const i = elements.elSelect.value;
        if (i === '-1') return alert('Selecciona un elemento');
        elements.preview.children[i].removeAttribute('style');
    }

    function deleteElement() {
        const i = elements.elSelect.value;
        if (i === '-1') return alert('Selecciona un elemento');
        elements.preview.removeChild(elements.preview.children[i]);
        updateSelector();
    }

    function clearAll() {
        if (confirm('¿Eliminar todo?')) {
            elements.preview.innerHTML = '';
            Object.keys(counters).forEach(k => counters[k] = 0);
            updateSelector();
        }
    }

    init();
});

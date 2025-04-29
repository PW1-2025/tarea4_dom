// Elementos del DOM
const demoElement = document.getElementById('demo-element');
const inputText = document.getElementById('input-text');
const btnUpdateText = document.getElementById('btn-update-text');
const inputColor = document.getElementById('input-color');
const btnUpdateColor = document.getElementById('btn-update-color');
const inputSize = document.getElementById('input-size');
const btnUpdateSize = document.getElementById('btn-update-size');

const inputBgColor = document.getElementById('input-bgcolor');
const btnUpdateBgColor = document.getElementById('btn-update-bgcolor');
const fontSelect = document.getElementById('font-select');
const fontStyleSelect = document.getElementById('font-style-select');

// Funcionalidades
btnUpdateText.addEventListener('click', () => {
  demoElement.textContent = inputText.value || 'Escribe algo...';
});

btnUpdateColor.addEventListener('click', () => {
  demoElement.style.color = inputColor.value;
});

btnUpdateSize.addEventListener('click', () => {
  const size = parseInt(inputSize.value);
  if (size >= 8 && size <= 100) {
    demoElement.style.fontSize = `${size}px`;
  } else {
    alert('Por favor ingresa un tamaño entre 8 y 100.');
  }
});

btnUpdateBgColor.addEventListener('click', () => {
  demoElement.style.backgroundColor = inputBgColor.value;
});

fontSelect.addEventListener('change', () => {
  demoElement.style.fontFamily = fontSelect.value;
});

fontStyleSelect.addEventListener('change', () => {
  const selected = fontStyleSelect.value;
  demoElement.style.fontWeight = selected.includes('bold') ? 'bold' : 'normal';
  demoElement.style.fontStyle = selected.includes('italic') ? 'italic' : 'normal';
});

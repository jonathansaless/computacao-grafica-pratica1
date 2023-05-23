import { bresenhamLine } from "./algoritmos/line-bresenham.js";

var buttons = document.querySelectorAll('.menu-button');
var previousButton = null;
var inputContainer = document.getElementById('input-container');

function changeBackgroundColor(event) {
  var button = event.target;

  if (previousButton !== null) {
    previousButton.classList.remove('selected');
  }

  button.classList.add('selected');
  previousButton = button;

  handleButtonClick(button);
}

function handleButtonClick(button) {
  var buttonText = button.innerText;

  // Remova os inputs anteriores
  inputContainer.innerHTML = '';

  // Crie os novos inputs com base no botão selecionado
  switch (buttonText) {
    case 'Linha':
      insertText(inputContainer, 'Ponto A');
      createInput(inputContainer, 'number', 'x', 'AX');
      createInput(inputContainer, 'number', 'y', 'AY');

      var lineBreak = document.createElement('br');
      inputContainer.appendChild(lineBreak);

      insertText(inputContainer, 'Ponto B');
      createInput(inputContainer, 'number', 'x', 'BX');
      createInput(inputContainer, 'number', 'y', 'BY');

      var lineBreak = document.createElement('br');
      inputContainer.appendChild(lineBreak);

      insertDrawingButton(inputContainer, 'Desenhar linha');
      break;
    case 'Círculo':
      createInput(inputContainer, 'text', 'Ponto Central (x, y)');
      createInput(inputContainer, 'text', 'Raio');
      break;
    case 'Curva':
      createInput(inputContainer, 'text', 'Ponto inicial (x, y)');
      createInput(inputContainer, 'text', 'Ponto final (x, y)');
      createInput(inputContainer, 'text', 'N pontos de controle (x, y)');
      break;
    case 'Polígono':
      createInput(inputContainer, 'text', 'N Pontos iniciais e finais (x, y)');
      break;
    case 'Preenchimento Recursivo':
      createInput(inputContainer, 'text', 'Ponto qualquer (x, y)');
      break;
    case 'Varredura':
      console.log('Clique em algum poligono');
      break;
    case 'Rotação':
      createInput(inputContainer, 'text', 'Ângulo de rotação');
      createInput(inputContainer, 'text', 'Ponto Pivô (x, y)');
      break;
    case 'Translação':
      createInput(inputContainer, 'text', 'Ponto de deslocação (x, y)');
      break;
    case 'Escala':
      createInput(inputContainer, 'text', 'Fator de escala (x, y)');
      createInput(inputContainer, 'text', 'Ponto fixo de escala (x, y)');
      break;
    case 'Projeção Ortogonal':
      createInput(inputContainer, 'text', 'N Pontos de um elemento 3d (x, y, z)');
      break;
    case 'Projeção Perspectiva':
      createInput(inputContainer, 'text', 'N Pontos de um elemento 3d (x, y, z)');
      break;
    default:
      console.log('Botão inválido');
      break;
  }
}

function createInput(container, type, placeholder, inputId) {
  var input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.setAttribute('class', 'fade-in');
  input.setAttribute('id', inputId);
  container.appendChild(input);

}

function insertText(container, labelText) {
  var label = document.createElement('label');
  label.textContent = labelText + ': ';
  label.setAttribute('class', 'fade-in');
  container.appendChild(label);

}

function insertDrawingButton(container, buttonText) {
  var button = document.createElement('button');
  button.textContent = buttonText;
  button.setAttribute('id', 'drawLine');
  button.setAttribute('class', 'fade-in');
  container.appendChild(button);
  button.addEventListener("click", drawAlgoritmo);

}

function drawAlgoritmo() {
  const pointAX = parseInt(document.getElementById("AX").value);
  const pointAY = parseInt(document.getElementById("AY").value);
  const pointBX = parseInt(document.getElementById("BX").value);
  const pointBY = parseInt(document.getElementById("BY").value);

   bresenhamLine(pointAX, pointAY, pointBX, pointBY);
}

buttons.forEach(function(button) {
  button.addEventListener('click', changeBackgroundColor);
});

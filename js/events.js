import { bresenhamLine } from "./algoritmos/line-bresenham.js";

var buttons = document.querySelectorAll('.menu-button');
var previousButton = null;
var inputContainer = document.getElementById('input-container');
var cont = 1;


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
  let div;
  switch (buttonText) {
    case 'Linha':
      div = createDivInputPoint('ponto-inicial', 'Ponto Inicial');
      inputContainer.appendChild(div);
      div = createDivInputPoint('ponto-final', 'Ponto Final');
      inputContainer.appendChild(div);

      insertDrawingButton(inputContainer, 'Desenhar linha');
      break;
    case 'Círculo':
      div = createDivInputPoint('ponto-central', 'Ponto Central');
      inputContainer.appendChild(div);
      
      div = createDiv('raio');
      inputContainer.appendChild(div);
      insertText(div, 'Raio');
      createInput(div, 'number', 'r', 'raioX');
      
      insertDrawingButton(inputContainer, 'Desenhar círculo');
      break;
    case 'Curva':
      div = createDivInputPoint('ponto-inicial', 'Ponto Inicial');
      inputContainer.appendChild(div);
      div = createDivInputPoint('ponto-final', 'Ponto Final');
      inputContainer.appendChild(div);

      div = createDivInputControlPoint('ponto-controle', 'Ponto(s) de Controle');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Desenhar curva');
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

function insertAddButton(container){
  var addButton = document.createElement('button');
  addButton.setAttribute('id', 'add-button');
  addButton.innerText = 'Adicionar';
  container.appendChild(addButton);
  addButton.addEventListener('click', addControlPoint);
}


function createDivInputPoint(idDiv, labelText){
  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);

  var label = document.createElement('label');
  label.textContent = labelText + ': ';
  label.setAttribute('class', 'fade-in');

  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';
  inputA.setAttribute('class', 'fade-in');
  // input.setAttribute('id', 'inicial-x');

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';
  inputB.setAttribute('class', 'fade-in');
  // input.setAttribute('id', 'inicial-x');

  pointDiv.appendChild(label);
  pointDiv.appendChild(inputA);
  pointDiv.appendChild(inputB);
      
  return pointDiv;
}

function createDivInputControlPoint(idDiv, labelText){

  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);

  var controlPoint = document.createElement('div');
  controlPoint.setAttribute('id', 'ponto-controle-0');

  var label = document.createElement('label');
  label.textContent = labelText + ': ';
  label.setAttribute('class', 'fade-in');

  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';
  inputA.setAttribute('class', 'fade-in');
  // input.setAttribute('id', 'inicial-x');

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';
  inputB.setAttribute('class', 'fade-in');
  // input.setAttribute('id', 'inicial-x');

  controlPoint.appendChild(label);
  controlPoint.appendChild(inputA);
  controlPoint.appendChild(inputB);
  pointDiv.appendChild(controlPoint);
  insertAddButton(pointDiv);

  return pointDiv;
}

function addControlPoint() {
  if (cont >= 5) {
    let addButton = document.getElementById('add-button');
    addButton.disabled = true;
    addButton.innerText = 'Máximo adicionado!';
    return;
  }
  // let containerPoints = document.getElementById('ponto-controle');
  let controlPointBefore = document.getElementById('ponto-controle-'+(cont-1));

  var controlPoint = document.createElement('div');
  controlPoint.setAttribute('id', 'ponto-controle-'+cont);

  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';
  inputA.setAttribute('class', 'fade-in');

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';
  inputB.setAttribute('class', 'fade-in end');
  console.log('teste');
  controlPoint.appendChild(inputA);
  controlPoint.appendChild(inputB);
  // containerPoints.appendChild(controlPoint);
  controlPointBefore.after(controlPoint);
  cont++;
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
  }
);
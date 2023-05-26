// import { bresenhamLine } from "./algoritmos/line-bresenham.js";
import { clearScreen } from "./main.js";
var buttons = document.querySelectorAll('.menu-button');
var previousButton = null;
var inputContainer = document.getElementById('input-container');
var cont = 1;

function changeBackgroundColor(event) {
  var button = event.target;
  cont = 1; // reinicia contador de pontos de controles

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
      insertClearButton(inputContainer);
      break;

    case 'Círculo':
      div = createDivInputPoint('ponto-central', 'Ponto Central');
      inputContainer.appendChild(div);
      
      div = createDivInput('raio', 'Raio', 'Digite aqui');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Desenhar círculo');
      insertClearButton(inputContainer);
      break;

    case 'Curva':
      div = createDivInputPoint('ponto-inicial', 'Ponto Inicial');
      inputContainer.appendChild(div);
      div = createDivInputPoint('ponto-final', 'Ponto Final');
      inputContainer.appendChild(div);

      div = createDivInputControlPoint('ponto-controle');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Desenhar curva');
      insertClearButton(inputContainer);
      break;

    case 'Polígono':
      div = createDivInputPointPolilyne('polilyne');
      inputContainer.appendChild(div);

      insertDrawingButton(inputContainer, 'Desenhar polígono');
      insertClearButton(inputContainer);
      break;

    case 'Preenchimento Recursivo':
      div = createDivInputPoint('ponto-preenchimento', 'Ponto em poligono');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar preenchimento');
      insertClearButton(inputContainer);
      break;

    case 'Varredura':
      div = createDivInputPoint('ponto-varredura', 'Ponto em poligono');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar varredura');
      insertClearButton(inputContainer);
      break;

    case 'Rotação':
      // angulo de rotação (ex.: 90º) e pivô (x, y)
      div = createDivInput('angulo-rotacao', 'Ângulo de rotação', 'Xº');
      inputContainer.appendChild(div);

      div = createDivInputPoint('ponto-pivo', 'Ponto pivô');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar rotação');
      insertClearButton(inputContainer);
      break;

    case 'Translação':
      // deslocamento (x, y)
      div = createDivInputPoint('ponto-deslocamento', 'Ponto de deslocamento');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar deslocamento');
      insertClearButton(inputContainer);
      break;

    case 'Escala':
      // fator de escala de x, y e ponto fixo (x, y)
      div = createDivInputPoint('fator-escala', 'Fator de escala');
      inputContainer.appendChild(div);

      div = createDivInputPoint('ponto-fixo', 'Ponto fixo');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar transformação de escala');
      insertClearButton(inputContainer);
      break;

    case 'Projeção Ortogonal':
      div = createDivInputPointPolilyne('polilyne');
      inputContainer.appendChild(div);

      insertDrawingButton(inputContainer, 'Polígono com projeção ortogonal');
      insertClearButton(inputContainer);
      break;

    case 'Projeção Perspectiva':
      div = createDivInputPointPolilyne('polilyne');
      inputContainer.appendChild(div);

      insertDrawingButton(inputContainer, 'Polígono com projeção perspectiva');
      insertClearButton(inputContainer);
      break;

    default:
      console.log('Botão inválido');
      break;
  }
}

function createDivInput(idDiv, labelText, placeholderText) {
  var divInput = document.createElement('div');
  divInput.setAttribute('id', idDiv);
  divInput.setAttribute('class', 'fade-in');

  var label = document.createElement('label');
  label.textContent = labelText + ': ';

  var input = document.createElement('input');
  input.type = 'number';
  input.placeholder = placeholderText;

  divInput.appendChild(label);
  divInput.appendChild(input);

  return divInput;
}

function createDivInputPoint(idDiv, labelText){
  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);
  pointDiv.setAttribute('class', 'fade-in');

  var label = document.createElement('label');
  label.textContent = labelText + ': ';

  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';

  pointDiv.appendChild(label);
  pointDiv.appendChild(inputA);
  pointDiv.appendChild(inputB);
      
  return pointDiv;
}

function createDivInputControlPoint(idDiv){
  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);
  pointDiv.setAttribute('class', 'fade-in');

  var controlPoint = document.createElement('div');
  controlPoint.setAttribute('id', 'ponto-controle-'+cont);

  var label = document.createElement('label');
  label.textContent = 'Ponto de controle (' +cont+ '): ';

  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';

  controlPoint.appendChild(label);
  controlPoint.appendChild(inputA);
  controlPoint.appendChild(inputB);
  pointDiv.appendChild(controlPoint);
  insertAddButton(pointDiv);

  cont++;
  return pointDiv;
}

function addControlPoint() {
  if (cont > 5) {
    let addButton = document.getElementById('add-button');
    addButton.disabled = true;
    addButton.innerText = 'Máximo adicionado!';
    return;
  }
  // let containerPoints = document.getElementById('ponto-controle');
  let controlPointBefore = document.getElementById('ponto-controle-'+(cont-1));

  var controlPoint = document.createElement('div');
  controlPoint.setAttribute('id', 'ponto-controle-'+cont);

  var label = document.createElement('label');
  label.textContent = 'Ponto de controle (' +cont+ '): ';
  
  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';
  inputA.setAttribute('class', 'fade-in');

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';
  inputB.setAttribute('class', 'fade-in end');

  controlPoint.appendChild(label);
  controlPoint.appendChild(inputA);
  controlPoint.appendChild(inputB);
  // containerPoints.appendChild(controlPoint);
  controlPointBefore.after(controlPoint);

  cont++;
}

function createDivInputPointPolilyne(idDiv) {
  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);
  pointDiv.setAttribute('class', 'fade-in');

  var polilynePoint = document.createElement('div');
  polilynePoint.setAttribute('id', 'polilyne-'+cont);

  var inicialDiv = document.createElement('div');
  inicialDiv.setAttribute('id', 'ponto-inicial');
  var labelInicial = document.createElement('label');
  labelInicial.textContent = 'Ponto Inicial (' +cont+ '): ';
  var inputInicialA = document.createElement('input');
  inputInicialA.type = 'number';
  inputInicialA.placeholder = 'x';
  var inputInicialB = document.createElement('input');
  inputInicialB.type = 'number';
  inputInicialB.placeholder = 'y';

  var finalDiv = document.createElement('div');
  finalDiv.setAttribute('id', 'ponto-final');
  var labelFinal = document.createElement('label');
  labelFinal.textContent = 'Ponto Final (' +cont+ '): ';
  var inputFinalA = document.createElement('input');
  inputFinalA.type = 'number';
  inputFinalA.placeholder = 'x';
  var inputFinalB = document.createElement('input');
  inputFinalB.type = 'number';
  inputFinalB.placeholder = 'y';

  inicialDiv.appendChild(labelInicial);
  inicialDiv.appendChild(inputInicialA);
  inicialDiv.appendChild(inputInicialB);
  polilynePoint.appendChild(inicialDiv);
  finalDiv.appendChild(labelFinal);
  finalDiv.appendChild(inputFinalA);
  finalDiv.appendChild(inputFinalB);
  polilynePoint.appendChild(finalDiv);
  pointDiv.appendChild(polilynePoint);
  insertAddButton(pointDiv);

  cont++;
  return pointDiv;
}

function addPolilynePoint() {
  if (cont > 10) {
    let addButton = document.getElementById('add-button');
    addButton.disabled = true;
    addButton.innerText = 'Máximo adicionado!';
    return;
  }
  // let containerPoints = document.getElementById('ponto-controle');
  let polilynePointBefore = document.getElementById('polilyne-'+(cont-1));

  var polilynePoint = document.createElement('div');
  polilynePoint.setAttribute('id', 'polilyne-'+cont);

  var inicialDiv = document.createElement('div');
  inicialDiv.setAttribute('id', 'ponto-inicial');
  var labelInicial = document.createElement('label');
  labelInicial.textContent = 'Ponto Inicial (' +cont+ '): ';
  var inputInicialA = document.createElement('input');
  inputInicialA.type = 'number';
  inputInicialA.placeholder = 'x';
  var inputInicialB = document.createElement('input');
  inputInicialB.type = 'number';
  inputInicialB.placeholder = 'y';

  var finalDiv = document.createElement('div');
  finalDiv.setAttribute('id', 'ponto-final');
  var labelFinal = document.createElement('label');
  labelFinal.textContent = 'Ponto Final (' +cont+ '): ';
  var inputFinalA = document.createElement('input');
  inputFinalA.type = 'number';
  inputFinalA.placeholder = 'x';
  var inputFinalB = document.createElement('input');
  inputFinalB.type = 'number';
  inputFinalB.placeholder = 'y';

  inicialDiv.appendChild(labelInicial);
  inicialDiv.appendChild(inputInicialA);
  inicialDiv.appendChild(inputInicialB);
  polilynePoint.appendChild(inicialDiv);
  finalDiv.appendChild(labelFinal);
  finalDiv.appendChild(inputFinalA);
  finalDiv.appendChild(inputFinalB);
  polilynePoint.appendChild(finalDiv);
  // containerPoints.appendChild(controlPoint);
  polilynePointBefore.after(polilynePoint);

  cont++;
}
function insertAddButton(container){
  var button = document.createElement('button');
  button.setAttribute('id', 'add-button');
  button.setAttribute('class', 'button');
  button.innerText = 'Adicionar';
  container.appendChild(button);
  if(container.id == 'ponto-controle'){
    button.addEventListener('click', addControlPoint);
  }else if(container.id == 'polilyne'){
    button.addEventListener('click', addPolilynePoint);
  }
}

function insertClearButton(container){
  var button = document.createElement('button');
  button.setAttribute('class', 'clear-button');
  button.innerText = 'Limpar Tela';
  container.appendChild(button);
  button.addEventListener("click", clearScreen);
}

function insertDrawingButton(container, buttonText) {
  var button = document.createElement('button');
  button.textContent = buttonText;
  button.setAttribute('id', 'draw-line');
  button.setAttribute('class', 'fade-in button');
  container.appendChild(button);
  button.addEventListener("click", drawAlgoritmo);

}

function drawAlgoritmo() {
  /* Desenha */
  console.log('Desenha');
  /*const pointAX = parseInt(document.getElementById("AX").value);
  const pointAY = parseInt(document.getElementById("AY").value);
  const pointBX = parseInt(document.getElementById("BX").value);
  const pointBY = parseInt(document.getElementById("BY").value);

  bresenhamLine(pointAX, pointAY, pointBX, pointBY);*/
}


buttons.forEach(function(button) {
    button.addEventListener('click', changeBackgroundColor);
  }
);

import { drawAlgoritmo} from "./draw.js"; 
import { clearScreen } from "./main.js";


var buttons = document.querySelectorAll('.menu-button');
var previousButton = null;
var inputContainer = document.querySelector('.input-container');
var cont = 1;
export var controlPoints = [];
export var polilynePoints = [];


function changeBackgroundColor(event) {
  var button = event.target;
  // reinicia variaveis
  cont = 1;
  controlPoints = [];
  polilynePoints = [];
  if (previousButton !== null) {
    previousButton.classList.remove('selected');
  }

  button.classList.add('selected');
  previousButton = button;

  handleButtonClick(button);
}

function handleButtonClick(button) {

  // Remova os inputs anteriores
  inputContainer.innerHTML = '';

  // Crie os novos inputs com base no botão selecionado
  let div;
  switch (button.innerText) {
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
  let addButton = document.querySelector('.add-button');

  let controlPointBefore = document.getElementById('ponto-controle-'+(cont-1));
  /* salva os pontos que estavam no input */
  console.log(controlPointBefore);
  var inputX = (controlPointBefore.querySelector('input[type="number"][placeholder="x"]')).value;
  var inputY = (controlPointBefore.querySelector('input[type="number"][placeholder="y"]')).value;

  if(inputX == '' || inputY == ''){
    console.log('input vazio, favor informe um valor');
    return;

  }else{
    console.log('Valor de x:', inputX);
    console.log('Valor de y:', inputY);
    controlPoints.push({ x:  parseInt(inputX), y: parseInt(inputY)});
    controlPointBefore.style.display = 'none';  
  }
  
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
  addButton.before(controlPoint); /* adiciona antes do botão de adicionar*/

  cont++;
  if (cont > 6) {
    addButton.disabled = true;
    addButton.innerText = 'Máximo adicionado!';
    controlPoint.remove();
    return;
  }
  
}

function createDivInputPointPolilyne(idDiv) {
  var pointDiv = document.createElement('div');
  pointDiv.setAttribute('id', idDiv);
  pointDiv.setAttribute('class', 'fade-in');

  var polilynePoint = document.createElement('div');
  polilynePoint.setAttribute('id', 'polilyne-'+cont);
  var labelA = document.createElement('label');
  labelA.textContent = 'Ponto ' +cont+ ': ';
  var inputAX = document.createElement('input');
  inputAX.type = 'number';
  inputAX.placeholder = 'x';
  var inputAY = document.createElement('input');
  inputAY.type = 'number';
  inputAY.placeholder = 'y';
  
  cont++;
  var polilynePoint2 = document.createElement('div');
  polilynePoint2.setAttribute('id', 'polilyne-'+cont);

  var labelB = document.createElement('label');
  labelB.textContent = 'Ponto ' +cont+ ': ';
  var inputBX = document.createElement('input');
  inputBX.type = 'number';
  inputBX.placeholder = 'x';
  var inputBY = document.createElement('input');
  inputBY.type = 'number';
  inputBY.placeholder = 'y';

  polilynePoint.appendChild(labelA);
  polilynePoint.appendChild(inputAX);
  polilynePoint.appendChild(inputAY);
  
  polilynePoint2.appendChild(labelB);
  polilynePoint2.appendChild(inputBX);
  polilynePoint2.appendChild(inputBY);
  
  pointDiv.appendChild(polilynePoint);
  pointDiv.appendChild(polilynePoint2);

  insertAddButton(pointDiv);

  cont++;
  return pointDiv;
}

function addPolilynePoint() {
  let addButton = document.querySelector('.add-button');

  // se for a primeira vez que o usuário vai clicar no botão adicionar, vai ser ocultado 2 inputs
  console.log(cont);
  if(cont == 3){
    let polilynePointBefore = document.getElementById('polilyne-'+(cont-1));
    let polilynePointBefore2 = document.getElementById('polilyne-'+(cont-2));
  } // senão, vai ocultar somente o input anterior
  else{
    let polilynePointBefore = document.getElementById('polilyne-'+(cont-1));
  }

  console.log(polilynePointBefore);
  var pontoInicial = polilynePointBefore.querySelector('#ponto-inicial');
  var inputInicialX = (pontoInicial.querySelector('input[type="number"][placeholder="x"]')).value;
  var inputInicialY = (pontoInicial.querySelector('input[type="number"][placeholder="y"]')).value;

  var pontoFinal = polilynePointBefore.querySelector('#ponto-final');
  var inputFinalX = (pontoFinal.querySelector('input[type="number"][placeholder="x"]')).value;
  var inputFinalY = (pontoFinal.querySelector('input[type="number"][placeholder="y"]')).value;

  if(inputInicialX == '' || inputInicialY == '' || inputFinalX == '' || inputFinalY == ''){
    console.log('algum input vazio, favor informe todos os valores');
    return;
  }else{
    console.log('Valor de x:', inputInicialX);
    console.log('Valor de y:', inputInicialY);
    console.log('Valor de x:', inputFinalX);
    console.log('Valor de y:', inputFinalY);
    polilynePoints.push({ x: parseInt(inputInicialX), y: parseInt(inputInicialY)}, { x: parseInt(inputFinalX), y: parseInt(inputFinalY)});
    console.log(polilynePoints);
    polilynePointBefore.style.display = 'none';
  }
  
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
  addButton.before(polilynePoint); /* adiciona antes do botão de adicionar*/


  cont++;
  if (cont > 10) {
    addButton.disabled = true;
    addButton.innerText = 'Máximo adicionado!';
    polilynePoint.remove();
    return;
  }
  
}
function insertAddButton(container){
  var button = document.createElement('button');
  button.setAttribute('class', 'add-button');
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
  // button.setAttribute('id', 'draw-line');
  button.setAttribute('class', 'fade-in draw-button');
  container.appendChild(button);
  button.addEventListener("click", drawAlgoritmo);

}


buttons.forEach(function(button) {
    button.addEventListener('click', changeBackgroundColor);
  }
);

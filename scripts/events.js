import { drawAlgoritmo} from "./draw.js"; 
// import { clearScreen } from "./main.js";
import { contPoligon } from "./algorithms/constants/variables.js";
import { emptyHistory } from "./algorithms/constants/variables.js";
import { restartContPolygon } from "./algorithms/constants/variables.js";

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
      break;

    case 'Círculo':

      div = createDivInputPoint('ponto-central', 'Ponto Central');
      inputContainer.appendChild(div);
      
      div = createDivInput('raio', 'Raio', 'Digite aqui');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Desenhar círculo');
      break;

    case 'Curva':

      div = createDivInputPoint('ponto-inicial', 'Ponto Inicial');
      inputContainer.appendChild(div);
      div = createDivInputPoint('ponto-final', 'Ponto Final');
      inputContainer.appendChild(div);

      div = createDivInputControlPoint('ponto-controle');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Desenhar curva');
      break;

    case 'Polígono':

      div = createDivInputPointPolilyne('polilyne');
      inputContainer.appendChild(div);

      insertDrawingButton(inputContainer, 'Desenhar polígono');
      break;

    case 'Preenchimento Recursivo':

      div = createDivInputPoint('ponto-preenchimento', 'Ponto em poligono');
      inputContainer.appendChild(div);
      
      insertDrawingButton(inputContainer, 'Realizar preenchimento');
      break;

    case 'Varredura':

      // se não houver poligonos desenhados
      if(contPoligon == 0){
        alert('Não há polígonos desenhados! Acesse "Polígono" e desenhe seu primeiro polígono');
        break;
      }
      div = createDivScanline('ponto-varredura');
      inputContainer.appendChild(div);
      
      break;

    case 'Rotação':
      
      // angulo de rotação (ex.: 90º) e pivô (x, y)
      div = createDivInput('angulo-rotacao', 'Ângulo de rotação', 'Xº');
      inputContainer.appendChild(div);

      div = createDivInputPoint('ponto-pivo', 'Ponto pivô');
      inputContainer.appendChild(div);
      
      div = createSelectionButton('rotacao');
      inputContainer.appendChild(div);
      break;

    case 'Translação':

      // deslocamento (x, y)
      div = createDivInputPoint('ponto-deslocamento', 'Ponto de deslocamento');
      inputContainer.appendChild(div);
      
      div = createSelectionButton('translacao');
      inputContainer.appendChild(div);
      break;

    case 'Escala':

      // fator de escala de x, y e ponto fixo (x, y)
      div = createDivInputPoint('fator-escala', 'Fator de escala');
      inputContainer.appendChild(div);

      div = createDivInputPoint('ponto-fixo', 'Ponto fixo');
      inputContainer.appendChild(div);
      
      div = createSelectionButton('escala');
      inputContainer.appendChild(div);
      
      break;

    case 'Projeção Ortogonal':

      div = createDivOrthographic('orthographic');
      inputContainer.appendChild(div);
      break;

    case 'Projeção Perspectiva':

      div = createDivPerspective('perspective');
      inputContainer.appendChild(div);
      break;

    default:

      alert('Botão inválido');
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

function createDivScanline(idDiv) {
  var buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('id', idDiv);
  buttonsDiv.setAttribute('class', 'fade-in');

  for (var i = 0; i < contPoligon; i++) {
    var button = document.createElement('button');
    button.setAttribute('class', 'draw-button');
    button.setAttribute('id', 'varredura-poligono-' + i);
    button.textContent = 'Polígono ' + (i + 1);

    button.addEventListener('click', function(event) {
      // Remove a classe "selected" de todos os botões
      var buttons = buttonsDiv.querySelectorAll('.draw-button');
      buttons.forEach(function(btn) {
        btn.classList.remove('selected');
      });

      // Adiciona a classe "selected" ao botão clicado
      var clickedButton = event.target;
      clickedButton.classList.add('selected');

      // Chama a função drawAlgoritmo
      drawAlgoritmo();
    });

    buttonsDiv.appendChild(button);
  }

  return buttonsDiv;
}

function createDivOrthographic(idDiv){
  var buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('id', idDiv);
  buttonsDiv.setAttribute('class', 'fade-in');

  for (var i = 0; i < 3; i++) {
    var button = document.createElement('button');
    button.setAttribute('class', 'draw-button');
    button.setAttribute('id', 'cube-' + i);
    button.textContent = 'Cubo ' + (i + 1);

    button.addEventListener('click', function(event) {
      // Remove a classe "selected" de todos os botões
      var buttons = buttonsDiv.querySelectorAll('.draw-button');
      buttons.forEach(function(btn) {
        btn.classList.remove('selected');
      });

      // Adiciona a classe "selected" ao botão clicado
      var clickedButton = event.target;
      clickedButton.classList.add('selected');

      // Chama a função drawAlgoritmo se for projeção ortogonal, pois nao precisa de mais informações
      drawAlgoritmo();
    });

    buttonsDiv.appendChild(button);
  }

  return buttonsDiv;
}

function createDivPerspective(idDiv){
  var buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('id', idDiv);
  buttonsDiv.setAttribute('class', 'fade-in');

  for (var i = 0; i < 3; i++) {
    var button = document.createElement('button');
    button.setAttribute('class', 'draw-button cubes');
    button.setAttribute('id', 'cube-' + i);
    button.textContent = 'Cubo ' + (i + 1);

    button.addEventListener('click', function(event) {
      // Remove a classe "selected" de todos os botões
      var buttons = buttonsDiv.querySelectorAll('.cubes');
      buttons.forEach(function(btn) {
        btn.classList.remove('selected');
        // oculta os botões de cubos para mostrar novos botões de pontos de fuga
        btn.style.display = 'None';
        
      });

      // Adiciona a classe "selected" ao botão clicado
      var clickedButton = event.target;
      clickedButton.classList.add('selected');

      // Chama a função drawAlgoritmo se for projeção ortogonal, pois nao precisa de mais informações
      
      for (var i = 0; i < 3; i++) {
        var button = document.createElement('button');
        button.setAttribute('class', 'draw-button pontos-fugas');
        button.setAttribute('id', 'ponto-fuga-' + i);
        button.textContent = (i + 1)+' ponto de fuga';
    
        button.addEventListener('click', function(event) {
          // Remove a classe "selected" de todos os botões
          var buttons = buttonsDiv.querySelectorAll('.pontos-fugas');
          buttons.forEach(function(btn) {
            btn.classList.remove('selected');
            // oculta os botões de cubos para mostrar novos botões de pontos de fuga
            btn.style.display = 'None';
            
          });
    
          // Adiciona a classe "selected" ao botão clicado
          var clickedButton = event.target;
          clickedButton.classList.add('selected');
    
          // Chama a função drawAlgoritmo se for projeção ortogonal, pois nao precisa de mais informações
          
          drawAlgoritmo();
        });
    
        buttonsDiv.appendChild(button);
      }
    });

    buttonsDiv.appendChild(button);
  }

  return buttonsDiv;
}

function createSelectionButton(idDiv) {
  var buttonsDiv = document.createElement('div');
  buttonsDiv.setAttribute('id', idDiv);
  buttonsDiv.setAttribute('class', 'fade-in');

  for (var i = 0; i < contPoligon; i++) {
    var button = document.createElement('button');
    button.setAttribute('class', 'draw-button');
    button.setAttribute('id', idDiv+'-poligono-' + i);
    
    button.textContent = 'Transformar Polígono ' + (i + 1);

    button.addEventListener('click', function(event) {
      // Remove a classe "selected" de todos os botões
      var buttons = buttonsDiv.querySelectorAll('.draw-button');
      buttons.forEach(function(btn) {
        btn.classList.remove('selected');
      });

      // Adiciona a classe "selected" ao botão clicado
      var clickedButton = event.target;
      clickedButton.classList.add('selected');

      // Chama a função drawAlgoritmo
      drawAlgoritmo();
    });

    buttonsDiv.appendChild(button);
  }

  return buttonsDiv;
}

function addControlPoint() {
  let addButton = document.querySelector('.add-button');

  let controlPointBefore = document.getElementById('ponto-controle-'+(cont-1));
  /* salva os pontos que estavam no input */
  console.log(controlPointBefore);
  let inputX = (controlPointBefore.querySelector('input[placeholder="x"]')).value;
  let inputY = (controlPointBefore.querySelector('input[placeholder="y"]')).value;

  if(inputX == '' || inputY == ''){
    alert('Para adicionar um novo ponto de controle, preencha primeiro o ponto de controle atual!');
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
  if (cont > 4) {
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
  labelA.textContent = 'Ponto ' +cont+ ' (informe no mínimo 3 pontos): ';
  var inputAX = document.createElement('input');
  inputAX.type = 'number';
  inputAX.placeholder = 'x';
  var inputAY = document.createElement('input');
  inputAY.type = 'number';
  inputAY.placeholder = 'y';
  
  polilynePoint.appendChild(labelA);
  polilynePoint.appendChild(inputAX);
  polilynePoint.appendChild(inputAY);
  
  pointDiv.appendChild(polilynePoint);
  
  insertAddButton(pointDiv);

  cont++;
  return pointDiv;
}

function addPolilynePoint() {
  let addButton = document.querySelector('.add-button');

  // se for a primeira vez que o usuário vai clicar no botão adicionar, vai ser ocultado 2 inputs
  let polilynePointBefore = document.getElementById('polilyne-'+(cont-1));
  var inputX = (polilynePointBefore.querySelector('input[placeholder="x"]')).value;
  var inputY = (polilynePointBefore.querySelector('input[placeholder="y"]')).value;

  if(inputX == '' || inputY == ''){
    alert('Para adicionar um novo ponto, preencha primeiro o ponto atual!');
    return;
  }else{
    // adiciona um campo de ID do poligono, para passar o poligona para preenchimento por varredura
    polilynePoints.push({ x:  parseInt(inputX), y: parseInt(inputY), polID: contPoligon});
    polilynePointBefore.style.display = 'none';
  }
  
  var polilynePoint = document.createElement('div');
  polilynePoint.setAttribute('id', 'polilyne-'+cont);

  var label = document.createElement('label');
  label.textContent = 'Ponto ' +cont+ ': ';
  
  var inputA = document.createElement('input');
  inputA.type = 'number';
  inputA.placeholder = 'x';
  inputA.setAttribute('class', 'fade-in');

  var inputB = document.createElement('input');
  inputB.type = 'number';
  inputB.placeholder = 'y';
  inputB.setAttribute('class', 'fade-in end');

  polilynePoint.appendChild(label);
  polilynePoint.appendChild(inputA);
  polilynePoint.appendChild(inputB);
  addButton.before(polilynePoint); /* adiciona antes do botão de adicionar que está dentro da div polilyne*/

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

function insertDrawingButton(container, buttonText) {
  var button = document.createElement('button');
  button.textContent = buttonText;
  // button.setAttribute('id', 'draw-line');
  button.setAttribute('class', 'fade-in draw-button');
  container.appendChild(button);
  button.addEventListener("click", drawAlgoritmo);

}

function clearScreen() {
  const screen = document.querySelector(".screen");
  const subElements = screen.querySelectorAll('*');
  // zera o historico de pontos e vertices
  emptyHistory();
  // reinicia o contador de poligonos para 0
  restartContPolygon();
  // remove os botões com os poligonos no algoritmo de varredura
  var scanlineButtons = document.querySelector('.ponto-varredura');
  if(scanlineButtons){
    scanlineButtons.remove();
  }
  // percorre os quadrados e pinta todos de branco, limpando a tela
  for (let i = 0; i < subElements.length; i++) {
    const subElement = subElements[i];
    subElement.style.backgroundColor = '#ffffff'; // Define a cor de fundo para vermelho (altere para a cor desejada)
  }
}

buttons.forEach(function(button) {
    button.addEventListener('click', changeBackgroundColor);
  }
);

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearScreen);
import * as circle from "./algoritmos/circle-midpoint.js";
import * as line from "./algoritmos/line-bresenham.js";
import * as curve from "./algoritmos/curve-bezier.js";
import * as polilyne from "./algoritmos/polyline.js";
import * as sweepFill from "./algoritmos/sweepFill.js";
import * as fillDrawn from "./algoritmos/sweepFill.js";
import { floodFill } from "./algoritmos/floodFill.js";

const canvas = document.getElementById("canvas");
const screen = document.getElementById("screen");
const drawLineButton = document.getElementById("drawLine");
const clearButton = document.getElementById("clearButton");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 25;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

// inicialização do background canvas
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// criar os quadrados sobre o elementos canvas e nomeá-los com IDs
// o seguinte escopo cria os quadrados dentro do canvas
{
  screen.style.width = `${canvas.width}px`;
  screen.style.height = `${canvas.height}px`;
  screen.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  screen.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  for (let cellY = CELL_SIDE_COUNT - 1; cellY >= 0; cellY--) {
    for (let cellX = 0; cellX < CELL_SIDE_COUNT; cellX++) {
      const cellId = `${cellX}_${cellY}`;
      const divElement = document.createElement("div");
      divElement.setAttribute("id", cellId);
      screen.appendChild(divElement);
    }
  }
}

function clearScreen() {
  const subElements = screen.querySelectorAll('*');
  // percorre os quadrados e pinta todos de branco, limpando a tela
  for (let i = 0; i < subElements.length; i++) {
    const subElement = subElements[i];
    subElement.style.backgroundColor = '#ffffff'; // Define a cor de fundo para vermelho (altere para a cor desejada)
  }
}

function drawAlgoritmo() {
    // bresenham padrão
    const pointA = document.getElementById("pointA").value;
    const pointB = document.getElementById("pointB").value;

    // verifica se o valor passado pelo usuário é diferente de null e se tem vírgula separando
    // se estiver tudo OK, procede no algoritmo, senão apresenta msg de erro!
    if (pointA && pointA.includes(",") && pointB && pointB.includes(",")) {
        // separa com o split os valores de x e y recebidos no input e salva em duas variáveis x e y do ponto A
        const [pointAX, pointAY] = pointA.split(",").map(Number);
        const [pointBX, pointBY] = pointB.split(",").map(Number);
        // chama o algoritmo de bresenham
        //bresenhamLine(pointAX, pointAY, pointBX, pointBY);

        
    } else {
        console.log("Valores inválidos");
    }
}

clearButton.addEventListener("click", clearScreen);
drawLineButton.addEventListener("click", drawAlgoritmo);

// Exemplo de usos
// polilinha
const points = [
    { x: 4, y: 4 },
    { x: 8, y: 4 },
    { x: 8, y: 8 },
    { x: 4, y: 9 },
    { x: 4, y: 4 }
  ];
polilyne.drawPolyline(points);

// Verifica se os pontos formam um polígono



// fillDrawn.drawPolygon();  
// circulo
//circle.circle(8, 5, 4);

// bresenham
// line.bresenhamLine(4, 4, 10, 6);

// curva 
// const controlPoint1X = 7;
// const controlPoint1Y = 8;
// const controlPoint2X = 9;
// const controlPoint2Y = 9;
// const pointAX = 1;
// const pointAY = 1;
// const pointBX = 15;
// const pointBY = 16;
//drawBezierCurve(pointAX, pointAY, controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, pointBX, pointBY);

// preenchimento recursivo OK
// floodFill(5, 6);
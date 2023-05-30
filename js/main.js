// js contendo os procedimentos necessários para criação do painel de desenhos
const canvas = document.getElementById("canvas");
const screen = document.querySelector(".screen");
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

// clearButton.addEventListener("click", clearScreen);
// drawLineButton.addEventListener("click", drawAlgoritmo);

//bresenhamLine(1, 1, 5, 5);
// Exemplo de usos
// polilinha
/*const points = [
    { x: 4, y: 4 },
    { x: 8, y: 4 },
    { x: 8, y: 8 },
    { x: 4, y: 9 },
    { x: 4, y: 4 }
  ];
polilyne.drawPolyline(points);
*/
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

// necessário saber todos os pontos pintados de vermelho do
// poligono para assim executar o scanline 

/*const vertices = [
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 8, y: 5 },
  { x: 8, y: 6 },
  { x: 8, y: 7 },
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 9 },
  { x: 4, y: 9 },
  { x: 4, y: 8 },
  { x: 4, y: 7 },
  { x: 4, y: 6 },
  { x: 4, y: 5 },
  { x: 4, y: 4 },
];
scanlineFillWithCriticalPoints(history.historyPoints);
*/

// cohenSutherlandClip(30, 10, 16, 20, 0, 0, 24, 24);


// clip poligono
/*
const subjectPolygon = [
  { x: 4, y: 4 },
    { x: 8, y: 4 },
    { x: 8, y: 8 },
    { x: 4, y: 6 },
];

// Definindo os vértices da área de desenho
const clipPolygon = [
  { x: 0, y: 0 },
  { x: 24, y: 0 },
  { x: 24, y: 24 },
  { x: 0, y: 24 }
];

clipPolygon(subjectPolygon, clipPolygon);
*/
// Chamando a função de recorte
// suthHodgClip(poly_points, clipper_points);

//polilyne.drawPolyline(poly_points);
/*
var polygon = [
  { x: 4, y: 4 },
    { x: 8, y: 4 },
    { x: 8, y: 8 },
    { x: 4, y: 8 },
    { x: 4, y: 4 }
];*/

/*
var dx = 18; // deslocamento em X
var dy = 2; // deslocamento em Y

translatePolygon(polygon, dx, dy);
*/
/*
var scaleX = 0.5; // fator de escala em X, se valor for 1, mantem mesmo tamanho, se menor que 1, diminui, se maior aumenta
var scaleY = 1.5; // fator de escala em Y (aqui aumenta no x baixa)
var fixedPoint = { x: 4, y: 4 }; // ponto fixo da escala

scalePolygon(polygon, scaleX, scaleY, fixedPoint); // ok
*/
/*
// converte grau em radianos
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

var angle = degreesToRadians(180); // 180 degrees
// define pivô, ponto do qual o poligono será girado
var pivot = { x: 8, y: 4 };
rotatePolygon(polygon, angle, pivot); //ok
*/

// Vértices do cubo 3D
var cubeVertices = [
  { x: 5, y: 5, z: 10 },
  { x: 10, y: 5, z: 10 },
  { x: 10, y: 10, z: 10 },
  { x: 5, y: 10, z: 10 },
  { x: 5, y: 5, z: 5 },
  { x: 10, y: 5, z: 5 },
  { x: 10, y: 10, z: 5 },
  { x: 5, y: 10, z: 5 }
];

// orthographicProjection(cubeVertices);
// falta verificar se está funcional utilzando o codepen que o professor mandou

// arrumar perspectiva
// var focalLength = 10;
//perspectiveProjection(cubeVertices, focalLength);
// projectPolygon(cubeVertices, focalLength);
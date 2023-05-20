import * as colors from "./colors.js";

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
// FUNÇÃO PARA LIMPAR TELA

function drawPixel(cellX, cellY, pixelColor) {
  const cellId = `${cellX}_${cellY}`;
  const cellElement = document.getElementById(cellId);
  cellElement.style.backgroundColor = pixelColor;
}

// Algoritmo de Bresenham
function bresenhamLine(x0, y0, x1, y1) {
  // Calcula as diferenças absolutas nas coordenadas x e y
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);

  // Determina a direção do incremento em x e y
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;

  // Calcula o erro inicial
  let err = dx - dy;

  // Loop principal do algoritmo de Bresenham
  while (x0 !== x1 || y0 !== y1) {
    // Desenha o pixel atual
    drawPixel(x0, y0, colors.RED);

    // Calcula o dobro do erro
    const err2 = 2 * err;

    // Verifica se o erro é maior que -dy e atualiza x0 se for
    if (err2 > -dy) {
      err -= dy;
      x0 += sx;
    }

    // Verifica se o erro é menor que dx e atualiza y0 se for
    if (err2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  // Desenha o último pixel da linha
  drawPixel(x1, y1, colors.RED);
}

function circle(centerX, centerY, radius) {
    drawPixel(centerX, centerY, colors.BLACK);
    let x = radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
    // Desenha os pontos simétricos em todas as oito partes do círculo

    drawPixel(centerX + x, centerY + y, colors.RED); // Octante 1
    drawPixel(centerX + y, centerY + x, colors.RED); // Octante 2
    drawPixel(centerX - y, centerY + x, colors.RED); // Octante 3
    drawPixel(centerX - x, centerY + y, colors.RED); // Octante 4
    drawPixel(centerX - x, centerY - y, colors.RED); // Octante 5
    drawPixel(centerX - y, centerY - x, colors.RED); // Octante 6
    drawPixel(centerX + y, centerY - x, colors.RED); // Octante 7
    drawPixel(centerX + x, centerY - y, colors.RED); // Octante 8

    y++;

    if (radiusError < 0) {
        radiusError += 2 * y + 1;
    } else {
        x--;
        radiusError += 2 * (y - x + 1);
    }
    }
}

function drawBezierCurve(startX, startY, controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, endX, endY) {
  // Pontos de controle da curva de Bezier
  const controlPoints = [
    { x: startX, y: startY },
    { x: controlPoint1X, y: controlPoint1Y },
    { x: controlPoint2X, y: controlPoint2Y },
    { x: endX, y: endY }
  ];

  // Quantidade de segmentos da curva
  const segments = 100;

  // Intervalo entre cada segmento
  const tDelta = 1 / segments;

  // Itera sobre os segmentos da curva
  for (let t = 0; t <= 1; t += tDelta) {
    // Calcula os pontos intermediários da curva de Bezier
    const p0 = interpolate(controlPoints[0], controlPoints[1], t);
    const p1 = interpolate(controlPoints[1], controlPoints[2], t);
    const p2 = interpolate(controlPoints[2], controlPoints[3], t);

    // Calcula os pontos intermediários do próximo nível
    const p01 = interpolate(p0, p1, t);
    const p12 = interpolate(p1, p2, t);

    // Calcula o ponto final da curva no nível atual
    const pFinal = interpolate(p01, p12, t);

    // Desenha o pixel correspondente ao ponto final da curva
    drawPixel(Math.round(pFinal.x), Math.round(pFinal.y), colors.RED);
  }
}

// Função auxiliar para interpolar coordenadas
function interpolate(p0, p1, t) {
  const x = p0.x + (p1.x - p0.x) * t;
  const y = p0.y + (p1.y - p0.y) * t;
  return { x, y };
}

function drawLine() {
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

    // Exemplo de uso da curva de Bezier
    const controlPoint1X = 7;
    const controlPoint1Y = 8;
    const controlPoint2X = 8;
    const controlPoint2Y = 8;
    // 
    //drawBezierCurve(pointAX, pointAY, controlPoint1X, controlPoint1Y, controlPoint2X, controlPoint2Y, pointBX, pointBY);
  } else {
    console.log("Valores inválidos");
  }
}

clearButton.addEventListener("click", clearScreen);
drawLineButton.addEventListener("click", drawLine);
circle(8, 5, 4);

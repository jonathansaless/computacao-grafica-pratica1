const canvas = document.getElementById("canvas");
const screen = document.getElementById("screen");
const drawLineButton = document.getElementById("drawLine");
const colorInput = document.getElementById("colorInput");
const clearButton = document.getElementById("clearButton");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 25;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

// Cor padrão inicial
colorInput.value = "#FF0000"; // vermelho

// inicialização do background canvas
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// criar os quadrados sobre o elementos canvas e nomealos com IDs
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

function drawPixel(cellX, cellY) {
  const cellId = `${cellX}_${cellY}`;
  console.log(cellId);
  const cellElement = document.getElementById(cellId);
  console.log(cellElement);
  cellElement.style.backgroundColor = colorInput.value;
  console.log(cellElement, cellId, cellX, cellY);
}

// Algoritmo de bresenham
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
    drawPixel(x0, y0);

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
  drawPixel(x1, y1);
}

function circle(centerX, centerY, radius) {
  let x = radius;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
    // Desenha os pontos simétricos em todas as oito partes do círculo

    drawPixel(centerX + x, centerY + y); // Octante 1
    drawPixel(centerX + y, centerY + x); // Octante 2
    drawPixel(centerX - y, centerY + x); // Octante 3
    drawPixel(centerX - x, centerY + y); // Octante 4
    drawPixel(centerX - x, centerY - y); // Octante 5
    drawPixel(centerX - y, centerY - x); // Octante 6
    drawPixel(centerX + y, centerY - x); // Octante 7
    drawPixel(centerX + x, centerY - y); // Octante 8

    y++;

    if (radiusError < 0) {
      radiusError += 2 * y + 1;
    } else {
      x--;
      radiusError += 2 * (y - x + 1);
    }
  }
}

// Exemplo de uso
//bresenhamLine(4, 7, 11, 4);
circle(8, 5, 4);

function drawLine() {
  const pointA = document.getElementById("pointA").value;
  const pointB = document.getElementById("pointB").value;
  
  // verifica se o valor passado pelo usuário é diferente de null e se tem virgula separando
  // se estiver tudo OK, procede no algoritmo, senão apresenta msg de erro! 
  if (pointA && pointA.includes(',') && (pointB && pointB.includes(','))) {
    // separa com o split os valores de x e y recebidos no input e salva em duas variares x e y do ponto A
    const [pointAX, pointAY] = pointA.split(',').map(Number);
    const [pointBX, pointBY] = pointB.split(',').map(Number);
    console.log(pointAX, pointAY);
    console.log(pointBX, pointBY);

    // chama o algoritmo de bresenham
    bresenhamLine(pointAX, pointAY, pointBX, pointBY);
  } else {
    // alert('Valores inválidos')
    console.log('Valores inválidos')
  }
}

clearButton.addEventListener("click", clearScreen);
drawLineButton.addEventListener("click", drawLine);

// drawPixel(1, 1);
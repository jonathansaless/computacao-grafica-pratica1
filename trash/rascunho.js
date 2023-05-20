const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const drawButton = document.getElementById("drawLine");
const colorInput = document.getElementById("colorInput");
const clearButton = document.getElementById("clearButton");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 20;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

// Cor padrão inicial
colorInput.value = "#FF0000";

// inicialização do background canvas
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Apresentar linhas guias
{
  guide.style.width = `${canvas.width}px`;
  guide.style.height = `${canvas.height}px`;
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  for (let cellY = CELL_SIDE_COUNT - 1; cellY >= 0; cellY--) {
    for (let cellX = 0; cellX < CELL_SIDE_COUNT; cellX++) {
      const cellId = `${cellX}_${cellY}`;
      const divElement = document.createElement("div");
      divElement.setAttribute("id", cellId);
      guide.appendChild(divElement);
    }
  }
}

function handleCanvasMousedown(e) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasBoundingRect.left;
  const y = canvas.height - (e.clientY - canvasBoundingRect.top);
  const cellX = Math.floor(x / cellPixelLength);
  const cellY = Math.floor(y / cellPixelLength);
  fillCell(cellX, cellY);
}


// FUNÇÃO PARA LIMPAR TELA
function handleClearButtonClick() {
  const yes = confirm("Tem certeza que deseja limpar a tela?");

  if (!yes) return;

  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
}
// FUNÇÃO PARA LIMPAR TELA

function fillCell(cellX, cellY) {
  const startX = cellX * cellPixelLength;
  const startY = (CELL_SIDE_COUNT - cellY - 1) * cellPixelLength;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);

  const cellId = `${cellX}_${cellY}`;
  const cellElement = document.getElementById(cellId);
  cellElement.style.backgroundColor = colorInput.value;
  console.log(cellElement, cellId, cellX, cellY);
}
// apenas para ao clicar pintar, não será utilizado por hora
canvas.addEventListener("mousedown", handleCanvasMousedown);

clearButton.addEventListener("click", handleClearButtonClick);
drawButton.addEventListener("click", () => {
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
      
    // Pinta os pontos A e B
    fillCell(pointAX, pointAY);
    fillCell(pointBX, pointBY);
  } else {
    // alert('Valores inválidos')
    console.log('Valores inválidos')
  }
});



export function getDrawnPoints() {
  const drawnPoints = [];
  const subElements = screen.querySelectorAll('*');
  // percorre os quadrados e pega somente os elementos pintados
  for (let i = 0; i < subElements.length; i++) {
      const subElement = subElements[i];
      if (subElement.classList.contains('painted')){
          const id = subElement.id
          const [pointX, pointY] = id.split("_").map(Number);
          console.log(pointX, pointY);
          drawnPoints.push({x: pointX, y: pointY})
      }
  }
  console.log(drawnPoints);
  return drawnPoints;
  /*
  for (let cellY = CELL_SIDE_COUNT - 1; cellY >= 0; cellY--) {
    for (let cellX = 0; cellX < CELL_SIDE_COUNT; cellX++) {
      const cellId = `${cellX}_${cellY}`;
      const cellElement = document.getElementById(cellId);
      const backgroundColor = cellElement.style.backgroundColor;

      if (backgroundColor !== "rgb(255, 255, 255)") {
        // Ponto desenhado, adiciona às coordenadas
        const pointX = cellX * cellPixelLength + cellPixelLength / 2;
        const pointY = cellY * cellPixelLength + cellPixelLength / 2;
        drawnPoints.push({ x: pointX, y: pointY });
      }
    }
  }

  return drawnPoints;*/
}
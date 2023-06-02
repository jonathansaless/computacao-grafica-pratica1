import * as colors from "./algorithms/constants/colors.js";

// js contendo os procedimentos necessários para criação do painel de desenhos
const canvas = document.querySelector(".canvas");
const screen = document.querySelector(".screen");
const drawingContext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 25;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

// inicialização do background canvas
drawingContext.fillStyle = colors.WHITE;
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// criar os quadrados sobre o elementos canvas e nomeá-los com IDs
// o seguinte escopo cria os quadrados dentro do canvas
screen.style.width = `${canvas.width}px`;
screen.style.height = `${canvas.height}px`;
screen.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
screen.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

for (let cellY = CELL_SIDE_COUNT - 1; cellY >= 0; cellY--) {
  for (let cellX = 0; cellX < CELL_SIDE_COUNT; cellX++) {
    const cellId = `${cellX}_${cellY}`;
    const divElement = document.createElement("div");
    divElement.setAttribute("id", cellId);
    divElement.style.backgroundColor = colors.WHITE;
    screen.appendChild(divElement);
  }
}
import * as colors from "./algorithms/constants/colors.js";

// Seleciona o elemento HTML com a classe 'canvas'
const canvas = document.querySelector(".canvas");

// Seleciona o elemento HTML com a classe 'screen'
const screen = document.querySelector(".screen");

// Obtém o contexto de desenho 2D do elemento canvas
const drawingContext = canvas.getContext("2d");

// Define o número de lados dos quadrados na grade
const CELL_SIDE_COUNT = 25;

// Calcula o tamanho em pixels de cada lado do quadrado com base no tamanho do canvas
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;

// Define a cor de fundo do contexto de desenho como branco
drawingContext.fillStyle = colors.WHITE;

// Preenche o retângulo completo do canvas com a cor de fundo definida
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Configurações de estilo para a grade no elemento screen
screen.style.width = `${canvas.width}px`;
screen.style.height = `${canvas.height}px`;
screen.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
screen.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

// Loop para criar os quadrados dentro do canvas
for (let cellY = CELL_SIDE_COUNT - 1; cellY >= 0; cellY--) {
  for (let cellX = 0; cellX < CELL_SIDE_COUNT; cellX++) {
    // Cria um ID único para identificar cada quadrado com base nas coordenadas cellX e cellY
    const cellId = `${cellX}_${cellY}`;

    // Cria um elemento div para representar o quadrado
    const divElement = document.createElement("div");

    // Define o atributo 'id' do elemento div com o ID do quadrado
    divElement.setAttribute("id", cellId);

    // Define a cor de fundo do quadrado como branco
    divElement.style.backgroundColor = colors.WHITE;

    // Adiciona o elemento div como filho do elemento screen
    screen.appendChild(divElement);
  }
}

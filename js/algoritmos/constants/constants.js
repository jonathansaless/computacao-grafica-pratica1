// contador de polígonos
export var contPoligon = 0;

// historico de pontos de poligonos
export var historyPoints = [];

// historico de todos os pontos pintados, importante para executar o algoritmo de scanline
export var historyVertices= [];

// Matriz de rotação para z=0
export const cube = [
  [0, 0, 5, 1],
  [5, 0, 5, 1],
  [5, 5, 5, 1],
  [0, 5, 5, 1],
  [0, 0, 0, 1],
  [5, 0, 0, 1],
  [5, 5, 0, 1],
  [0, 5, 0, 1]
  ];

// necessário para os algoritmos de recorte
export const clipPolygon = [
  { x: 0, y: 0 },
  { x: 24, y: 0 },
  { x: 24, y: 24 },
  { x: 0, y: 24 }
];

// função para esvaziar histórico de pontos
export function emptyHistory(){
  historyPoints = [];
  historyVertices = [];
}

// adiciona +1 ao contador de poligonos
export function addContPolygon(){
  contPoligon++;
}

// reinicia contador de poligonos
export function restartContPolygon() {
  contPoligon = 0; 
}

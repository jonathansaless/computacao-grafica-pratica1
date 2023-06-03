// contador de polígonos
export var contPolygon = 0;

// historico de pontos de poligonos
export var historyPoints = [];

// historico de todos os pontos pintados, importante para executar o algoritmo de scanline
export var historyVertices= [];

// Cubo 1
export const cube = [
  [0, 0, 0, 1],
  [10, 0, 0, 1],
  [10, 10, 0, 1],
  [0, 10, 0, 1],
  [0, 0, 10, 1],
  [10, 0, 10, 1],
  [10, 10, 10, 1],
  [0, 10, 10, 1]
  ];
  
// Cubo 2
export const cube2 = [
  [0, 0, 0, 1],
  [10, 0, 0, 1],
  [10, 10, 0, 1],
  [0, 10, 0, 1],
  [0, 0, 0, 1],
  [5, 0, 0, 1],
  [5, 5, 0, 1],
  [0, 5, 0, 1]
  ];

// Cubo 3
export const cube3 = [
    [0, 0, 10, 1],
    [10, 0, 10, 1],
    [10, 10, 10, 1],
    [0, 10, 10, 1],
    [0, 0, 20, 1],
    [10, 0, 20, 1],
    [10, 10, 20, 1],
    [0, 10, 20, 1]
    ];

// Recorte de polígono, necessário para o recorte de polígono
export const clipPolygon = [
  { x: 0, y: 0 },
  { x: 24, y: 0 },
  { x: 24, y: 24 },
  { x: 0, y: 24 }
];

// Pontos mínimos e máximos, necessários para o recorte de linha
export const x_min = 0;
export const y_min = 0;
export const x_max = 24;
export const y_max = 24;

// função para esvaziar histórico de pontos 
export function emptyHistory(){
  historyPoints = [];
  historyVertices = [];
}

// adiciona +1 ao contador de poligonos
export function addContPolygon(){
  contPolygon++;
}

// reinicia contador de poligonos
export function restartContPolygon() {
  contPolygon = 0; 
}

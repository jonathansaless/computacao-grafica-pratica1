// historico de pontos pintados, importante para executar o algoritmo de scanline
export var historyPoints = [];

// função para esvaziar historyPoints
export function emptyPointsHistory(){
  historyPoints = [];
}

// seria interessante criar uma variável que armazena um poligono assim que detectar que existe um poligono
// ou a ada novo poligono criar um Objeto chamado poligono
// variavel x

// pontos para testes
/*export const points = [
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
  { x: 4, y: 4 }
];*/

export const clipPolygon = [
  { x: 0, y: 0 },
  { x: 24, y: 0 },
  { x: 24, y: 24 },
  { x: 0, y: 24 }
];

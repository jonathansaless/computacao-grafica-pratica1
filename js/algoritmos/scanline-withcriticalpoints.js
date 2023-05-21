import { drawPixel } from "./drawPixel.js";
import * as colors from "../colors.js";
import * as history from "./historyPoints.js";

// Função para preencher o polígono usando o algoritmo Scanline com pontos críticos
export function scanlineFillWithCriticalPoints(vertices) {
  // Etapa 1: Construção da tabela de arestas
  const edgeTable = {};

  // Itera através de cada aresta do polígono
  for (let i = 0; i < vertices.length; i++) {
    const currentVertex = vertices[i];
    const nextVertex = vertices[(i + 1) % vertices.length];

    // Verifica se a aresta é horizontal e ignora
    if (currentVertex.y === nextVertex.y) {
      continue;
    }

    // Obtém as coordenadas y mínimas e máximas da aresta
    const yMin = Math.min(currentVertex.y, nextVertex.y);
    const yMax = Math.max(currentVertex.y, nextVertex.y);

    // Calcula a coordenada x inicial da aresta (xofymin)
    const xofymin = currentVertex.y === yMin ? currentVertex.x : nextVertex.x;

    // Calcula o inverso do coeficiente angular da aresta (slopeinverse)
    const slopeinverse = (nextVertex.x - currentVertex.x) / (nextVertex.y - currentVertex.y);

    // Cria uma entrada na tabela de arestas para a coordenada y mínima
    if (yMin in edgeTable) {
      edgeTable[yMin].push({ yMax, xofymin, slopeinverse });
    } else {
      edgeTable[yMin] = [{ yMax, xofymin, slopeinverse }];
    }
  }

  // Etapa 2: Preenchimento do polígono
  let activeEdges = [];

  // Itera através de cada linha de varredura (scanline)
  for (let y = Math.min(...vertices.map(vertex => vertex.y)) + 1; y < Math.max(...vertices.map(vertex => vertex.y)); y++) {
    // Adiciona as arestas da linha de varredura à tabela de arestas ativas
    if (y in edgeTable) {
      activeEdges.push(...edgeTable[y]);
    }

    // Etapa 3: Ordenação das arestas ativas pelo xofymin
    activeEdges.sort((edgeA, edgeB) => edgeA.xofymin - edgeB.xofymin);

    // Etapa 4: Remoção das arestas cujo ymax é igual ou maior que a linha de varredura
    activeEdges = activeEdges.filter(edge => edge.yMax > y);

    // Etapa 5: Preenchimento dos pares de arestas na tabela de arestas ativas
    for (let i = 0; i < activeEdges.length; i += 2) {
      if (i + 1 < activeEdges.length) {
        const xStart = Math.floor(activeEdges[i].xofymin);
        const xEnd = Math.floor(activeEdges[i + 1].xofymin);

        // Preenche os pixels entre xStart e xEnd na linha de varredura atual
        for (let x = xStart; x <= xEnd; x++) {
          // Verifica se o ponto (x, y) está dentro do polígono e não é um dos vértices
          if (isPointInsidePolygon(x, y, vertices) && !isVertexPoint(x, y, vertices)) {
            drawPixel(x, y, colors.GREEN);
          }
        }
      }
    }

    // Etapa 6: Atualização do xofymin para cada aresta ativa
    activeEdges = activeEdges.map(edge => ({ yMax: edge.yMax, xofymin: edge.xofymin + edge.slopeinverse, slopeinverse: edge.slopeinverse }));
  }
}

// Função auxiliar para verificar se um ponto (x, y) está dentro de um polígono
function isPointInsidePolygon(x, y, vertices) {
  let inside = false;

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x, yi = vertices[i].y;
    const xj = vertices[j].x, yj = vertices[j].y;

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

    if (intersect) inside = !inside;
  }

  return inside;
}

// Função auxiliar para verificar se um ponto (x, y) é um vértice do polígono
function isVertexPoint(x, y, vertices) {
  return vertices.some(vertex => vertex.x === x && vertex.y === y);
}

// Exemplo de uso:
const vertices = [
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
];

//scanlineFillWithCriticalPoints(vertices);

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
    if (currentVertex[1] === nextVertex[1]) {
      continue;
    }

    // Obtém as coordenadas y mínimas e máximas da aresta
    const yMin = Math.min(currentVertex[1], nextVertex[1]);
    const yMax = Math.max(currentVertex[1], nextVertex[1]);

    // Calcula a coordenada x inicial da aresta (xofymin)
    const xofymin = currentVertex[1] === yMin ? currentVertex[0] : nextVertex[0];

    // Calcula o inverso do coeficiente angular da aresta (slopeinverse)
    const slopeinverse = (nextVertex[0] - currentVertex[0]) / (nextVertex[1] - currentVertex[1]);

    // Cria uma entrada na tabela de arestas para a coordenada y mínima
    if (yMin in edgeTable) {
      edgeTable[yMin].push([yMax, xofymin, slopeinverse]);
    } else {
      edgeTable[yMin] = [[yMax, xofymin, slopeinverse]];
    }
  }

  // Etapa 2: Preenchimento do polígono
  let activeEdges = [];

  // Itera através de cada linha de varredura (scanline)
  for (let y = Math.min(...vertices.map(vertex => vertex[1])) + 1; y < Math.max(...vertices.map(vertex => vertex[1])); y++) {
    // Adiciona as arestas da linha de varredura à tabela de arestas ativas
    if (y in edgeTable) {
      activeEdges.push(...edgeTable[y]);
    }

    // Etapa 3: Ordenação das arestas ativas pelo xofymin
    activeEdges.sort((edgeA, edgeB) => edgeA[1] - edgeB[1]);

    // Etapa 4: Remoção das arestas cujo ymax é igual ou maior que a linha de varredura
    activeEdges = activeEdges.filter(edge => edge[0] > y);

    // Etapa 5: Preenchimento dos pares de arestas na tabela de arestas ativas
    for (let i = 0; i < activeEdges.length; i += 2) {
      if (i + 1 < activeEdges.length) {
        const xStart = Math.floor(activeEdges[i][1]);
        const xEnd = Math.floor(activeEdges[i + 1][1]);

        // Preenche os pixels entre xStart e xEnd na linha de varredura atual
        for (let x = xStart; x <= xEnd; x++) {
          drawPixel(x, y, colors.GREEN);
        }
      }
    }

    // Etapa 6: Atualização do xofymin para cada aresta ativa
    activeEdges = activeEdges.map(edge => [edge[0], edge[1] + edge[2], edge[2]]);
  }
}

// Exemplo de uso:
const vertices = [
  [4, 4],
  [5, 4],
  [6, 4],
  [7, 4],
  [8, 4],
  [8, 5],
  [8, 6],
  [8, 7],
  [8, 8],
  [7, 8],
  [6, 8],
  [5, 9],
  [4, 9],
  [4, 8],
  [4, 7],
  [4, 6],
  [4, 5],
  [4, 4]
];

//scanlineFillWithCriticalPoints(vertices);

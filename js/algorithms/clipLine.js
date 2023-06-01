import { bresenhamLine } from "./drawLine.js";
// Algoritmo de Bresenham
/*
export function clipLine(x0, y0, x1, y1) {
  // se aceito, recebe os novos valores para pintar na área do desenho
  // cohenSutherlandClip(x0, y0, x1, y1);

  console.log(x0, y0, x1, y1);
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
    history.historyPoints.push({x: x0, y: y0});
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
  history.historyPoints.push({x: x1, y: y1})
  drawPixel(x1, y1, colors.RED);
}
*/
// Definindo os códigos de região
const INSIDE = 0;  // 0000
const LEFT = 1;    // 0001
const RIGHT = 2;   // 0010
const BOTTOM = 4;  // 0100
const TOP = 8;     // 1000

// Definindo os valores máximos e mínimos para o retângulo

// Função para calcular o código de região de um ponto (x, y)
function computeCode(x, y, x_min, y_min, x_max, y_max) {
  let code = INSIDE;
  if (x < x_min) {      // à esquerda do retângulo
    code |= LEFT;
  } else if (x > x_max) {    // à direita do retângulo
    code |= RIGHT;
  }
  if (y < y_min) {      // abaixo do retângulo
    code |= BOTTOM;
  } else if (y > y_max) {    // acima do retângulo
    code |= TOP;
  }
  return code;
}

// Implementação do algoritmo de Cohen-Sutherland para recorte de linha
export function cohenSutherlandClip(x0, y0, x1, y1, x_min, y_min, x_max, y_max) {
  // Calcular os códigos de região para P1 e P2
  
  let code1 = computeCode(x0, y0, x_min, y_min, x_max, y_max);
  let code2 = computeCode(x1, y1, x_min, y_min, x_max, y_max);
  let accept = false;

  while (true) {
    // Se ambos os pontos estiverem dentro do retângulo
    if (code1 === 0 && code2 === 0) {
      accept = true;
      break;
    }
    // Se ambos os pontos estiverem fora do retângulo
    else if ((code1 & code2) !== 0) {
      break;
    }
    // Algum segmento está dentro do retângulo
    else {
      // A linha precisa ser recortada
      // Seleciona o ponto que está fora do retângulo
      let x = 1.0;
      let y = 1.0;
      let code_out = code1 !== 0 ? code1 : code2;

      // Encontra o ponto de interseção
      // usando as fórmulas y = y0 + slope * (x - x0),
      // x = x0 + (1 / slope) * (y - y0)
      if (code_out & TOP) {
        // Ponto acima do retângulo
        x = x0 + (x1 - x0) * (y_max - y0) / (y1 - y0);
        y = y_max;
      } else if (code_out & BOTTOM) {
        // Ponto abaixo do retângulo
        x = x0 + (x1 - x0) * (y_min - y0) / (y1 - y0);
        y = y_min;
      } else if (code_out & RIGHT) {
        // Ponto à direita do retângulo
        y = y0 + (y1 - y0) * (x_max - x0) / (x1 - x0);
        x = x_max;
      } else if (code_out & LEFT) {
        // Ponto à esquerda do retângulo
        y = y0 + (y1 - y0) * (x_min - x0) / (x1 - x0);
        x = x_min;
      }

      // Agora o ponto de interseção x, y foi encontrado
      // Substitui o ponto fora do retângulo pelo ponto de interseção
      if (code_out === code1) {
        x0 = x;
        y0 = y;
        code1 = computeCode(x0, y0);
      } else {
        x1 = x;
        y1 = y;
        code2 = computeCode(x1, y1);
      }
    }
  }

  if (accept) {
    const pointx0 = Math.round(x0);
    const pointy0 = Math.round(y0);
    const pointx1 = Math.round(x1);
    const pointy1 = Math.round(y1);
    
    console.log(`Linha aceita de (${pointx0}, ${pointy0}) a (${pointx1}, ${pointy1})`);
    
    bresenhamLine(pointx0, pointy0, pointx1, pointy1);

  } else {
    console.log("Linha rejeitada, reta totalmente fora!");
  }
}

// Executando o algoritmo com segmentos de linha fornecidos
// Primeiro segmento de linha: P1 = (5, 5), P2 = (7, 7)
// cohenSutherlandClip(5, 5, 7, 7);

// Segundo segmento de linha: P1 = (7, 9), P2 = (11, 4)
// cohenSutherlandClip(7, 9, 11, 4);

// Terceiro segmento de linha: P1 = (1, 5), P2 = (4, 1)
// cohenSutherlandClip(1, 5, 4, 1);

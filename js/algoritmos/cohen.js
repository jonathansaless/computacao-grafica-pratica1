// Definindo os códigos de região
const INSIDE = 0;  // 0000
const LEFT = 1;    // 0001
const RIGHT = 2;   // 0010
const BOTTOM = 4;  // 0100
const TOP = 8;     // 1000

// Definindo os valores máximos e mínimos para o retângulo
const x_max = 24;
const y_max = 24;
const x_min = 6;
const y_min = 0;

// Função para calcular o código de região de um ponto (x, y)
function computeCode(x, y) {
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
function cohenSutherlandClip(x1, y1, x2, y2) {
  // Calcular os códigos de região para P1 e P2
  let code1 = computeCode(x1, y1);
  let code2 = computeCode(x2, y2);
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
      // usando as fórmulas y = y1 + slope * (x - x1),
      // x = x1 + (1 / slope) * (y - y1)
      if (code_out & TOP) {
        // Ponto acima do retângulo
        x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1);
        y = y_max;
      } else if (code_out & BOTTOM) {
        // Ponto abaixo do retângulo
        x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1);
        y = y_min;
      } else if (code_out & RIGHT) {
        // Ponto à direita do retângulo
        y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1);
        x = x_max;
      } else if (code_out & LEFT) {
        // Ponto à esquerda do retângulo
        y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1);
        x = x_min;
      }

      // Agora o ponto de interseção x, y foi encontrado
      // Substitui o ponto fora do retângulo pelo ponto de interseção
      if (code_out === code1) {
        x1 = x;
        y1 = y;
        code1 = computeCode(x1, y1);
      } else {
        x2 = x;
        y2 = y;
        code2 = computeCode(x2, y2);
      }
    }
  }

  if (accept) {
    console.log(`Linha aceita de (${x1}, ${y1}) a (${x2}, ${y2})`);
    // Aqui você pode adicionar código para exibir o retângulo
    // juntamente com as linhas aceitas (parte delas)
  } else {
    console.log("Linha rejeitada");
  }
}

// Executando o algoritmo com segmentos de linha fornecidos
// Primeiro segmento de linha: P1 = (5, 5), P2 = (7, 7)
cohenSutherlandClip(5, 5, 7, 7);

// Segundo segmento de linha: P1 = (7, 9), P2 = (11, 4)
cohenSutherlandClip(7, 9, 11, 4);

// Terceiro segmento de linha: P1 = (1, 5), P2 = (4, 1)
cohenSutherlandClip(1, 5, 4, 1);

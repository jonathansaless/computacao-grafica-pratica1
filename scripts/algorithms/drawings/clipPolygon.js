const MAX_POINTS = 20;

// Retorna o valor x do ponto de interseção de duas linhas
function x_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  const num = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  return num / den;
}

// Retorna o valor y do ponto de interseção de duas linhas
function y_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  const num = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  return num / den;
}

// Essa função recorta todas as arestas em relação a uma única aresta de recorte
function clip(poly_points, poly_size, x1, y1, x2, y2) {
  const new_points = new Array(MAX_POINTS);
  let new_poly_size = 0;

  for (let i = 0; i < poly_size; i++) {
    const k = (i + 1) % poly_size;
    const ix = poly_points[i][0];
    const iy = poly_points[i][1];
    const kx = poly_points[k][0];
    const ky = poly_points[k][1];

    const i_pos = (x2 - x1) * (iy - y1) - (y2 - y1) * (ix - x1);
    const k_pos = (x2 - x1) * (ky - y1) - (y2 - y1) * (kx - x1);

    // Caso 1: Quando ambos os pontos estão dentro
    if (i_pos < 0 && k_pos < 0) {
      // Apenas o segundo ponto é adicionado
      new_points[new_poly_size] = [kx, ky];
      new_poly_size++;
    }
    // Caso 2: Quando apenas o primeiro ponto está fora
    else if (i_pos >= 0 && k_pos < 0) {
      // Ponto de interseção com a aresta e o segundo ponto são adicionados
      new_points[new_poly_size] = [x_intersect(x1, y1, x2, y2, ix, iy, kx, ky), y_intersect(x1, y1, x2, y2, ix, iy, kx, ky)];
      new_poly_size++;

      new_points[new_poly_size] = [kx, ky];
      new_poly_size++;
    }
    // Caso 3: Quando apenas o segundo ponto está fora
    else if (i_pos < 0 && k_pos >= 0) {
      // Apenas o ponto de interseção com a aresta é adicionado
      new_points[new_poly_size] = [x_intersect(x1, y1, x2, y2, ix, iy, kx, ky), y_intersect(x1, y1, x2, y2, ix, iy, kx, ky)];
      new_poly_size++;
    }
    // Caso 4: Quando ambos os pontos estão fora
    else {
      // Nenhum ponto é adicionado
    }
  }

  // Copiando os novos pontos para o array original e alterando o número de vértices
  poly_size = new_poly_size;
  for (let i = 0; i < poly_size-1; i++) {
    poly_points[i][0] = new_points[i][0];
    poly_points[i][1] = new_points[i][1];
  }
}

// Implementa o algoritmo de Sutherland-Hodgman
function suthHodgClip(poly_points, poly_size, clipper_points, clipper_size) {
  for (let i = 0; i < clipper_size; i++) {
    const k = (i + 1) % clipper_size;

    // Passamos o array atual de vértices, seu tamanho
    // e os pontos finais da linha de recorte selecionada
    clip(poly_points, poly_size, clipper_points[i][0], clipper_points[i][1], clipper_points[k][0], clipper_points[k][1]);
  }

  // Imprimindo os vértices do polígono recortado
  for (let i = 0; i < poly_size; i++) {
    console.log(`(${poly_points[i][0]}, ${poly_points[i][1]})`);
  }
}

// Exemplo de uso:
// Definindo os vértices do polígono em ordem horária
const poly_size = 3;
const poly_points = [
  [100, 150],
  [200, 250],
  [300, 200]
];

// Definindo os vértices do polígono de recorte em ordem horária
// 1º Exemplo com um polígono quadrado de recorte
const clipper_size = 4;
const clipper_points = [
  [150, 150],
  [150, 200],
  [200, 200],
  [200, 150]
];

const clipP = [ 
    [0, 0],
  [24, 0],
  [24, 24],
  [0, 24]
];


// 2º Exemplo com um polígono triangular de recorte
/*const clipper_size = 3;
const clipper_points = [
  [100, 300],
  [300, 300],
  [200, 100]
];*/

// Chamando a função de recorte
suthHodgClip(poly_points, poly_size, clipP, clipper_size);

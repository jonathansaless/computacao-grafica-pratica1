// Função que retorna o valor x da interseção de duas linhas
function x_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const num = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    return num / den;
  }
  
  // Função que retorna o valor y da interseção de duas linhas
  function y_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const num = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    return num / den;
  }
  
  // Função que faz o recorte de um polígono em relação a uma aresta do clipper
function clip(poly_points, poly_size, x1, y1, x2, y2) {
    const new_points = []; // Array para armazenar os novos pontos após o recorte
    let new_poly_size = 0; // Tamanho do novo polígono
  
    for (let i = 0; i < poly_size; i++) {
      const k = (i + 1) % poly_size; // Próximo ponto no polígono
      const ix = poly_points[i][0];
      const iy = poly_points[i][1];
      const kx = poly_points[k][0];
      const ky = poly_points[k][1];
  
      // Calcula a posição dos pontos em relação à aresta do clipper
      const i_pos = (x2 - x1) * (iy - y1) - (y2 - y1) * (ix - x1);
      const k_pos = (x2 - x1) * (ky - y1) - (y2 - y1) * (kx - x1);
  
      // Caso 1: Ambos os pontos estão dentro do clipper
      if (i_pos < 0 && k_pos < 0) {
        // Adiciona apenas o segundo ponto
        new_points.push([kx, ky]);
        new_poly_size++;
      }
      // Caso 2: Apenas o primeiro ponto está fora do clipper
      else if (i_pos >= 0 && k_pos < 0) {
        // Adiciona o ponto de interseção e o segundo ponto
        const new_x = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        const new_y = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        new_points.push([new_x, new_y]);
        new_poly_size++;
        new_points.push([kx, ky]);
        new_poly_size++;
      }
      // Caso 3: Apenas o segundo ponto está fora do clipper
      else if (i_pos < 0 && k_pos >= 0) {
        // Adiciona apenas o ponto de interseção
        const new_x = x_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        const new_y = y_intersect(x1, y1, x2, y2, ix, iy, kx, ky);
        new_points.push([new_x, new_y]);
        new_poly_size++;
      }
      // Caso 4: Ambos os pontos estão fora do clipper (não adiciona nenhum ponto)
    }
  
    // Copia os novos pontos para o array original e atualiza o tamanho do polígono
    poly_points.length = 0;
    for (let i = 0; i < new_poly_size; i++) {
      poly_points.push(new_points[i]);
    }
    poly_size = new_poly_size;
  
    return poly_points;
  }
  
  // Função que implementa o algoritmo Sutherland-Hodgman para recorte de polígonos
  function suthHodgClip(poly_points, poly_size, clipper_points, clipper_size) {
    for (let i = 0; i < clipper_size; i++) {
      const k = (i + 1) % clipper_size;
      // Realiza o recorte em relação a cada aresta do clipper
      poly_points = clip(
        poly_points,
        poly_size,
        clipper_points[i][0],
        clipper_points[i][1],
        clipper_points[k][0],
        clipper_points[k][1]
      );
      poly_size = poly_points.length; // Atualiza o tamanho do polígono após cada recorte
    }
  
    // Imprime os vértices do polígono recortado
    for (let i = 0; i < poly_size; i++) {
        console.log(`(${Math.round(poly_points[i][0])}, ${Math.round(poly_points[i][1])})`);
    }
  }
  
  // Função principal
function main() {
    // Definindo os vértices do polígono no sentido horário
    const poly_points = [[0, 0], [0, 5], [5, 5], [80, 0]];
    const poly_size = poly_points.length;
  
    // Definindo os vértices do clipper no sentido horário
    const clipper_points = [[0, 0], [0, 24], [24, 24], [24, 0]];
    const clipper_size = clipper_points.length;
    //console.log(clipper_size);
    // Chamando a função de recorte
    suthHodgClip(poly_points, poly_size, clipper_points, clipper_size);
  }
  
  // Chamando a função principal
  main();
  
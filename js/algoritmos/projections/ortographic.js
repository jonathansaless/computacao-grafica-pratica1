// Projeção Ortográfica ou Ortogonal - Matriz de Rotação

export const PROJECTION_MATRIX_XY = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1]
  ];
import { cube } from "../constants/constants.js"

export function orthographicProjection() {
    console.log('***************************');
    cube.forEach(e => {
      var teste = multiplyMatrixAndVector(PROJECTION_MATRIX_XY, e);
      console.log(teste);
    });
    // desenhar na grade de pixels
  }

orthographicProjection();

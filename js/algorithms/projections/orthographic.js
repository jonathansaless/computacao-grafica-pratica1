import { bresenhamLine } from "../drawLine.js";
import * as colors from "../constants/colors.js";
// Projeção Ortográfica - Matriz de Rotação
export const PROJECTION_MATRIX_XY = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 1]
];

export function orthographicProjection(cube) {
  for(var i = 0; i < cube.length - 1; i++){
    // console.log(cube[i][0]);
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY, cube[i+1]);
    //console.log(point, nextPoint);
    bresenhamLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

export function multiplyMatrixAndVector(matrix, vector) {
  if (matrix[0].length !== vector.length) {
    throw new Error("Incompatible dimensions for matrix and vector multiplication");
  }

  var result = [];
  for (var i = 0; i < matrix.length; i++) {
    var sum = 0;
    for (var j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}
import { drawClipLine } from "../drawings/drawLine.js";
import { multiplyMatrixAndVector } from "../features/operations.js";
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
    drawClipLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}
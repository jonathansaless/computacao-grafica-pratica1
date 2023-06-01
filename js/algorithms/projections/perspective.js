import { PROJECTION_MATRIX_XY, multiplyMatrixAndVector } from "./orthographic.js";
// import { cube } from "../constants/constants.js"
import { bresenhamLine } from "../drawLine.js";
import * as colors from "../constants/colors.js";

const FOCAL_DISTANCE = 20;

// function projecaoXY(cube, ROTATION_MATRIX) {
//     return multiplyMatrices(cube, ROTATION_MATRIX);
// }

export function perspectiveProjectionOne(cube){ 
  // um ponto de fuga
  
  const PROJECTION_MATRIX_XY_one = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              0,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    // console.log(cube[i][0]);
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_one, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_one, cube[i+1]);
    point = convertListToInteger(divideLista(point, point[3]));
    nextPoint = convertListToInteger(divideLista(nextPoint, nextPoint[3]));

    console.log(point, nextPoint);
    bresenhamLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
  //console.log(cube[2][0], cube[2][1]);
  // bresenhamLine(cube[cube.length-1][0], cube[cube.length-1][1], cube[0][0], cube[0][1], colors.GREEN)
  // bresenhamLine(cube[2][0], cube[2][1], cube[4][0], cube[4][1], colors.GREEN)

}

function convertListToInteger(points) {
  var result = [];

  for (var i = 0; i < points.length; i++) {
    var roundedPoint = Math.round(points[i], 10);
    
    if (!isNaN(roundedPoint)) {
      result.push(roundedPoint);
    }
  }

  return result;
}

export function perspectiveProjectionTwo(cube){ 
  // dois pontos de fuga
  const PROJECTION_MATRIX_XY_two = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              1,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    // console.log(cube[i][0]);
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_two, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_two, cube[i+1]);
    point = convertListToInteger(divideLista(point, point[3]));
    nextPoint = convertListToInteger(divideLista(nextPoint, nextPoint[3]));

    console.log(point, nextPoint);
    bresenhamLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

export function perspectiveProjectionThree(cube){ 
  // três pontos de fuga
  const PROJECTION_MATRIX_XY_three = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [1,              1,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    // console.log(cube[i][0]);
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_three, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_three, cube[i+1]);
    point = convertListToInteger(divideLista(point, point[3]));
    nextPoint = convertListToInteger(divideLista(nextPoint, nextPoint[3]));

    console.log(point, nextPoint);
    bresenhamLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

function multiplyMatrices(matrixA, matrixB) {
  var rowsA = matrixA.length;
  var colsA = matrixA[0].length;
  var colsB = matrixB[0].length;

  var result = new Array(rowsA);
  for (var i = 0; i < rowsA; i++) {
    result[i] = new Array(colsB);
    for (var j = 0; j < colsB; j++) {
      result[i][j] = 0;
      for (var k = 0; k < colsA; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
}

function divideLista(lista, x) {
    var resultado = [];
  
    for (var i = 0; i < lista.length; i++) {
      resultado.push(lista[i] / x);
    }
    return resultado;
}

// perspectiveProjectionOne();

// perspectiveProjectionTwo();

// perspectiveProjectionThree();

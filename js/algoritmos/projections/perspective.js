import { PROJECTION_MATRIX_XY } from "./ortographic.js";
import { cube } from "../constants/constants.js"

const FOCAL_DISTANCE = 1;

// function projecaoXY(cube, ROTATION_MATRIX) {
//     return multiplyMatrices(cube, ROTATION_MATRIX);
// }

function perspectiveProjectionOne(){ 
  // um ponto de fuga
  
  const PROJECTION_MATRIX_XY_one = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              0,              1,              FOCAL_DISTANCE]
  ]));

  console.log('***************************');
  cube.forEach(e => {
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_one, e);
    console.log(divideLista(point, point[3])); //tem que dividir tudo pelo ultimo valor da coluna para que a matriz fique homogenea (final tudo igual a 1)
    // draw(divideLista(point, point[3]))
  });
}

function perspectiveProjectionTwo(){ 
  // dois pontos de fuga
  const PROJECTION_MATRIX_XY_two = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              1,              1,              FOCAL_DISTANCE]
  ]));

  console.log('***************************');
  cube.forEach(e => {
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_two, e);
    console.log(divideLista(point, point[3])); //tem que dividir tudo pelo ultimo valor da coluna para que a matriz fique homogenea (final tudo igual a 1)
  });
}

function perspectiveProjectionThree(){ 
  // três pontos de fuga
  const PROJECTION_MATRIX_XY_three = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [1,              1,              1,              FOCAL_DISTANCE]
  ]));

  console.log('***************************');
  cube.forEach(e => {
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_three, e);
    console.log(divideLista(point, point[3])); //tem que dividir tudo pelo ultimo valor da coluna para que a matriz fique homogenea (final tudo igual a 1)  
  });
}

function multiplyMatrixAndVector(matrix, vector) {
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

perspectiveProjectionOne();

perspectiveProjectionTwo();

perspectiveProjectionThree();

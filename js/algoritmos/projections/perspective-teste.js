// Projeção Ortográfica ou Ortogonal - Matriz de Rotação
// Matriz de rotação para z=0
var PROJECTION_MATRIX_XY = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1]
];

// Matriz de rotação para y=0
var ROTATION_MATRIX_XZ = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

// Matriz de rotação para x=0
var ROTATION_MATRIX_YZ = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];


var cubeTeste = [
    [0, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [0, 1, 0, 1]
    ];

function projecaoXY(cube, ROTATION_MATRIX) {
    return multiplyMatrices(ROTATION_MATRIX, cube);
}
function orthographic() {

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

// var teste = multiplyMatrices(ROTATION_MATRIX_YZ, cubeTeste);
// console.log(teste);

cubeTeste.forEach(e => {
    var teste = multiplyMatrixAndVector(PROJECTION_MATRIX_XY, e);
    //console.log(teste);
});

// um ponto de fuga
var FOCAL_DISTANCE = 1;
var PROJECTION_MATRIX_XY = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              0,              1,              FOCAL_DISTANCE]
]));

var perspectiveCube = [];
cubeTeste.forEach(e => {

    var teste = multiplyMatrixAndVector(PROJECTION_MATRIX_XY, e);

    console.log(divideLista(teste, teste[3])); //tem que dividir tudo pelo ultimo valor da coluna para que a matriz fique homogenea (final tudo igual a 1)
    perspectiveCube.push(teste);
});

function divideLista(lista, x) {
    var resultado = [];
  
    for (var i = 0; i < lista.length; i++) {
      resultado.push(lista[i] / x);
    }
  
    return resultado;
  }
  
  
// console.log(perspectiveCube);




// var ROTATION_MATRIX = multiplyMatrices(ROTATION_MATRIX, ([
//     [FOCAL_DISTANCE, 0,              0,              0             ],
//     [0,              FOCAL_DISTANCE, 0,              0             ],
//     [0,              0,              FOCAL_DISTANCE, 0             ],
//     [0,              1,              1,              FOCAL_DISTANCE]
// ]));

// cubeTeste.forEach(e => {
//     var teste = multiplyMatrixAndVector(ROTATION_MATRIX, e);
//     console.log(teste);
// });

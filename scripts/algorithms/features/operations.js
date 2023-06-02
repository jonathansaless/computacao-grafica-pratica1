export function multiplyMatrices(matrixA, matrixB) {
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
  
export function divideLista(lista, x) {
      var resultado = [];
    
      for (var i = 0; i < lista.length; i++) {
        resultado.push(lista[i] / x);
      }
      return resultado;
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
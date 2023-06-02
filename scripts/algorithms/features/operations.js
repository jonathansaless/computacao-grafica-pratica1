// Função para multiplicar duas matrizes
export function multiplyMatrices(matrixA, matrixB) {
  var rowsA = matrixA.length;
  var colsA = matrixA[0].length;
  var colsB = matrixB[0].length;

  // Cria uma matriz vazia com o número de linhas de A e o número de colunas de B
  var result = new Array(rowsA);
  for (var i = 0; i < rowsA; i++) {
    result[i] = new Array(colsB);
    for (var j = 0; j < colsB; j++) {
      result[i][j] = 0;
      for (var k = 0; k < colsA; k++) {
        // Multiplica os elementos correspondentes das matrizes A e B
        // e acumula o resultado na posição apropriada da matriz de resultado
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
}

// Função para dividir cada elemento de uma lista por um valor escalar
export function divideLista(lista, x) {
  var resultado = [];

  for (var i = 0; i < lista.length; i++) {
    // Divide cada elemento da lista pelo valor escalar
    resultado.push(lista[i] / x);
  }
  return resultado;
}

// Função para multiplicar uma matriz por um vetor
export function multiplyMatrixAndVector(matrix, vector) {
  if (matrix[0].length !== vector.length) {
    throw new Error("Incompatible dimensions for matrix and vector multiplication");
  }

  var result = [];
  for (var i = 0; i < matrix.length; i++) {
    var sum = 0;
    for (var j = 0; j < vector.length; j++) {
      // Multiplica os elementos correspondentes da linha da matriz pelo vetor
      // e acumula o resultado na variável de soma
      sum += matrix[i][j] * vector[j];
    }
    // Adiciona o resultado da soma ao vetor de resultado
    result.push(sum);
  }
  return result;
}

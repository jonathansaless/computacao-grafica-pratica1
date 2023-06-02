// Função para converter pontos em formato decimal para formato inteiro
export function convertListToInteger(points) {
  var result = [];
  for (var i = 0; i < points.length; i++) {
      var point = points[i];
      
      // Arredonda as coordenadas x e y para os valores inteiros mais próximos
      var roundedPoint = { x: Math.round(point.x), y: Math.round(point.y) };
      
      // Adiciona o ponto arredondado ao resultado
      result.push(roundedPoint);
  }
  return result;
}

// Função para converter uma lista de pontos em formato decimal para formato inteiro
export function convertListToInt(points) {
  var result = [];
  for (var i = 0; i < points.length; i++) {
      var roundedPoint = Math.round(points[i], 10);
      
      // Verifica se o ponto arredondado é um número válido (não é NaN)
      // e o adiciona ao resultado
      if (!isNaN(roundedPoint)) {
          result.push(roundedPoint);
      }
  }
  return result;
}

// Função para converter ângulos de graus para radianos
export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Retorna o produto escalar entre dois pontos
function dotProduct(point1, point2) {
  return point1[0] * point2[0] + point1[1] * point2[1];
}

// Retorna o resultado da interseção entre uma aresta e um plano de recorte
function getIntersection(edgeStart, edgeEnd, clipStart, clipEnd) {
  const edgeVector = [edgeEnd[0] - edgeStart[0], edgeEnd[1] - edgeStart[1]];
  const clipVector = [clipEnd[0] - clipStart[0], clipEnd[1] - clipStart[1]];
  const edgeNormal = [edgeVector[1], -edgeVector[0]];

  // Calcula o parâmetro 't' da interseção
  const t = dotProduct([clipStart[0] - edgeStart[0], clipStart[1] - edgeStart[1]], edgeNormal) /
    dotProduct(clipVector, edgeNormal);

  // Retorna as coordenadas do ponto de interseção
  return [clipStart[0] + clipVector[0] * t, clipStart[1] + clipVector[1] * t];
}

// Realiza o recorte do polígono
function sutherlandHodgmanClip(subjectPolygon, clipPolygon) {
  let outputList = subjectPolygon;

  for (let i = 0; i < clipPolygon.length; i++) {
    const clipEdgeStart = clipPolygon[i];
    const clipEdgeEnd = clipPolygon[(i + 1) % clipPolygon.length];
    const inputList = outputList;
    outputList = [];

    let prevVertex = inputList[inputList.length - 1];
    for (let j = 0; j < inputList.length; j++) {
      const currentVertex = inputList[j];

      // Verifica se o vértice atual está dentro do plano de recorte
      if (isInside(currentVertex, clipEdgeStart, clipEdgeEnd)) {
        // Verifica se o vértice anterior está fora do plano de recorte
        if (!isInside(prevVertex, clipEdgeStart, clipEdgeEnd)) {
          // Adiciona o ponto de interseção entre a aresta e o plano de recorte
          outputList.push(getIntersection(prevVertex, currentVertex, clipEdgeStart, clipEdgeEnd));
        }
        // Adiciona o vértice atual
        outputList.push(currentVertex);
      } else if (isInside(prevVertex, clipEdgeStart, clipEdgeEnd)) {
        // Verifica se o vértice anterior está dentro do plano de recorte
        // Adiciona o ponto de interseção entre a aresta e o plano de recorte
        outputList.push(getIntersection(prevVertex, currentVertex, clipEdgeStart, clipEdgeEnd));
      }

      prevVertex = currentVertex;
    }
  }

  return outputList;
}

// Verifica se um ponto está dentro ou fora de uma aresta
function isInside(point, edgeStart, edgeEnd) {
  const crossProduct = (edgeEnd[1] - edgeStart[1]) * (point[0] - edgeStart[0]) -
    (edgeEnd[0] - edgeStart[0]) * (point[1] - edgeStart[1]);

  // O produto vetorial indica se o ponto está dentro ou fora da aresta
  // Retorna true se o ponto estiver dentro ou na borda da aresta
  return crossProduct >= 0;
}

// Definição dos polígonos de teste
const subjectPolygon = [[100, 150], [200, 250], [300, 200]];
const clipPolygon = [[150, 150], [150, 200], [200, 200], [200, 150]];

// Realiza o recorte do polígono
const clippedPolygon = sutherlandHodgmanClip(subjectPolygon, clipPolygon);

// Imprime o polígono recortado no console
console.log(clippedPolygon);

import { convertListToInteger } from "../features/convertListToInteger.js";
import { clipPolygon } from "../clipPolyline.js";
import * as constant from "../constants/constants.js";

// Função para realizar a projeção ortogonal de um polígono
export function orthographicProjection(vertices) {
    var projectedVertices = [];
  
    for (var i = 0; i < vertices.length; i++) {
      var vertex = vertices[i];
      var projectedVertex = { x: vertex.x, y: vertex.y }; // Copia as coordenadas x e y
  
      projectedVertices.push(projectedVertex);
    }
    projectedVertices = convertListToInteger(projectedVertices);
    clipPolygon(projectedVertices, constant.clipPolygon);
    //return projectedVertices;
  }
 /* // Exemplo de entrada: Cubo
var cubeVertices = [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: 0, y: 1, z: 1 }
  ];
  
// Projeção Ortogonal do Cubo
var orthographicProjectionResult = orthographicProjection(cubeVertices);
console.log(orthographicProjectionResult);
*/
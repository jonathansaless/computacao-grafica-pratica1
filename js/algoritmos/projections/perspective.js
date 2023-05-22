import { convertListToInteger } from "../features/convertListToInteger.js";
import { clipPolygon } from "../clipPolyline.js";
import * as constant from "../constants/constants.js";


export function perspectiveProjection2(point, d) {
    var perspectivePoint = {
      x: point.x / (1 + point.z / d),
      y: point.y / (1 + point.z / d)
    };
    return perspectivePoint;
  }
  
  // Função para projetar um polígono 3D utilizando projeção perspectiva
export function projectPolygon(polygon, d) {
    var projectedPolygon = [];
    for (var i = 0; i < polygon.length; i++) {
      var projectedPoint = perspectiveProjection2(polygon[i], d);
      projectedPolygon.push(projectedPoint);
    }
    projectedPolygon = convertListToInteger(projectedPolygon);
    clipPolygon(projectedPolygon, constant.clipPolygon);
    
    return projectedPolygon;
  }

// Função para realizar a projeção perspectiva de um polígono
export function perspectiveProjection(vertices, focalLength) {
    var projectedVertices = [];
  
    for (var i = 0; i < vertices.length; i++) {
      var vertex = vertices[i];
      var projectedVertex = {
        x: (vertex.x * focalLength) / (vertex.z + focalLength),
        y: (vertex.y * focalLength) / (vertex.z + focalLength)
      };
  
      projectedVertices.push(projectedVertex);
    }
    projectedVertices = convertListToInteger(projectedVertices);
    clipPolygon(projectedVertices, constant.clipPolygon);
    
    // return projectedVertices;
  }
  /*
// Exemplo de entrada: Cubo
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
  
// Projeção Perspectiva do Cubo
var focalLength = 2; // Comprimento focal
var perspectiveProjectionResult = perspectiveProjection(cubeVertices, focalLength);
console.log(perspectiveProjectionResult);
*/
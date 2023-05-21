import * as history from "./historyPoints.js";
import * as colors from "../colors.js";
import { drawPixel } from "./drawPixel.js";

function isPolygon(points) {
    if (points.length < 3) {
        return false; // Não há pontos suficientes para formar um polígono
    }
  
    // Verifica se o último ponto é igual ao primeiro (fechamento do polígono)
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
  
    if (firstPoint.x !== lastPoint.x || firstPoint.y !== lastPoint.y) {
        return false; // O polígono não está fechado
    }
    console.log('é um poligono');
    return true;
  }

  
  // Algoritmo de varredura para preenchimento de polígono
function fillPolygon(points) {
    const sortedPoints = points.sort((a, b) => a.y - b.y);
    const minY = sortedPoints[0].y;
    const maxY = sortedPoints[sortedPoints.length - 1].y;
  
    for (let y = minY; y <= maxY; y++) {
      const intersectionPoints = [];
  
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i];
        const nextPoint = points[(i + 1) % points.length];
  
        if (
          (currentPoint.y <= y && nextPoint.y > y) ||
          (nextPoint.y <= y && currentPoint.y > y)
        ) {
          const x =
            ((y - currentPoint.y) * (nextPoint.x - currentPoint.x)) /
              (nextPoint.y - currentPoint.y) +
            currentPoint.x;
          intersectionPoints.push(x);
        }
      }
  
      intersectionPoints.sort((a, b) => a - b);
  
      for (let i = 0; i < intersectionPoints.length; i += 2) {
        const startX = Math.ceil(intersectionPoints[i]);
        const endX = Math.floor(intersectionPoints[i + 1]);
  
        for (let x = startX; x <= endX; x++) {
            drawPixel(x, y, colors.GREEN);
        }
      }
    }
  }
  
export function drawPolygon() {
    const drawnPoints = history.historyPoints;
  
    if (isPolygon(drawnPoints)) {
        console.log(history.points)
      fillPolygon(history.points);
    } else {
      console.log("Os pontos desenhados não formam um polígono válido.");
    }
  }
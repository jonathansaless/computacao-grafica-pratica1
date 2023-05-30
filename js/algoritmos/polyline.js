import * as line from "./line-bresenham.js";
import { historyPoints, historyVertices } from "./constants/constants.js";
import { contPoligon } from "./constants/constants.js";

export function drawPolyline(points, color) {
  points.forEach(function(point) {
    historyPoints.push(point);
    historyPoints.polID = contPoligon;
  });
  
  const numPoints = points.length;
  if (numPoints < 3) {
    console.log("A polilinha deve ter pelo menos 3 pontos.");
    return;
  }

  for (let i = 0; i < numPoints - 1; i++) {
    const { x: x0, y: y0 } = points[i];
    const { x: x1, y: y1 } = points[i + 1];
    line.bresenhamLine(x0, y0, x1, y1, color);
  }
  console.log(historyPoints);
  console.log(historyVertices);
}
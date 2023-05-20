import * as line from "./line-bresenham.js";
import * as history from "./historyPoints.js";


export function drawPolyline(points) {
  const numPoints = points.length;
  if (numPoints < 3) {
    console.log("A polilinha deve ter pelo menos 3 pontos.");
    return;
  }

  for (let i = 0; i < numPoints - 1; i++) {
    const { x: x0, y: y0 } = points[i];
    const { x: x1, y: y1 } = points[i + 1];
    line.bresenhamLine(x0, y0, x1, y1);
  }
  console.log(history.historyPoints);
}


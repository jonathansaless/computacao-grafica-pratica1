import { drawClipLine } from "./drawLine.js";
import { contPoligon, clipPolygon, historyPoints } from "../constants/variables.js";
import { convertListToInteger } from "../features/convertions.js";

function drawPolygon(points, color) {
  points.forEach(function(point) {
    console.log(point);
    historyPoints.push(point);
    // historyPoints.polID = contPoligon;
  });
  
  for (let i = 0; i < points.length - 1; i++) {
    const { x: x0, y: y0 } = points[i];
    const { x: x1, y: y1 } = points[i + 1];
    drawClipLine(x0, y0, x1, y1, color);
  }
  // console.log(historyPoints);
  // console.log(historyVertices);
}

export function drawClipPolygon(polygon, color) {
  var cp1, cp2, s, e;
  
  var inside = function (p) {
      return (cp2.x - cp1.x) * (p.y - cp1.y) > (cp2.y - cp1.y) * (p.x - cp1.x);
  };

  var computeIntersection = function () {
      var dc = { x: cp1.x - cp2.x, y: cp1.y - cp2.y };
      var dp = { x: s.x - e.x, y: s.y - e.y };
      var n1 = cp1.x * cp2.y - cp1.y * cp2.x;
      var n2 = s.x * e.y - s.y * e.x;
      var n3 = 1.0 / (dc.x * dp.y - dc.y * dp.x); 
      return { x: (n1 * dp.x - n2 * dc.x) * n3, y: (n1 * dp.y - n2 * dc.y) * n3 };
  };
  
  var outputList = polygon;
  cp1 = clipPolygon[clipPolygon.length - 1];

  for (var j = 0; j < clipPolygon.length; j++) {
      cp2 = clipPolygon[j];
      var inputList = outputList;
      outputList = [];
      s = inputList[inputList.length - 1];

      for (var i = 0; i < inputList.length; i++) {
          e = inputList[i];

          if (inside(e)) {
              if (!inside(s)) {
                  outputList.push(computeIntersection());
                  console.log(outputList);
              }
              outputList.push(e);
          } else if (inside(s)) {
              outputList.push(computeIntersection());
          }
          s = e;
      }

      cp1 = cp2;
  }

  outputList = convertListToInteger(outputList);
  
  // desenha o poligono com os valores de vertices obtidos
  
  outputList.forEach(function(point) {
    point.polID = contPoligon;
  })

  console.log(outputList);

  drawPolygon(outputList, color);
}

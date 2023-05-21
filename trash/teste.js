import { drawPixel } from "../js/algoritmos/drawPixel";
import * as colors from "../js/colors.js";

// preechimento recursivo
function floodFill(x, y){
    const edgeColor = colors.RED
    const color = colors.GREEN
    if((x_y.backgroundColor !== edgeColor) && (x_y.backgroundColor !== color)) {
        drawPixel(x, y, color);
        floodFill(x+1, y);
        floodFill(x, y+1);
        floodFill(x-1, y);
        floodFill(x, y-1);
    }
}


function varredura(image, startPoint, paintColor) {
    const height = image.length;
    const width = image[0].length;
    const fillColor = image[startPoint[0]][startPoint[1]];
  
    if (fillColor === paintColor) {
      return;
    }
  
    const stack = [];
    stack.push(startPoint);
    
    console.log(stack);
    while (stack.length > 0) {
      const [x, y] = stack.pop();
  
      if (image[x][y] === fillColor && image[x][y] !== 1) {
        image[x][y] = paintColor;
  
        if (x > 0) {
          stack.push([x - 1, y]); // Up
        }
        if (x < height - 1) {
          stack.push([x + 1, y]); // Down
        }
        if (y > 0) {
          stack.push([x, y - 1]); // Left
        }
        if (y < width - 1) {
          stack.push([x, y + 1]); // Right
        }
      }
    }
  }
  
  function floodFillCanvas(canvas, criticalPoints, paintColor) {
    const image = JSON.parse(JSON.stringify(canvas)); // Create a deep copy of the canvas
    for (const point of criticalPoints) {
      floodFill(image, point, paintColor);
    }
    return image;
  }
  
  // Exemplo de uso
  const canvas = [
    [1, 1, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
  ];
  
  const criticalPoints = [[1, 1], [2, 2], [3, 1], [2, 3]];
  const paintColor = 2;
  
  const filledCanvas = floodFillCanvas(canvas, criticalPoints, paintColor);
  console.log(filledCanvas);
  
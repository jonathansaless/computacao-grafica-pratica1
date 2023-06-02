export function convertListToInteger(points) {
    var result = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var roundedPoint = { x: Math.round(point.x), y: Math.round(point.y) };
        result.push(roundedPoint);
    }
    return result;
}

export function convertListToInt(points) {
    var result = [];
  
    for (var i = 0; i < points.length; i++) {
      var roundedPoint = Math.round(points[i], 10);
      
      if (!isNaN(roundedPoint)) {
        result.push(roundedPoint);
      }
    }
    return result;
  }

// converte o angulo em graus para radiano
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
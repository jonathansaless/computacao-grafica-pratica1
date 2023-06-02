export function convertListToInteger(points) {
    var result = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var roundedPoint = { x: Math.round(point.x), y: Math.round(point.y) };
        result.push(roundedPoint);
    }
    return result;
}
function scalePolygon(polygon, scaleX, scaleY, fixedPoint) {
    var scaledPolygon = [];

    for (var i = 0; i < polygon.length; i++) {
        var vertex = polygon[i];
        var translatedVertex = {
            x: vertex.x - fixedPoint.x,
            y: vertex.y - fixedPoint.y
        };

        var scaledVertex = {
            x: translatedVertex.x * scaleX,
            y: translatedVertex.y * scaleY
        };

        var finalVertex = {
            x: scaledVertex.x + fixedPoint.x,
            y: scaledVertex.y + fixedPoint.y
        };

        scaledPolygon.push(finalVertex);
    }

    return scaledPolygon;
}

var polygon = [
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 100, y: 100 },
    { x: 50, y: 100 }
];
var scaleX = 1.5; // fator de escala em X
var scaleY = 0.5; // fator de escala em Y
var fixedPoint = { x: 75, y: 75 }; // ponto fixo para escala

var scaledPolygon = scalePolygon(polygon, scaleX, scaleY, fixedPoint);
console.log(scaledPolygon);

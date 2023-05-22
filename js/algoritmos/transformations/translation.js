function translatePolygon(polygon, dx, dy) {
    var translatedPolygon = [];

    for (var i = 0; i < polygon.length; i++) {
        var vertex = polygon[i];
        var translatedVertex = {
            x: vertex.x + dx,
            y: vertex.y + dy
        };
        translatedPolygon.push(translatedVertex);
    }

    return translatedPolygon;
}

var polygon = [
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 100, y: 100 },
    { x: 50, y: 100 }
];
var dx = 10; // deslocamento em X
var dy = 20; // deslocamento em Y

var translatedPolygon = translatePolygon(polygon, dx, dy);
console.log(translatedPolygon);

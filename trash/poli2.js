function clip(subjectPolygon, clipPolygon) {
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

    var outputList = subjectPolygon;
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
    return outputList;
}

function convertListToInteger(points) {
    var result = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var roundedPoint = { x: Math.round(point.x), y: Math.round(point.y) };
        result.push(roundedPoint);
    }
    return result;
}

var subjectPolygon = [
    { x: 4, y: 4 },
    { x: 8, y: 4 },
    { x: 8, y: 8 },
    { x: 4, y: 29 }
];
var clipPolygon = [
    { x: 0, y: 0 },
    { x: 24, y: 0 },
    { x: 24, y: 24 },
    { x: 0, y: 24 }
];

var clippedPolygon = clip(subjectPolygon, clipPolygon);
console.log(clippedPolygon);

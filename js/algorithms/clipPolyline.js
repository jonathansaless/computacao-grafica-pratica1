// ainda está meio inacabado
// verificar, pois se eu desenho uma quadradao com uma parte pra fora, ele desenha o
// quadrado todo dento do quadro de desenho
import { drawPolyline } from "./polyline.js";
import { convertListToInteger } from "./features/convertListToInteger.js";

export function clipPolygon(subjectPolygon, clipPolygon, color) {
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
    
    // desenha o poligono com os valores de vertices obtidos
    console.log(outputList);
    drawPolyline(outputList, color);
}

import { convertListToInteger } from "../features/convertListToInteger.js";
import { clipPolygon } from "../clipPolyline.js";
import * as constant from "../constants/constants.js";
import * as colors from "../constants/colors.js";

export function scalePolygon(polygon, scaleX, scaleY, fixedPoint) {
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
    // converte valores da lista para inteiro
    console.log('scaled poligono',scaledPolygon);
    scaledPolygon = convertListToInteger(scaledPolygon);
    console.log('scaled poligono',scaledPolygon);
    // desenha o poligono usando o clip para ja realizar o corte caso precise
    clipPolygon(scaledPolygon, constant.clipPolygon, colors.BLUE);
}

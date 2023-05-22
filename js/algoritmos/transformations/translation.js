import { convertListToInteger } from "../features/convertListToInteger.js";
import { clipPolygon } from "../clipPolyline.js";
import * as constant from "../constants/constants.js";

export function translatePolygon(polygon, dx, dy) {
    var translatedPolygon = [];

    for (var i = 0; i < polygon.length; i++) {
        var vertex = polygon[i];
        var translatedVertex = {
            x: vertex.x + dx,
            y: vertex.y + dy
        };
        translatedPolygon.push(translatedVertex);
    }
    translatedPolygon = convertListToInteger(translatedPolygon);
    clipPolygon(translatedPolygon, constant.clipPolygon);
}
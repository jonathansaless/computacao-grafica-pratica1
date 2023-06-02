import { convertListToInteger } from "../features/convertListToInteger.js";
import { drawClipPolygon } from "../drawPolygon.js";
import * as constant from "../constants/variables.js";
import * as colors from "../constants/colors.js";

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
    clipPolygon(translatedPolygon, constant.clipPolygon, colors.BLUE);
}
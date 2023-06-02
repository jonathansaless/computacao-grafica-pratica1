import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger } from "../features/convertions.js";
import { clipPolygon } from "../constants/variables.js";
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
    drawClipPolygon(translatedPolygon, clipPolygon, colors.BLUE);
}
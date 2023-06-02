import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger } from "../features/convertions.js";
import * as colors from "../constants/colors.js";

// alterar a posição do objeto
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
    console.log(translatedPolygon);
    drawClipPolygon(translatedPolygon, colors.BLUE);
}
import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger, degreesToRadians } from "../features/convertions.js";
import { clipPolygon } from "../constants/variables.js";
import * as colors from "../constants/colors.js";

export function rotatePolygon(polygon, angle, pivot) {
    angle = degreesToRadians(angle);
    var rotatedPolygon = [];
    var sinAngle = Math.sin(angle);
    var cosAngle = Math.cos(angle);

    for (var i = 0; i < polygon.length; i++) {
        var vertex = polygon[i];
        var translatedVertex = {
            x: vertex.x - pivot.x,
            y: vertex.y - pivot.y
        };

        var rotatedVertex = {
            x: translatedVertex.x * cosAngle - translatedVertex.y * sinAngle,
            y: translatedVertex.x * sinAngle + translatedVertex.y * cosAngle
        };

        var finalVertex = {
            x: rotatedVertex.x + pivot.x,
            y: rotatedVertex.y + pivot.y
        };

        rotatedPolygon.push(finalVertex);
    }
    rotatedPolygon = convertListToInteger(rotatedPolygon);
    drawClipPolygon(rotatedPolygon, clipPolygon, colors.BLUE);
}
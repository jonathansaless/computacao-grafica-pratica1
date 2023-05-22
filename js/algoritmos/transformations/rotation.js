import { convertListToInteger } from "./convertListToInteger.js";
import { drawPolyline } from "../polyline.js";
import { clipPolygon } from "../clipPolyline.js";
import * as constant from "../constants/constants.js";

export function rotatePolygon(polygon, angle, pivot) {
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
    clipPolygon(rotatedPolygon, constant.clipPolygon);
}
import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger } from "../features/convertions.js";
import { clearScreen } from "../../UI/events.js";
import * as colors from "../constants/colors.js";

// Função para aumentar ou diminuir o tamanho de um polígono
export function scalePolygon(polygon, scaleX, scaleY, fixedPoint) {
    // Cria uma lista vazia para armazenar o polígono redimensionado
    var scaledPolygon = [];

    // Itera sobre os vértices do polígono
    for (var i = 0; i < polygon.length; i++) {
        var point = polygon[i];
        
        // Translada o vértice em relação ao ponto fixo
        var translatedPoint = {
            x: point.x - fixedPoint.x,
            y: point.y - fixedPoint.y
        };

        // Aplica a escala no vértice transladado
        var scaledPoint = {
            x: translatedPoint.x * scaleX,
            y: translatedPoint.y * scaleY
        };

        // Translada o vértice redimensionado de volta para sua posição original
        var finalPoint = {
            x: scaledPoint.x + fixedPoint.x,
            y: scaledPoint.y + fixedPoint.y
        };

        // Adiciona o vértice final ao polígono redimensionado
        scaledPolygon.push(finalPoint);
    }
    
    // Converte as coordenadas dos vértices para valores inteiros
    scaledPolygon = convertListToInteger(scaledPolygon);
    
    // Apaga o antigo polígono
    clearScreen();

    // Desenha o polígono redimensionado na cor vermelha
    drawClipPolygon(scaledPolygon, colors.RED);
}

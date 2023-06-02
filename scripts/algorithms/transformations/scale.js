import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger } from "../features/convertions.js";
import * as colors from "../constants/colors.js";

// Função para aumentar ou diminuir o tamanho de um polígono
export function scalePolygon(polygon, scaleX, scaleY, fixedPoint) {
    // Cria uma lista vazia para armazenar o polígono redimensionado
    var scaledPolygon = [];

    // Itera sobre os vértices do polígono
    for (var i = 0; i < polygon.length; i++) {
        var vertex = polygon[i];
        
        // Translada o vértice em relação ao ponto fixo
        var translatedVertex = {
            x: vertex.x - fixedPoint.x,
            y: vertex.y - fixedPoint.y
        };

        // Aplica a escala no vértice transladado
        var scaledVertex = {
            x: translatedVertex.x * scaleX,
            y: translatedVertex.y * scaleY
        };

        // Translada o vértice redimensionado de volta para sua posição original
        var finalVertex = {
            x: scaledVertex.x + fixedPoint.x,
            y: scaledVertex.y + fixedPoint.y
        };

        // Adiciona o vértice final ao polígono redimensionado
        scaledPolygon.push(finalVertex);
    }
    
    // Converte as coordenadas dos vértices para valores inteiros
    scaledPolygon = convertListToInteger(scaledPolygon);
    
    // Desenha o polígono redimensionado na cor azul
    drawClipPolygon(scaledPolygon, colors.BLUE);
}

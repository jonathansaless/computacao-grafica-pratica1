import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger, degreesToRadians } from "../features/convertions.js";
import { clearScreen } from "../../UI/events.js";
import * as colors from "../constants/colors.js";

// Função para girar um polígono
export function rotatePolygon(polygon, angle, pivot) {
    // Converte o ângulo de graus para radianos
    angle = degreesToRadians(angle);
    
    // Cria uma lista vazia para armazenar o polígono rotacionado
    var rotatedPolygon = [];
    
    // Calcula o seno e o cosseno do ângulo
    var sinAngle = Math.sin(angle);
    var cosAngle = Math.cos(angle);

    // Itera sobre os vértices do polígono
    for (var i = 0; i < polygon.length; i++) {
        var point = polygon[i];
        
        // Translada o vértice em relação ao pivô
        var translatedPoint = {
            x: point.x - pivot.x,
            y: point.y - pivot.y
        };

        // Aplica a rotação no vértice transladado
        var rotatedPoint = {
            x: translatedPoint.x * cosAngle - translatedPoint.y * sinAngle,
            y: translatedPoint.x * sinAngle + translatedPoint.y * cosAngle
        };

        // Translada o vértice rotacionado de volta para sua posição original
        var finalPoint = {
            x: rotatedPoint.x + pivot.x,
            y: rotatedPoint.y + pivot.y
        };

        // Adiciona o vértice final ao polígono rotacionado
        rotatedPolygon.push(finalPoint);
    }
    
    // Converte as coordenadas dos vértices para valores inteiros
    rotatedPolygon = convertListToInteger(rotatedPolygon);
    
    // Apaga o antigo polígono
    clearScreen();

    // Desenha o polígono rotacionado na cor vermelha
    drawClipPolygon(rotatedPolygon, colors.RED);
}

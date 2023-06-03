import { drawClipPolygon } from "../drawings/drawPolygon.js";
import { convertListToInteger } from "../features/convertions.js";
import { clearScreen } from "../../UI/events.js";
import * as colors from "../constants/colors.js";

// Função para alterar a posição de um polígono
export function translatePolygon(polygon, dx, dy) {
    // Cria uma lista vazia para armazenar o polígono transladado
    var translatedPolygon = [];

    // Itera sobre os vértices do polígono
    for (var i = 0; i < polygon.length; i++) {
        var point = polygon[i];

        // Translada o vértice adicionando os deslocamentos dx e dy
        var translatedPoint = {
            x: point.x + dx,
            y: point.y + dy,
        };

        // Adiciona o vértice transladado à lista do polígono transladado
        translatedPolygon.push(translatedPoint);
    }
    
    // Converte as coordenadas dos vértices para valores inteiros
    translatedPolygon = convertListToInteger(translatedPolygon);

    // Apaga o antigo polígono
    clearScreen();

    // Desenha o polígono transladado na cor vermelha
    drawClipPolygon(translatedPolygon, colors.RED);
}
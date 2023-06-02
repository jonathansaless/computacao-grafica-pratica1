import { drawPixel } from "../drawPixel.js";
import * as colors from "../constants/colors.js";

// Função de preenchimento recursivo (flood fill)
export function floodFill(x, y) {
    
    // Obtém o ID do quadrado atual
    const cellId = `${x}_${y}`;
    // Obtém o elemento do quadrado atual com base no ID
    const cellElement = document.getElementById(cellId);
    
    // Verifica se o elemento do quadrado é nulo, o que significa que está fora dos IDs válidos
    // Nesse caso, retorna sem fazer nada
    if (cellElement === null) {
        return;
    }

    // Verifica se o quadrado atual não está pintado nem de vermelho nem de verde
    if (!cellElement.classList.contains('painted')) {
        // Pinta o quadrado de verde
        drawPixel(x, y, colors.GREEN);
        // Chama a função de preenchimento recursivamente para os quadrados adjacentes
        floodFill(x + 1, y);
        floodFill(x, y + 1);
        floodFill(x - 1, y);
        floodFill(x, y - 1);
    }
    return;
}

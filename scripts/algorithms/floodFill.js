import { drawPixel } from "./drawPixel.js";
import * as colors from "./constants/colors.js";

// preechimento recursivo OK
export function floodFill(x, y){
    // cor da borda
    const edgeColor = colors.RED
    // cor a ser pintada
    const color = colors.GREEN

    // pega o quadrado atual
    const cellId = `${x}_${y}`;
    const cellElement = document.getElementById(cellId);
    
    // verifica se a celular recebida não é nula, pois se o cellId estiver fora dos IDs, não retornará nenhuma div
    if(cellElement === null){
        return;
    }

    // se o quadrado atual não estiver pintado nem de vermelho nem de verde, entra no IF
    if(!cellElement.classList.contains('painted')) {
        // pinta de verde
        drawPixel(x, y, color);
        // preenche os demais recursivamente
        floodFill(x+1, y);
        floodFill(x, y+1);
        floodFill(x-1, y);
        floodFill(x, y-1);
    }
    return
}
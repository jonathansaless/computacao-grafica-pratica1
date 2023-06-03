import { drawPixel } from "../drawPixel.js";

// Função para desenhar uma curva suave de Bezier
export function drawCurve(startX, startY, endX, endY, controlPoints, color) {
    // Cria um array de pontos contendo o ponto inicial, os pontos de controle e o ponto final
    const points = [
        { x: startX, y: startY },   // Ponto inicial
        ...controlPoints,           // Pontos de controle (array espalhado)
        { x: endX, y: endY }        // Ponto final
    ];
    
    const segments = 100;           // Número de segmentos da curva
    const tDelta = 1 / segments;    // Intervalo entre cada segmento

    // Itera sobre os segmentos da curva
    for (let t = 0; t <= 1; t += tDelta) {
        let p = points;     // Define o array de pontos atual
        let pTemp;

        // Executa a interpolação dos pontos até que reste apenas um ponto
        while (p.length > 1) {
            pTemp = [];
            for (let i = 0; i < p.length - 1; i++) {
                const p0 = p[i];
                const p1 = p[i + 1];
                const interpolatedPoint = interpolate(p0, p1, t);
                pTemp.push(interpolatedPoint);
            }
            p = pTemp;
        }

        const pFinal = p[0];    // Obtém o ponto final da curva no intervalo atual
        drawPixel(Math.round(pFinal.x), Math.round(pFinal.y), color);   // Desenha o ponto final da curva na tela
    }
}

// Função auxiliar para interpolar coordenadas entre dois pontos
function interpolate(p0, p1, t) {
    const x = p0.x + (p1.x - p0.x) * t; // Interpola a coordenada x
    const y = p0.y + (p1.y - p0.y) * t; // Interpola a coordenada y
    return { x, y };    // Retorna o ponto interpolado
}

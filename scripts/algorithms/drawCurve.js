import { drawPixel } from "./drawPixel.js";
import * as colors from "./constants/colors.js";

/* CÓDIGO AINDA NÃO ESTÁ FUNCIONANDO COMO ESPERADO */
export function drawBezierCurve(startX, startY, endX, endY, controlPoints) {

    const points = [
        { x: startX, y: startY }
    ];
    
    controlPoints.forEach(element => {
        points.push(element);
    });
    
    points.push({ x: endX, y: endY });
    
    console.log(points);

    // Quantidade de segmentos da curva
    const segments = 100;

    // Intervalo entre cada segmento
    const tDelta = 1 / segments;

    // Itera sobre os segmentos da curva
    for (let t = 0; t <= 1; t += tDelta) {
        // Calcula os pontos intermediários da curva de Bezier
        const p0 = interpolate(points[0], points[1], t);
        const p1 = interpolate(points[1], points[2], t);
        const p2 = interpolate(points[2], points[3], t);

        // Calcula os pontos intermediários do próximo nível
        const p01 = interpolate(p0, p1, t);
        const p12 = interpolate(p1, p2, t);

        // Calcula o ponto final da curva no nível atual
        const pFinal = interpolate(p01, p12, t);

        // Desenha o pixel correspondente ao ponto final da curva
        drawPixel(Math.round(pFinal.x), Math.round(pFinal.y), colors.RED);
    }
}
  
// Função auxiliar para interpolar coordenadas
function interpolate(p0, p1, t) {
    const x = p0.x + (p1.x - p0.x) * t;
    const y = p0.y + (p1.y - p0.y) * t;
    return { x, y };
}

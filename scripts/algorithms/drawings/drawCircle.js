import { drawPixel } from "../drawPixel.js";

// algoritmo do ponto médio para desenho de círculos
export function drawCircle(centerX, centerY, radius, color) {

    let x = radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
      // Desenha os pontos simétricos em todas as oito partes do círculo

        drawPixel(centerX + x, centerY + y, color); // Octante 1
        drawPixel(centerX + y, centerY + x, color); // Octante 2
        drawPixel(centerX - y, centerY + x, color); // Octante 3
        drawPixel(centerX - x, centerY + y, color); // Octante 4
        drawPixel(centerX - x, centerY - y, color); // Octante 5
        drawPixel(centerX - y, centerY - x, color); // Octante 6
        drawPixel(centerX + y, centerY - x, color); // Octante 7
        drawPixel(centerX + x, centerY - y, color); // Octante 8

        y++;

        if (radiusError < 0) {
            radiusError += 2 * y + 1;
        } else {
            x--;
            radiusError += 2 * (y - x + 1);
        }
    }
}
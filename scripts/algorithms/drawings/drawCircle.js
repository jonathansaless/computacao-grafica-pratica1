import { drawPixel } from "../drawPixel.js";

// Função para desenho de círculos
export function drawCircle(centerX, centerY, radius, color) {

    let x = radius;
    let y = 0;
    let radiusError = 1 - x;

    // O algoritmo utiliza o ponto médio para desenhar o círculo
    // Ele itera enquanto o valor de x é maior ou igual ao valor de y

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

        // Atualiza o valor de radiusError com base em x e y
        // O algoritmo ajusta os valores de x e y dependendo da diferença entre o erro atual e o erro máximo
        // Isso garante que os pontos desenhados estejam o mais próximo possível da circunferência desejada

        if (radiusError < 0) {
            radiusError += 2 * y + 1;
        } else {
            x--;
            radiusError += 2 * (y - x + 1);
        }
    }
}

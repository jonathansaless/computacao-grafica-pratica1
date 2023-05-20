import * as drawer from "./drawPixel.js";
import * as colors from "../colors.js";

export function circle(centerX, centerY, radius) {
    drawer.drawPixel(centerX, centerY, colors.BLACK);
    let x = radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
      // Desenha os pontos simétricos em todas as oito partes do círculo

        drawer.drawPixel(centerX + x, centerY + y, colors.RED); // Octante 1
        drawer.drawPixel(centerX + y, centerY + x, colors.RED); // Octante 2
        drawer.drawPixel(centerX - y, centerY + x, colors.RED); // Octante 3
        drawer.drawPixel(centerX - x, centerY + y, colors.RED); // Octante 4
        drawer.drawPixel(centerX - x, centerY - y, colors.RED); // Octante 5
        drawer.drawPixel(centerX - y, centerY - x, colors.RED); // Octante 6
        drawer.drawPixel(centerX + y, centerY - x, colors.RED); // Octante 7
        drawer.drawPixel(centerX + x, centerY - y, colors.RED); // Octante 8

        y++;

        if (radiusError < 0) {
            radiusError += 2 * y + 1;
        } else {
            x--;
            radiusError += 2 * (y - x + 1);
        }
    }
}
function circle(centerX, centerY, radius) {
  drawPixel(centerX, centerY, colors.BLACK);
  let x = radius;
  let y = 0;
  let radiusError = 1 - x;

  while (x >= y) {
  // Desenha os pontos simétricos em todas as oito partes do círculo

  drawPixel(centerX + x, centerY + y, colors.RED); // Octante 1
  drawPixel(centerX + y, centerY + x, colors.RED); // Octante 2
  drawPixel(centerX - y, centerY + x, colors.RED); // Octante 3
  drawPixel(centerX - x, centerY + y, colors.RED); // Octante 4
  drawPixel(centerX - x, centerY - y, colors.RED); // Octante 5
  drawPixel(centerX - y, centerY - x, colors.RED); // Octante 6
  drawPixel(centerX + y, centerY - x, colors.RED); // Octante 7
  drawPixel(centerX + x, centerY - y, colors.RED); // Octante 8

  y++;

  if (radiusError < 0) {
      radiusError += 2 * y + 1;
  } else {
      x--;
      radiusError += 2 * (y - x + 1);
  }
  }
}
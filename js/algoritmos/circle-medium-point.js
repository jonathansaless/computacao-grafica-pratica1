function drawCircle(centerX, centerY, radius) {
    let x = radius;
    let y = 0;
    let radiusError = 1 - x;
  
    while (x >= y) {
      // Desenha os pontos simétricos em todas as oito partes do círculo
  
      drawPixel(centerX + x, centerY + y); // Octante 1
      drawPixel(centerX + y, centerY + x); // Octante 2
      drawPixel(centerX - y, centerY + x); // Octante 3
      drawPixel(centerX - x, centerY + y); // Octante 4
      drawPixel(centerX - x, centerY - y); // Octante 5
      drawPixel(centerX - y, centerY - x); // Octante 6
      drawPixel(centerX + y, centerY - x); // Octante 7
      drawPixel(centerX + x, centerY - y); // Octante 8
  
      y++;
  
      if (radiusError < 0) {
        radiusError += 2 * y + 1;
      } else {
        x--;
        radiusError += 2 * (y - x + 1);
      }
    }
  }
  
  // Função para desenhar um pixel (substitua com sua lógica de desenho específica)
  function drawPixel(x, y) {
    console.log(`Desenhar pixel em (${x}, ${y})`);
  }
  
  // Exemplo de uso
  drawCircle(100, 100, 50);
  
function drawPixel(cellX, cellY) {
    // Pega o ID do pixel
    const cellId = `${cellX}_${cellY}`;
    const cellElement = document.getElementById(cellId);
    
    // 
    cellElement.style.backgroundColor = colorInput.value;
    console.log(cellElement, cellId, cellX, cellY);
}
  
// Algoritmo de bresenham
function bresenhamLine(x0, y0, x1, y1) {
    // Calcula as diferenças absolutas nas coordenadas x e y
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
  
    // Determina a direção do incremento em x e y
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
  
    // Calcula o erro inicial
    let err = dx - dy;
  
    // Loop principal do algoritmo de Bresenham
    while (x0 !== x1 || y0 !== y1) {
      // Desenha o pixel atual
      drawPixel(x0, y0);
  
      // Calcula o dobro do erro
      const err2 = 2 * err;
  
      // Verifica se o erro é maior que -dy e atualiza x0 se for
      if (err2 > -dy) {
        err -= dy;
        x0 += sx;
      }
  
      // Verifica se o erro é menor que dx e atualiza y0 se for
      if (err2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  
    // Desenha o último pixel da linha
    drawPixel(x1, y1);
}
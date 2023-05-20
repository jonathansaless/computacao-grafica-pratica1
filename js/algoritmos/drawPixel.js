export function drawPixel(cellX, cellY, pixelColor) {
    const cellId = `${cellX}_${cellY}`;
    const cellElement = document.getElementById(cellId);
    cellElement.style.backgroundColor = pixelColor;
}
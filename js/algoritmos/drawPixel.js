export function drawPixel(cellX, cellY, pixelColor) {
    const cellId = `${cellX}_${cellY}`;
    console.log(cellId);
    const cellElement = document.getElementById(cellId);
    cellElement.style.backgroundColor = pixelColor;
    cellElement.classList.add('painted');
}
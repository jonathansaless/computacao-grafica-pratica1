import { drawPixel } from "../drawPixel.js";

export function drawCurve(startX, startY, endX, endY, controlPoints, color) {
    const points = [
        { x: startX, y: startY },
        ...controlPoints,
        { x: endX, y: endY }
    ];
    
    const segments = 100;
    const tDelta = 1 / segments;

    for (let t = 0; t <= 1; t += tDelta) {
        let p = points;
        let pTemp;

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

        const pFinal = p[0];
        drawPixel(Math.round(pFinal.x), Math.round(pFinal.y), color);
    }
}

function interpolate(p0, p1, t) {
    const x = p0.x + (p1.x - p0.x) * t;
    const y = p0.y + (p1.y - p0.y) * t;
    return { x, y };
}

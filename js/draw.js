import { bresenhamLine } from "./algoritmos/line-bresenham.js";
import { circle } from "./algoritmos/circle-midpoint.js";
import { drawBezierCurve } from "./algoritmos/curve-bezier.js";
import { drawPolyline } from "./algoritmos/polyline.js";
import { floodFill } from "./algoritmos/floodFill.js";
import { scanlineFillWithCriticalPoints } from "./algoritmos/scanline-withcriticalpoints.js";
import { cohenSutherlandClip } from "./algoritmos/clipLine.js";
import { clipPolygon } from "./algoritmos/clipPolyline.js";
import { rotatePolygon } from "./algoritmos/transformations/rotation.js";
import { scalePolygon } from "./algoritmos/transformations/scale.js";
import { translatePolygon } from "./algoritmos/transformations/translation.js";
import { orthographicProjection } from "./algoritmos/projections/orthogonal.js";
import { perspectiveProjection, projectPolygon } from "./algoritmos/projections/perspective.js";

export function drawAlgoritmo() {
    /* Desenha */
    const inputContainer = document.querySelector('.input-container');
    var buttonSelected = document.querySelector('.selected');
  
    switch (buttonSelected.innerText) {
      case 'Linha':
        var pontoInicial = inputContainer.querySelector('#ponto-inicial');
        var pontoInicialX = parseInt(pontoInicial.querySelector('input[placeholder="x"]').value);
        var pontoInicialY = parseInt(pontoInicial.querySelector('input[placeholder="y"]').value);
  
        var pontoFinal = inputContainer.querySelector('#ponto-final');
        var pontoFinalX = parseInt(pontoFinal.querySelector('input[placeholder="x"]').value);
        var pontoFinalY = parseInt(pontoFinal.querySelector('input[placeholder="y"]').value);
  
        bresenhamLine(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY);
        break;
    
      case 'Círculo':
        var pontoCentral = inputContainer.querySelector('#ponto-central');
        var pontoCentralX = parseInt(pontoCentral.querySelector('input[placeholder="x"]').value);
        var pontoCentralY = parseInt(pontoCentral.querySelector('input[placeholder="y"]').value);
  
        var raio = inputContainer.querySelector('#raio');
        var raioValue = parseInt(raio.querySelector('input').value);

        circle(pontoCentralX, pontoCentralY, raioValue);
        break;
  
      case 'Curva':
        var pontoInicial = inputContainer.querySelector('#ponto-inicial');
        var pontoInicialX = parseInt(pontoInicial.querySelector('input[placeholder="x"]').value);
        var pontoInicialY = parseInt(pontoInicial.querySelector('input[placeholder="y"]').value);
  
        var pontoFinal = inputContainer.querySelector('#ponto-final');
        var pontoFinalX = parseInt(pontoFinal.querySelector('input[placeholder="x"]').value);
        var pontoFinalY = parseInt(pontoFinal.querySelector('input[placeholder="y"]').value);
  
        drawBezierCurve(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY);
        break;
  
      default:
        console.log('Nenhuma opção selecionada!');
    }
  }
  
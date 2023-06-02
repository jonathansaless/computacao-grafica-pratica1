import { bresenhamLine } from "./algorithms/drawLine.js";
import { circle } from "./algorithms/drawCircle.js";
import { drawBezierCurve } from "./algorithms/drawCurve.js";
import { drawPolyline } from "./algorithms/polyline.js";
import { floodFill } from "./algorithms/floodFill.js";
import { scanlineFillWithCriticalPoints }  from "./algorithms/scanline-withcriticalpoints.js";
import { cohenSutherlandClip } from "./algorithms/clipLine.js";
import { clipPolygon } from "./algorithms/clipPolyline.js";
import { rotatePolygon } from "./algorithms/transformations/rotation.js";
import { scalePolygon } from "./algorithms/transformations/scale.js";
import { translatePolygon } from "./algorithms/transformations/translation.js";
import { orthographicProjection } from "./algorithms/projections/orthographic.js";
// import { perspectiveProjection, projectPolygon } from "./algoritmos/projections/perspective.js";
import { controlPoints, polilynePoints } from "./events.js";
import { cube, cube2, cube3, historyPoints, historyVertices } from "./algorithms/constants/variables.js";
import * as colors from "./algorithms/constants/colors.js";
import { addContPolygon } from "./algorithms/constants/variables.js";
import { perspectiveProjectionOne, perspectiveProjectionThree, perspectiveProjectionTwo } from "./algorithms/projections/perspective.js";


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

            /* se algum valor estiver vazio, para*/
            if(isNaN(pontoInicialX)|| isNaN(pontoInicialY) || isNaN(pontoFinalX) || isNaN(pontoFinalY)){
                console.log('Algum valor está vazio, favor digite um valor em todos os inputs');
                break;
            }

            bresenhamLine(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, colors.RED);
            break;
        
        case 'Círculo':
            var pontoCentral = inputContainer.querySelector('#ponto-central');
            var pontoCentralX = parseInt(pontoCentral.querySelector('input[placeholder="x"]').value);
            var pontoCentralY = parseInt(pontoCentral.querySelector('input[placeholder="y"]').value);
    
            var raio = inputContainer.querySelector('#raio');
            var raioValue = parseInt(raio.querySelector('input').value);

            if(isNaN(pontoCentralX)|| isNaN(pontoCentralY) || isNaN(raioValue)){
                console.log('Algum valor está vazio, favor digite um valor em todos os inputs');
                break;
            }
            circle(pontoCentralX, pontoCentralY, raioValue);
            break;
    
        case 'Curva':
            var pontoInicial = inputContainer.querySelector('#ponto-inicial');
            var pontoInicialX = parseInt(pontoInicial.querySelector('input[placeholder="x"]').value);
            var pontoInicialY = parseInt(pontoInicial.querySelector('input[placeholder="y"]').value);
    
            var pontoFinal = inputContainer.querySelector('#ponto-final');
            var pontoFinalX = parseInt(pontoFinal.querySelector('input[placeholder="x"]').value);
            var pontoFinalY = parseInt(pontoFinal.querySelector('input[placeholder="y"]').value);
    
            if(isNaN(pontoInicialX)|| isNaN(pontoInicialY) || isNaN(pontoFinalX) || isNaN(pontoFinalY) || controlPoints.length === 0){
                console.log('Algum valor está vazio, favor digite um valor em todos os inputs');
                break;
            }
            bresenhamLine(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, colors.BLUE);
            drawBezierCurve(pontoInicialX, pontoInicialY, pontoFinalX, pontoFinalY, controlPoints);
            break;
        
        case 'Polígono':
            if(polilynePoints.length < 3){
                alert('Favor informar no mínimo 3 pontos!');
                break;
            }
            console.log(polilynePoints);
            drawPolyline(polilynePoints, colors.RED);
            // soma +1 no contador de poligonos
            addContPolygon();

            break;
        
        case 'Preenchimento Recursivo':
            var pontoPreenchimento = inputContainer.querySelector('#ponto-preenchimento');
            var pontoX = parseInt(pontoPreenchimento.querySelector('input[placeholder="x"]').value);
            var pontoY = parseInt(pontoPreenchimento.querySelector('input[placeholder="y"]').value);
    
            if(isNaN(pontoX)|| isNaN(pontoY)){
                alert('Favor, preencha todos os inputs!');
                break;
            }

            floodFill(pontoX, pontoY);
            break;
        
        case 'Varredura':
            var pontoVarredura = inputContainer.querySelector('#ponto-varredura');
            var buttonSelected = pontoVarredura.querySelector('.draw-button.selected');
            
            var buttonID = buttonSelected.id; // formato: varredura-poligono-N
            var number = parseInt(buttonID.split("-")[2]); // queremos apenas o número no final
            console.log(number);

            var verticesScanline = [];

            for (var i = 0; i < historyVertices.length; i++) {
                if (historyVertices[i].polID === number) {
                    verticesScanline.push({ x: historyVertices[i].x, y: historyVertices[i].y });
                }
              }
            // for para criar pegar os vertices apenas do poligono com id do botão
            
            scanlineFillWithCriticalPoints(verticesScanline);
            
            break;        
        
        case 'Rotação':
            
            var anguloRotacao = inputContainer.querySelector('#angulo-rotacao');
            var anguloValue = parseInt(anguloRotacao.querySelector('input').value);

            var pontoPivo = inputContainer.querySelector('#ponto-pivo');
            var pontoX = parseInt(pontoPivo.querySelector('input[placeholder="x"]').value);
            var pontoY = parseInt(pontoPivo.querySelector('input[placeholder="y"]').value);
            var pivo = { x: pontoX, y: pontoY};

            var rotacao = inputContainer.querySelector('#rotacao');
            
            var buttonSelected = rotacao.querySelector('.draw-button.selected');
            
            var buttonID = buttonSelected.id; // formato: rotacao-poligono-N
            var number = parseInt(buttonID.split("-")[2]); // queremos apenas o número no final
            console.log(number);

            var polygon = [];

            for (var i = 0; i < historyPoints.length; i++) {
                if (historyPoints[i].polID === number) {
                    polygon.push({ x: historyPoints[i].x, y: historyPoints[i].y });
                }
              }
            // for para criar pegar os vertices apenas do poligono com id do botão
            // necessita apenas do poligono

            rotatePolygon(polygon, anguloValue, pivo);
            break;
        
        case 'Translação':  
            
            var pontoDeslocamento = inputContainer.querySelector('#ponto-deslocamento');
            var pontoX = parseInt(pontoDeslocamento.querySelector('input[placeholder="x"]').value);
            var pontoY = parseInt(pontoDeslocamento.querySelector('input[placeholder="y"]').value);

            var translacao = inputContainer.querySelector('#translacao');
            
            var buttonSelected = translacao.querySelector('.draw-button.selected');
            
            var buttonID = buttonSelected.id; // formato: translacao-poligono-N
            var number = parseInt(buttonID.split("-")[2]); // queremos apenas o número no final
            console.log(number);

            var polygon = [];

            for (var i = 0; i < historyPoints.length; i++) {
                if (historyPoints[i].polID === number) {
                    polygon.push({ x: historyPoints[i].x, y: historyPoints[i].y });
                }
            }

            translatePolygon(polygon, pontoX, pontoY);
            break;  
            
        case 'Escala':

            var fatorEscala = inputContainer.querySelector('#fator-escala');
            var escalaX = parseFloat(fatorEscala.querySelector('input[placeholder="x"]').value);
            var escalaY = parseFloat(fatorEscala.querySelector('input[placeholder="y"]').value);
            
            var pontoFixo = inputContainer.querySelector('#ponto-fixo');
            var pontoX = parseInt(pontoFixo.querySelector('input[placeholder="x"]').value);
            var pontoY = parseInt(pontoFixo.querySelector('input[placeholder="y"]').value);
            var pontoFixoValues = { x: pontoX, y: pontoY};

            var escala = inputContainer.querySelector('#escala');
            
            var buttonSelected = escala.querySelector('.draw-button.selected');
            
            var buttonID = buttonSelected.id; // formato: translacao-poligono-N
            var number = parseInt(buttonID.split("-")[2]); // queremos apenas o número no final

            var polygon = [];

            for (var i = 0; i < historyPoints.length; i++) {
                if (historyPoints[i].polID === number) {
                    polygon.push({ x: historyPoints[i].x, y: historyPoints[i].y });
                }
            }

            scalePolygon(polygon, escalaX, escalaY, pontoFixoValues);
            break;
        
        case 'Projeção Ortogonal':
            var ortografico = inputContainer.querySelector('#orthographic');
            var buttonSelected = ortografico.querySelector('.draw-button.selected');
            
            var buttonID = buttonSelected.id;

            if(buttonID == 'cube-0'){
                var cubo = cube;
            }
            else if(buttonID == 'cube-1'){
                var cubo = cube2;
            }
            else if(buttonID == 'cube-2'){
                var cubo = cube3;
            }
            
            orthographicProjection(cubo);
            break;

        case 'Projeção Perspectiva':
            var perspectiva = inputContainer.querySelector('#perspective');
            var cubeSelected = perspectiva.querySelector('.cubes.selected');
            var fugaSelected = perspectiva.querySelector('.pontos-fugas.selected');

            var cubeID = cubeSelected.id;
            var fugaID = fugaSelected.id;
            
            if(cubeID == 'cube-0'){
                var cubo = cube;
            }
            else if(cubeID == 'cube-1'){
                var cubo = cube2;
            }
            else if(cubeID == 'cube-2'){
                var cubo = cube3;
            }
            // falta implementar
            if(fugaID == 'ponto-fuga-0'){
                perspectiveProjectionOne(cubo);
            }
            else if(fugaID == 'ponto-fuga-1'){
                perspectiveProjectionTwo(cubo);
            }
            else if(fugaID == 'ponto-fuga-2'){
                perspectiveProjectionThree(cubo);
            }
            // perspectiveProjectionTwo(cubo);
            // perspectiveProjectionThree(cubo);
            break;

        default:
            alert('Nenhuma opção selecionada!');
    }
}
  
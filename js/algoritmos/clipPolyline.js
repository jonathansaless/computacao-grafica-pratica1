import * as history from "./historyPoints.js";
import { drawPixel } from "./drawPixel.js";
import { drawPolyline } from "./polyline.js";
import * as colors from "../colors.js";

// Função que retorna o valor x da interseção de duas linhas
function x_intersect(p1, p2, p3, p4) {
  const num = (p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x);
  const den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
  return num / den;
}

// Função que retorna o valor y da interseção de duas linhas
function y_intersect(p1, p2, p3, p4) {
  const num = (p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x);
  const den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
  return num / den;
}

// Função que faz o recorte de um polígono em relação a uma aresta do clipper
function clip(poly_points, x0, y0, x1, y1) {
  const new_points = []; // Array para armazenar os novos pontos após o recorte

  for (let i = 0; i < poly_points.length; i++) {
    const k = (i + 1) % poly_points.length; // Próximo ponto no polígono
    const p1 = poly_points[i];
    const p2 = poly_points[k];
    
    // Calcula a posição dos pontos em relação à aresta do clipper
    const p1_pos = (x1 - x0) * (p1.y - y0) - (y1 - y0) * (p1.x - x0);
    const p2_pos = (x1 - x0) * (p2.y - y0) - (y1 - y0) * (p2.x - x0);

    // Caso 1: Ambos os pontos estão dentro do clipper
    if (p1_pos < 0 && p2_pos < 0) {
      // console.log('if1', p2);
      // Adiciona apenas o segundo ponto
      new_points.push(p2);
    }
    // Caso 2: Apenas o primeiro ponto está fora do clipper
    else if (p1_pos >= 0 && p2_pos < 0) {
      // Adiciona o ponto de interseção e o segundo ponto
      const new_x = x_intersect(p1, p2, { x: x0, y: y0 }, { x: x1, y: y1 });
      const new_y = y_intersect(p1, p2, { x: x0, y: y0 }, { x: x1, y: y1 });
      new_points.push({ x: new_x, y: new_y });
      new_points.push(p2);
    }
    // Caso 3: Apenas o segundo ponto está fora do clipper
    else if (p1_pos < 0 && p2_pos >= 0) {
      // Adiciona apenas o ponto de interseção
      const new_x = x_intersect(p1, p2, { x: x0, y: y0 }, { x: x1, y: y1 });
      const new_y = y_intersect(p1, p2, { x: x0, y: y0 }, { x: x1, y: y1 });
      new_points.push({ x: new_x, y: new_y });
    }
    // Caso 4: Ambos os pontos estão fora do clipper (não adiciona nenhum ponto)
  }

  return new_points;
}

// Função que implementa o algoritmo Sutherland-Hodgman para recorte de polígonos
export function suthHodgClip(poly_points, clipper_points) {
  for (let i = 0; i < clipper_points.length; i++) {
    const k = (i + 1) % clipper_points.length;
    // Realiza o recorte em relação a cada aresta do clipper
    poly_points = clip(poly_points, clipper_points[i].x, clipper_points[i].y, clipper_points[k].x, clipper_points[k].y);
  }
  const points = [];
  // Imprime os vértices do polígono recortado
  for (let i = 0; i < poly_points.length; i++) {
    points.push({ x: Math.round(poly_points[i].x), y: Math.round(poly_points[i].y)});
    
    // drawPixel(Math.round(poly_points[i].x), Math.round(poly_points[i].y), colors.BLACK);
    console.log(`(${Math.round(poly_points[i].x)}, ${Math.round(poly_points[i].y)})`);
  }
  console.log(points);
  drawPolyline(points);
}
/*
// Definindo os vértices do polígono
const poly_points = [
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 8, y: 5 },
  { x: 8, y: 6 },
  { x: 8, y: 7 },
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 9 },
  { x: 4, y: 9 },
  { x: 4, y: 8 },
  { x: 4, y: 7 },
  { x: 4, y: 6 },
  { x: 4, y: 5 },
  { x: 4, y: 4 }
  
];

// Definindo os vértices da área de desenho
const clipper_points = [
  { x: 0, y: 0 },
  { x: 0, y: 24 },
  { x: 24, y: 24 },
  { x: 24, y: 0 }
];

// Chamando a função de recorte
suthHodgClip(poly_points, clipper_points);
*/
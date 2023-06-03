import { drawClipLine } from "../drawings/drawLine.js";
import { PROJECTION_MATRIX_XY } from "./orthographic.js";
import { multiplyMatrices, divideLista, multiplyMatrixAndVector } from "../features/operations.js";
import { convertListToInt } from "../features/convertions.js";
import * as colors from "../constants/colors.js";

const FOCAL_DISTANCE = 20;

export function perspectiveProjectionOne(cube){ 
  // Um ponto de fuga
  const PROJECTION_MATRIX_XY_one = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              0,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    // Aplica a projeção perspectiva no cubo
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_one, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_one, cube[i+1]);
    // Converte as coordenadas homogêneas para coordenadas 2D
    point = convertListToInt(divideLista(point, point[3])); // É necessário dividir todos os valores da linha pelo último valor
    nextPoint = convertListToInt(divideLista(nextPoint, nextPoint[3]));

    // Desenha uma linha entre os pontos projetados na cor vermelha
    drawClipLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

export function perspectiveProjectionTwo(cube){ 
  // Dois pontos de fuga
  const PROJECTION_MATRIX_XY_two = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              1,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_two, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_two, cube[i+1]);
    
    point = convertListToInt(divideLista(point, point[3]));
    nextPoint = convertListToInt(divideLista(nextPoint, nextPoint[3]));

    drawClipLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

export function perspectiveProjectionThree(cube){ 
  // Três pontos de fuga
  const PROJECTION_MATRIX_XY_three = multiplyMatrices(PROJECTION_MATRIX_XY, ([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [1,              1,              1,              FOCAL_DISTANCE]
  ]));

  for(var i = 0; i < cube.length - 1; i++){
    var point = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_three, cube[i]);
    var nextPoint = multiplyMatrixAndVector(PROJECTION_MATRIX_XY_three, cube[i+1]);
    
    point = convertListToInt(divideLista(point, point[3]));
    nextPoint = convertListToInt(divideLista(nextPoint, nextPoint[3]));

    drawClipLine(point[0], point[1], nextPoint[0], nextPoint[1], colors.RED);
  }
}

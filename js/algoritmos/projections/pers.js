/* THREE DIMENSIONAL */

function project(tool, initialCoordinates, threeDimensionalCube, rotationMatrix) {
    temporaryCube = math.multiply(rotationMatrix, threeDimensionalCube);

    if (tool === "projection") twoDimensionalCube = temporaryCube;
    else if (tool === "perspective") {
        twoDimensionalCube = math.divide(math.column(temporaryCube, 0), temporaryCube.get([3, 0]));

        for (let i = 1; i < math.size(temporaryCube)._data[1]; i++) twoDimensionalCube = math.concat(
            twoDimensionalCube,
            math.divide(math.column(temporaryCube, i), temporaryCube.get([3, i])),
            1
        )
    }

    twoDimensionalCube = math.concat(math.row(twoDimensionalCube, 0), math.row(twoDimensionalCube, 1), 0);
    twoDimensionalCube = math.transpose(math.round(twoDimensionalCube));
    twoDimensionalCube = math.concat(
        math.add(math.column(twoDimensionalCube, 0), initialCoordinates[0]),
        math.add(math.column(twoDimensionalCube, 1), initialCoordinates[1]),
        1
    );
    twoDimensionalCube = twoDimensionalCube._data;

    return twoDimensionalCube;
}

function draw(twoDimensionalCube) {
    console.log(twoDimensionalCube[0], twoDimensionalCube[1]); // AB
    console.log(twoDimensionalCube[0], twoDimensionalCube[2]); // AC
    console.log(twoDimensionalCube[0], twoDimensionalCube[4]); // AE

    console.log(twoDimensionalCube[1], twoDimensionalCube[3]); // BD
    console.log(twoDimensionalCube[1], twoDimensionalCube[5]); // BF

    console.log(twoDimensionalCube[2], twoDimensionalCube[3]); // CD
    console.log(twoDimensionalCube[2], twoDimensionalCube[6]); // CG

    console.log(twoDimensionalCube[3], twoDimensionalCube[7]); // DH

    console.log(twoDimensionalCube[4], twoDimensionalCube[5]); // EF
    console.log(twoDimensionalCube[4], twoDimensionalCube[6]); // EG

    console.log(twoDimensionalCube[5], twoDimensionalCube[7]); // FH

    console.log(twoDimensionalCube[6], twoDimensionalCube[7]); // GH
}


/* ORTOGRAFICH */
export var ROTATION_MATRIX = math.matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1]
])


/* PERSPECTIVE */
import * as ThreeDimensional from "../ThreeDimensional.js";


export function initialize() {

    $("#one-point-link").click(function() { ThreeDimensional.initialize("perspective", "one-point"); });
    $("#two-point-link").click(function() { ThreeDimensional.initialize("perspective", "two-point"); });
    $("#three-point-link").click(function() { ThreeDimensional.initialize("perspective", "three-point"); });
}



/* ONE POINT */
import * as Orthographic from "../../projection/types/Orthographic.js";

var FOCAL_DISTANCE = 100;
export var ROTATION_MATRIX = math.multiply(Orthographic.ROTATION_MATRIX, math.matrix([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              0,              1,              FOCAL_DISTANCE]
]));


/* TWO POINTS */
import * as Orthographic from "../../projection/types/Orthographic.js";

var FOCAL_DISTANCE = 100;
export var ROTATION_MATRIX = math.multiply(Orthographic.ROTATION_MATRIX, math.matrix([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [0,              1,              1,              FOCAL_DISTANCE]
]));

/* THREE POINTS */
import * as Orthographic from "../../projection/types/Orthographic.js";

var FOCAL_DISTANCE = 10;
export var ROTATION_MATRIX = math.multiply(Orthographic.ROTATION_MATRIX, math.matrix([
    [FOCAL_DISTANCE, 0,              0,              0             ],
    [0,              FOCAL_DISTANCE, 0,              0             ],
    [0,              0,              FOCAL_DISTANCE, 0             ],
    [1,              1,              1,              FOCAL_DISTANCE]
]));
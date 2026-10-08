/**
 * Perlin Colors
 * Nicholas Roy
 * 
 */

"use strict";


const CANVAS = {
    x: 800, 
    y: 800,
};
let colorIndices;
let noiseMap = generateArray(CANVAS.x,CANVAS.y);
let colorMap = generateArray(CANVAS.x,CANVAS.y);
//NOISE VARS
const RESOLUTION = 0.009; //ideal @ 0.018
let noiseOffsetX = 0;
let noiseOffsetY = 0;

//OCTAVES, PERSISTANCE, LACUNARITY

//generate noise map
//assign colors to a color map
//when moving to new chunk, reroll noise map with offset



function setup() {
    //ANALOGOUS
    // colorIndices = new Map([
    //     [0.25, "#0e003c"],
    //     [0.35, "#000061"],
    //     [0.5, "#3675bc"],
    //     [0.6, "#ed8bf1"],
    //     [0.7, "#e4123f"],
    //     [0.8, "#5a052b"],
    //     [1, "#32003b"]
    // ]);

    //MONOCHROME BLUE
    // colorIndices = new Map([
    //     [0.3, "#0e003c"],
    //     [0.45, "#000061"],
    //     [0.6, "#3675bc"],
    //     [0.7, "#a7daeb"],
    //     [1, "#e6ffff"],
    // ]);

    //MONOCHROME RED
    // colorIndices = new Map([
    //     [0.3,"#2f0002"],
    //     [0.4,"#360608"],
    //     [0.5,"#610215"],
    //     [0.55,"#b00023"],
    //     [0.6,"#d62041"],
    //     [0.65,"#ff9cae"],
    //     [0.7,"#d62041"],
    //     [0.75,"#b00023"],
    //     [0.85,"#610215"],
    //     [0.95,"#2f0002"],
    //     [1,"#0a0000"],
    // ]);

    //COMPLIMENTARY
    // colorIndices = new Map([
    //     [0.3,"#031d09"],
    //     [0.4,"#093f00"],
    //     [0.5,"#4d8343"],
    //     [0.6,"#8b0707"],
    //     [0.7,"#c40000"],
    //     [1,"#d60101"],
    // ]);

    //COMPLIMENTARY UNSATURATED
    // colorIndices = new Map([
    //     [0.3,"#0e1d12"],
    //     [0.4,"#223d1d"],
    //     [0.5,"#4d8343"],
    //     [0.6,"#8b0707"],
    //     [0.7,"#c40000"],
    //     [1,"#d60101"],
    // ]);

    //SPLIT COMPLIMENTARY?????
    // colorIndices = new Map([
    //     [0.3,"#251846"],
    //     [0.35,"#066a9d"],
    //     [0.45,"#db8300"],
    //     [0.6,"#eacc1e"],
    //     [0.7,"#64ff61"],
    //     [1,"#b4fa63"],
    // ]);

    //DOUBLE COMPLIMENTARY
    // colorIndices = new Map([
    //     [0.35,"#43077b"],
    //     [0.45,"#874a00"],
    //     [0.6,"#e8df67"],
    //     [1,"#b1f2ff"],
    // ]);

    colorIndices = new Map([
        [0.35,"#7304dc"],
        [0.45,"#ff8c00"],
        [0.6,"#fff700"],
        [1,"#00d5ff"],
    ]);


    //TRIAD COLOR JUXTAPOSITION
    // colorIndices = new Map([
    //     [0.3,"#251846"],
    //     [0.45,"#1840a6"],
    //     [0.5,"#920606"],
    //     [0.55,"#d62828"],
    //     [0.6,"#fce80c"],
    //     [1,"#fff480"],
    // ]);






    noiseSeed();

    createCanvas(CANVAS.x,CANVAS.y); 
    generateNoiseMap();
    // generateMonoColorMap();
    generateTerrainColorMap();
    drawArrayToCanvasRect(colorMap)



    console.log("noiseMap",noiseMap);
    console.log("colorMap",colorMap);
}


function draw() {
    
    //updateScreen();
}


function updateTerrain() {
    
    console.log("updated Screen");
}


function generateNoiseMap() {
    //top to bottom
    for (let y = 0; y < CANVAS.y; y++) {
        //left to right
        for (let x = 0; x < CANVAS.x; x++) {
            noiseMap[x][y] = noise((x+noiseOffsetX)*RESOLUTION,(y+noiseOffsetY)*RESOLUTION);
        }
    }
}

function generateMonoColorMap() {
    if (!noiseMap) {
        console.error("generateMonoColorMap: noiseMap DNE")
        return;
    }
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue = lerp(0,255,noiseValue);
            colorMap[x][y] = colorValue;
        }
    }
}


function generateTerrainColorMap() {
    if (!noiseMap) {
        console.error("generateTerrainColorMap: noiseMap DNE");
        return;
    }
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue;
            for (const [threshold,color] of colorIndices) {
                if (noiseValue < threshold) {
                    colorValue = color;
                    break;
                }  
            }
            colorMap[x][y] = colorValue;
        }
    }
}


//! point mode not working
//TODON custom cell size
function drawArrayToCanvasRect(arr,mode) {
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            if (!mode || mode == "rect") {
                push();
                noStroke();
                fill(arr[x][y]);
                // fill(200,0,0);
                rect(x,y,1,1);
                pop();
            } else if (mode == "point") {
                push();
                strokeWeight(1);
                stroke(arr[x][y]);
                point(x,y);
                pop();
            } else {
                console.error("drawArrayToCanvas: mode case error");
            }
        }
    }
}


//NUTIL
function generateArray(lengthX,lengthY) {
    let array = new Array(lengthX);
    for (let x = 0; x < lengthX; x++) {
        array[x] = new Array(lengthY);
    }

    return array;
}
/**
 * Title of Project
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";


const CANVAS = {
    x: 600, 
    y: 400,
};
let colorIndices;
let noiseMap = generateArray(CANVAS.x,CANVAS.y);
let colorMap = generateArray(CANVAS.x,CANVAS.y);
//NOISE VARS
const RESOLUTION = 0.01;
let noiseOffsetX = 2;
let noiseOffsetY = 0;

//OCTAVES, PERSISTANCE, LACUNARITY

//generate noise map
//assign colors to a color map
//when moving to new chunk, reroll noise map with offset



function setup() {
    colorIndices = { //lowest altitude to highest
        0.2: color(42, 24, 133),
        0.4: color(100, 109, 242),
        0.6: color(91, 207, 64),
        0.8: color(52, 133, 33),
    };
    noiseSeed(1);

    createCanvas(CANVAS.x,CANVAS.y); 
    generateNoiseMap();
    generateMonoColorMap();
    drawArrayToCanvas(colorMap)



    console.log("noiseMap",noiseMap);
    console.log("colorMap",colorMap);
}


function draw() {
    
    //updateScreen();
}


function updateTerrain() {
    generateNoiseMap();
    generateMonoColorMap();
    drawArrayToCanvas(colorMap);
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
        console.error("generateTerrainColorMap: noiseMap DNE")
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


//! USE POINT(x,y)
//TODON custom cell size
function drawArrayToCanvas(arr) {
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            push();
            noStroke();
            fill(arr[x][y]);
            // fill(200,0,0);
            
            rect(x,y,1,1);
            pop();
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
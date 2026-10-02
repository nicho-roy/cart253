/**
 * Title of Project
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";


const CANVAS = {
    x: 1300,
    y: 700,
};
let colorIndices;
let noiseMap = generateArray(CANVAS.x,CANVAS.y);
let colorMap = generateArray(CANVAS.x,CANVAS.y);


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

    createCanvas(CANVAS.x,CANVAS.y); 
    generateNoiseMap();
    console.log("pre generate color map");
    generateColorMap();
    console.log("post generate color map");
    //TODON draw to canvas not working, and remove prints
    drawArrayToCanvas(colorMap)
    console.log("noiseMap",noiseMap);
    console.log("colorMap",colorMap);
}


function draw() {
    background(200);
    
}


function generateNoiseMap() {
    //top to bottom
    for (let y = 0; y < CANVAS.y; y++) {
        //left to right
        for (let x = 0; x < CANVAS.x; x++) {
            noiseMap[x][y] = noise(random(1));
        }
    }
}

function generateColorMap() {
    console.log("IN genereColorMap");
    if (!noiseMap) {
        console.log("error");
        console.error("generateColorMap: noiseMap DNE")
        return;
    }
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue = lerp(0,255,noiseValue);
            colorMap[x][y] = colorValue;
            console.log("lerp",colorMap[x][y]);
        }
    }
}


function drawArrayToCanvas(arr) {
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            fill(arr[x][y]);
            //TODON custom cell size
            rect(x,y,1,1);
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
    // for (let y = 0; y < lengthY; y++) {
    //     for (let x = 0; x < lengthX; x++) {
    //         array[x] = new Array(lengthY);
    //     }
    // }
}
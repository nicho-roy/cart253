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
const COLOR_INDICES = { //lowest altitude to highest
    0.2: color(42, 24, 133),
    0.4: color(100, 109, 242),
    0.6: color(91, 207, 64),
    0.8: color(52, 133, 33),
}

let noiseMap = [CANVAS.x][CANVAS.y];
let colorMap = [CANVAS.x][CANVAS.y];


//OCTAVES, PERSISTANCE, LACUNARITY

//generate noise map
//assign colors to a color map
//when moving to new chunk, reroll noise map with offset



function setup() {
    createCanvas(canvas.x,canvas.y);
}


function draw() {
    background(200);
}


function generateNoiseMap() {
    //top to bottom
    for (let y = 0; y < CANVAS.y; y++) {
        //left to right
        for (let x = 0; x < CANVAS.x; x++) {


            
        }
    }
}

function generateColorMap() {

}
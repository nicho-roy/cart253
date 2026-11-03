/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

const CANVAS = {
    x: 1920,
    y: 1080
}







async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);


    
}


function draw() {
    background(240);




    drawAll();
}





//GRAPHICS
function drawAll() {
    drawText();

    drawJointGroups();
}


function drawText() {
    push();
    textSize(30);
    fill("#000000");
    text("Drag with mouse", 50, 50);
    pop();
}

function drawJointGroups() {

}



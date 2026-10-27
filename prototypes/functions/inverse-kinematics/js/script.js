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

let segmentArr = [];



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

    drawSegments();
}


function drawText() {
    push();
    textSize(30);
    fill("black");
    text("Click to drag", 50, 50);
    pop();
}

function drawSegments() {
    segmentArr.forEach(e => {
        e.act();
        e.draw();
    });
}



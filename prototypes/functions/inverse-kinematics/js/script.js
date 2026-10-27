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

const FILL_OFFSET_AMT = 20;




async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    generateSegments();
    
}


function draw() {
    background(240);




    drawAll();
}



function generateSegments() {
    const startX = width/2
    const startY = 200;
    let size = 200;
    let fill = 200;

    let segment = new Segment(startX, startY, size, fill);
    let segment1 = new Segment(startX, startY, size, fill);
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



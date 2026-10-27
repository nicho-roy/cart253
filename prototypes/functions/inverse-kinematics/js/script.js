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

let gravity = 1;

const SEGMENT_COUNT = 5;
const START_X = CANVAS.x / 2
const START_Y = 400;
let size = 200;
const SIZE_OFFSET = 50
let fillColor = 200;
const FILL_OFFSET = 20;




async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);
    //init gravity
    gravity = createVector(0,gravity);

    generateSegments();
    
}


function draw() {
    background(240);




    drawAll();
}



function generateSegments() {
    let previousSegment;
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        let segment = new Segment(START_X, START_Y, size, fillColor, previousSegment);
        size -= SIZE_OFFSET;
        fillColor -= FILL_OFFSET;
        previousSegment = segment;
    }
}




//GRAPHICS
function drawAll() {
    drawText();

    drawSegments();
}


function drawText() {
    push();
    textSize(30);
    fill("#000000");
    text("Click to drag", 50, 50);
    pop();
}

function drawSegments() {
    segmentArr.forEach(e => {
        e.act();
        e.draw();
    });
}



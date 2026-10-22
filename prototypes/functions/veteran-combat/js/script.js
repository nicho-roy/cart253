/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

let bgImg = "./assets/images/bg.png"


const CANVAS = {
    x: 1920,
    y: 1080,
}
let worldScale = 0.8;
let xOffset = -(CANVAS.x * worldScale) / 2;
let yOffset = -(CANVAS.y * worldScale) / 2;
let speed = 20;


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);
    bgImg = await loadImage(bgImg);
    await setupPlayer();
    
}


function draw() {
    background();
    drawBackground(player1);

    drawAll();
}

function drawBackground(obj) {
    // let inputVector = getInputVector();
    xOffset -= obj.vel.x;
    yOffset -= obj.vel.y;

    console.log(Math.trunc(xOffset));

    push();
    image(bgImg, xOffset, yOffset, width * worldScale, height * worldScale);
    pop();
}

function getInputVector() {
    let vector = createVector(0, 0);
    if (keyIsDown('w')) {
        vector.add(createVector(0, -1));
    }
    if (keyIsDown('a')) {
        vector.add(createVector(-1, 0));
    }
    if (keyIsDown('s')) {
        vector.add(createVector(0, 1));
    }
    if (keyIsDown('d')) {
        vector.add(createVector(1, 0));
    }
    vector.normalize();
    return vector;
}



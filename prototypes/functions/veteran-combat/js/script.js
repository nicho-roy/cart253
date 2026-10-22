/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

let bgImg = "./assets/images/bg.png"

let xOffset = 0;
let yOffset = 100;
let speed = 20;



async function setup() {
    angleMode(DEGREES);
    createCanvas(1920, 1080);
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
    xOffset += obj.pos.x;
    yOffset += obj.pos.y;

    push();
    image(bgImg, xOffset, yOffset, width, height);
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



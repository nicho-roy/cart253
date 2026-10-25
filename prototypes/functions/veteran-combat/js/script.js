/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

let bgImg = "./assets/images/bg.png"


let worldScale = 0.1;
let xOffset = -getChunkDimensions().x / 2;
let yOffset = -getChunkDimensions().y / 2;


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);
    bgImg = await loadImage(bgImg);
    await setupPlayer();
    setupTerrain();

    centerBackground();
    
}


function draw() {
    background();
    // background(0, 0, 100, 100);

    updatePlayerAdjcentChunks();


    drawAll();
}



function centerBackground() {
    xOffset += player1.pos.x;
    yOffset += player1.pos.y;
}




//GRAPHICS
function drawAll() {
    updatePlayerOffsetPosition(player1);
    // oldDrawBackground();
    drawBgTerrain();

    drawText();
    drawProjectiles();
    drawPlayers();
}

function updatePlayerOffsetPosition(obj) {
    xOffset -= obj.vel.x;
    yOffset -= obj.vel.y;
}


function oldDrawBackground() {
    push();
    image(bgImg, xOffset, yOffset, width * worldScale, height * worldScale);
    // image(bgImg, xOffset + (2 * getChunkDimensions().x), yOffset, width * worldScale, height * worldScale);
    pop();
}

function drawBgTerrain() {
    terrainImgArray.forEach(e => {
        e.draw(xOffset,yOffset);
    });
}

function drawText() {
    push();
    textSize(30);
    fill("white");
    let start1Origin = 50;
    let start2Horiz = width - 250;
    let start2Vert = 1000;
    let spacing = 30;

    text("Player 1", start1Origin, start1Origin);
    text("Energy: " + Math.trunc(player1.energy), start1Origin, start1Origin + spacing);
    text("Throttle: " + Math.trunc(player1.throttle), start1Origin, start1Origin + (spacing * 2));
    text("Hp: " + Math.trunc(player1.hp), start1Origin, start1Origin + (spacing * 3));
    text("Long: " + -Math.trunc(xOffset), start1Origin, start1Origin + (spacing * 4));
    text("Lat: " + -Math.trunc(yOffset), start1Origin, start1Origin + (spacing * 5));
    text("Velocity: " + Math.round(player1.vel.mag()) + " kph", start1Origin, start1Origin + (spacing * 6));

    text(player1.upKey + player1.leftKey + player1.downKey + player1.rightKey + ' to move', start1Origin, start2Vert);
    text(player1.fireKey + ' to fire', start1Origin, start2Vert + (spacing * 1));
    text('Hold ' + player1.missileLockKey + ' for missiles', start1Origin, start2Vert + (spacing * 2));

    // text("Player 2:", start2Horiz, start1Origin);
    // text("Energy: " + Math.trunc(player2.energy), start2Horiz, start1Origin + spacing);
    // text("Throttle: " + Math.trunc(player2.throttle), start2Horiz, start1Origin + (spacing * 2));
    // text("Hp: " + Math.trunc(player2.hp), start2Horiz, start1Origin + (spacing * 3));

    // text(player2.upKey + player2.leftKey + player2.downKey + player2.rightKey + ' to move', start2Horiz - 40, start2Vert);
    // text(player2.fireKey + ' to fire', start2Horiz - 40, start2Vert + (spacing * 1));
    // text('Hold ' + player2.missileLockKey + ' for missiles', start2Horiz - 40, start2Vert + (spacing * 2));

    pop();
}

function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawProjectiles() {
    projArr.forEach(e => {
        e.act();
        e.draw();
    });
}



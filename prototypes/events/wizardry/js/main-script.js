/**
 * Procedural explorer
 * Nicholas Roy
 * 
 * Prototype 3
 */

"use strict";

let player = {
    pos: 0,
    speed: 10,
    size: 100,
    fill: "red",
    chunk: {
        x: 0,
        y: 0,
    },
    image: "./assets/images/wizard.gif"
}

async function setup() {
    setupTerrain();
    player.image = await loadImage(player.image);
    
}


function draw() {
    background(0);
    // drawTerrain();

    let moveVector = getInputVector();
    moveVector.mult(player.speed);
    player.pos.add(moveVector);

    drawPlayer();

    console.log("frame");
}


//MOVEMENT
function getInputVector(){
    let vector = createVector(0,0);
    if (keyIsDown('w')) {
        vector.add(createVector(0,-1));
    }
    if (keyIsDown('a')) {
        vector.add(createVector(-1,0));
    }
    if (keyIsDown('s')) {
        vector.add(createVector(0,1));
    }
    if (keyIsDown('d')) {
        vector.add(createVector(1,0));
    }
    vector.normalize();
    return vector;
}



function checkMapBounds() {
    const rightTrigger = CANVAS.x * TRANSITION_THRESHOLD;
    const leftTrigger  = CANVAS.x * (1 - TRANSITION_THRESHOLD);
    const shiftDist = rightTrigger - leftTrigger;

    if (player.pos.x > rightTrigger) {
        noiseOffsetX += shiftDist;
        rebuildTerrain();
        player.pos.x -= shiftDist;
        player.chunk.x += 1;
    } else if (player.pos.x < leftTrigger) {
        noiseOffsetX -= shiftDist;
        rebuildTerrain();
        player.pos.x += shiftDist;
        player.chunk.x += -1;
    } else if (player.pos.y > rightTrigger) {
        noiseOffsetY += shiftDist;
        rebuildTerrain();
        player.pos.y -= shiftDist;
        player.chunk.y += 1;
    } else if (player.pos.y < leftTrigger) {
        noiseOffsetY -= shiftDist;
        rebuildTerrain();
        player.pos.y += shiftDist;
        player.chunk.y += -1;
    }
}



function drawPlayer() {
    push();
    image(player.image,player.pos.x,player.pos.y,player.size,player.size);
    pop();
    // console.log("player drawn");
}


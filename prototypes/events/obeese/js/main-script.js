/**
 * Wizardry
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";


//IMAGES


//VARS
let player = {
    pos: 0,
    speed: 10,
    size: 150,
    image: "./assets/images/bee.gif"
}






async function setup() {
    createCanvas(1920,1080)
}


function draw() {
    background('blue');
    
    // console.log("frame");
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




//GRAPHICS
function drawText() {
    push();
    textSize(30);
    fill("white");
    let start1 = 50;
    let start2 = 920;
    let spacing = 30;
    
    text('WASD to move',50,start2);
    text('Placeholder',50,start2+=spacing);

    pop();
}

function drawAllEntities() {
    drawPlayer();
}

function drawPlayer() {
    push();
    image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    pop();
}



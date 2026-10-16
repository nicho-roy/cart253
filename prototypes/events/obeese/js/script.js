/**
 * Wizardry
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";




//VARS
let player = {
    pos: 0,
    vel: 0,
    velLimit: 10,
    acc: 0,
    speed: 10,
    size: 150,
    isGrounded: false,
    image: "./assets/images/bee.png",
    gif: "./assets/images/bee_moves.gif",
    sound: "./assets/sounds/buzz.mp3",
}
let gravity = -5;
let groundScreenMult = 0.9;
let initSoundLoop = false;



function preload() {
    
}

async function setup() {
    createCanvas(1920,1080);
    player.image = await loadImage(player.image);
    player.gif = await loadImage(player.gif);
    player.sound = await loadSound(player.sound);
    
    gravity = createVector(0,-gravity);
    player.pos = createVector(width/2,height/2);
    player.vel = createVector(0,0);
    player.acc = createVector(0,0);

}


function draw() {
    background(0);

    handleBuzzLoop();

    handleMovement();
    
    drawAll();
}



//sounds
function handleBuzzLoop() {
    if (!initSoundLoop) return;

    player.sound.loop();

    if (!player.sound.isPlaying()) {
        player.sound.play();
        console.log("sound playing");
    }
    
    //TODON, lerp with vel vector magnitude
    if (keyIsDown('w')) {
        player.sound.rate(0.85);
        player.sound.amp(1);
    } else {
        player.sound.rate(0.45);
        player.sound.amp(0.4);
    }
    if (player.isGrounded) {
        player.sound.rate(0.3);
        player.sound.amp(0.4);
    }
}

function keyPressed() {
    initSoundLoop = true;
}


//INPUT
function handleMovement() {
    //apply gravity
    groundCheck();
    if (!player.isGrounded) {
        player.acc.add(gravity);
        player.vel.add(player.acc);
        player.vel.limit(player.velLimit);
        player.pos.add(player.vel)
    } else {
        player.acc.mult(0);
        player.vel.mult(0);
    }

    //move
    let moveVector = getInputVector();
    moveVector.mult(player.speed);
    player.acc.add(moveVector);
    player.vel.add(player.acc);
    player.vel.limit(player.velLimit);
    player.pos.add(player.vel)
    player.pos.add(moveVector);

    console.log("acc: " + player.acc);
    console.log("vel: " + player.vel);

}

function groundCheck() {
    if (player.pos.y > height * groundScreenMult) {
        player.isGrounded = true;
    } else {
        player.isGrounded = false;
    }
}

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

function drawAll() {
    drawPlayer();
}

function drawPlayer() {
    push();
    image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    pop();
}



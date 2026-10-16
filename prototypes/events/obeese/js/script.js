/**
 * Wizardry
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";


//IMAGES
let beeImg = "./assets/images/bee.png";
let beeGif = "./assets/images/bee_moves.gif";
let buzzSound = "./assets/sounds/buzz.mp3";

//VARS
let player = {
    pos: 0,
    vel: 0,
    velLimit: 5,
    acc: 0,
    speed: 3,
    size: 150,
    isGrounded: false,
    image: "",
}
let gravity = 1;
let groundScreenMult = 0.9;
let initSoundLoop = false;



function preload() {
    
}

async function setup() {
    createCanvas(1920,1080);
    beeImg = await loadImage(beeImg);
    beeGif = await loadImage(beeGif);
    buzzSound = await loadSound(buzzSound);
    player.image = beeImg;
    
    gravity = createVector(0,gravity);
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



//INPUT
function handleMovement() {
    //apply gravity
    groundCheck();
    if (!player.isGrounded) {
        player.acc.add(gravity); //set equals for realistic movement
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

    player.acc.add(moveVector);  //set equals for realistic movement
    player.vel.add(player.acc);
    player.vel.limit(player.velLimit);
    player.pos.add(player.vel)
    player.pos.add(moveVector);

    //get misc input
    getInput();

    //bounce off walls
    checkBounds();

    console.log("acc: " + player.acc);
    // console.log("vel: " + player.vel);

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

function getInput() {
    if (keyIsDown('Space')) {
        player.image = beeGif;
    } else {
        player.image = beeImg;
    }
}


function checkBounds() {
    if (player.pos.x > width) {
        player.pos.x = width;
        flipXDirection();
    }
    if (player.pos.x < 0) {
        player.pos.x = 0;
        flipXDirection();
    }
    if (player.pos.y > height) {
        player.pos.y = height;
        flipYDirection();
    }
    if (player.pos.y < 0) {
        player.pos.y = 0;
        flipYDirection();
    }
}

function flipXDirection() {
    player.acc = createVector(-player.acc.x,player.acc.y);
    player.vel = createVector(-player.vel.x,player.vel.y);
}

function flipYDirection() {
    player.acc = createVector(player.acc.x,-player.acc.y);
    player.vel = createVector(player.vel.x,-player.vel.y);
}


//AUDIO
function handleBuzzLoop() {
    if (!initSoundLoop) return;

    buzzSound.loop();

    if (!buzzSound.isPlaying()) {
        buzzSound.play();
        console.log("sound playing");
    }
    
    //TODON, lerp with vel vector magnitude
    if (keyIsDown('w')) {
        buzzSound.rate(0.85);
        buzzSound.amp(1);
    } else {
        buzzSound.rate(0.45);
        buzzSound.amp(0.4);
    }
    if (player.isGrounded) {
        buzzSound.rate(0.3);
        buzzSound.amp(0.4);
    }
}

function keyPressed() {
    initSoundLoop = true;
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
    text('Space to get jiggy',50,start2+=spacing);

    pop();
}

function drawPlayer() {
    push();
    //depending on if twerking
    if (player.image == beeImg) {
        image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    } else {
        image(player.image,player.pos.x-(player.size),player.pos.y-(player.size),player.size*2,player.size*2);
    }
    pop();
}

function drawAll() {
    drawPlayer();
    drawText()
}

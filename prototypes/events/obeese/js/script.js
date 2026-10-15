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
    speed: 10,
    size: 150,
    image: "./assets/images/bee.png",
    gif: "./assets/images/bee_moves.gif",
    sound: "./assets/sounds/bee_buzz.mp3",
}
let gravity = -5;



function preload() {
    
}

async function setup() {
    createCanvas(1920,1080);
    player.image = await loadImage(player.image);
    player.gif = await loadImage(player.gif);
    player.sound = await loadSound(player.sound);
    
    gravity = createVector(0,gravity);
    player.pos = createVector(width/2,height/2);

}


function draw() {
    background(0);

    handleBuzzLoop();
    
    drawAll();
    // console.log("frame");
}



//sounds
function handleBuzzLoop() {
    if (!player.sound.isPlaying()) {
        player.sound.play();
    }
    //TODON !CONTINUE
    //player.sound.onended()

    if (keyIsDown('w')) {
        
    } else {

    }
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

function drawAll() {
    drawPlayer();
}

function drawPlayer() {
    push();
    image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    pop();
}



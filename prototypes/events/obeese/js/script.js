/**
 * Obeese
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";


//IMAGES
let beeImg = "./assets/images/bee.png";
let beeGif = "./assets/images/bee_moves.gif";
let bg = "./assets/images/rw1.png"
let buzzSound = "./assets/sounds/buzz.mp3";

//VARS
let player = {
    pos: 0,
    vel: 0,
    velLimit: 20,
    acc: 0,
    speed: 2,
    horizDrag: 0.95,
    size: 100,
    pollen: 0,
    pollenSizeMult: 1.1,
    pollenSpeedPenaltyMult: 0.009, //higher the slower (fine at 0.005)
    pollenDrainRate: 3,
    buzzPitchUnMult : 3, //high number decreases the harshness of buzz pitch drop
    isGrounded: false,
    image: "",
    gifSizeMult: 1,
    isTwerking: false,
    isInverted: false, 
}
//world
let gravity = 0.25;
let groundScreenMult = 0.9;
let initSoundLoop = false;
//pollen
class Pollen {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.acc = createVector(0,0);
        this.vel = createVector(0,0);
        this.size = random(5,10);
        this.fill = "#ebb931";
        pollenArr.push(this);
    }

    float() {
        let randVector = createVector(random(-1,1),random(-1,1));
        randVector.mult(0.1);

        this.acc = randVector;
        this.vel.add(this.acc);
        this.vel.limit(this.velLimit);
        this.pos.add(this.vel)
        checkBounds(this);
    }

    draw() {
        push();
        noStroke();
        fill(this.fill);
        rect(this.pos.x,this.pos.y,this.size,this.size);
        pop();
    }
}
let pollenArr = [];
let maxPollen = 30;
let pollenSpawnChance = 2;



function preload() {
    
}

async function setup() {
    createCanvas(1920,1080);
    beeImg = await loadImage(beeImg);
    beeGif = await loadImage(beeGif);
    bg = await loadImage(bg);
    buzzSound = await loadSound(buzzSound);
    player.image = beeImg;
    
    gravity = createVector(0,gravity);
    player.pos = createVector(width/2,height/2);
    player.vel = createVector(0,0);
    player.acc = createVector(0,0);

}


function draw() {
    background(bg);

    handleBuzzLoop();
    handleMovement();

    attemptGeneratePollen();

    attemptEatPollen();
    
    drawAll();
}


//POLLEN
function attemptGeneratePollen() {
    if (pollenArr.length > maxPollen) {
        return;
    }
    //init spawn
    randomSeed();
    let rng = random(0, 100);
    if (rng <= pollenSpawnChance) {
        spawnPollen();
    }
}

function spawnPollen() {
    let randX = random(1,width);
    let randY = random(1,height);
    let pollen = new Pollen(randX,randY);
}

function attemptEatPollen() {
    pollenArr.forEach(e => {
        if (dist(player.pos.x, player.pos.y, e.pos.x, e.pos.y) <= calculatePlayerSize()/2) {
            let index = pollenArr.indexOf(e);
            pollenArr.splice(index, 1);
            player.pollen += e.size;
        }
    });
}


//INPUT
function handleMovement() {
    //rebuild acc each frame
    player.acc.set(0,0); //do not reset for silly movement

    //apply gravity
    groundCheck();
    if (!player.isGrounded) {
        player.acc.add(gravity);
        // player.vel.add(player.acc);
        // player.vel.limit(player.velLimit);
        // player.pos.add(player.vel)
    } else {
        player.vel.mult(0);
    }

    let weight = getWeight();

    //movement
    let moveVector = getInputVector();
    moveVector.mult(player.speed * weight);
    player.acc.add(moveVector);  
    player.acc.limit(player.velLimit*100);


    player.vel.add(player.acc);
    player.vel.x *= player.horizDrag;
    player.vel.limit(player.velLimit);
    player.pos.add(player.vel)
    //player.pos.add(moveVector);

    //get misc input
    getInput();

    //bounce off walls
    checkBounds(player);

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
        player.isInverted = true;
    }
    if (keyIsDown('s')) {
        vector.add(createVector(0,1));
    }
    if (keyIsDown('d')) {
        vector.add(createVector(1,0));
        player.isInverted = false;
    }
    vector.normalize();
    return vector;
}

function getInput() {
    if (keyIsDown('Space')) {
        player.isTwerking = true;
        if (player.pollen > 0 + player.pollenDrainRate) player.pollen -= player.pollenDrainRate;
    } else {
        player.isTwerking = false;
    }
}


function checkBounds(obj) {
    if (obj.pos.x > width) {
        obj.pos.x = width;
        flipXDirection(obj);
    }
    if (obj.pos.x < 0) {
        obj.pos.x = 0;
        flipXDirection(obj);
    }
    if (obj.pos.y > height) {
        obj.pos.y = height;
        flipYDirection(obj);
    }
    if (obj.pos.y < 0) {
        obj.pos.y = 0;
        flipYDirection(obj);
    }
}

function flipXDirection(obj) {
    obj.acc = createVector(-obj.acc.x, obj.acc.y);
    obj.vel = createVector(-obj.vel.x, obj.vel.y);
}

function flipYDirection(obj) {
    obj.acc = createVector(obj.acc.x, -obj.acc.y);
    obj.vel = createVector(obj.vel.x, -obj.vel.y);
}


// !CONT 
// TODON  make buzz pitch scale with obesity
// TODON make pollen yeild less numbers apon collection
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
        buzzSound.rate(0.85 * (getWeight() * player.buzzPitchUnMult));
        buzzSound.amp(1);
    } else {
        buzzSound.rate(0.45 * (getWeight() * player.buzzPitchUnMult));
        buzzSound.amp(0.4);
    }
    if (player.isGrounded) {
        buzzSound.rate(0.3 * (getWeight() * player.buzzPitchUnMult));
        buzzSound.amp(0.4);
    }
}

function keyPressed() {
    initSoundLoop = true;
}


//MISC
function calculatePlayerSize() {
    return (player.size + player.pollen * player.pollenSizeMult)
}

function getWeight() {
    return (1 / (1 + player.pollen * player.pollenSpeedPenaltyMult));
}


//GRAPHICS
function drawText() {
    push();
    textSize(30);
    fill("white");
    let start1 = 50;
    let start2 = 1000;
    let spacing = 30;

    text("Pollen: " + Math.trunc(player.pollen),50,start1);
    
    text('WASD to move',50,start2);
    text('Space to get jiggy',50,start2+=spacing);

    pop();
}

function drawPlayer() {
    push();
    //if facing other way
    translate(player.pos.x,player.pos.y); //move origin around player so scale flip works

    //depending on if twerking
    if (!player.isTwerking) {
        if (player.isInverted) scale(-1, 1);
        player.image = beeImg;
        image(player.image, -(calculatePlayerSize() / 2), -(calculatePlayerSize() / 2), calculatePlayerSize(), calculatePlayerSize());
    } else {
        player.image = beeGif
        image(player.image, -(calculatePlayerSize() / 2) * player.gifSizeMult, -(calculatePlayerSize() / 2) * player.gifSizeMult, calculatePlayerSize() * player.gifSizeMult, calculatePlayerSize() * player.gifSizeMult);
    }
    pop();
}

function drawPollen() {
    pollenArr.forEach(e => {
        e.float();
        e.draw();
    });
}

function drawAll() {
    drawText();
    drawPollen();
    drawPlayer();
}

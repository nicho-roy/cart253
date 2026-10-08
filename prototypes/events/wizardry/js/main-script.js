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
    size: 150,
    fill: "red",
    chunk: {
        x: 0,
        y: 0,
    },
    image: "./assets/images/wizard.gif"
}
let cast = {
    speed: 10,
    size: 10,
    power: 10,
}
let loadedSpellIndex = 0;
const spellSlots = ["fireball","magicMissle","lightningBolt"];

class Fireball {
    constructor(x,y) {
        this.power = 20;
        this.size = 20;
        this.power = 5;
        this.manaCost = 30;
        this.x=x;
        this.y=y;
    }

    draw() {

    }
}

class MagicMissle {
    constructor(x, y) {
        this.power = 10;
        this.size = 5;
        this.speed = 15;
        this.manaCost = 10;
        this.x = x;
        this.y = y;
    }

    draw() {

    }
}

class ThunderBolt {
    constructor(x, y) {
        this.power = 15;
        this.size = 10;
        this.speed = 15;
        this.manaCost = 15;
        this.x = x;
        this.y = y;
    }

    draw() {

    }
}


//ARRAYS
let spellsArr = [];




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


    drawAllEntities();

    console.log("frame");
}


//controls casting
function mousePressed() {
    let castVector = createVector(mouseX - player.pos.x, mouseY - player.pos.y);
    castVector.normalize();

    cast(castVector);
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



function cast(vectorDirection) {
    let spell = [loadedSpellIndex];

}



//GRAPHICS
function drawPlayer() {
    push();
    image(player.image,player.pos.x,player.pos.y,player.size,player.size);
    pop();
    // console.log("player drawn");
}

function drawAllEntities() {
    drawSpells();

    drawPlayer();
}

function drawSpells() {
    spellsArr.forEach(e => {
        
    });
}


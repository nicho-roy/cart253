/**
 * Wizardry
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";


//CLASSES
class Spell {
    constructor(pos,dir) {
        this.pos = pos;
        this.dir = dir;
    }
}

class Fireball extends Spell {
    constructor(pos,dir) {
        super(pos,dir);
        this.power = 20;
        this.size = 20;
        this.speed = 5;
        this.manaCost = 30;
    }

    draw() {
        push();
        let vel = createVector(this.dir.x,this.dir.y);
        vel.mult(this.speed);
        this.pos.add(vel);

        fill(240,10,0);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
        pop();
    }
}

//TODON UPDATE FROM FIREBALL
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

//TODON UPDATE FROM FIREBALL
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




//VARS
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
let castStat = {
    speed: 10,
    size: 10,
    power: 10,
}
let loadedSpellIndex = 0;
let spellSlots = ["fireball","magicMissle","thunderBolt"];

//ARRAYS
let spellsArr = [];
let enemyArr = [];



async function setup() {
    setupTerrain();
    player.image = await loadImage(player.image);
    
}


function draw() {
    background(0);
    //drawTerrain();

    let moveVector = getInputVector();
    moveVector.mult(player.speed);
    player.pos.add(moveVector);


    drawAllEntities();

    // console.log("frame");
}


//controls casting
function mousePressed() {
    let castVector = createVector(mouseX - player.pos.x, mouseY - player.pos.y);
    castVector.normalize();

    cast(castVector);
}


function cast(directionVector) {
    let spellClass = spellSlots[loadedSpellIndex];
    let spell;
    switch (spellClass) {
        case "fireball":
            spell = new Fireball(createVector(player.pos.x,player.pos.y),directionVector);
            console.log("fireball");
            break;
        //TODON OTHER SPELLS
        
        default:

            console.log("default");
    }

    spellsArr.push(spell);
    console.log(spellsArr);
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
function drawAllEntities() {
    drawSpells();

    drawPlayer();
}

function drawPlayer() {
    push();
    image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    pop();
    // console.log("player drawn");
}

function drawSpells() {
    spellsArr.forEach(e => {
        e.draw();
    });
}


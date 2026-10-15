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
        vel.mult(GLOBAL_SPEED_MULT);
        this.pos.add(vel);

        fill(240,10,0);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size*GLOBAL_SIZE_MULT,this.size*GLOBAL_SIZE_MULT);
        pop();
    }

    checkCollision(arr) {
        arr.forEach(target => {
            let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
            if (d > ((this.size / 2) + (target.size / 2))) {
                this.onCollide(target);
                return;
            }
        });
    }

    onCollide(entity) {
        console.log("collsion",entity);

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
class Freeze {
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

class Entity {
    constructor() {
        this.pos = getRandomPosOnBorder();
    }
}

class Skeleton extends Entity {
    constructor(size) {
        super();
        this.size = size;
    }

    draw() {
        push();
        image(skeletonGif,this.pos.x,this.pos.y,this.size,this.size);
        pop();
    }
}



//IMAGES
let explosionGif = "./assets/images/explosion.gif";
let lizardGif = "./assets/images/red_lizard.gif";
let skeletonGif = "./assets/images/skeleton.gif";

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
let spellSlots = ["fireball","magicMissle","freeze"];

//ARRAYS
let spellsArr = [];
let enemyArr = [];
let effectsArr = [];

//GAMEPLAY VARS
const GLOBAL_SPEED_MULT = 3;
const GLOBAL_SIZE_MULT = 3;
let enemyRespawnTimer = 5000;
let elapsedTime;
let savedTime;
let enemyRespawnRampMult = 1.25;





async function setup() {
    setupTerrain();
    player.image = await loadImage(player.image);
    explosionGif = await loadImage(explosionGif);
    lizardGif = await loadImage(lizardGif);
    skeletonGif = await loadImage(skeletonGif);

    savedTime = millis();
}

function draw() {
    background(0);
    //drawTerrain();

    //player movment
    let moveVector = getInputVector();
    moveVector.mult(player.speed);
    player.pos.add(moveVector);

    runEnemyRespawntimer();


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


//emeny
function runEnemyRespawntimer() {
    let elapsedTime = millis() - savedTime;

    if (elapsedTime > enemyRespawnTimer) {
        elapsedTime = 0;
        savedTime = millis();
        enemyRespawnTimer /= enemyRespawnRampMult;
        spawnEnemy();
    }

}

function spawnEnemy() {
    let enemy = new skeletonGif();
}

function getRandomPosOnBorder() {
    
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
        e.checkCollision(enemyArr);
        e.draw();
    });
}


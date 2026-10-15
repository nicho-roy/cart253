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

    //TODON COLLISONS BROKEN
    checkCollision(arr) {
        arr.forEach(target => {
            let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
            if (d < ((this.size / 2) + (target.size / 2))) {
                this.onCollide(target);
                return;
            }
        });
    }

    onCollide(entity) {
        console.log("collsion",entity);

    }
}


class Explosion {
    
}


class Entity {
    constructor() {
        this.pos = getRandomPosOnBorder();
    }
}

class Skeleton extends Entity {
    constructor() {
        super();
        this.size = random(80,120);
        this.speed = 5;
    }

    draw() {
        push();
        let dir = createVector(player.pos.x-this.pos.x,player.pos.y-this.pos.y);
        dir.normalize();
        dir.mult(this.speed);
        this.pos.add(dir);
        
        image(skeletonGif,this.pos.x-(this.size/2),this.pos.y-(this.size/2),this.size,this.size);
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
    hp: 3,
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
let enemyRespawnRampMult = 1.001;





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
            break;
        //TODON OTHER SPELLS
        
        default:

            console.log("default");
    }

    spellsArr.push(spell);
    //console.log(spellsArr);
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
    let enemy = new Skeleton();
    enemyArr.push(enemy);
}

function getRandomPosOnBorder() {
    let r = random(1);
    let randPos;
    if (r<0.25) {
        randPos = random(width);
        return createVector(randPos,0);
    } else if (r<0.5) {
        randPos = random(height);
        return createVector(width,randPos);
    } else if (r<0.75) {
        randPos = random(width);
        return createVector(randPos,height);
    } else if (r<1) {
        randPos = random(height);
        return createVector(0,randPos);
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
function drawAllEntities() {
    drawEnemies();
    drawSpells();
    drawPlayer();
}

function drawPlayer() {
    push();
    image(player.image,player.pos.x-(player.size/2),player.pos.y-(player.size/2),player.size,player.size);
    pop();
    // console.log("player drawn");
}

function drawEnemies() {
    enemyArr.forEach(e => {
        e.draw();
    });
}

function drawSpells() {
    spellsArr.forEach(e => {
        e.checkCollision(enemyArr);
        e.draw();
    });
}




// //TODON UPDATE FROM FIREBALL
// class MagicMissle {
//     constructor(x, y) {
//         this.power = 10;
//         this.size = 5;
//         this.speed = 15;
//         this.manaCost = 10;
//         this.x = x;
//         this.y = y;
//     }

//     draw() {

//     }
// }

// //TODON UPDATE FROM FIREBALL
// class Freeze {
//     constructor(x, y) {
//         this.power = 15;
//         this.size = 10;
//         this.speed = 15;
//         this.manaCost = 15;
//         this.x = x;
//         this.y = y;
//     }

//     draw() {

//     }
// }
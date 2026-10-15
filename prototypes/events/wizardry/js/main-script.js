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
            if (d < ((this.size / 2) + (target.size / 2))) {
                this.onCollide(target);
                return;
            }
        });
    }

    onCollide(entity) {
        // console.log("collsion",entity);
        let explosion = new Explosion(this.pos,this.power,this.size);
        effectsArr.push(explosion);
        this.delete();
    }

    delete() {
        let indexOfSpell = spellsArr.indexOf(this);
        spellsArr.splice(indexOfSpell,1)
    }
}

class MagicMissle extends Spell {
    constructor(pos,dir) {
        super(pos,dir);
        this.power = 10;
        this.size = 5;
        this.speed = 15;
        this.manaCost = 10
    }

    draw() {
        push();
        let vel = createVector(this.dir.x,this.dir.y);
        vel.mult(this.speed);
        vel.mult(GLOBAL_SPEED_MULT);
        this.pos.add(vel);

        fill(58, 12, 173);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size*GLOBAL_SIZE_MULT,this.size*GLOBAL_SIZE_MULT);
        pop();
    }

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
        // console.log("collsion",entity);
        let explosion = new Explosion(this.pos,this.power,this.size);
        effectsArr.push(explosion);
        this.delete();
    }

    delete() {
        let indexOfSpell = spellsArr.indexOf(this);
        spellsArr.splice(indexOfSpell,1)
    }
}


class ThunderBolt extends Spell {
    constructor(pos,dir) {
        super(pos,dir);
        this.power = 5;
        this.size = 100;
        this.speed = 3;
        this.manaCost = 15;
        this.alreadyHit = [];
        this.aliveTimer = 2500;
        this.savedTime = millis();
    }

    draw() {
        push();
        let vel = createVector(this.dir.x,this.dir.y);
        vel.mult(this.speed);
        vel.mult(GLOBAL_SPEED_MULT);
        this.pos.add(vel);

        //timer
        let elapsedTime = millis() - this.savedTime;

        if (elapsedTime > this.aliveTimer) {
            elapsedTime = 0;
            this.savedTime = millis();
            this.alreadyHit.forEach(e => {
                e.stunned = false;
            });
            this.delete();
        }

        fill(243, 255, 10);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size*GLOBAL_SIZE_MULT,this.size*GLOBAL_SIZE_MULT);
        pop();
    }

    checkCollision(arr) {
        arr.forEach(target => {
            let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
            if (d < ((this.size / 2) + (target.size / 2))) {
                if(this.alreadyHit.includes(target)) return;
                this.onCollide(target);
                return;
            }
        });
    }

    onCollide(entity) {
        // console.log("collsion",entity);
        entity.stunned = true;
        this.alreadyHit.push(entity);
    }

    delete() {
        let indexOfSpell = spellsArr.indexOf(this);
        spellsArr.splice(indexOfSpell,1)
    }
}




class Explosion {
    constructor(pos,damage,size) {
        this.pos = createVector(pos.x,pos.y);
        this.damage = damage;
        this.size = size * 20;
        this.alreadyHit = [];
        this.aliveTimer = 500;
        this.savedTime = millis();
        explosionGif.setFrame(0);
    }

    draw() {
        push();
        let elapsedTime = millis() - this.savedTime;

        if (elapsedTime > this.aliveTimer) {
            elapsedTime = 0;
            this.savedTime = millis();
            this.delete();
        }
        let tempGif = explosionGif;
        image(tempGif,this.pos.x-(this.size/2),this.pos.y-(this.size/2),this.size,this.size);
        pop();
    }

    checkCollision(arr) {
        arr.forEach(target => {
            let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
            if (d < ((this.size / 2) + (target.size / 2))) {
                if(this.alreadyHit.includes(target)) return;
                this.onCollide(target);
                this.alreadyHit.push(target);
                // return; //do not return for multi hit
            }
        });
    }

    onCollide(entity) {
        entity.hp -= this.damage;
    }

    delete() {
        let indexOfEffect = effectsArr.indexOf(this);
        effectsArr.splice(indexOfEffect,1)
    }
}


class Entity {
    constructor() {
        this.pos = getRandomPosOnBorder();
        this.stunned = false;
    }
}

class Skeleton extends Entity {
    constructor() {
        super();
        this.size = random(80,120);
        this.speed = 5;
        this.hp = 20;
    }

    draw() {
        push();
        if (!this.stunned) {
            let dir = createVector(player.pos.x-this.pos.x,player.pos.y-this.pos.y);
            dir.normalize();
            dir.mult(this.speed);
            this.pos.add(dir);
        }
        
        if (this.hp<=0) {
            this.delete();
        }
        
        image(skeletonGif,this.pos.x-(this.size/2),this.pos.y-(this.size/2),this.size,this.size);
        pop();
    }

    checkCollision() {
        let d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
        if (d < ((this.size / 2) + (player.size / 2))) {
            this.onCollide(player);
        }
    }

    onCollide() {
        // remove();
    }

    delete() {
        let indexOfenemy = enemyArr.indexOf(this);
        enemyArr.splice(indexOfenemy,1)
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
    mana: 100,
    manaMax: 100,
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
let effectsArr = [];

//GAMEPLAY VARS
const GLOBAL_SPEED_MULT = 3;
const GLOBAL_SIZE_MULT = 3;
let enemyRespawnTimer = 5000;
let elapsedTime;
let savedTime;
let enemyRespawnRampMult = 1.1;





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

    getInputSpellSlot();

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

        case "magicMissle":
            spell = new MagicMissle(createVector(player.pos.x,player.pos.y),directionVector);
            break;

         case "thunderBolt":
            spell = new ThunderBolt(createVector(player.pos.x,player.pos.y),directionVector);
            break;
        
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

function getInputSpellSlot(){
    if (keyIsDown('1')) {
        loadedSpellIndex = 0;
    }
    if (keyIsDown('2')) {
        loadedSpellIndex = 1;
    }
    if (keyIsDown('3')) {
        loadedSpellIndex = 2;
    }
}


//GRAPHICS
function drawAllEntities() {
    drawEnemies();
    drawSpells();
    drawEffects();
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
        e.checkCollision();
        e.draw();
    });
}

function drawSpells() {
    spellsArr.forEach(e => {
        e.checkCollision(enemyArr);
        e.draw();
    });
}

function drawEffects() {
    effectsArr.forEach(e => {
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
        // this.power = 15;
        // this.size = 10;
        // this.speed = 15;
        // this.manaCost = 15;
//         this.x = x;
//         this.y = y;
//     }

//     draw() {

//     }
// }
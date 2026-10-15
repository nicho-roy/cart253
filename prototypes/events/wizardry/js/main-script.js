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
        this.size = 90;
        this.speed = 5;
        this.manaCost = 20;
    }

    draw() {
        push();
        let vel = createVector(this.dir.x,this.dir.y);
        vel.mult(this.speed);
        vel.mult(GLOBAL_SPEED_MULT);
        this.pos.add(vel);

        fill(240,10,0);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
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
        this.size = 25;
        this.speed = 20;
        this.manaCost = 1
    }

    draw() {
        push();
        let vel = createVector(this.dir.x,this.dir.y);
        vel.mult(this.speed);
        vel.mult(GLOBAL_SPEED_MULT);
        this.pos.add(vel);

        fill(58, 12, 173);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
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


class Freeze extends Spell {
    constructor(pos,dir) {
        super(pos,dir);
        this.power = 5;
        this.size = 800;
        this.speed = 2;
        this.manaCost = 15;
        this.alreadyHit = [];
        this.aliveTimer = 1000;
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
            this.delete();
        }

        fill(84, 229, 255,150);
        noStroke();
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
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
        this.size = size * 6;
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
        this.stunTimer = 10000;
        this.savedTime = millis();
    }

    draw() {
        push();
        if (!this.stunned) {
            let dir = createVector(player.pos.x-this.pos.x,player.pos.y-this.pos.y);
            dir.normalize();
            dir.mult(this.speed);
            this.pos.add(dir);
        } else if (this.stunned) {
            let elapsedTime = millis() - this.savedTime;

            if (elapsedTime > this.stunTimersa) {
                elapsedTime = 0;
                this.savedTime = millis();
                this.stunned = false;
            }
        }
        
        //death check
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
        player.hp -= 1;
        this.delete();
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
let deadImg = "./assets/images/dead.png";

//VARS
let player = {
    pos: 0,
    speed: 10,
    size: 150,
    hp: 3,
    mana: 100,
    manaMax: 100,
    isAlive: true,
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
let enemyRespawnTimer = 3000;
let elapsedTime;
let savedTime;
let enemyRespawnRampMult = 1.01;





async function setup() {
    setupTerrain();
    player.image = await loadImage(player.image);
    explosionGif = await loadImage(explosionGif);
    lizardGif = await loadImage(lizardGif);
    skeletonGif = await loadImage(skeletonGif);
    deadImg = await loadImage(deadImg)

    savedTime = millis();
}

function draw() {
    background(0);
    drawTerrain();

    //player movment
    runPlayerAction();

    runEnemyRespawntimer();


    drawAllEntities();

    drawText();

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

         case "freeze":
            spell = new Freeze(createVector(player.pos.x,player.pos.y),directionVector);
            break;
        
        default:

            console.log("default");
    }

    if (player.mana >= spell.manaCost) {
        player.mana -= spell.manaCost;
        spellsArr.push(spell);
    } else {
        //nothing
    }
    //console.log(spellsArr);
}

function regenMana() {
    if (player.mana < 100) {
        player.mana += 0.25;
    }
}


//player
function runPlayerAction() {
    if (player.hp <= 0) {
        player.isAlive = false;
    }

    if (player.isAlive) {
        let moveVector = getInputVector();
        moveVector.mult(player.speed);
        player.pos.add(moveVector);

        getInputSpellSlot();

        regenMana();
    } else if (!player.isAlive) {
        player.image = deadImg;
    }
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
function drawText() {
    push();
    textSize(30);
    fill("white");
    text('Mana: ' + player.mana.toPrecision(3),50,50);
    text('Hp: ' + player.hp.toPrecision(1),50,80);
    text('WASD to move',50,110);
    text('Click to cast',50,140);
    text('1 - Fireball ',50,170);
    text('2 - Magic Missile ',50,200);
    text('3 - Freeze',50,230);
    pop();
}

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



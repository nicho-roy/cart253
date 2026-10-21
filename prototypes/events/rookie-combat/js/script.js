/**
 * Rookie Combat
 * Nicholas Roy
 * 
 * Prototype 3
 */

"use strict";

//players
let player1, player2, player3, player4;

//IMAGES
let bgImg = "./assets/images/bg.png";
let jet0Img = "./assets/images/jet0.png";
let jet1Img = "./assets/images/jet1.png";
let jet2Img = "./assets/images/jet2.png";

//arrs
let playerArr = [];
let projArr = [];

//CLASS
class Player {
    static playerIdCounter = 0;
    constructor(x, y, heading, image, upKey, leftKey, downKey, rightKey, fireKey) {
        this.playerId = Player.playerIdCounter;
        Player.playerIdCounter++;
        this.heading = heading;
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.airSpeedBonus = 1;
        this.airSpeedBonusGain = 0.008; //0.005
        this.airSpeedBonusMax = 10; //5
        this.speed = 1;
        this.velLimit = 20;
        this.hp = 100;
        this.energy = 75;
        this.energyBleedRate = 0.2;
        this.energyGainRate = 1;
        this.throttle = 25; // [0-100]
        this.throttleRate = 1;
        this.turnRate = 1.2;
        this.image = image;
        this.size = 60;
        this.fireRate = 10;
        this.fireTimer = 0;
        this.outOfBoundsDamage = 0.5;
        this.dead = false;

        //input schema
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;

        playerArr.push(this);
    }

    act() {
        if (!this.dead) {
            this.move();
            this.runInput();
            this.checkBounds();
            this.checkDeath();
        }
    }

    move() {
        //throttle control
        if (keyIsDown(this.upKey)) {
            this.throttle += this.throttleRate;
        }
        if (keyIsDown(this.downKey)) {
            this.throttle -= this.throttleRate;
        }
        this.throttle = constrain(this.throttle,0,100)

        //turn control
        if (keyIsDown(this.leftKey)) {
            this.turn(-1);
            this.airSpeedBonus -= this.airSpeedBonusGain;
        } else if (keyIsDown(this.rightKey)) {
            this.turn(1);
            this.airSpeedBonus -= this.airSpeedBonusGain;
        } else {
            this.airSpeedBonus += this.airSpeedBonusGain; 
            this.energy += this.energyGainRate * (this.throttle / 100);
        }

        this.airSpeedBonus = constrain(this.airSpeedBonus,1,this.airSpeedBonusMax);
        this.energy = constrain(this.energy, 0, 100)


        //set velocity to the direction of the angle
        this.vel.set(0,0);
        let moveDirection = createVector(cos(this.heading), sin(this.heading));
        moveDirection.normalize();
        this.vel.add(moveDirection);
        this.vel.mult(this.speed);
        this.vel.mult(this.throttle / 100);
        this.vel.mult(this.airSpeedBonus);
        this.vel.mult(dragMult);
        this.vel.limit(this.velLimit);
        if (this.vel.mag() <= 0) this.vel = moveDirection.mult(0.1);
        this.pos.add(this.vel);

    }

    turn (directionSignMult) {
        this.heading += (this.turnRate * (this.energy/100)) * directionSignMult
        this.energy -= this.energyBleedRate;
        this.energy = constrain(this.energy,0,100);
    }

    runInput() {
        if (keyIsDown(this.fireKey)) {
            this.fireTimer++;
            if (this.fireTimer>=this.fireRate) {
                let vHead = createVector(cos(this.heading),sin(this.heading));
                let bullet = new Bullet(this.pos.x, this.pos.y, vHead,this);
                this.fireTimer = 0;
            }
        }
    }

    checkBounds() {
        if (this.pos.x > width || this.pos.x < 0) {
            this.applyDamage(this.outOfBoundsDamage);
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.applyDamage(this.outOfBoundsDamage);
        }
    }

    applyDamage(damage) {
        this.hp -= damage;
        this.hp = constrain(this.hp,0,100);
    }

    checkDeath() {
        if (this.hp <= 0) {
            this.size = max(0, this.size - 1);
            if (this.size <= 0) this.dead = true;
        }
        
    }

    draw() {
        if (this.dead) return;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + 90);
        image(this.image, - (this.size / 2), - (this.size / 2), this.size, this.size);
        pop();
    }

}

class Bullet {
    constructor(x,y,dir,shooter) {
        this.pos = createVector(x,y);
        this.speed = 8;
        this.damage = 25;
        this.dir = createVector(dir.x,dir.y);
        this.dir.normalize();
        this.dir.mult(this.speed);
        this.size = 5;
        this.fill = "#ff8d0b";
        this.shooter = shooter;
        projArr.push(this);
    }

    act() {
        this.move();
        this.checkCollisions();
    }

    checkCollisions() {
        playerArr.forEach(e => {
            if (e === this.shooter) return;
            if (dist(this.pos.x, this.pos.y, e.pos.x, e.pos.y) <= e.size/2) {
                e.applyDamage(this.damage);
                this.destroy();
            }
        });
    }

    move() {
        this.pos.add(this.dir);
    }

    destroy() {
        let index = projArr.indexOf(this);
        projArr.splice(index, 1);
    }

    draw() {
        push();
        fill(this.fill);
        noStroke();
        rect(this.pos.x - (this.size / 2), this.pos.y - (this.size / 2),this.size,this.size);
        pop();
    }
}

//world
let dragMult = 0.999;



async function setup() {
    angleMode(DEGREES);
    createCanvas(1920,1080);
    bgImg = await loadImage(bgImg);
    jet0Img = await loadImage(jet0Img);
    jet1Img = await loadImage(jet1Img);
    jet2Img = await loadImage(jet2Img);

    player1 = new Player(width/2,height/2+50,180,jet0Img,'w','a','s','d','Space');
    player2 = new Player(width / 2, height / 2 - 50, 0, jet1Img, 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Enter');

}


function draw() {
    background(bgImg);
    background(0,0,100,80);

    
    drawAll();
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


//TODON cool jet audio maybe
//AUDIO


//MISC



//GRAPHICS
function drawText() {
    push();
    textSize(30);
    fill("white");
    let start1Origin = 50;
    let start2Horiz = width-250;
    let start2Vert = 1000;
    let spacing = 30;

    text("Player 1", start1Origin, start1Origin);
    text("Energy: " + Math.trunc(player1.energy), start1Origin, start1Origin + spacing);
    text("Throttle: " + Math.trunc(player1.throttle), start1Origin, start1Origin + (spacing * 2));
    text("Hp: " + Math.trunc(player1.hp), start1Origin, start1Origin + (spacing * 3));

    text('WASD to move', start1Origin, start2Vert);
    text('Space to fire', start1Origin, start2Vert + (spacing * 1));

    text("Player 2:", start2Horiz, start1Origin);
    text("Energy: " + Math.trunc(player2.energy), start2Horiz, start1Origin + spacing);
    text("Throttle: " + Math.trunc(player2.throttle), start2Horiz, start1Origin + (spacing * 2));
    text("Hp: " + Math.trunc(player2.hp), start2Horiz, start1Origin + (spacing * 3));
    
    text('Arrows to move', start2Horiz, start2Vert);
    text('Enter to fire', start2Horiz, start2Vert + (spacing * 1));

    pop();
}

function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawProjectiles() {
    projArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawAll() {
    drawText();
    drawProjectiles();
    drawPlayers();
}

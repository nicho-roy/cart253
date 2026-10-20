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
    constructor(x, y, angle, image, upKey, leftKey, downKey, rightKey, fireKey) {
        this.playerId = Player.playerIdCounter;
        Player.playerIdCounter++;
        this.angle = angle;
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.speed = 0.5;
        this.velLimit = 5;
        this.hp = 100;
        this.image = image;
        this.size = 80;

        //input schema
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;

        playerArr.push(this);
    }

    move() {
        this.acc.set(0,0);
        let moveVector = this.getInputVector();
        moveVector.mult(this.speed);
        this.acc.add(moveVector);
        this.acc.limit(this.velLimit * 100);


        this.vel.add(this.acc);
        this.vel.limit(this.velLimit);
        this.pos.add(this.vel)

        //get misc input
        // getInput();
    }

    getInputVector() {
        let vector = createVector(0, 0);
        if (keyIsDown(this.upKey)) {
            vector.add(createVector(0, -1));
        }
        if (keyIsDown(this.leftKey)) {
            vector.add(createVector(-1, 0));
        }
        if (keyIsDown(this.downKey)) {
            vector.add(createVector(0, 1));
        }
        if (keyIsDown(this.rightKey)) {
            vector.add(createVector(1, 0));
        }
        vector.normalize();
        return vector;
    }


    draw() {
        push();
        rotate(this.angle);
        image(this.image, this.pos.x - (this.size / 2), this.pos.y - (this.size / 2),this.size);
        pop();
    }

}


//world




async function setup() {
    createCanvas(1920,1080);
    bgImg = await loadImage(bgImg);
    jet0Img = await loadImage(jet0Img);
    jet1Img = await loadImage(jet1Img);
    jet2Img = await loadImage(jet2Img);

    player1 = new Player(width/2,height/2,0,jet0Img,'w','a','s','d','Space');

}


function draw() {
    background(bgImg);

    
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
    let start2Horiz = width-50;
    let start2Vert = 1000;
    let spacing = 30;

    text("Player1: " + Math.trunc(player1.hp), start1Origin, start1Origin);
    text("Player2: TEST", start1Origin, start2Horiz);
    
    text('WASD to move', start1Origin,start2Vert);
    text('Space to fire', start1Origin,start2Vert+=spacing);

    pop();
}

function drawPlayers() {
    playerArr.forEach(e => {
        e.move();
        e.draw();
    });
}

function drawProjectiles() {
    projArr.forEach(e => {
        e.move();
        e.draw();
    });
}

function drawAll() {
    drawText();
    drawProjectiles();
    drawPlayers();
}

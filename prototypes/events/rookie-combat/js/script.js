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
let missileImg = "./assets/images/side_winder.png";

//arrs
let playerArr = [];
let projArr = [];

//world
let dragMult = 0.999;



async function setup() {
    angleMode(DEGREES);
    createCanvas(1920,1080);
    bgImg = await loadImage(bgImg);
    jet0Img = await loadImage(jet0Img);
    jet1Img = await loadImage(jet1Img);
    jet2Img = await loadImage(jet2Img);
    missileImg = await loadImage(missileImg);
    // Missile.image = missileImg;

    player1 = new Player(width / 2 - 50, height / 2,180,jet0Img,'w','a','s','d','Space','q','e');
    player2 = new Player(width / 2 + 50, height / 2, 0, jet1Img, 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Enter');
    // player3 = new Player(width / 2, height / 2 + 50, 90, jet2Img, '8', '4', '5', '6', '+');
    // player4 = new Player(width / 2, height / 2 - 50, 270, jet2Img, 'i', 'j', 'k', 'l', 'm');


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
    text("posx: " + Math.trunc(player1.pos.x), start1Origin, start1Origin + (spacing * 4));
    text("posy: " + Math.trunc(player1.pos.y), start1Origin, start1Origin + (spacing * 5));

    text('WASD to move', start1Origin, start2Vert);
    text(player1.fireKey + ' to fire', start1Origin, start2Vert + (spacing * 1));

    text("Player 2:", start2Horiz, start1Origin);
    text("Energy: " + Math.trunc(player2.energy), start2Horiz, start1Origin + spacing);
    text("Throttle: " + Math.trunc(player2.throttle), start2Horiz, start1Origin + (spacing * 2));
    text("Hp: " + Math.trunc(player2.hp), start2Horiz, start1Origin + (spacing * 3));
    
    text('Arrows to move', start2Horiz, start2Vert);
    text(player2.fireKey + ' to fire', start2Horiz, start2Vert + (spacing * 1));

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

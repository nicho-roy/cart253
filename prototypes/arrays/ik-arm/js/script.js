/**
 * Rat Grabber
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";

const CANVAS = {
    x: 1920,
    y: 1080
}


let debugJointarr = [
    { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    // { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    // { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    // { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    // { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    // { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    // { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    // { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    // { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    // { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    // { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    // { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    // { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
];

let armJointsArray = [
    { jointRadius: 32, drawSize: 100, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 86, fill: "#cf530b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 64, fill: "#342d2b" },
    { jointRadius: 32, drawSize: 80, fill: "#b5a28a" },
    { jointRadius: 32, drawSize: 120, fill: "#b5a28a" },
];



let ratImg = "./assets/images/rat.png";

let ratTrapsArr = [];
let jointGroupsArr = [];
let ratsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    ratImg = await loadImage(ratImg);

    // let ikJoint = new IKJointGroup(debugJointarr, 900, 200, 1);
    let ikJoint = new IKJointGroup(armJointsArray, width/2, 0, 1);
    // let ikJoint2 = new IKJointGroup(debugJointarr, 500, 500, 1);
    // let ikJoint3 = new IKJointGroup(debugJointarr, 500, 600, 1);
    // let ikJoint = new IKJointGroup(snakeJointsArray, 500, 200, 1);
    jointGroupsArr.push(ikJoint);

    let ratTrap = new RatTrap(width/2,0,500,color(150,150,150,50));
    ratTrapsArr.push(ratTrap);

    generateRats(50);
    
}


function draw() {
    background(240);

    drawAll();
}

function generateRats(amt) {
    for (let i = 0; i < amt; i++) {
        let randX = random(0, width);
        let randY = random(0, height)
        let randSpeed = random(10, 30);;
        let randSize = random(50, 150);
        let randTurnRefreshTime = random(50, 250);
        let rat = new Rat(randX, randY, randSpeed, randSize, randTurnRefreshTime);
    }
}


//GRAPHICS
function drawAll() {
    drawRatTraps();
    drawJointGroups();
    drawRats();
    drawText()
}

function drawRatTraps() {
    ratTrapsArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawRats() {
    ratsArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawJointGroups() {
    jointGroupsArr.forEach(e => {
        e.act();
    });
}

function drawText() {
    push();
    textSize(30);
    fill("black");
    let start = 50;
    text("Capture rats by placing them in the bubble", 50, 50);

    pop();
}



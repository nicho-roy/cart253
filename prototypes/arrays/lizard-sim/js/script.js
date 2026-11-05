/**
 * Kingsnake
 * Nicholas Roy
 * 
 * Prototype 1
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
];
let debugJointarr2 = [
    { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
];

let exampleJointArray = [
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 140, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 90, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 140, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 140, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 140, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 140, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 110, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 90, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 70, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 30, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 10, fill: "#2496c7" },
];

let snakeJointsArray = [
    { jointRadius: 32, drawSize: 50, fill: "#251915" },
    { jointRadius: 32, drawSize: 80, fill: "#251915" },
    { jointRadius: 32, drawSize: 80, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#251915" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 64, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 60, fill: "#251915" },
    { jointRadius: 32, drawSize: 55, fill: "#251915" },
    { jointRadius: 32, drawSize: 50, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 45, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 40, fill: "#251915" },
    { jointRadius: 32, drawSize: 35, fill: "#251915" },
    { jointRadius: 32, drawSize: 30, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 25, fill: "#cccba1" },
    { jointRadius: 32, drawSize: 20, fill: "#251915" },
    { jointRadius: 32, drawSize: 15, fill: "#251915" },
    { jointRadius: 32, drawSize: 10, fill: "#da2f14" },
    { jointRadius: 32, drawSize: 10, fill: "#da2f14" },
];

let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    let body = new BodyJointGroup(exampleJointArray, 500, 200, 150);
    jointGroupsArr.push(body);
    
}


function draw() {
    background(240);




    drawAll();
}


//GRAPHICS
function drawAll() {

    drawJointGroups();
}


function drawText() {
    push();
    textSize(30);
    fill("#000000");
    text("Drag with mouse", 50, 50);
    pop();
}

function drawJointGroups() {
    jointGroupsArr.forEach(e => {
        e.act();
    });
}



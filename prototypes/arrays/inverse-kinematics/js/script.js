/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

const CANVAS = {
    x: 1920,
    y: 1080
}

let exampleJointArray = [
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 100, fill: "#2496c7" },
];

let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    let jointGroup = new JointGroup(exampleJointArray,500,200);
    jointGroupsArr.push(jointGroup);
    
}


function draw() {
    background(240);




    drawAll();
}





//GRAPHICS
function drawAll() {
    // drawText();

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



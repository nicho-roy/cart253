/**
 * Grabber
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


let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    // let jointGroup = new JointGroup(debugJointarr, 500, 200, 80);
    // let jointGroup = new JointGroup(debugJointarr2, 500, 200, 80);
    // let jointGroup = new JointGroup(exampleJointArray, 500, 200, 150);
    let jointGroup = new JointGroup(snakeJointsArray, 500, 200, 150);
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



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

let debugJointarr = [
    { jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    { jointRadius: 50, drawSize: 10, fill: "#c72424" },
    { jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
];


let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    let ikJoint = new IKJointGroup(debugJointarr, 500, 200, 150);
    // let ikJoint = new IKJointGroup(snakeJointsArray, 500, 200, 150);
    jointGroupsArr.push(ikJoint);
    
}


function draw() {
    background(240);




    drawAll();
}


//GRAPHICS
function drawAll() {

    drawJointGroups();
}


function drawJointGroups() {
    jointGroupsArr.forEach(e => {
        e.act();
    });
}



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


let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);


    // jointGroupsArr.push(jointGroup);
    
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



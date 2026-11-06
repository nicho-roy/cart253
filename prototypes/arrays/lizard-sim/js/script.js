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


let debugLizardJointarr2 = [
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#5ac724" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#fc1511" },
    { type: "limb", joints: [
        { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
        { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
        { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
    ]},
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#fc1511" },
    {
        type: "limb", joints: [
            { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
            { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
            { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
        ]
    },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },

];
    


let lizardJointArr = [
    { type: "joint", jointRadius: 50, drawSize: 80, fill: "#f41b2d" },
    { type: "joint", jointRadius: 50, drawSize: 120, fill: "#f41b2d" },
    { type: "joint", jointRadius: 50, drawSize: 120, fill: "#f41b2d" },
    { type: "joint", jointRadius: 50, drawSize: 90, fill: "#f41b2d" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#f41b2d" },
    {
        type: "limb", joints: [
            { jointRadius: 80, drawSize: 70, fill: "#f41b4a" },
            { jointRadius: 80, drawSize: 70, fill: "#f41b4a" },
            { jointRadius: 80, drawSize: 100, fill: "#d22481" },
        ], orientation: 1, //pos for front
    },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#f41b4a" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#f41b7d" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#8f15a8" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#7515a8" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#4b15a8" },
    {
        type: "limb", joints: [
            { jointRadius: 80, drawSize: 70, fill: "#4b15a8" },
            { jointRadius: 80, drawSize: 70, fill: "#4b15a8" },
            { jointRadius: 80, drawSize: 100, fill: "#7e16bb" },
        ], orientation: -1, //neg for hind
    },
    { type: "joint", jointRadius: 50, drawSize: 95, fill: "#4717b5" },
    { type: "joint", jointRadius: 50, drawSize: 90, fill: "#1a12ba" },
    { type: "joint", jointRadius: 50, drawSize: 85, fill: "#190fc9" },
    { type: "joint", jointRadius: 50, drawSize: 80, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 70, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 60, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 50, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 40, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 30, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 20, fill: "#1d13d3" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#1d13d3" },

];


let jointGroupsArr = [];


async function setup() {
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    let body = new BodyJointGroup(lizardJointArr, 500, 200, 150);
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



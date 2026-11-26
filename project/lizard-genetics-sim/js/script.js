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

//unused
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

//unused
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

//unused
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
            { jointRadius: 50, drawSize: 10, fill: "#660f56" },
            { jointRadius: 50, drawSize: 10, fill: "#d224b2" },
        ]
    },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },
    { type: "joint", jointRadius: 50, drawSize: 10, fill: "#24c7bc" },

];


let lizardSmallJointArr = [
    { type: "joint", jointRadius: 5, drawSize: 8, fill: "#f41b2d" },
    { type: "joint", jointRadius: 5, drawSize: 12, fill: "#f41b2d" },
    { type: "joint", jointRadius: 5, drawSize: 12, fill: "#f41b2d" },
    { type: "joint", jointRadius: 5, drawSize: 9, fill: "#f41b2d" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#f41b2d" },
    {
        type: "limb", joints: [
            { jointRadius: 8, drawSize: 7, fill: "#f41b4a" },
            { jointRadius: 8, drawSize: 7, fill: "#f41b4a" },
            { jointRadius: 8, drawSize: 10, fill: "#d22481" },
        ],
    },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#f41b4a" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#f41b7d" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#8f15a8" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#7515a8" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "#4b15a8" },
    {
        type: "limb", joints: [
            { jointRadius: 8, drawSize: 7, fill: "#4b15a8" },
            { jointRadius: 8, drawSize: 7, fill: "#4b15a8" },
            { jointRadius: 8, drawSize: 10, fill: "#7e16bb" },
        ],
    },
    { type: "joint", jointRadius: 5, drawSize: 9.5, fill: "#4717b5" },
    { type: "joint", jointRadius: 5, drawSize: 9.0, fill: "#1a12ba" },
    { type: "joint", jointRadius: 5, drawSize: 8.5, fill: "#190fc9" },
    { type: "joint", jointRadius: 5, drawSize: 8.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 7.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 6.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 5.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 4.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 3.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 2.0, fill: "#1d13d3" },
    { type: "joint", jointRadius: 5, drawSize: 1.0, fill: "#1d13d3" },

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
        ]
    },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#f41b4a" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#f41b7d" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#8f15a8" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#7515a8" },
    { type: "joint", jointRadius: 50, drawSize: 100, fill: "#4b15a8" },
    {
        type: "limb", joints: [
            { jointRadius: 70, drawSize: 70, fill: "#4b15a8" },
            { jointRadius: 80, drawSize: 70, fill: "#4b15a8" },
            { jointRadius: 80, drawSize: 100, fill: "#7e16bb" },
        ]
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



let lizardBaseArr = [
    { type: "joint", jointRadius: 5, drawSize: 8, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 12, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 12, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 9, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    {
        type: "limb", joints: [
            { jointRadius: 8, drawSize: 7, fill: "" },
            { jointRadius: 8, drawSize: 7, fill: "" },
            { jointRadius: 8, drawSize: 10, fill: "" },
        ],
    },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 10, fill: "" },
    {
        type: "limb", joints: [
            { jointRadius: 8, drawSize: 7, fill: "" },
            { jointRadius: 8, drawSize: 7, fill: "" },
            { jointRadius: 8, drawSize: 10, fill: "" },
        ],
    },
    { type: "joint", jointRadius: 5, drawSize: 9.5, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 9.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 8.5, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 8.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 7.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 6.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 5.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 4.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 3.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 2.0, fill: "" },
    { type: "joint", jointRadius: 5, drawSize: 1.0, fill: "" },

];


let objArr = []; //every item must have: pos, act()
let simSpeed = 1;
let simTick = 0; //essentially the frame count, accounting for sim speed

async function setup() {
    pixelDensity(0.001);
    angleMode(DEGREES);
    createCanvas(CANVAS.x, CANVAS.y);

    let gui = new UIL.Gui({ // interfaccia
        css: 'right:0; top:0;',
        bg: '#7a7ab4', // to update new version
        w: 300,
        p: 30,
    });
    setupGui(gui);

    Lizard.SpawnLizards(5);
    Food.SpawnFood(0);

    
}

function draw() {
    drawSim(simSpeed);
}

/**
 * draws the simulation at a speed mult
 * @param {*} amt 
 */
function drawSim(amt) {
    for (let i = 0; i < amt; i++) {
        simTick++;
        background(240);

        Food.TickFoodGeneration(1);
        drawArr(objArr);
        drawText();
    }
}

let fpsSmooth = 60;
function drawText() {
    push();
    textSize(12);
    fill("#000000");
    fpsSmooth = lerp(fpsSmooth, frameRate(), 0.05);
    text(`FPS: ${fpsSmooth.toFixed()}, obj ${objArr.length}`, 20, 20);
    pop();
}


function setupGui(gui) {
    gui.add('slide', {name: 'Sim Speed', value: 1, min: 1, max: 50, step: 1}).onChange(
        function(value){ simSpeed = value}
    );
    gui.add('button', { name: 'Pause', h:70}).onChange(
        function () {
            if (simSpeed == 0) {
                simSpeed = 1;
            } else {
                simSpeed = 0;
            }
        }
    );
}

function doSkipDraw() {
    if (simSpeed > 5) {
        return true;
    } else {
        return false;
    }
}

function drawArr(arr) {
    arr.forEach(e => {
        e.act();
    });
}




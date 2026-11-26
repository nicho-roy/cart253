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

//base arryay for lizard body plans
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
let foodSpawnRate = 1.5;
let showPerception = false;
let showStats = true;
let showBody = true;
let bgColor = "rgb(240, 240, 240)"

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

    Lizard.SpawnLizards(30);
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
        background(bgColor);

        Food.TickFoodGeneration(foodSpawnRate);
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
    const gui_grp1 = gui.add('group', { name: 'PLAYBACK' });
    gui_grp1.add('slide', {name: 'Sim Speed', value: 1, min: 1, max: 50, step: 1}).onChange(
        function(value){ simSpeed = value}
    );
    gui_grp1.add('button', { name: 'Pause', h:50}).onChange(
        function () {
            if (simSpeed == 0) {
                simSpeed = 1;
            } else {
                simSpeed = 0;
            }
        }
    );

    const gui_grp2 = gui.add('group', { name: 'GRAPHICS' });
    gui_grp2.add('button', { name: 'Toggle Body', h: 30 }).onChange(
        function () { showBody = !showBody }
    );
    gui_grp2.add('button', { name: 'Toggle Stats', h: 30 }).onChange(
        function () { showStats = !showStats }
    );
    gui_grp2.add('button', { name: 'Toggle Percpetion', h: 30 }).onChange(
        function () { showPerception = !showPerception }
    );
    gui_grp2.add('color', { name: 'Bg Color', callBack: bgColor, h: 30 }).onChange(
        function (value) {
            //adjust for the weird format color comes in (hex integer)
            bgColor = color((value >> 16) & 255, (value >> 8) & 255, value & 255);
        }
    );
    

    const gui_grp3 = gui.add('group', { name: 'ACTIONS' });
    gui_grp3.add('button', { name: 'Spawn Lizard', h: 50 }).onChange(
        function () { Lizard.SpawnLizards(1) }
    );
    gui_grp3.add('button', { name: 'Clear Bodies', h: 50 }).onChange(
        function () { objArr.forEach(e => {
            if (!(e.alive)) e.remove();
        }) }
    );
    gui_grp3.add('number', { name: 'Food Rate', value: foodSpawnRate, min: 0, max: 100, step: 0.1 }).onChange(
        function (value) { foodSpawnRate = value }
    );
    gui_grp3.add('slide', { name: 'Mutation Rate', value: Lizard.MUTATION_MULT, min: 1, max: 3, step: 0.1 }).onChange(
        function (value) { Lizard.MUTATION_MULT = value }
    );
}

function drawArr(arr) {
    arr.forEach(e => {
        e.act();
    });
}




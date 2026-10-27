/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";

let cellsArr = [];

let cellSize = 10;

//data
let json = {
    meta: {
        ver: "0.2.1",
        title: "Antfarm",
        author: "Nicholas Roy",
        writeCount: 0,
        lastSavedOn: "",
    },
    data: {
        playTime: 0,
        player: {
            pos: {
                x: 0,
                y: 0,
            },
        },
        cells: {

        },
    }
    
}

//game
let game = {
    isRunning: false,
    playTime: 0,
}


async function setup() {
    if (!game.isRunning) {
        createCanvas(CANVAS.x, CANVAS.y);
        enableButtons();
    } else {
        createCanvas(CANVAS.x, CANVAS.y);
        generateCells();





    }

}

function draw() {
    if (!game.isRunning) {
        background(240);
        drawInstructions();
    } else {
        background(220);
        game.playTime++;


        drawAll();
    }
}


function generateCells() {
    if (cellsArr.length > 0) return;
    console.log("gen");

    let cell = new Cell(0,0);

}






//GRAPHICS
function drawAll() {
    drawCells()
    drawPlayer()
}

function drawCells() {
    cellsArr.forEach(e => {
        e.draw();
    });
}


function drawPlayer() {
    push();

    pop();
}



/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";

let CellsArr = [];

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
        blocks: {

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
        generateBlocks();





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


function generateBlocks() {
    if (blocksArr.length > 0) return;


}






//GRAPHICS
function drawAll() {
    drawPlayer()
}

function drawCellss() {
    CellsArr.forEach(e => {
        e.draw();
    });
}


function drawPlayer() {
    push();

    pop();
}



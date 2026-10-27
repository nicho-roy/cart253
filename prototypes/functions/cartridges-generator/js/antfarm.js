/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";

let cellsArr = [];
let cellSize = 10;
const PERCENT_GROUND_FILL = 0.60;

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
            cells: 0,
        },
        cells: [],
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
        console.log(cellsArr);




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
    if (cellsArr.length == 0) {
        generateNewCells();
        console.log("generated new cells");
        return;
    }
    
    //rebuild existing cells
    json.data.cells.forEach((e) => {
        let cell = new Cell(e.x,e.y);
    });

}

function generateNewCells() {
    let widthInCells = CANVAS.x / cellSize;
    let heightInCells = CANVAS.y / cellSize;

    for (let i = 0; i < heightInCells * PERCENT_GROUND_FILL; i++) {
        for (let j = 0; j < widthInCells; j++) {
            //make top layer uneven
            if (i + 1 >= heightInCells * PERCENT_GROUND_FILL && random(1) > 0.5) {
                continue;
            }
            let cell = new Cell(j, heightInCells - i);
        }
    }
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



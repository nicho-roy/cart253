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
        version: "0.2.2",
        title: "Antfarm",
        author: "Nicholas Roy",
        writeCount: 0,
        lastSavedOn: "",
    },
    data: {
        playTime: 0,
        player: {
            pos: {
                x: CANVAS.x/10/2,
                y: 0,
            },
            inventory: 0,
        },
        cells: [],
    }
    
}

//game
let game = {
    isRunning: false,
    playTime: 0,
}

const INPUT_DELAY = 10;
let inputDelayClock = 0;
let playerActionable = true;


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

        runInput();

        drawAll();
    }
}


//CONTROLS
function runInput() {
    inputDelayClock++;
    inputDelayClock = constrain(inputDelayClock,0,INPUT_DELAY);
    if (inputDelayClock >= INPUT_DELAY) {
        getInput();
        adjustPlayerPosition();
    }
}

function getInput() {
    if (keyIsDown('w')) {
        movePlayerInDirection('w');
    }
    if (keyIsDown('a')) {
        movePlayerInDirection('a');
    }
    if (keyIsDown('s')) {
        movePlayerInDirection('s'); 
    }
    if (keyIsDown('d')) {
        movePlayerInDirection('d');
    }

    if (keyIsDown('Space')) {
        if (!playerActionable) return;
        let cell = getCellAt(json.data.player.pos.x, json.data.player.pos.y)
        if (cell) {
            json.data.player.inventory += 1;
        } else if (json.data.player.inventory > 0) {
            //if cell beneath you place on player, else place beneath
            if (getCellAt(json.data.player.pos.x, json.data.player.pos.y + 1)) {
                let cell = new Cell(json.data.player.pos.x, json.data.player.pos.y);
            } else {
                let cell = new Cell(json.data.player.pos.x, json.data.player.pos.y + 1);
            }
        }
        playerActionable = false;
        console.log(cell);
    }
}

function adjustPlayerPosition() {
    //wall bounds
    if (json.data.player.pos.x > CANVAS.x / 10) {
        movePlayerInDirection('a');
        movePlayerInDirection('a');
    }
    if (json.data.player.pos.y > CANVAS.y / 10) {
        movePlayerInDirection('w');
        movePlayerInDirection('w');
    }
    if (json.data.player.pos.x < 0) {
        movePlayerInDirection('d');
    }
    if (json.data.player.pos.y < 0) {
        movePlayerInDirection('s');
    }

    //if floating, hit floor
    if (!getCellAt(json.data.player.pos.x, json.data.player.pos.y + 1)) {
        movePlayerInDirection('s');
    }
}

function movePlayerInDirection(dir) {
    if (dir == 'w') {
        json.data.player.pos.y -= 1;
        inputDelayClock = 0;
        playerActionable = true;
    }
    if (dir == 'a') {
        json.data.player.pos.x -= 1;
        inputDelayClock = 0;
        playerActionable = true;
    }
    if (dir == 's') {
        json.data.player.pos.y += 1;
        inputDelayClock = 0;
        playerActionable = true;
    }
    if (dir == 'd') {
        json.data.player.pos.x += 1;
        inputDelayClock = 0;
        playerActionable = true;
    }
}

function getCellAt(x,y) {
    return cellsArr.find(e => e.pos.x == x && e.pos.y == y);
}

//! unused, too slow
// function keyPressed() {
//     if (key === 'w') {
//         json.data.player.pos.y -= 1;
//     }
//     if (key === 'a') {
//         json.data.player.pos.x -= 1;
//     }
//     if (key === 's') {
//         json.data.player.pos.y += 1;
//     }
//     if (key === 'd') {
//         json.data.player.pos.x += 1;
//     }
// }












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
    noStroke();
    fill(10);
    rect(json.data.player.pos.x * cellSize, json.data.player.pos.y * cellSize, cellSize, cellSize);
    pop();
}



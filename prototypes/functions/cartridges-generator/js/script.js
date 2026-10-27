/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";

const CANVAS = {
    x: 720,
    y: 480,
}

//UI buttons
let obtainButton;
let dockButton;
let ejectButton;

//for non docking
let input;
let output;
//for docking
let fileHandle = null;
//data
let json = {
    meta: {
        ver: "0.1.0",
        title: "silly.exp",
        author: "Nicholas Roy",
        writeCount: 0,
        lastSavedOn: "",
    },
    data: {
        playTime: 0,
    }
    
}

//game
let game = {
    isRunning: false,
    playTime: 0,
}



async function setup() {
    createCanvas(CANVAS.x,CANVAS.y);
    enableButtons();
    

    // exportSave();
    
}


function draw() {
    background(240);

    if (!game.isRunning) {
        drawInstructions();
    } else {
        game.playTime++;



    }
}


//GAME 
function startGame() {
    disableButtons();
    game.isRunning = true;


}

function stopGame() {
    enableButtons();
    game.isRunning = false;
    game.playTime = 0;
}

function saveGameStateToJson() {
    json.data.playTime += game.playTime;
}





//IO
async function dockFile() {
    [fileHandle] = await window.showOpenFilePicker({
        types: [{description: "JSON", accept: {"application/json": [".json"]} }]
    });
    const file = await fileHandle.getFile();
    let fileText = await file.text();
    console.log('fileText', fileText);
    json = JSON.parse(fileText);
    console.log("file docked!");

    startGame();
}

async function ejectFile() {
    if (!fileHandle) return;
    saveGameStateToJson();
    //browser will prompt write permissions
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(json,null,3));
    await writable.close();
    console.log("File ejected");
    fileHandle = null;
    stopGame();
}




//for non-dock file export
function exportSave() {
    // let writer = createWriter('cartridge.json');
    saveJSON(json, "data.json");
}

//for non-dock file input
function handleInputFile(inputFile) {
    console.log("inputFile: ", inputFile);
    console.log("inputFile type: ", inputFile.type);
    console.log("inputFile data: ", inputFile.data);
    file = inputFile;

}


//GRAPHICS
function enableButtons() {
    //non chrome file input
    // input = createFileInput(handleInputFile);
    // input.position(0, 0);

    obtainButton = createButton("Obtain Blank Cartridge");
    obtainButton.mousePressed(exportSave);

    dockButton = createButton("Dock Cartridge");
    dockButton.mousePressed(dockFile);

    if (ejectButton) {
        ejectButton.remove();
    }
}

function disableButtons() {
    obtainButton.remove();

    dockButton.remove();

    ejectButton = createButton("Eject Cartridge");
    ejectButton.mousePressed(ejectFile);
}

function drawInstructions() {
    push();
    text("Dock an existing cartridge save, or obtain and insert a new one to start playing!",width/2-200,height/2);
    // text("Note that cartridge docking might not work on browsers other than chrome, so you'll need to insert your cartridge file at the top left instead", width / 2, height / 2);
    pop();
}

function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}



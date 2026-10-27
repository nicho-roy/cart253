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
let statelessButton;
let ejectButton;

//for non docking
let input;
let output;
//for docking
let fileHandle = null;



//GAME 
function startGame() {
    disableButtons();
    game.isRunning = true;
    setup();
}

function stopGame() {
    game.isRunning = false;
    game.playTime = 0;
    setup();
}

function startStatelessGame() {
    disableButtons();
    game.isRunning = true;
    setup();
}

function saveGameStateToJson() {
    //meta
    json.meta.writeCount += 1;
    let y = year();
    let m = month();
    let d = day();
    json.meta.lastSavedOn = `${y}-${m}-${d}`;

    //game
    json.data.playTime += game.playTime;
    //save cells
    cellsArr.forEach((e,index) => {
        json.data.cells[index] = {x: e.pos.x ,y: e.pos.y};
    });
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
    console.log("file ejected: ",json);
    fileHandle = null;
    stopGame();
}




//obtain blank save
function exportSave() {
    saveJSON(json, "cartridge.json");
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

    statelessButton = createButton("Play Stateless Mode");
    statelessButton.mousePressed(startStatelessGame);

    if (ejectButton) {
        ejectButton.remove();
    }
}

function disableButtons() {
    obtainButton.remove();

    dockButton.remove();

    statelessButton.remove();

    ejectButton = createButton("Eject Cartridge");
    ejectButton.mousePressed(ejectFile);
}

function drawInstructions() {
    push();
    noStroke();
    textSize(16);
    fill(10, 40, 10);
    text("Dock an existing cartridge save, or obtain and insert a new one to start playing!",width/2-300,height/2);
    text("WASD to move, Space to break/build.", width / 2 - 300, height / 2 + 20);
    text("If docking cartridge files is blocked by browser, try playing in stateless mode.", width / 2 - 300, height / 2 + 40);
    pop();
}




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
    },
    data: {
        playTime: 0,
        saveCount: 0,
    }
    
}

//game
let isRunning = false;



async function setup() {
    createCanvas(CANVAS.x,CANVAS.y);

    input = createFileInput(handleInputFile);
    input.position(0, 0);

    let exportButton = createButton("Obtain Blank Cartridge");
    exportButton.mousePressed(exportSave);

    let dockButton = createButton("Dock Cartridge");
    dockButton.mousePressed(dockFile);

    let ejectButton = createButton("Eject Cartridge");
    ejectButton.mousePressed(ejectFile);

    // exportSave();
    
}


function draw() {
    background(240);
    
    // console.log("file: ",file);
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



function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}



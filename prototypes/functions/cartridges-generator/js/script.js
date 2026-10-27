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


let file;
//for non docking
let input;
let output;
//for docking
let fileHandler = null;
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



async function setup() {
    createCanvas(CANVAS.x,CANVAS.y);
    input = createFileInput(handleFile);
    input.position(0, 0);

    // writeSave();
    
}


function draw() {
    background(240);
    
    // console.log("file: ",file);
}

//IO
async function dockFile() {
    
}

async function ejectFile() {

}




//for non-dock file export
function writeSave() {
    // let writer = createWriter('cartridge.json');
    saveJSON(data, "mydata.json");
}

//for non-dock file input
function handleFile(file) {
    console.log("file: ", file);
    console.log("file type: ", file.type);
    console.log("file data: ", file.data);
    let file

}



function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}



/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";


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
    if (!game.isRunning) {
        background(240);
        drawInstructions();
    } else {
        background(220);
        game.playTime++;



    }
}



function drawPlayers() {
    player.forEach(e => {
        e.act();
        e.draw();
    });
}



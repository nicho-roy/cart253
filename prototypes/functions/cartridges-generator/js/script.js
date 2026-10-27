/**
 * Cartridge Generator
 * Nicholas Roy
 * 
 * Prototype 2
 */

"use strict";




async function setup() {

    
}


function draw() {
    background(240);
    
}




function drawPlayers() {
    playerArr.forEach(e => {
        e.act();
        e.draw();
    });
}

function drawProjectiles() {
    projArr.forEach(e => {
        e.act();
        e.draw();
    });
}



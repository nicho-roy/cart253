/**
 * Git Workflow Example
 * Pippin Barr
 * 
 * Some sample code for playing with version control.
 * Draws a pyramid in the centre of the canvas and a
 * red circle at the user's mouse position.
 */

"use strict";

/**
 * Create a canvas, hides the cursor
*/
function setup() {
    // A 640x480 canvas
    createCanvas(640, 640);

    // Don't show the cursor
    noCursor();
}

/**
 * Draws a top-down view of a pyramid and also a red circle
 * at the position of the user's cursor
*/
function draw() {
    // Make the background black (specified as RGB)
    background(0, 0, 0);

    // Draw a pyramid
    // How many levels for the pyramid
    const levels = 1000;
    // Loop through every level (backwards)
    for (let level = levels; level > 0; level--) {
        // Draw this layer
        push();
        // Set the grey shade of the level based on its number
        // e.g. level 1 will get a shade of 10 (dark gray), 
        // level 10 will be 255(white)
        const shade = map(level, 1, levels, 10, 255);
        // No line around the levels
        noStroke();
        // Set the fill colour to our shade (RGB)
        fill(shade, shade, 0);
        // Draw rectangles from the centre
        rectMode(CENTER);
        // Draw the rectangle in the centre of the canvas
        // (320, 320) with a size based on the level
        // e.g. level 1 will be a 48x48 rectangle and
        // level 10 will be a 480x480 rectangle
        rect(320, 320, level * 5, level * 1);
        pop();
    }

    // Draw a red circle at the position of the mouse
    push();
    // No line around the shape
    noStroke();
    // Make it red (RGB)
    fill(255, 0, 0);
    // Draw a 100x100 circle at the mouse position
    //ellipse(mouseX + offsetX, mouseY + offsetY, 100, 100);
    pop();

    drawShape(70,100,300,200);
    drawShape(90,200,100,-150);
    //drawShape(45,150,800,-150);
}


function drawShape(distance = 10, width = 1, height = 5,pos=0) {
    // Make the background black (specified as RGB)
    //background(0, 0, 0);

    // Draw a pyramid
    // How many levels for the pyramid
    // Loop through every level (backwards)
    // Draw this layer
    //push();
    // Set the grey shade of the level based on its number
    // e.g. level 1 will get a shade of 10 (dark gray), 
    // level 10 will be 255(white)

    const shade = map(distance, 100, 1, 10, 255);
    // No line around the levels
    noStroke();
    // Set the fill colour to our shade (RGB)
    fill(shade, shade, 0);
    // Draw rectangles from the centre
    rectMode(CENTER);
    // Draw the rectangle in the centre of the canvas
    // (320, 320) with a size based on the level
    // e.g. level 1 will be a 48x48 rectangle and
    // level 10 will be a 480x480 rectangle
    rect(320+pos, 320, width, height);
    
}
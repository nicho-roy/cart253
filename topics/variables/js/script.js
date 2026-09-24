/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

let backgroundColor = {
    r: 135,
    g: 206,
    b: 250
}



// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
        r: 255,
        g: 225,
        b: 225
    }
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);

    turnRed();
    //shake
    let xShake = random(-5, 5);
    let yShake = random(-5, 5);
    ellipse(mrFurious.x + xShake, mrFurious.y + yShake, mrFurious.size);
    pop();

    darkenSky();

}

function turnRed() {
    mrFurious.fill.g -= 0.8;
    mrFurious.fill.b -= 0.5;
}

function darkenSky() {
    backgroundColor.r -= 0.5;
    backgroundColor.g -= 0.5;
    backgroundColor.b -= 0.5;

    backgroundColor.r = constrain(backgroundColor.r, 25, 255);
    backgroundColor.g = constrain(backgroundColor.g, 25, 255);
    backgroundColor.b = constrain(backgroundColor.b, 112, 255);
}

function shake() {
    let x = random(-3,3);
    let y = random(-3,3);


}


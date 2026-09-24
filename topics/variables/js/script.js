/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

let whistle = "./assets/sounds/whistle.mp3";

let backgroundColor = {
    r: 135,
    g: 206,
    b: 250
};


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
    },
    image: "./assets/images/angry.jpg",
    rageOffset: 0.1,
    rage: 0.01,
};

let bird = {
    image: "./assets/images/chicken.jpg",
    angle: 0,
    x: 0,
    y: 0,
}


/**
 * Create the canvas
 */
async function setup() {
    bird.image = await loadImage(bird.image);
    whistle = await loadSound(whistle);
    mrFurious.image = await loadImage(mrFurious.image);
    createCanvas(400, 400);
    //sound
    whistle.play();
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    background(backgroundColor.r, backgroundColor.g, backgroundColor.b);
    darkenSky();

    // Draw Mr. Furious as a coloured circle
    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);

    turnRed();

    //shake
    let xShake = random(-mrFurious.rageOffset, mrFurious.rageOffset);
    let yShake = random(-mrFurious.rageOffset, mrFurious.rageOffset);
    mrFurious.rageOffset += mrFurious.rage;
    mrFurious.rageOffset = constrain(mrFurious.rageOffset,0,100);
    //texture(mrFurious.image);
    ellipse(mrFurious.x + xShake, mrFurious.y + yShake, mrFurious.size);
    pop();



    //bird
    push();
    bird.angle += 0.5;
    bird.x += 1;
    bird.y = 100 + sin(bird.angle) * 30;
    image(bird.image,bird.x,bird.y,80,80)

    pop();
   

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




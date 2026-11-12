/**
 * Terrible New Car
 * Pippin Barr
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = "./assets/data/cars.json";
let dinosaurData = "./assets/data/dinosaurs.json";
let langData = undefined;
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
async function preload() {
    carData = await loadJSON(carData);
    dinosaurData = await loadJSON(dinosaurData);
}

/**
 * Create the canvas
*/
async function setup() {
    createCanvas(600, 400);

    await preload();
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    carName = `${getRandomFromArr(carData.cars)} ${getRandomFromArr(dinosaurData.dinosaurs)}`;
}

function getRandomFromArr(arr) {
    const arrLength = arr.length;
    const randomIndex = Math.trunc(random(0,arrLength-1));
    return arr[randomIndex];
}
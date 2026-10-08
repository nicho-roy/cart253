/**
 * The Only Move Is Not To Play
 * Pippin Barr
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Update the score and display the UI
 */
function draw() {
    background("#87ceeb");

    // Only increase the score if the game is not over
    if (!gameOver) {
        // Score increases relatively slowly
        score += 0.05;
    }
    displayUI();
}

function lose() {
    gameOver = true;
}

function mouseClicked() {
    console.log("click");
    lose();
}

function keyTyped() {
    console.log("typed");
    lose();
}

function mouseMoved() {
    console.log("moved");
    lose();
}

function mouseWheel(event) {
    // Access the scroll distance via event.delta
    console.log("scrolled, distance: ",event.delta);
    lose();

}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
    if (gameOver) {
        push();
        textSize(48);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text("You lose!", width / 2, height / 3);
        pop();
    }
    displayScore();
}

/**
 * Display the score
 */
function displayScore() {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(floor(score), width / 2, height / 2);
    pop();
}
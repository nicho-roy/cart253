/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
    x: 200,
    y: 200,
    size: 100,
    fill: "#ff0000"
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(1000, 1000);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
    background("#aaaaaa");

    // Move user circle
    moveUser();

    console.log(IsOverlapping());
    if (IsOverlapping()) {
        MovePuck();
    }

    // Draw the user and puck
    drawUser();
    drawPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
}

function IsOverlapping() {
    let d = dist(user.x, user.y, puck.x, puck.y);
    if (d > ((user.size / 2) + (puck.size / 2))) {
        return false;
    } else {
        return true;
    }
}

function MovePuck() {
    let vX = puck.x - user.x;
    let vY = puck.y - user.y;
    puck.x += vX;
    puck.y += vY;

}
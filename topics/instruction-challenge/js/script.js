/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
const amplitude = 200;
const angleStep = 0.01; //SPEED, 0.01 idealy

let angle = 0;
let earthImage
let moonImage;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
async function setup() {
    earthImage = await loadImage('./assets/images/earthImage.jpg');
    moonImage = await loadImage('./assets/images/moonImage.jpg');

    createCanvas(720,400,WEBGL);
    noStroke(); //removes mesh outline
    describe('Earth and moon celestial model');
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(200);
    orbitControl();
    
    //# EARTH
    push();
    //rotate earth
    rotateX(0.1);
    rotateZ(0.1);
    rotateY(angle);

    //texture
    texture(earthImage);

    //draw earth
    sphere();

    pop();

    //# MOON
    push();
    //moves the sphere
    angle +=  angleStep;
    let xPos = cos(angle);
    let yPos = sin(angle);
    translate(amplitude*xPos, amplitude/10*yPos, amplitude*yPos); 

    //texture
    texture(moonImage);

    //draw moon
    sphere(10);

    pop();

    console.log('frame');
}
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
const starCount = 4000;
const starDistance = 5000;

let angle = 0;
let earthImage
let moonImage;
let skyboxImage;
let sunImage;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
async function setup() {
    earthImage = await loadImage('./assets/images/earthImage.jpg');
    moonImage = await loadImage('./assets/images/moonImage.jpg');
    skyboxImage = await loadImage('./assets/images/endPortal.jpg');
    sunImage = await loadImage('./assets/images/sunImage.jpg');

    createCanvas(720,400,WEBGL);
    noStroke(); //remov. es mesh outline
    describe('Earth and moon celestial model');
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);
    orbitControl();

    //# SKYBOX

    // //skybox
    // push();
    // texture(earthImage);
    // sphere(3000);
    // pop();
    
    //# EARTH
    push();
    //rotate earth
    rotateX(0.1);
    rotateZ(0.1);
    rotateY(angle/3);

    //texture
    texture(earthImage);

    //draw earth
    sphere();

    pop();

    //# MOONS
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


    push();

    randomSeed(1);
    for(let i = 0; i < starCount; i++) {
        push();
        let theta = random(2*PI);
        let phi = acos(random(-1, 1)); // gives uniform spherical distribution
        let xPos = sin(phi) * cos(theta);
        let yPos = sin(phi) * sin(theta);
        let zPos = cos(phi);
        translate(starDistance*xPos, starDistance*yPos, starDistance*zPos); 
        texture(sunImage);
        sphere(random(3,5));
        pop();
    }

    pop();

    // randomSeed(1);
    // let randX, randY, randZ;
    // for(let i = 0; i < 1; i++) {
    //     //TODON: add random colors for stars
    //     push();
    //     randX = random(PI*2);
    //     randY = random(PI*2);
    //     randZ = random(PI*2);
        
    //     fill(255,240,200);
    //     // translate(randX*amplitude,randY*amplitude,randZ*amplitude);
        
    //     rotateX(randX);
    //     rotateY(randY);
    //     rotateZ(randZ);
        
    //     sphere(10);
    //     pop();
    // }

    console.log('frame');
}
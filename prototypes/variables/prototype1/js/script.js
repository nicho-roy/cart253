/**
 * Git Workflow Example
 * Pippin Barr
 */

"use strict";

//INIT VALUES
let canvas = {
    width: 1300,
    height: 700
}
let fishArr = [];
let algaeArr = [];
let algaeSpawnRate = 100;

//CLASSES
class Fish {
    constructor (posX,posY,size,metabolism) {
        this.posX = posX;
        this.posY = posY; 
        this.size = size;
        this.metabolism = metabolism;
    }

    GetClosestFoodPostion() {

    }

    MoveTowardsDestination(destinationX,destinationY) {
        
    }

    Duplicate() { //lmao sex

    }

    Draw() {

    }
}

class Algae {
    constructor (posX,posY) {
        this.posX = posX;
        this.posY = posY; 
        algaeArr.push(this);
    }

    Duplicate() {
        let randX = random(-50,50);
        let randY = random(-50,50);
        randX = constrain(randX,0,canvas.width);
        randY = constrain(randY,0,canvas.height);
        let algae = new Algae();
    }

    Draw() {
        push();
        randomSeed(1);
        fill(random(0,100),random(50,255),random(0,100));
        noStroke();
        rect(this.posX,this.posY,10,10)
        pop();
    }
}


function setup() {
    createCanvas(canvas.width, canvas.height);

    new Algae(100,100);
    //noCursor();
}


function draw() {
    background(43, 116, 189);


    
    drawObjects();
}


function drawObjects() {
    fishArr.forEach(e => {
        e.Draw();
    });
    console.log("fish: ",fishArr);
    algaeArr.forEach(e => {
        e.Draw();
    });
    console.log("algae: ",algaeArr);
}

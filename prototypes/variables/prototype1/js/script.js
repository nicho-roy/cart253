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
let fishImg = "./assets/images/cod.png";
let algaeArr = [];
let algaeSpawnChance = 0.001;

//CLASSES
class Fish {
    constructor (posX,posY,size=50,speed=5) {
        this.posX = posX;
        this.posY = posY; 
        this.size = size;
        this.speed = speed;
        fishArr.push(this);
    }

    ChaseFood() {

    }

    GetClosestFood() {
        let closest;
        algaeArr.forEach(e => {
            if (closest = null) {
                closest = e;
                return;
            }
            // let newDistance = Math.sqrt((e.posX-this.posX)**2 + (e.posY-this.posY)**2)
            let oldDist = dist(this.posX,this.posY,closest.posX,closests.posY);
            let newDist = dist(this.posX,this.posY,e.posX,e.posY);
            if (newDist < oldDist) {
                closest = e;
            }
        });
        return closest;
    }

    MoveTowardsDestination(food) {
        
    }

    Duplicate() { //lmao sex

    }

    static SpawnBatch(count) {
        for (let i = 0; i < count; i++) {
            let fish = new Fish(random(0,canvas.width),random(0,canvas.height));
        }
    }

    Draw() {
        push();
        image(fishImg,this.posX,this.posY,this.size,this.size)
        pop();
    }
}

class Algae {
    constructor (posX,posY) {
        this.posX = posX;
        this.posY = posY; 
        algaeArr.push(this);
    }

    AttemptReproduction() {
        randomSeed();
        let rng = random(0,100);
        // console.log(rng);
        if (rng<=algaeSpawnChance) {
            this.Duplicate();
        }
    }

    Duplicate() {
        randomSeed();
        let randX = random(-50,50);
        let randY = random(-50,50);
        randX = constrain(randX,0,canvas.width);
        randY = constrain(randY,0,canvas.height);
        let algae = new Algae(this.posX+randX,this.posY+randY);
    }

    static SpawnBatch(count) {
        for (let i = 0; i < count; i++) {
            let algae = new Algae(random(0,canvas.width),random(0,canvas.height));
        }
    }

    Draw() {
        push();
        // randomSeed(1);
        // fill(random(0,100),random(50,255),random(0,100));
        fill(80,200,45)
        noStroke();
        rect(this.posX,this.posY,10,10)
        pop();
    }
}


async function setup() {
    fishImg = await loadImage(fishImg);
    createCanvas(canvas.width, canvas.height);

    Algae.SpawnBatch(5);
    Fish.SpawnBatch(5);
}


function draw() {
    background(43, 116, 189);


    eventTick();
    drawObjects();
}


//defines behaviours that will occur each frame
function eventTick() {
    algaeArr.forEach(e => {
        e.AttemptReproduction();
    });
}

function drawObjects() {
    console.log("=======");
    fishArr.forEach(e => {
        e.Draw();
    });
    console.log("fish: ",fishArr.length);
    algaeArr.forEach(e => {
        e.Draw();
    });
    console.log("algae: ",algaeArr.length);
}

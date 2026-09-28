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
let fishInteractRange = 15;
let mutationMult = 1.25;
let algaeArr = [];
let startingFish = 5;
let fishStartingSize = 50;
let fishstartingSpeed = 1;
let startingAlgae = 500;
let algaeDuplicateRange = 400;
let algaeRangeAmtMax = 100;
let algaeSpawnChance = 0.3;

//TODON range detection for algae threshokld


//CLASSES
class Fish {
    constructor (posX,posY,size=50,speed=5,generation=1) {
        this.posX = posX;
        this.posY = posY; 
        this.size = size;
        this.speed = speed;
        this.hunger = size -1; //- (size/4)
        this.hunger = constrain(this.hunger,0,this.hunger*2);
        this.generation = generation;
        this.readyToMate = false;
        fishArr.push(this);
    }

    Act() {
        let target
        if (this.CanMate()) {
            target = this.GetClosestPartner();
            if (!target) {
                target = this.GetClosestFood();
            }
        } else {
            target = this.GetClosestFood();
        }

        if (target) {
            this.MoveTowardsDestination(target);
        }

        //death condition here
        this.hunger -= this.speed/this.size;
        if (this.hunger <= 0) {
            this.Die();
        }
    }

    GetClosestPartner() {
        let closest;
        fishArr.forEach(e => {
            if (e==this) {
                return;
            }
            if (!e.CanMate()) {
                return;
            }
            if (!closest) {
                closest = e;
                return;
            }
            // let newDistance = Math.sqrt((e.posX-this.posX)**2 + (e.posY-this.posY)**2)
            let oldDist = dist(this.posX,this.posY,closest.posX,closest.posY);
            let newDist = dist(this.posX,this.posY,e.posX,e.posY);
            if (abs(newDist) < abs(oldDist)) {
                closest = e;
            }
        });
        return closest;
    }

    GetClosestFood() {
        if (algaeArr.length<=0) {
            return false;
        }
        let closest;
        algaeArr.forEach(e => {
            if (!closest) {
                closest = e;
                return;
            }
            // let newDistance = Math.sqrt((e.posX-this.posX)**2 + (e.posY-this.posY)**2)
            let oldDist = dist(this.posX,this.posY,closest.posX,closest.posY);
            let newDist = dist(this.posX,this.posY,e.posX,e.posY);
            if (abs(newDist) < abs(oldDist)) {
                closest = e;
            }
        });
        return closest;
    }

     
    Die () {
        let index = fishArr.indexOf(this);
        fishArr.splice(index,1);
    }

    MoveTowardsDestination(target) {
        let v = createVector(target.posX-this.posX,target.posY-this.posY);
        // console.log("vector",v);
        v.normalize();
        // console.log("vectornorm",v);
        this.posX += v.x * this.speed;
        this.posY += v.y * this.speed/2;
        
        if (this.CanMate() && target instanceof Fish && target.CanMate() && (dist(this.posX,this.posY,target.posX,target.posY) <= fishInteractRange)) {
            this.Duplicate();
            this.hunger -= this.size;
            target.hunger -= target.size;
        } 
        this.AttemptEat();
    }

    Duplicate() { //lmao sex
        randomSeed();
        let randX = random(-100,100);
        let randY = random(-100,100);
        let spawnX = constrain(this.posX+randX,0,canvas.width);
        let spawnY = constrain(this.posY+randY,0,canvas.height);
        let randSize = random(this.size / mutationMult,this.size*mutationMult)
        let randSpeed = random(this.speed / mutationMult,this.speed*mutationMult)
        let fish = new Fish(spawnX,spawnY,randSize,randSpeed,this.generation++);
    }

    CanMate() {
        if (this.hunger>this.size*1.5) {
            this.readyToMate = true;
            return this.readyToMate;
        } else if (this.hunger<this.size) {
            this.readyToMate = false;
            return this.readyToMate
        } else {
            return this.readyToMate;
        }
    }

    AttemptEat() {
        algaeArr.forEach(e => {
            if (dist(this.posX,this.posY,e.posX,e.posY) <= fishInteractRange) {
                let index = algaeArr.indexOf(e);
                algaeArr.splice(index,1);
                this.hunger += 1;
            }
        });
    }

    static SpawnBatch(count) {
        for (let i = 0; i < count; i++) {
            let fish = new Fish(random(0,canvas.width),random(0,canvas.height),
            random(fishStartingSize / mutationMult,fishStartingSize*mutationMult),
            random(fishstartingSpeed / mutationMult,fishstartingSpeed*mutationMult));
        }
    }

    Draw() {
        push();
        image(fishImg,this.posX-(this.size/2),this.posY-(this.size/2),this.size,this.size)
        text("Gen: " + this.generation +
            "\nHunger: " + this.hunger.toPrecision(3) + 
            "\nSize: " + this.size.toPrecision(3) +
            "\nSpeed: " + this.speed.toPrecision(3)
            ,this.posX,this.posY);
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
        //checc if valid
        let algaeRangeAmt = 0;
        algaeArr.forEach(e => {
            let distance = dist(this.posX,this.posY,e.posX,e.posY);
            if (distance <= algaeDuplicateRange) {
                algaeRangeAmt += 1;
            }
        });
        if (algaeRangeAmt>algaeRangeAmtMax) {
            return
        }
        //init spawn
        randomSeed();
        let rng = random(0,100);
        if (rng<=algaeSpawnChance) {
            this.Duplicate();
        }
    }

    Duplicate() {
        randomSeed();
        let randX = random(-algaeDuplicateRange,algaeDuplicateRange);
        let randY = random(-algaeDuplicateRange,algaeDuplicateRange);
        let spawnX = constrain(this.posX+randX,0,canvas.width);
        let spawnY = constrain(this.posY+randY,0,canvas.height);
        let algae = new Algae(spawnX,spawnY);
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
        rect(this.posX-5,this.posY-5,10,10)
        pop();
    }
}


async function setup() {
    fishImg = await loadImage(fishImg);
    createCanvas(canvas.width, canvas.height);

    Algae.SpawnBatch(startingAlgae);
    Fish.SpawnBatch(startingFish);
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
    fishArr.forEach(e => {
        e.Act();
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

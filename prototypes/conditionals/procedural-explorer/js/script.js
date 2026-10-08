/**
 * Procedural explorer
 * Nicholas Roy
 * 
 * Prototype 3
 */

"use strict";


const CANVAS = {
    x: 800, 
    y: 800,
};
let noiseMap = generateArray(CANVAS.x,CANVAS.y);
let colorMap = generateArray(CANVAS.x,CANVAS.y);
let terrainImg;
let colorIndices; // to be converted to pixel color thresholds later
let pixelColorThresholds = []; //list of {thresholds, r, g, b}
//NOISE VARS
const RESOLUTION = 0.01;
let noiseOffsetX = 0;
let noiseOffsetY = 0;
//PLAYER
let player = {
    pos: 0,
    speed: 5,
    size: 10,
    fill: "red",
    chunk: {
        x: 0,
        y: 0,
    }
}
//GAMEPLAY
const TRANSITION_THRESHOLD = 0.80; //.8 means at 80% of the screen, it will transition


//OCTAVES, PERSISTANCE, LACUNARITY

//generate noise map
//assign colors to a color map
//when moving to new chunk, reroll noise map with offset



function setup() {
    //for human use
    colorIndices = new Map([
        [0.4, "#050c45"],
        [0.5, "#3675bc"],
        [0.6, "#d9dc7d"],
        [0.7, "#0e6222"],
        [0.8, "#0d3617"],
        [1, "#22130b"]
    ]);

    //convert to pixel color thresholds
    for (const [threshold, hexColor] of colorIndices) {
        const rgbColor = color(hexColor);
        pixelColorThresholds.push({threshold: threshold, r: red(rgbColor), g: green(rgbColor), b: blue(rgbColor)})
    }

    createCanvas(CANVAS.x,CANVAS.y); 
    terrainImg = createImage(CANVAS.x,CANVAS.y);

    noiseSeed();

    rebuildTerrain();

    player.pos = createVector(CANVAS.x/2,CANVAS.y/2);

    console.log("noiseMap",noiseMap);
}


function draw() {
    image(terrainImg,0,0);

    let moveVector = getInputVector();
    moveVector.mult(player.speed);
    player.pos.add(moveVector);

    checkMapBounds();

    drawPlayer();

    //console.log("frame");
}


//MOVEMENT
function getInputVector(){
    let vector = createVector(0,0);
    if (keyIsDown('w')) {
        vector.add(createVector(0,-1));
    }
    if (keyIsDown('a')) {
        vector.add(createVector(-1,0));
    }
    if (keyIsDown('s')) {
        vector.add(createVector(0,1));
    }
    if (keyIsDown('d')) {
        vector.add(createVector(1,0));
    }
    vector.normalize();
    return vector;
}


function rebuildTerrain() {
    generateNoiseMap();
    terrainImg.loadPixels();

    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue;

            let band = pixelColorThresholds.length - 1
            for (const pct of pixelColorThresholds) {
                if (noiseValue < pct.threshold) {
                    band = pct;
                    break;
                }  
            }

            const i = 4 * (y * CANVAS.x + x);
            terrainImg.pixels[i] = band.r;
            terrainImg.pixels[i + 1] = band.g;
            terrainImg.pixels[i + 2] = band.b;
            terrainImg.pixels[i + 3] = 255;
        }
    }


    terrainImg.updatePixels();
}



function checkMapBounds() {
    const rightTrigger = CANVAS.x * TRANSITION_THRESHOLD;
    const leftTrigger  = CANVAS.x * (1 - TRANSITION_THRESHOLD);
    const shiftDist = rightTrigger - leftTrigger;

    if (player.pos.x > rightTrigger) {
        noiseOffsetX += shiftDist;
        rebuildTerrain();
        player.pos.x -= shiftDist;
        player.chunk.x += 1;
    } else if (player.pos.x < leftTrigger) {
        noiseOffsetX -= shiftDist;
        rebuildTerrain();
        player.pos.x += shiftDist;
        player.chunk.x += -1;
    } else if (player.pos.y > rightTrigger) {
        noiseOffsetY += shiftDist;
        rebuildTerrain();
        player.pos.y -= shiftDist;
        player.chunk.y += 1;
    } else if (player.pos.y < leftTrigger) {
        noiseOffsetY -= shiftDist;
        rebuildTerrain();
        player.pos.y += shiftDist;
        player.chunk.y += -1;
    }
}


function generateNoiseMap() {
    //top to bottom
    for (let y = 0; y < CANVAS.y; y++) {
        //left to right
        for (let x = 0; x < CANVAS.x; x++) {
            noiseMap[x][y] = noise((x+noiseOffsetX)*RESOLUTION,(y+noiseOffsetY)*RESOLUTION);
        }
    }
}

function generateMonoColorMap() {
    if (!noiseMap) {
        console.error("generateMonoColorMap: noiseMap DNE")
        return;
    }
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue = lerp(0,255,noiseValue);
            colorMap[x][y] = colorValue;
        }
    }
}


function generateTerrainColorMap() {
    if (!noiseMap) {
        console.error("generateTerrainColorMap: noiseMap DNE");
        return;
    }
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            let noiseValue = noiseMap[x][y];
            let colorValue;
            for (const [threshold,color] of colorIndices) {
                if (noiseValue < threshold) {
                    colorValue = color;
                    break;
                }  
            }
            colorMap[x][y] = colorValue;
        }
    }
}


function drawPlayer() {
    push();
    fill(player.fill);
    rect(player.pos.x,player.pos.y,player.size,player.size);
    pop();
}


//! to be depricated
//! point mode not working in this ver
//TODON custom cell size
function drawArrayToCanvas(arr,mode) {
    for (let y = 0; y < CANVAS.y; y++) {
        for (let x = 0; x < CANVAS.x; x++) {
            if (!mode || mode == "rect") {
                push();
                noStroke();
                fill(arr[x][y]);
                // fill(200,0,0);
                rect(x,y,1,1);
                pop();
            } else if (mode == "point") {
                push();
                strokeWeight(1);
                stroke(arr[x][y]);
                point(x,y);
                pop();
            } else {
                console.error("drawArrayToCanvas: mode case error");
            }
        }
    }
}


//NUTIL
function generateArray(lengthX,lengthY) {
    let array = new Array(lengthX);
    for (let x = 0; x < lengthX; x++) {
        array[x] = new Array(lengthY);
    }

    return array;
}
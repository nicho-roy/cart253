/**
 * Procedural explorer
 * Nicholas Roy
 * 
 * Prototype 3
 */

"use strict";

let terrainImgArray = [];

var CANVAS = {
    x: 1920,
    y: 1080,
}

let noiseMap = generateArray(CANVAS.x, CANVAS.y);
let colorMap = generateArray(CANVAS.x, CANVAS.y);
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



function setupTerrain() {
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
        pixelColorThresholds.push({ threshold: threshold, r: red(rgbColor), g: green(rgbColor), b: blue(rgbColor) })
    }

    noiseSeed(); //reset random
}


function getPlayerWorldPos() {
    return createVector(player1.pos.x - xOffset, player1.pos.y - yOffset);
}

function getCurrentChunk() {
    const dim = getChunkDimensions();
    const wp = getPlayerWorldPos();
    return createVector(Math.floor(wp.x / dim.x), Math.floor(wp.y / dim.y));
}

// function getCurrentChunk() {
//     let currentChunkX = xOffset / getChunkDimensions().x;
//     let currentChunkY = yOffset / getChunkDimensions().y;
//     currentChunkX = Math.trunc(currentChunkX);
//     currentChunkY = Math.trunc(currentChunkY);
//     return createVector(currentChunkX, currentChunkY);
// }

function setPlayerChunk(chunkVector) {
    player1.chunk = chunkVector;
}

function getChunkDimensions() {
    return {
        x: (CANVAS.x * worldScale),
        y: (CANVAS.y * worldScale),
    }
}

function updatePlayerAdjcentChunks() {
    let currentChunk = getCurrentChunk()
    if (currentChunk.x == player1.chunk.x && currentChunk.y == player1.chunk.y) {
        return;
    } else { 
        player1.chunk = currentChunk;
        console.log("player",player1.chunk.x,player1.chunk.y);

        //reset arr
        terrainImgArray = [];
        // terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 1, currentChunk.y + 1));
        terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 0, currentChunk.y + 1));
        // terrainImgArray.push(generateTerrainAtChunk(currentChunk.x - 1, currentChunk.y + 1));
        terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 1, currentChunk.y + 0));
        terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 0, currentChunk.y + 0));
        terrainImgArray.push(generateTerrainAtChunk(currentChunk.x - 1, currentChunk.y + 0));
        // terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 1, currentChunk.y - 1));
        terrainImgArray.push(generateTerrainAtChunk(currentChunk.x + 0, currentChunk.y - 1));
        // terrainImgArray.push(generateTerrainAtChunk(currentChunk.x - 1, currentChunk.y - 1));
    }
}


function generateTerrainAtChunk(chunkX, chunkY) {
    generateNoiseMapAtChunk(chunkX, chunkY);
    let terrainImg = createImage(CANVAS.x,CANVAS.y);
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

    let terrainChunk = new TerrainChunk(chunkX, chunkY, terrainImg);
    return terrainChunk;
}


function generateNoiseMapAtChunk(chunkX, chunkY) {
    //top to bottom
    for (let y = 0; y < CANVAS.y; y++) {
        //left to right
        for (let x = 0; x < CANVAS.x; x++) {
            noiseMap[x][y] = noise(((x + noiseOffsetX) * RESOLUTION) + (chunkX * CANVAS.x * worldScale), ((y + noiseOffsetY) * RESOLUTION) + (chunkY * CANVAS.y * worldScale));
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
            let colorValue = lerp(0, 255, noiseValue);
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
            for (const [threshold, color] of colorIndices) {
                if (noiseValue < threshold) {
                    colorValue = color;
                    break;
                }
            }
            colorMap[x][y] = colorValue;
        }
    }
}





//NUTIL
function generateArray(lengthX, lengthY) {
    let array = new Array(lengthX);
    for (let x = 0; x < lengthX; x++) {
        array[x] = new Array(lengthY);
    }

    return array;
}
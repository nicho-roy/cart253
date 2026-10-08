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
        pixelColorThresholds.push({threshold: threshold, r: red(rgbColor), g: green(rgbColor), b: blue(rgbColor)})
    }

    createCanvas(CANVAS.x,CANVAS.y); 
    terrainImg = createImage(CANVAS.x,CANVAS.y);

    noiseSeed();

    rebuildTerrain();

    player.pos = createVector(CANVAS.x/2,CANVAS.y/2);

    console.log("noiseMap",noiseMap);
}


function drawTerrain() {
    image(terrainImg,0,0);

    checkMapBounds();
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



//NUTIL
function generateArray(lengthX,lengthY) {
    let array = new Array(lengthX);
    for (let x = 0; x < lengthX; x++) {
        array[x] = new Array(lengthY);
    }

    return array;
}
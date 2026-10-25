/**
 * Veteran Combat
 * Nicholas Roy
 * 
 * Prototype 1
 */

"use strict";

//players
let player1, player2, player3, player4;

//IMAGES
let jet0Img = "./assets/images/jet0.png";
let jet1Img = "./assets/images/jet1.png";
let jet2Img = "./assets/images/jet2.png";
let missileImg = "./assets/images/side_winder.png";

//arrs
let playerArr = [];
let projArr = [];

//world
let dragMult = 0.999;



async function setupPlayer() {
    jet0Img = await loadImage(jet0Img);
    jet1Img = await loadImage(jet1Img);
    jet2Img = await loadImage(jet2Img);
    missileImg = await loadImage(missileImg);
    // Missile.image = missileImg;

    player1 = new Player(width / 2, height / 2,270,jet0Img,'w','a','s','d','Space','e',);
    // player2 = new Player(width / 2 + 50, height / 2, 0, jet1Img, 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', '+','9',);
    // player3 = new Player(width / 2, height / 2 + 50, 90, jet2Img, 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Enter','/');
    // player4 = new Player(width / 2, height / 2 - 50, 270, jet2Img, 'i', 'j', 'k', 'l', 'm','u','o');


}


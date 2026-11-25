/**
 * General utility functions that are called statically
 */
class Util {

    static getRandomScreenPos() {
        const randX = random(0, width);
        const randY = random(0, height);
        return createVector(randX,randY);
    }

    static getRandomVectorOfMag(mag) {
        const randX = random(mag, -mag);
        const randY = random(mag, -mag);
        return createVector(randX, randY);
    }

    static RollPercentChance(percent) {
        const r = random(0,100);
        if(r < percent) {
            return true;
        } else {
            return false;
        }
    }

}
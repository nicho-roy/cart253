/**
 * General utility functions that are called statically
 */
class Util {

    static getRandomScreenPos() {
        const randX = random(0, width);
        const randY = random(0, height);
        return createVector(randX,randY);
    }

    static rollPercentChance(percent) {
        const r = random(1,100);
        if(r <= percent) {
            return true;
        } else {
            return false;
        }
    }

}
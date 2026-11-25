
class Food {
    static NUTRITION_SIZE_MULT = 3;
    constructor(x, y, nutrition) {
        this.pos = createVector(x, y);
        this.nutrition = nutrition;
        this.alive = true;
        this.drawSize = nutrition * Food.NUTRITION_SIZE_MULT;
        this.fill = "#4fa03b";
        objArr.push(this);
    }

    /**
     * generates a food item with a random chnace per frame
     * @param {*} chance 
     */
    static TickFoodGeneration(chance) {
        if (Util.RollPercentChance(chance)) {
            Food.SpawnFood(1);
        }
    }

    /**
     * spawns an immediate amount for food at random position
     * @param {*} amt 
     */
    static SpawnFood(amt) {
        for (let i = 0; i < amt; i++) {
            const pos = Util.getRandomScreenPos();
            const randNutrition = random(3,10);
            new Food(pos.x, pos.y, randNutrition);
        }
    }

    act() {
        this.draw();
    }

    /**
     * has an alive tag so if the 2 lizards target the same item then one can back off
     * @returns 
     */
    remove() {
        if (!this.alive) return;
        this.alive = false;
        const i = objArr.indexOf(this);
        if (i == -1) return;
        objArr.splice(i, 1);
    }

    draw() {
        // push();
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize);
        // pop();
    }
}
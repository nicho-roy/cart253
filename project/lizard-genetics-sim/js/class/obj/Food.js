
class Food {
    static NUTRITION_SIZE_MULT = 3;
    constructor(x, y, nutrition) {
        this.pos = createVector(x, y);
        this.nutrition = nutrition;
        this.drawSize = nutrition * Food.NUTRITION_SIZE_MULT;
        this.fill = "#4fa03b";
        objArr.push(this);
    }

    static generateFood(amt) {
        for (let i = 0; i < amt; i++) {
            const pos = Util.getRandomScreenPos();
            const randNutrition = random(1,10);
            new Food(pos.x, pos.y, randNutrition);
        }
    }

    act() {
        this.draw();
    }

    draw() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize);
        pop();
    }
}
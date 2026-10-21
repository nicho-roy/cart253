//CLASS
class Player {
    static playerIdCounter = 0;
    constructor(x, y, heading, image, upKey, leftKey, downKey, rightKey, fireKey) {
        this.playerId = Player.playerIdCounter;
        Player.playerIdCounter++;
        this.heading = heading;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.airSpeedBonus = 1;
        this.airSpeedBonusGain = 0.008; //0.005
        this.airSpeedBonusMax = 10; //5
        this.speed = 1;
        this.velLimit = 20;
        this.hp = 100;
        this.energy = 75;
        this.energyBleedRate = 0.2;
        this.energyGainRate = 1;
        this.throttle = 25; // [0-100]
        this.throttleRate = 1;
        this.turnRate = 1.2;
        this.image = image;
        this.size = 60;
        this.fireRate = 10;
        this.fireTimer = 0;
        this.outOfBoundsDamage = 0.5;
        this.dead = false;

        //input schema
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;

        playerArr.push(this);
    }

    act() {
        if (!this.dead) {
            this.move();
            this.runInput();
            this.checkBounds();
            this.checkDeath();
        }
    }

    move() {
        //throttle control
        if (keyIsDown(this.upKey)) {
            this.throttle += this.throttleRate;
        }
        if (keyIsDown(this.downKey)) {
            this.throttle -= this.throttleRate;
        }
        this.throttle = constrain(this.throttle, 0, 100)

        //turn control
        if (keyIsDown(this.leftKey)) {
            this.turn(-1);
            this.airSpeedBonus -= this.airSpeedBonusGain;
        } else if (keyIsDown(this.rightKey)) {
            this.turn(1);
            this.airSpeedBonus -= this.airSpeedBonusGain;
        } else {
            this.airSpeedBonus += this.airSpeedBonusGain;
            this.energy += this.energyGainRate * (this.throttle / 100);
        }

        this.airSpeedBonus = constrain(this.airSpeedBonus, 1, this.airSpeedBonusMax);
        this.energy = constrain(this.energy, 0, 100)


        //set velocity to the direction of the angle
        this.vel.set(0, 0);
        let moveDirection = createVector(cos(this.heading), sin(this.heading));
        moveDirection.normalize();
        this.vel.add(moveDirection);
        this.vel.mult(this.speed);
        this.vel.mult(this.throttle / 100);
        this.vel.mult(this.airSpeedBonus);
        this.vel.mult(dragMult);
        this.vel.limit(this.velLimit);
        if (this.vel.mag() <= 0) this.vel = moveDirection.mult(0.1);
        this.pos.add(this.vel);

    }

    turn(directionSignMult) {
        this.heading += (this.turnRate * (this.energy / 100)) * directionSignMult
        this.energy -= this.energyBleedRate;
        this.energy = constrain(this.energy, 0, 100);
    }

    runInput() {
        if (keyIsDown(this.fireKey)) {
            this.fireTimer++;
            if (this.fireTimer >= this.fireRate) {
                let vHead = createVector(cos(this.heading), sin(this.heading));
                let bullet = new Bullet(this.pos.x, this.pos.y, vHead, this);
                this.fireTimer = 0;
            }
        }
    }

    checkBounds() {
        if (this.pos.x > width || this.pos.x < 0) {
            this.applyDamage(this.outOfBoundsDamage);
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.applyDamage(this.outOfBoundsDamage);
        }
    }

    applyDamage(damage) {
        this.hp -= damage;
        this.hp = constrain(this.hp, 0, 100);
    }

    checkDeath() {
        if (this.hp <= 0) {
            this.size = max(0, this.size - 1);
            if (this.size <= 0) this.dead = true;
        }

    }

    draw() {
        if (this.dead) return;
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + 90);
        image(this.image, - (this.size / 2), - (this.size / 2), this.size, this.size);
        pop();
    }

}

class Bullet {
    constructor(x, y, dir, shooter) {
        this.pos = createVector(x, y);
        this.speed = 8;
        this.damage = 25;
        this.dir = createVector(dir.x, dir.y);
        this.dir.normalize();
        this.dir.mult(this.speed);
        this.size = 5;
        this.fill = "#ff8d0b";
        this.shooter = shooter;
        projArr.push(this);
    }

    act() {
        this.move();
        this.checkCollisions();
    }

    checkCollisions() {
        playerArr.forEach(e => {
            if (e === this.shooter) return;
            if (dist(this.pos.x, this.pos.y, e.pos.x, e.pos.y) <= e.size / 2) {
                e.applyDamage(this.damage);
                this.destroy();
            }
        });
    }

    move() {
        this.pos.add(this.dir);
    }

    destroy() {
        let index = projArr.indexOf(this);
        projArr.splice(index, 1);
    }

    draw() {
        push();
        fill(this.fill);
        noStroke();
        rect(this.pos.x - (this.size / 2), this.pos.y - (this.size / 2), this.size, this.size);
        pop();
    }
}
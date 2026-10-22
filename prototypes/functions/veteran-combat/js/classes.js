//CLASS
class Player {
    static playerIdCounter = 0;
    constructor(x, y, heading, image, upKey, leftKey, downKey, rightKey, fireKey, missileLockKey) {
        this.playerId = Player.playerIdCounter;
        Player.playerIdCounter++;
        this.heading = heading;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.airSpeedBonus = 1;
        this.airSpeedBonusGain = 0.01; //0.005
        this.airSpeedBonusMax = 20; //5
        this.speed = 5; //1.5
        this.velLimit = 50;
        this.velMin = 2;
        this.hp = 100;
        this.energy = 75;
        this.energyBleedRate = 0.16;
        this.energyGainRate = 0.7;
        this.throttle = 25; // [0-100]
        this.throttleRate = 1;
        this.turnRate = 1.2;
        this.image = image;
        this.size = 60;
        this.fireRate = 18; //10
        this.fireTimer = 0;
        this.outOfBoundsDamage = 0.5;
        this.isTargetLocking = false;
        this.isTargetLocked = false;
        this.missileLockDegreeRange = 30;
        this.missileLockTime = 120;
        this.missileLockTimer = 0;
        this.currentTarget;
        this.dead = false;

        //input schema
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;
        this.missileLockKey = missileLockKey;

        playerArr.push(this);
    }

    act() {
        if (!this.dead) {
            this.move();
            this.adjustHeading();
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
        if (this.vel.mag() < this.velMin) {
            this.vel.setMag(this.velMin);
        }
        // this.pos.add(this.vel);

    }

    adjustHeading() {
        if (this.heading >= 360) this.heading -= 360;
        if (this.heading < 0) this.heading += 360;
    }

    turn(directionSignMult) {
        this.heading += (this.turnRate * (this.energy / 100)) * directionSignMult
        this.energy -= this.energyBleedRate;
        this.energy = constrain(this.energy, 0, 100);
    }

    runInput() {
        //fire bullets
        if (keyIsDown(this.fireKey)) {
            this.fireTimer++;
            if (this.fireTimer >= this.fireRate) {
                let vHead = createVector(cos(this.heading), sin(this.heading));
                let bullet = new Bullet(this.pos.x, this.pos.y, vHead, this);
                this.fireTimer = 0;
            }
        }

        //MISSILE LOCKING
        //check if target locked
        if (this.missileLockTimer >= this.missileLockTime && this.target) {
            this.isTargetLocked = true;
        } else {
            this.isTargetLocked = false;
        }
        //locking and firing
        if (keyIsDown(this.missileLockKey)) {
            let closestTarget = this.getClosestTarget();
            if (closestTarget.target) {
                this.isTargetLocking = true;
                this.target = closestTarget.target;
                this.missileLockTimer++;
                this.missileLockTimer = constrain(this.missileLockTimer,0,this.missileLockTime);
            } else {
                //reset lock
                this.isTargetLocking = false;
                this.missileLockTimer = 0;
                this.target = null;
            }

            //FIRE MISSILE
            //!DEBUG
            // this.missileLockTimer = 3000;
            // this.target = player2;
            if (this.isTargetLocked) {
                // let vHead = createVector(cos(this.heading), sin(this.heading));
                let missile = new Missile(this.pos.x, this.pos.y, this.heading, this, this.target);
                //reset lock
                this.isTargetLocking;
                this.isTargetLocked;
                this.missileLockTimer = 0;
                this.target = null;
            }
        } else {
            this.isTargetLocking = false;
        }

    }

    getClosestTarget() {
        let closest = {
            target: null,
            angleBetween: 360,
        }
        playerArr.forEach(e => {
            if (e == this) return;
            //get enemy pos relative to player
            // console.log("truepos",this.pos.x,this.pos.y);
            let thisPosVector = createVector(this.pos.x,this.pos.y);
            // console.log("thispos", thisPosVector.x,thisPosVector.y);
            let ePosVector = createVector(e.pos.x, e.pos.y);
            // console.log("epos", ePosVector.x,ePosVector.y);
            let diffVector = ePosVector.sub(thisPosVector);
            // console.log("diffvector",diffVector.x,diffVector.y);
            let diffAngle = diffVector.heading();
            // console.log("diffAngle", diffAngle);

            // let angleBetween = this.heading - (diffAngle);
            let angleBetween = ((diffAngle - this.heading + 540) % 360) - 180;
            angleBetween = abs(angleBetween);
            // console.log("anglebwteen",angleBetween);
            

            if (angleBetween <= this.missileLockDegreeRange) {
                if (closest.angleBetween > angleBetween) {
                    closest.target = e;
                    closest.angleBetween = angleBetween;
                } else {
                    //not closest, thus nothing
                }
            }
        });
        return closest;
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

        //locked text
        push();
        translate(this.pos.x - (this.size), this.pos.y + 50);
        textSize(32);
        if (this.isTargetLocked) {
            fill("#ff0000");
            text("locked!",0,0);
        }
        if (this.isTargetLocking && !this.isTargetLocked) {
            fill("#ffbf00");
            text("locking...",0,0);
        }
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

class Missile {
    static image;
    constructor(x, y, heading, shooter, target) {
        this.pos = createVector(x, y);
        this.speed = 5;
        this.damage = 99;
        this.vel = createVector(0, 0);
        this.heading = heading
        this.size = 20;
        this.turnRate = 1.1;
        this.loseLockAngleThreshold = 100;
        this.fill = "#ff0b0b";
        this.shooter = shooter;
        this.target = target;
        projArr.push(this);
    }

    act() {
        this.move();
        this.checkCollisions();
    }

    move() {
        //get angle towards target
        let angleToTarget = this.getAngleToTarget();

        //angle towards target at fixed rate
        if (angleToTarget >= -this.loseLockAngleThreshold && angleToTarget <= this.loseLockAngleThreshold)
        this.heading += constrain(angleToTarget,-this.turnRate,this.turnRate);

        //get velocity
        this.vel = createVector(cos(this.heading),sin(this.heading));
        this.vel.normalize();
        this.vel.mult(this.speed);
        this.pos.add(this.vel);
    }

    getAngleToTarget() {
        let thisPosVector = createVector(this.pos.x, this.pos.y);
        let targetPosVector = createVector(this.target.pos.x, this.target.pos.y);
        let diffVector = targetPosVector.sub(thisPosVector);
        let diffAngle = diffVector.heading();

        let angleBetween = ((diffAngle - this.heading + 540) % 360) - 180;
        angleBetween = angleBetween; //not abs for getting turn direction
        return angleBetween;
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

    destroy() {
        let index = projArr.indexOf(this);
        projArr.splice(index, 1);
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + 90);
        image(missileImg, - (this.size / 2), - (this.size / 2), this.size, this.size*2);
        push();
        noStroke();
        fill(252, 138, 23, 12);
        ellipse(0, 0,this.size*5,this.size*5);
        pop();
        pop();

        // push();
        // image(missileImg, this.pos.x - (this.size / 2), this.pos.y - (this.size / 2),this.size,this.size);
        // pop();
    }

}
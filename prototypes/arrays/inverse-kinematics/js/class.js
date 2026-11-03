//CLASS
//joint controller
class JointGroup {
    constructor(jointInstructions,startX,startY) {
        this.jointArr = [];
        this.startX = startX;
        this.startY = startY;
        this.generateJoints(jointInstructions);
        this.headJoint = this.jointArr[0];
    }

    generateJoints(jointInstructions) {
        //init from instructions
        let yOffset = 0;
        jointInstructions.forEach(e => { 
            let joint = new Joint(this.startX, this.startY + yOffset,e.jointRadius,e.drawSize,e.fill);
            this.jointArr.push(joint);
            yOffset += e.jointRadius;
        });
    }

    act() {
        const targetVector = createVector(mouseX,mouseY);
        this.moveHead(targetVector);
        this.constrainJoints();

        this.drawjoints();
    }

    moveHead(targetVector) {
        this.headJoint.pos = targetVector;
    }

    constrainJoints() {
        //constrain the next of each joint, ignoring last
        for (let i = 0; i < this.jointArr.length -1; i++) {
            let currentjoint = this.jointArr[i];
            let nextJoint = this.jointArr[i+1];
            const anchor = currentjoint.pos;
            const currentToNext = p5.Vector.sub(nextJoint.pos, anchor);
            const constrainedVector = currentToNext.setMag(currentjoint.jointRadius);
            const nextJointPos = p5.Vector.add(anchor,constrainedVector)
            nextJoint.pos = nextJointPos;
        }
    }

    drawjoints() {
        //draw backwards
        for (let i = this.jointArr.length-1; i >= 0; i--) {
            this.jointArr[i].draw();
        }
    }
}

class Joint {
    constructor(x, y, jointRadius, drawSize, fill) {
        this.pos = createVector(x,y);
        this.jointRadius = jointRadius;
        this.drawSize = drawSize;
        this.fill = fill;
    }

    draw() {
        push();
        // noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize); 
        pop();
    }
}
//CLASS
//joint controller
class JointGroup {
    constructor(jointInstructions,x,y,minAngle) {
        this.jointArr = [];
        this.pos = createVector(x,y);
        this.minAngle = minAngle;
        this.generateJoints(jointInstructions);
        this.headJoint = this.jointArr[0];
    }

    generateJoints(jointInstructions) {
        //init from instructions
        let yOffset = 0;
        jointInstructions.forEach(e => { 
            let joint = new Joint(this.pos.x, this.pos.y + yOffset,e.jointRadius,e.drawSize,e.fill);
            this.jointArr.push(joint);
            yOffset += e.jointRadius;
        });
    }

    act() {
        const targetVector = createVector(mouseX,mouseY);
        this.moveHead(targetVector);
        this.constrainJointPositions();
        this.constrainJointAngles();

        this.drawjoints();
    }

    moveHead(targetVector) {
        this.headJoint.pos = targetVector;
    }

    constrainJointPositions() {
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

    constrainJointAngles() {
        //constrain the next of each joint, ignoring first and last
        for (let i = 1; i < this.jointArr.length - 1; i++) {
            let prevJoint = this.jointArr[i-1];
            let currentJoint = this.jointArr[i];
            let nextJoint = this.jointArr[i+1];
            const currentToPrev = p5.Vector.sub(prevJoint.pos, currentJoint.pos);
            const currentToNext = p5.Vector.sub(nextJoint.pos, currentJoint.pos);
            const angleBetween = p5.Vector.angleBetween(currentToPrev, currentToNext);
            // console.log(angleBetween);
            
            if (abs(angleBetween) < this.minAngle) {
                const angleBetweenDifference = Math.sign(angleBetween) * (this.minAngle - abs(angleBetween));
                // console.log(angleBetweenDifference);
                const currentToNextHeading = currentToNext.heading();
                // console.log(currentToNextHeading);
                const setNextHeading = currentToNextHeading + angleBetweenDifference;
                // console.log(setNextHeading);
                this.setAngle(i, setNextHeading);
            }

        }
    }

    setAngle(i, setHeading) {
        let currentJoint = this.jointArr[i];
        let nextJoint = this.jointArr[i + 1];
        const setVectorOffset = p5.Vector.fromAngle(radians(setHeading), currentJoint.jointRadius);
        nextJoint.pos = p5.Vector.add(currentJoint.pos, setVectorOffset);
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
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize); 
        pop();
    }
}
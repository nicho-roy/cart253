//CLASS
//joint controller
class IKJointGroup {
    constructor(jointInstructions,x,y,bendDirPreference) {
        this.jointArr = [];
        this.rootPos = createVector(x,y);
        this.bendDirPreference = bendDirPreference; //neg or pos 1, used as a base for directional rotation
        this.generateJoints(jointInstructions);
        this.rootJoint = this.jointArr[0];
        this.headJoint = this.jointArr[this.jointArr.length - 1];
        this.degreeBendAmount = 10
    }

    generateJoints(jointInstructions) {
        //init from instructions
        let yOffset = 0;
        let hasPoleTarget = false;
        for (let i = 0; i < jointInstructions.length; i++) {
            // for all joints excluding the first and last, create a pole target for believable bending
            if (i == 0 || i >= jointInstructions.length - 1) {
                hasPoleTarget = false;
            } else {
                hasPoleTarget = true;
            }
            let joint = new Joint(this.rootPos.x, this.rootPos.y + yOffset, jointInstructions[i].jointRadius, jointInstructions[i].drawSize, jointInstructions[i].fill, hasPoleTarget);
            this.jointArr.push(joint);
            yOffset += jointInstructions[i].jointRadius;
        }
    }

    act() {
        const targetVector = createVector(mouseX,mouseY);
        this.moveForward(targetVector);
        this.rotateMiddleJoints(targetVector);
        this.moveBackward();

        this.drawjoints();
    }

    moveForward(targetVector) {
        this.headJoint.pos = targetVector;
        this.constrainJointPositionsForward();
    }

    constrainJointPositionsForward() {
        //constrain the next of each joint, ignoring last, starting at the head
        for (let i = this.jointArr.length - 1; i > 0; i--) {
            let currentjoint = this.jointArr[i];
            let nextJoint = this.jointArr[i-1];
            const anchor = currentjoint.pos;
            const currentToNext = p5.Vector.sub(nextJoint.pos, anchor);
            const constrainedVector = currentToNext.setMag(currentjoint.jointRadius);
            const nextJointPos = p5.Vector.add(anchor,constrainedVector)
            nextJoint.pos = nextJointPos;
        }
    }

    //! TODON HAVE POLE VECTOR DERIVE FROM IN BETWEEN THE LEFT OR RIGHT OF THR PREV TO THE NEXT
    //to be used in future projects to make realistic arm bending, and because pole targetting is way too complicated
    rotateMiddleJoints(targetVector) {
        //get total group length and distane from root to target
        const distRootToTarget = dist(targetVector.x, targetVector.y, this.rootJoint.pos.x, this.rootJoint.pos.y)
        let totalGroupLength = 0;
        this.jointArr.forEach(e => {
            totalGroupLength += e.jointRadius;
        });

        //loop through joint arrays, ignoring first and last, apply a slight rotation to the middle joints relative to the previous
        for (let i = 1; i < this.jointArr.length - 1; i++) {
            const currentJoint = this.jointArr[i];
            const prevJoint = this.jointArr[i-1];
            //get angle and dist from prev to current
            const VectorPrevToCurrent = p5.Vector.sub(currentJoint.pos,prevJoint.pos);
            if (distRootToTarget < VectorPrevToCurrent.mag()) {
                console.log("stop loop");
                // return;
            }
            const appliedDegreeBendAmount = this.degreeBendAmount;
            const appliedDegreeBendMult = map(distRootToTarget, 0, totalGroupLength, 0, 1, true); // 0 when at the root, 1 when at the lenght of the segmentgroup
            // console.log(degreeBendAmountMultiplier);
            // const appliedDegreeBendAmount = this.degreeBendAmount * degreeBendAmountMultiplier;
            console.log(appliedDegreeBendMult);
            // get heading of said angle
            const headingPrevToCurrent = VectorPrevToCurrent.heading();
            // console.log(headingPrevToCurrent);
            // add 90 deg in either direction (using bendDirPreference)
            const newHeadingPrevToCurrent = headingPrevToCurrent + (this.bendDirPreference * appliedDegreeBendAmount * appliedDegreeBendMult);
            //reconstruct the vector and apply position to current joint
            const newVectorPrevToCurrent = p5.Vector.fromAngle(radians(newHeadingPrevToCurrent), prevJoint.jointRadius);
            // console.log(Math.trunc(newVectorPrevToCurrent.x), Math.trunc(newVectorPrevToCurrent.y));
            currentJoint.pos = p5.Vector.add(prevJoint.pos, newVectorPrevToCurrent);
        }
    }

    moveBackward() {
        this.rootJoint.pos = this.rootPos;
        this.constrainJointPositionsBackward()
    }

    constrainJointPositionsBackward() {
        //constrain the next of each joint, ignoring last, starting at the root
        for (let i = 0; i < this.jointArr.length - 1; i++) {
            let currentjoint = this.jointArr[i];
            let nextJoint = this.jointArr[i+1];
            const anchor = currentjoint.pos;
            const currentToNext = p5.Vector.sub(nextJoint.pos, anchor);
            const constrainedVector = currentToNext.setMag(currentjoint.jointRadius);
            const nextJointPos = p5.Vector.add(anchor, constrainedVector)
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
        for (let i = 0; i < this.jointArr.length; i++) {
            this.jointArr[i].draw();
        }
    }
}

class Joint {
    constructor(x, y, jointRadius, drawSize, fill, hasPoleTarget) {
        this.pos = createVector(x,y);
        this.jointRadius = jointRadius;
        this.drawSize = drawSize;
        this.fill = fill;
        this.hasPoleTarget = hasPoleTarget; //unused
    }

    draw() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize); 
        pop();
    }
}
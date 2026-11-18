/**
 * Functions as the motor system for limbs
 * Reads target input and acts accordingly
 * Contains: array of joint segments, root points
 * handles the positions of each joint segment and how they shold alight with a target abnd root, relies on FABRIK (fwd and back)
 */
class LimbJointGroup {
    constructor(jointInstructions, size, x, y, bendDirPreference, orientationSign, attachJoint) {
        this.jointArr = []; //array of joint segments
        this.size = size;
        this.rootPos = createVector(x, y);
        this.bendDirPreference = bendDirPreference; //neg or pos 1, used as a base for directional rotation
        this.orientationSign = orientationSign; //used for differentating hind (-1) and front (1) limbs, they will bend backwards if -1
        this.gaitGroup = (bendDirPreference * orientationSign === 1) ? 0 : 1; //so limbs can alternate in the walk cycle
        this.stepSpeed = 0.50; //[0-1] how much of the way the head moves towards the target per frame (0.75)
        this.attachJoint = attachJoint; //the joint of a BodyJointGroup in which the LimbjointGroup is attached to (used by the controlling BodyJointGroup)
        this.targetVector = createVector(0,0);
        this.generateJoints(jointInstructions);
        this.rootJoint = this.jointArr[0]; //segment which is the anchor of the limb system
        this.headJoint = this.jointArr[this.jointArr.length - 1]; //segment which reaches for the target
        this.limbReach = this.getTotalLength() * 0.5; //make foot distance mult eventually
        this.stepDistance = this.getTotalLength() * 0.9; //make foot distance mult eventually
        this.degreeBendAmount = 10
    
    }

    /**
     * builds joint segments joint instructions object, fed from BodyJointGroup
     * populates jointArr
     * @param {*} bodyInstructions 
     */
    generateJoints(jointInstructions) {
        //init from instructions
        let yOffset = 0;
        for (let i = 0; i < jointInstructions.length; i++) {
            let joint = new Joint(this.rootPos.x, this.rootPos.y + (yOffset * this.size), jointInstructions[i].jointRadius * this.size, jointInstructions[i].drawSize * this.size, jointInstructions[i].fill);
            this.jointArr.push(joint);
            yOffset += jointInstructions[i].jointRadius;
        }
    }

    act() {
        //move forward first, then backward each frame to "stick" to the root point
        this.moveForward(this.targetVector);
        this.rotateMiddleJoints(this.targetVector);
        this.moveBackward();

        this.drawjoints();
    }

    /**
     * moves the head joint to the target vector, and calls constrainJointPositionsForward()
     * @param {*} targetVector 
     */
    moveForward(targetVector) {
        this.headJoint.pos.lerp(targetVector, this.stepSpeed);
        this.constrainJointPositionsForward();
    }

    /**
     * helper for moveForward()
     * constrains all joints in a chain, starting at the head, which has already been displaced to its desired targte by this point
     * forward FABRIK
     */
    constrainJointPositionsForward() {
        //constrain the next of each joint, ignoring last, starting at the head
        for (let i = this.jointArr.length - 1; i > 0; i--) {
            let currentjoint = this.jointArr[i];
            let nextJoint = this.jointArr[i - 1];
            const anchor = currentjoint.pos;
            const currentToNext = p5.Vector.sub(nextJoint.pos, anchor);
            const constrainedVector = currentToNext.setMag(currentjoint.jointRadius);
            const nextJointPos = p5.Vector.add(anchor, constrainedVector)
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
            const prevJoint = this.jointArr[i - 1];
            //get angle and dist from prev to current
            const VectorPrevToCurrent = p5.Vector.sub(currentJoint.pos, prevJoint.pos);
            if (distRootToTarget < VectorPrevToCurrent.mag()) {
                // console.log("stop loop");
                // return;
            }
            const appliedDegreeBendAmount = this.degreeBendAmount;
            const appliedDegreeBendMult = map(distRootToTarget, 0, totalGroupLength, 0, 1, true); // 0 when at the root, 1 when at the lenght of the segmentgroup
            // console.log(degreeBendAmountMultiplier);
            // const appliedDegreeBendAmount = this.degreeBendAmount * degreeBendAmountMultiplier;
            // console.log(appliedDegreeBendMult);
            // get heading of said angle
            const headingPrevToCurrent = VectorPrevToCurrent.heading();
            // console.log(headingPrevToCurrent);
            // add 90 deg in either direction (using bendDirPreference)
            const newHeadingPrevToCurrent = headingPrevToCurrent + (this.bendDirPreference * this.orientationSign * appliedDegreeBendAmount * appliedDegreeBendMult);
            //reconstruct the vector and apply position to current joint
            const newVectorPrevToCurrent = p5.Vector.fromAngle(radians(newHeadingPrevToCurrent), prevJoint.jointRadius);
            // console.log(Math.trunc(newVectorPrevToCurrent.x), Math.trunc(newVectorPrevToCurrent.y));
            currentJoint.pos = p5.Vector.add(prevJoint.pos, newVectorPrevToCurrent);
        }
    }

    /**
     * set the root joint back to the root position, calls constrainJointPositionsBackward()
     */
    moveBackward() {
        this.rootJoint.pos = this.rootPos;
        // this.rootJoint.pos.lerp(this.rootPos, this.stepSpeed);
        this.constrainJointPositionsBackward()
    }

    /**
     * helper for moveBackward()
     * constrains all body segments back to the rootjoint, since by this point, the root joint has been moved back to the root position, after the chain has been moved forward towards the target
     */
    constrainJointPositionsBackward() {
        //constrain the next of each joint, ignoring last, starting at the root
        for (let i = 0; i < this.jointArr.length - 1; i++) {
            let currentjoint = this.jointArr[i];
            let nextJoint = this.jointArr[i + 1];
            const anchor = currentjoint.pos;
            const currentToNext = p5.Vector.sub(nextJoint.pos, anchor);
            const constrainedVector = currentToNext.setMag(currentjoint.jointRadius);
            const nextJointPos = p5.Vector.add(anchor, constrainedVector)
            nextJoint.pos = nextJointPos;
        }
    }

    /**
     * @returns Number of segments of the LimbJointGroup
     */
    getTotalLength() {
        let length = 0;
        this.jointArr.forEach(e => {
            length += e.jointRadius;
        });
        return length;
    }

    hasArrivedAtTarget() {
        const hasArrivedAtTarget = (dist(this.targetVector.pos.x, this.targetVector.pos.y, this.headJoint.pos.x, this.headJoint.pos.y) < 10);
        return hasArrivedAtTarget;
    }

    /**
     * draws all joint segments, starting backwards
     */
    drawjoints() {
        //draw backwards
        for (let i = 0; i < this.jointArr.length; i++) {
            this.jointArr[i].draw();
        }
        // this.DEBUG_drawTargetVector()
    }

    /**
     * _DEBUG
     * draws the target vector to visualize
     */
    DEBUG_drawTargetVector() {
        push();
        noStroke();
        fill(color(255,0,0));
        ellipse(this.targetVector.x, this.targetVector.y, this.headJoint.drawSize, this.headJoint.drawSize);
        pop();
    }
}
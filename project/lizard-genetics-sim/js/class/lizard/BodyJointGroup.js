/**
 * Functions as the motor system, and the physics body for the lizard
 * DOES NOT handle lizard behaviour, it simply reads impluses and acts accordingly
 * Contains: array of body segments, array of LimbJointGroup (array of limbs)
 * handles the position of body segments, relying primarily on forward FABRIK movement
 * feeds LimbJointGroup a target position for walk cycles
 */
class BodyJointGroup {
    constructor(bodyInstructions, size, pos, speed, velLimit, minAngle) {
        this.size = size
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.baseAccLimit = speed; //we want our acc to be limited by our speed, to be mult by speedMult
        this.baseVelLimit = velLimit; //to be mult by speedMult
        this.speedMult = 1; //we want a mult so lizard manager can easily edit the speed
        this.targetVector = createVector(pos.x,pos.y);
        this.jointArr = []; //array containing joint segments of the body
        this.limbArr = []; //array containing LimbJointGroups (which themselves have an array of joint segments)
        this.minAngle = minAngle; //min angle in shich the body will fold in on itself when turning
        this.generateJoints(bodyInstructions);
        this.headJoint = this.jointArr[0];
        this.currentGait = 0; //alternates between 0 and 1, cycles per step
        this.gaitCompletion = 2; //decreases per step and gets reset to 2 when reaching 0
    }

    get accLimit() {
        return this.baseAccLimit * this.speedMult;
    }

    get velLimit() {
        return this.baseVelLimit * this.speedMult;
    }

    /**
     * builds bod segments and limb joint groups from a body instructions object
     * populates both jointsArr and limbArr
     * @param {*} bodyInstructions 
     */
    generateJoints(bodyInstructions) {
        //generate body
        let yOffset = 0;
        let orientationSign = 1;
        for (let i = 0; i < bodyInstructions.length; i++) {
            //if current segment is joint
            if (bodyInstructions[i].type == "joint") {
                let joint = new Joint(this.pos.x, this.pos.y + (yOffset * this.size), bodyInstructions[i].jointRadius * this.size, bodyInstructions[i].drawSize * this.size, bodyInstructions[i].fill);
                this.jointArr.push(joint);
                yOffset += bodyInstructions[i].jointRadius;
            }

            //if current segment is limb
            if (bodyInstructions[i].type == "limb") {
                //init limb at temporary position 
                const prevJoint = this.jointArr[this.jointArr.length - 1]; //get last joint
                let limbLeft = new LimbJointGroup(bodyInstructions[i].joints, this.size, prevJoint.pos.x, prevJoint.pos.y, 1, orientationSign, prevJoint);
                let limbRight = new LimbJointGroup(bodyInstructions[i].joints, this.size, prevJoint.pos.x, prevJoint.pos.y, -1, orientationSign, prevJoint);
                orientationSign = -1; //switch sign after first pair of limbs
                this.limbArr.push(limbLeft, limbRight);
            }
        }

    }

    act() {
        //TODON check if current target is the same as the last, as to not run every frame
        // const targetVector = createVector(mouseX, mouseY);
        const targetVector = this.pos;
        this.moveTowardsTargetVector(targetVector);
        this.constrainJointPositions();
        this.constrainJointAngles();

        this.updateLimb();
    }

    /**
     * attempts to move towards the target vector by accelerating towards it
     * updates this.pos, and sets the head position to match
     * Slows down when approaching the target as to not overshoot it
     */
    moveTowardsTargetVector() {
        this.acc = createVector(0,0); //reset acc
        const vectorToTarget = p5.Vector.sub(this.targetVector, this.pos);
        const distToTarget = vectorToTarget.mag();

        //formula for constant-acceleration IK equation: v² = u² + 2as. (dont ask me to explain it i dont know why it works either)
        const slowRadius = (this.velLimit * this.velLimit) / (2 * this.accLimit);

        let desiredSpeed = this.velLimit; //will later be capped by speed
        if (distToTarget <= slowRadius) {
            desiredSpeed = map(distToTarget,0,slowRadius,0,this.velLimit);
        }

        //subtract desiredVel by velocity to cancel out any sideways acceleration that would otherwise lead to an endless orbit
        const desiredVel = vectorToTarget.setMag(desiredSpeed);
        const accVector = p5.Vector.sub(desiredVel, this.vel).limit(this.accLimit); 

        //apply acc
        this.acc = accVector;
        this.vel.add(this.acc);
        this.vel.limit(this.velLimit);
        this.pos.add(this.vel);
        this.headJoint.pos = this.pos;
    }

    /**
     * Constrain body segment joints into a chain, starting from the head
     * functions using the forward portion of the FABRIK algorithm
     * ? maybe make more efficient by calc x and y without vectors, since they can be computationally expensive
     */
    constrainJointPositions() {
        //constrain the next of each joint, ignoring last
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
     * makes sure that the angle between body segments remains above the $minAngle 
     */
    constrainJointAngles() {
        //constrain the next of each joint, ignoring first and last
        for (let i = 1; i < this.jointArr.length - 1; i++) {
            let prevJoint = this.jointArr[i - 1];
            let currentJoint = this.jointArr[i];
            let nextJoint = this.jointArr[i + 1];
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

    /**
     * sets the angle of the i+1 joint segment to a specified heading 
     * helper function of constrainJointAngles
     * @param {*} i 
     * @param {*} setHeading 
     */
    setAngle(i, setHeading) {
        let currentJoint = this.jointArr[i];
        let nextJoint = this.jointArr[i + 1];
        const setVectorOffset = p5.Vector.fromAngle(radians(setHeading), currentJoint.jointRadius);
        nextJoint.pos = p5.Vector.add(currentJoint.pos, setVectorOffset);
    }

    /**
     * functions as a draw() function for limbJointGroups, making sure they tick with the rest of the program
     */
    updateLimb() {
        this.updateLimbRootPositions();
        this.updateLimbTarget();
        this.limbAct();
    }


    /**
     * updates the root position of the LimbJointGroups of body
     */
    updateLimbRootPositions() {
        for (const limb of this.limbArr) {
            limb.rootJoint.pos.set(limb.attachJoint.pos);
            // limb.rootJoint.pos.set(this.getAttachPointsOfLimb(limb));
        }
    }

    /**
     * ! unsued
     * helper of updateLimbRootPositions()
     * gets the intended root positions for the limbs, placing them on the edge of the attch joint
     * @param {*} limb 
     * @returns 
     */
    getAttachPointsOfLimb(limb) {
        const attachJointHeading = this.getHeadingOfJoint(limb.attachJoint);
        const lateralOrientationHeadingOffset = (limb.bendDirPreference === 1) ? 90 : -90;
        const attachjointCenterToEdgeHeading = attachJointHeading + lateralOrientationHeadingOffset;
        const attachjointCenterToEdgeVector = p5.Vector.fromAngle(radians(attachjointCenterToEdgeHeading), limb.attachJoint.drawSize/2);
        const limbAttachPoint = p5.Vector.add(limb.attachJoint.pos, attachjointCenterToEdgeVector);
        return limbAttachPoint;
    }

    /**
     * ! unsued
     * helper of getAttachPointsOfLimb()
     * gets the heading of a joint by measuing the vector of the pervious and next joints, and adding them
     * @param {*} curJoint 
     * @returns 
     */
    getHeadingOfJoint(curJoint) {
        const i = this.jointArr.indexOf(curJoint);
        const prevJoint = this.jointArr[i - 1];
        const nextJoint = this.jointArr[i + 1];
        const curToPrev = p5.Vector.sub(prevJoint.pos, curJoint.pos);
        const nextToCur = p5.Vector.sub(curJoint.pos, nextJoint.pos);
        const curVector = p5.Vector.add(curToPrev, nextToCur);
        return curVector.heading();
    }

    /**
     * TODON make arms and legs alternate as they walk
     * updates the target of each LimbJointGroup if the distance exceeds limb.stepDistance
     */
    updateLimbTarget() {
        for (let limb of this.limbArr) {
            //check current gait, if not part of it, then skip
            if (!limb.gaitGroup === this.currentGait) continue;

            const attachIndex = this.jointArr.indexOf(limb.attachJoint);
            const prevJoint = this.jointArr[attachIndex-1];
            const nextJoint = this.jointArr[attachIndex+1];
            //get vecotr of prev to next, get angle between and add 90 for perpendicular
            const prevToNextVector = p5.Vector.sub(prevJoint.pos,nextJoint.pos);
            //create vector target
            const prevToNextHeading = prevToNextVector.heading();
            const newHeading = prevToNextHeading + (limb.bendDirPreference*90); //bendDirPreference accounts for left vs right
            let newVectorTarget = p5.Vector.fromAngle(radians(newHeading), limb.limbReach);
            newVectorTarget.add(prevToNextVector); //set it forward by bit
            //limit to length of the limb
            newVectorTarget.limit(limb.getTotalLength());

            let appliedVectorTarget = p5.Vector.add(limb.attachJoint.pos, newVectorTarget);
            
            //if less than the step distance, do not update
            const distHeadToTarget = dist(limb.headJoint.pos.x, limb.headJoint.pos.y, appliedVectorTarget.x, appliedVectorTarget.y);
            if (distHeadToTarget > limb.stepDistance) {
                limb.targetVector = appliedVectorTarget;
                this.gaitCompletion--;
            }
        }

        //swap current gait if steps completed
        if (this.gaitCompletion <= 0) {
            this.currentGait = (this.currentGait === 1) ? 0 : 1;
            this.gaitCompletion = 2;
        }
        // console.log(this.currentGait);
    }

    limbAct() {
        for (const limb of this.limbArr) {
            limb.act();
        }
    }

    /**
    * @returns Number of segments of the body
    */
    getTotalLength() {
        let length = 0;
        this.jointArr.forEach(e => {
            length += e.jointRadius;
        });
        return length;
    }

    /**
     * Function for drawing all joints and limb joints
     * calls bodyJointGroup.draw(), and limbjointGroup.draw()
     * To be called by Lizard
     */
    draw() {
        this.limbArr.forEach(e => {
            e.draw();
        });
        this.drawjoints();
    }

    /**
     * draws all joint segments of the body, starting from the last
     */
    drawjoints() {
        //draw backwards
        for (let i = this.jointArr.length - 1; i >= 0; i--) {
            this.jointArr[i].draw();
        }
    }
}






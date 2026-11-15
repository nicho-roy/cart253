//apologies pippin, i didnt see that you wrote feedback in my last submissions. Ill try to comment better this time.




/**
 * Functions as the motor system, and the physics body for the lizard
 * DOES NOT handle lizard behaviour, it simply reads impluses and acts accordingly
 * Contains: array of body segments, array of LimbJointGroup (array of limbs)
 * handles the position of body segments, relying primarily on forward FABRIK movement
 * feeds LimbJointGroup a target position for walk cycles
 */
class BodyJointGroup {
    constructor(bodyInstructions, x, y, minAngle) {
        this.jointArr = []; //array containing joint segments of the body
        this.limbArr = []; //array containing LimbJointGroups (which themselves have an array of joint segments)
        this.pos = createVector(x, y);
        this.minAngle = minAngle; //min angle in shich the body will fold in on itself when turning
        this.generateJoints(bodyInstructions);
        this.headJoint = this.jointArr[0];
    }

    /**
     * builds bod segments and limb joint groups from a body instructions object
     * populates both jointsArr and limbArr
     * @param {*} bodyInstructions 
     */
    generateJoints(bodyInstructions) {
        //generate body
        let yOffset = 0;
        for (let i = 0; i < bodyInstructions.length; i++) {
            //if current segment is joint
            if (bodyInstructions[i].type == "joint") {
                let joint = new Joint(this.pos.x, this.pos.y + yOffset, bodyInstructions[i].jointRadius, bodyInstructions[i].drawSize, bodyInstructions[i].fill);
                this.jointArr.push(joint);
                yOffset += bodyInstructions[i].jointRadius;
            }

            //if current segment is limb
            if (bodyInstructions[i].type == "limb") {
                //init limb at temporary position 
                let orientationSign = bodyInstructions[i].orientation;
                const prevJoint = this.jointArr[this.jointArr.length - 1]; //get last joint
                let limbLeft = new LimbJointGroup(bodyInstructions[i].joints, prevJoint.pos.x, prevJoint.pos.y, 1, orientationSign, prevJoint);
                let limbRight = new LimbJointGroup(bodyInstructions[i].joints, prevJoint.pos.x, prevJoint.pos.y, -1, orientationSign, prevJoint);
                this.limbArr.push(limbLeft, limbRight);
            }
        }

    }

    act() {
        const targetVector = createVector(mouseX, mouseY);
        this.moveHead(targetVector);
        this.constrainJointPositions();
        this.constrainJointAngles();

        this.updateLimb();

        this.drawjoints();
    }

    //move the head towards a target vector
    moveHead(targetVector) {
        this.headJoint.pos = targetVector;
    }

    /**
     * Constrain body segment joints into a chain, starting from the head
     * functions using the forward portion of the FABRIK algorithm
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


    //! TODON have offset from radius and not center
    /**
     * updates the root position of the LimbJointGroups of the body, so that they follow the body
     */
    updateLimbRootPositions() {
        for (const limb of this.limbArr) {
            limb.rootJoint.pos.set(limb.attachJoint.pos);
        }
    }

    //! TODON make arms and legs alternate as they walk
    /**
     * updates the target of each LimbJointGroup if the distance exceeds limb.stepDistance
     */
    updateLimbTarget() {
        for (let limb of this.limbArr) {
            const attachIndex = this.jointArr.indexOf(limb.attachJoint);
            const prevJoint = this.jointArr[attachIndex-1];
            const nextJoint = this.jointArr[attachIndex+1];
            //get vecotr of prev to next, get angle between and add 90 for perpendicular
            const prevToNextVector = p5.Vector.sub(prevJoint.pos,nextJoint.pos);
            //create vector target
            const prevToNextHeading = prevToNextVector.heading();
            const newHeading = prevToNextHeading + (limb.bendDirPreference*90); //bendDirPreference accounts for left vs right
            let newVectorTarget = p5.Vector.fromAngle(radians(newHeading), limb.footDistance);
            newVectorTarget.add(prevToNextVector); //set it forward by bit
            // //add some random spice
            // let randVectorOffset = createVector(random(-1, 1), random(-1, 1));
            // randVectorOffset.mult(25);
            // newVectorTarget.add(randVectorOffset);
            //limit to length of
            newVectorTarget.limit(limb.getTotalLength());

            let appliedVectorTarget = p5.Vector.add(limb.attachJoint.pos, newVectorTarget);
            
            //if less than the step distance, do not update
            const distHeadToTarget = dist(limb.headJoint.pos.x, limb.headJoint.pos.y, appliedVectorTarget.x, appliedVectorTarget.y);
            if (distHeadToTarget > limb.stepDistance) {
                limb.targetVector = appliedVectorTarget;
            }
            
        }
    }

    limbAct() {
        for (const limb of this.limbArr) {
            limb.act();
        }
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







/**
 * Functions as the motor system for limbs
 * Reads target input and acts accordingly
 * Contains: array of joint segments, root points
 * handles the positions of each joint segment and how they shold alight with a target abnd root, relies on FABRIK (fwd and back)
 */
class LimbJointGroup {
    constructor(jointInstructions, x, y, bendDirPreference, orientationSign, attachJoint) {
        this.jointArr = []; //array of joint segments
        this.rootPos = createVector(x, y);
        this.bendDirPreference = bendDirPreference; //neg or pos 1, used as a base for directional rotation
        this.orientationSign = orientationSign; //used for differentating hind (-1) and front (1) limbs, they will bend backwards if -1
        this.attachJoint = attachJoint; //the joint of a BodyJointGroup in which the LimbjointGroup is attached to (used by the controlling BodyJointGroup)
        this.targetVector = createVector(0,0);
        this.generateJoints(jointInstructions);
        this.rootJoint = this.jointArr[0]; //segment which is the anchor of the limb system
        this.headJoint = this.jointArr[this.jointArr.length - 1]; //segment which reaches for the target
        this.footDistance = this.rootJoint.jointRadius * 1.9; //make foot distance mult eventually
        this.stepDistance = this.rootJoint.jointRadius * 2.5; //make foot distance mult eventually
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
            let joint = new Joint(this.rootPos.x, this.rootPos.y + yOffset, jointInstructions[i].jointRadius, jointInstructions[i].drawSize, jointInstructions[i].fill);
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
        this.headJoint.pos = targetVector;
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

    /**
     * draws all joint segments, starting backwards
     */
    drawjoints() {
        //draw backwards
        for (let i = 0; i < this.jointArr.length; i++) {
            this.jointArr[i].draw();
        }
    }
}


/**
 * Joints act as the individual segments, used by both BodyJointGroups and LimbJointGroups
 * They give the lizard a visual appearance
 */
class Joint {
    constructor(x, y, jointRadius, drawSize, fill) {
        this.pos = createVector(x, y);
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
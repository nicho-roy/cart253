//i didnt see that you wrote feedback in my last submissions. Ill try to comment better this time.



//TODO lizard breeding
//lizards will compare and vary their genomes slightly to offspring and make a baby with traits in the middle of the 2 parents, with a mutation modifier

//TODO lizard rest/recover state



//TODON fix hind legs bending awkwardly

//TODON optimize setting limb position to target vector, by making it not set if already at target vector, same with body

//TODON implment alternative limbs for walking
// determine 2 sets of legs, 1: front left and back right, 2: front right and back left, 
// current set: determines which set of legs should advance, only after the current set of legs moves, can the next one move

//TODON tie speed to step distance

//TODON mini oscillations to body for lizard walking


//!!!!!!! BUG WHEN LOOPING THROUGH LIZARD ARRAY IN WANDER.DETECT. CAUSES A STUTTER EVERY 10 FRAMES

/**
 * Functions as the behaviour and impluse controller of the lizard
 * Contains: a single bodyJointGroup
 * supplies the target position, and shares position with the body joint group
 */
class Lizard {
    static ID_COUNTER = 1;
    static SPEED_LIMIT_MULT = 5; //5
    static PERCEPTIONRADUIS_MULT = 1.25;
    static DEFAULT_MINANGLE = 150;
    static EATRANGE_MULT = 10;
    static BASE_HUNGER_DRAIN = 0.1;
    constructor(x,y,speed,size,generation,bodyInstructions,colorGenes) {
        this.id = Lizard.ID_COUNTER++;
        this.pos = createVector(x,y);
        this.speed = speed; //0.5
        this.sprintMult = 3;
        this.isSprinting = false;
        this.velLimit = speed * Lizard.SPEED_LIMIT_MULT;
        this.size = size;
        this.targetVector = createVector(x,y);
        this.frameBuffer = 15; //frame buffer cooldown so actions dont run every frame

        //appearance
        this.colorGenes = {};
        this.colorGenes.color1 = colorGenes.color1;
        this.colorGenes.color2 = colorGenes.color2;
        this.colorGenes.bodyColorVariance = constrain(colorGenes.bodyColorVariance,0,10); //much much color shift to color2 along the body
        this.colorGenes.limbColorVariance = constrain(colorGenes.limbColorVariance, 0, 10); //much much color shift to color2 along the limbs
        this.bodyInstruction = this.generateBodyInstructions(bodyInstructions);
        this.body = new BodyJointGroup(this.bodyInstruction, size, this.pos, this.speed, this.velLimit, Lizard.DEFAULT_MINANGLE);

        //survival
        this.alive = true;
        this.perceptionRadius = this.body.getTotalLength() * Lizard.PERCEPTIONRADUIS_MULT; //must call after body instance
        this.hunger = 100;
        this.breedingHungerCost = 100;
        this.gender = Lizard.RollGender();
        this.generation = generation;
        
        //state machine manager
        this.currentState;
        this.wanderState = new LizardWanderState();
        this.chaseState = new LizardChaseState();
        this.chaseTarget;
        this.preyTypes = [Food];
        this.eatRange = this.size * Lizard.EATRANGE_MULT;
        this.breedState = new LizardBreedState();
        this.breedTarget;
        this.awake();


        objArr.push(this);
    }

    /**
     * generates a new individualized set of body instructions from a given one
     * @param {*} baseArr 
     * @returns 
     */
    generateBodyInstructions(baseArr) {
        let newBodyArr = [];
        for (let i = 0; i < baseArr.length; i++) {
            let joint = baseArr[i];
            let newColor = this.lerpColors(this.colorGenes.color1, this.colorGenes.color2, i * this.colorGenes.bodyColorVariance, baseArr.length);

            //if the current segment is a regular joint
            if (joint.type == "joint") {
                let newJoint = joint;
                newJoint.fill = newColor;
                newBodyArr.push(newJoint);
            }

            //if the current segment is a limb  
            else if (joint.type == "limb") {
                //loop through limb joints
                let newLimb = joint;
                let newLimbJoints = []
                for (let j = 0; j < joint.joints.length; j++) {
                    let newLimbJoint = baseArr[i].joints[j];
                    let newLimbJointColor = this.lerpColors(newColor, this.colorGenes.color2, i + j * this.colorGenes.limbColorVariance, baseArr.length);
                    newLimbJoint.fill = newLimbJointColor;
                    newLimbJoints.push(newLimbJoint);
                }
                newLimb.joints = newLimbJoints;
                newBodyArr.push(newLimb);
            }
        }
        return newBodyArr;
    }

    /**
     * Helper for generateBodyInstructions
     * Finds a color in between 2 colors weighted by how far the index is along the length of a hypothetical array
     * @param {*} color1 
     * @param {*} color2 
     * @param {*} index 
     * @param {*} totalCount 
     * @returns 
     */
    lerpColors(color1, color2, index, totalCount) {
        const currentStep = index / totalCount;
        let r = lerp(red(color1), red(color2), currentStep);
        let g = lerp(green(color1), green(color2), currentStep);
        let b = lerp(blue(color1), blue(color2), currentStep);
        const newColor = color(r,g,b);
        return newColor;
    }

    act() {
        if (this.alive) {
            this.updateState();
            this.moveToTarget();
            this.body.act();
            this.calcHungerDrain();
        }
        this.draw();
        this.DEBUG_DRAW();
    }

    moveToTarget() {
        const currentSpeedMult = (this.isSprinting) ? this.sprintMult : 1
        this.body.speedMult = currentSpeedMult;
        this.body.targetVector = this.targetVector;
    }

    calcHungerDrain() {
        let hungerDrain = Lizard.BASE_HUNGER_DRAIN;
        hungerDrain *= this.size;
        hungerDrain *= this.speed / 2;
        this.hunger -= hungerDrain;
        if (this.hunger <= 0) this.alive = false;
    }

    /**
     * called in chase state
     * removes a food item from objArr
     * called when reached eatRange
     */
    eat(obj) {
        this.hunger += obj.nutrition;
        obj.remove();
    }

    breed() {
        
    }

    remove() {
        const i = objArr.indexOf(this);
        if (i !== -1) objArr.splice(i, 1);
        objArr.splice(i, 1);
    }


    //STATE MACHINE
    awake() {
        this.switchState(this.wanderState);
    }
    
    updateState() {
        this.currentState.updateState(this);
    }

    switchState(state) {
        this.currentState = state;
        this.currentState.enterState(this);
    }


    //STATIC

    static SpawnLizards(amt) {
        for (let i = 0; i < amt; i++) {
            const pos = Util.getRandomScreenPos();
            const speed = random(0.25, 0.75);
            const size = random(1, 1.5);
            const colorGenes = {
                color1: color(random(0, 255), random(0, 255), random(0, 255)),
                color2: color(random(0, 255), random(0, 255), random(0, 255)),
                bodyColorVariance: random(0.5, 2.5),
                limbColorVariance: random(0.5, 4),
            }
            new Lizard(pos.x,pos.y,speed,size,1,lizardBaseArr,colorGenes);
        }
    }

    static RollGender() {
        const isFemale = Util.rollPercentChance(50);
        if (isFemale) {
            return 'F';
        } else {
            return 'M';
        }
    }

    /**
     * Calls draw method of the body
     */
    draw() {
        this.body.draw();
    }

    //DEBUG

    /**
     * _DEBUG
     */
    DEBUG_DRAW() {
        // this.drawPerceptionRadius();
        this.drawText();
    }

    drawPerceptionRadius() {
        noStroke();
        fill(color(255, 0, 0,30));
        ellipse(this.pos.x, this.pos.y, this.perceptionRadius*2, this.perceptionRadius*2);
    }

    drawText() {
        const textHeight = 16;
        let textLine = 0;
        textSize(textHeight);
        fill("#000000");
        if (!this.alive) {
            fill("#542323");
        }
        text(`id: ${this.id}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`gen: ${this.generation}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`hunger: ${this.hunger.toFixed(0)}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`gender: ${this.gender}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`size: ${this.size.toFixed(2)}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`speed: ${this.speed.toFixed(2)}`, this.pos.x, this.pos.y + textHeight * textLine++);
    }


}

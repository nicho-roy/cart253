//i didnt see that you wrote feedback in my last submissions. Ill try to comment better this time.



//TODON CONTROLLABLE LIZARDS, and make spawnable lizards with specific traits

//TODO lizard rest/recover state when low on food

//! TODON REST STATE FIX


//TODON lizard predation, and prey fleeing, if size is doubled

//TODON fix hind legs bending awkwardly

//TODON optimize setting limb position to target vector, by making it not set if already at target vector, same with body

//TODON fix alternative limbs for walking
// determine 2 sets of legs, 1: front left and back right, 2: front right and back left, 
// current set: determines which set of legs should advance, only after the current set of legs moves, can the next one move

//TODON mini oscillations to body for lizard walking


//!!!!! UPDATE REST STATE TO BE MORE LIKELY THE LOWER LIZARD IS ON FOOD, LERP WHEN FOOD LOW



/**
 * Functions as the behaviour and impluse controller of the lizard
 * Contains: a single bodyJointGroup
 * supplies the target position, and shares position with the body joint group
 */
class Lizard {
    static ID_COUNTER = 1;
    static SPEED_LIMIT_MULT = 5; //5
    static BASE_PERCEPTIONRADUIS = 120; //1.25
    static PERCEPTION_SKILL_HUNGER_COST = 1; //! TODO IMPLEMENT
    static DEFAULT_MINANGLE = 150;
    static EATRANGE_MULT = 10;
    static BASE_HUNGER = 100;
    static BASE_HUNGER_DRAIN = 0.01; //0.1
    static MATING_COST_MULT = 1.1;
    static MUTATION_MULT = 1.5;
    constructor(x, y, traitGenes, colorGenes, bodyInstructions) {
        this.id = Lizard.ID_COUNTER++;
        this.pos = createVector(x,y);
        this.speed = traitGenes.speed; //0.5
        this.sprintMult = 3;
        this.velLimit = traitGenes.speed * Lizard.SPEED_LIMIT_MULT;
        this.size = traitGenes.size;
        this.targetVector = createVector(x,y);
        this.frameBuffer = 15; //frame buffer cooldown so actions dont run every frame

        //appearance
        this.colorGenes = {};
        this.colorGenes.color1 = colorGenes.color1;
        this.colorGenes.color2 = colorGenes.color2;
        this.colorGenes.bodyColorVariance = constrain(colorGenes.bodyColorVariance,0,10); //much much color shift to color2 along the body
        this.colorGenes.limbColorVariance = constrain(colorGenes.limbColorVariance, 0, 10); //much much color shift to color2 along the limbs
        this.bodyInstruction = this.generateBodyInstructions(bodyInstructions);
        this.body = new BodyJointGroup(this.bodyInstruction, this.size, this.pos, this.speed, this.velLimit, Lizard.DEFAULT_MINANGLE);

        //survival
        this.alive = true;
        this.perceptionSkill = traitGenes.perceptionSkill;
        this.perceptionRadius = Lizard.BASE_PERCEPTIONRADUIS * this.perceptionSkill; //must call after body instance
        this.isSprinting = false;
        this.isResting = false;
        this.restingHungerDrainMult = 0.2;
        this.restChance = 1; //likelyhood to rest per cycle (framebuffer) once in the hunger range //TODON varry per individual
        this.hunger = Lizard.BASE_HUNGER * this.size;
        this.breedHungerCost = this.hunger * Lizard.MATING_COST_MULT;
        this.restHungerThreshold = 75; //TODON varry per individual
        this.gender = Lizard.RollGender();
        this.generation = traitGenes.generation;
        this.decayTime = 18000; //5 mins
        this.decayTimer = 0;
        
        //state machine manager
        this.currentState;
        this.wanderState = new LizardWanderState();
        this.wanderAttentionTimer = random(150,250);
        this.chaseState = new LizardChaseState();
        this.chaseTarget;
        this.preyTypes = [Food];
        this.eatRange = this.size * Lizard.EATRANGE_MULT;
        this.breedState = new LizardBreedState();
        this.breedTarget;
        this.restState = new LizardRestState();
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
        } else {
            // this.runDecay();
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
        hungerDrain *= (this.isSprinting) ? this.speed : this.speed / 2;
        if (this.isResting) hungerDrain *= this.restingHungerDrainMult;
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

    meetsBreedCondition() {
        return this.hunger > this.breedHungerCost;
    }

    breed() {
        this.hunger -= this.breedHungerCost / Lizard.MATING_COST_MULT;
        if (this.gender === 'F') {
            this.spawnOffspring();
        }
        this.breedTarget = null;
    }

    /**
     * spawns an offspring with the gene ranges of the parents * mutation mult
     */
    spawnOffspring() {
        const partner = this.breedTarget;
        const speed = Lizard.RollOffspringGene(this.speed,partner.speed)
        const size = Lizard.RollOffspringGene(this.size, partner.size)
        const generation = this.generation + 1;
        const perceptionSkill = Lizard.RollOffspringGene(this.perceptionSkill, partner.perceptionSkill)
        const r1 = Lizard.RollOffspringGene(red(this.colorGenes.color1), red(this.colorGenes.color1))
        const g1 = Lizard.RollOffspringGene(green(this.colorGenes.color1), green(this.colorGenes.color1))
        const b1 = Lizard.RollOffspringGene(blue(this.colorGenes.color1), blue(this.colorGenes.color1))
        const r2 = Lizard.RollOffspringGene(red(this.colorGenes.color2), red(partner.colorGenes.color2))
        const g2 = Lizard.RollOffspringGene(green(this.colorGenes.color2), green(partner.colorGenes.color2))
        const b2 = Lizard.RollOffspringGene(blue(this.colorGenes.color2), blue(partner.colorGenes.color2))
        const bodyColorVariance = Lizard.RollOffspringGene(this.colorGenes.bodyColorVariance, partner.colorGenes.bodyColorVariance)
        const limbColorVariance = Lizard.RollOffspringGene(this.colorGenes.limbColorVariance, partner.colorGenes.limbColorVariance)
        const traitGenes = {
            speed: speed,
            size: size,
            generation: generation,
            perceptionSkill: perceptionSkill,
        }
        const colorGenes = {
            color1: color(r1,g1,b1),
            color2: color(r2,g2,b2),
            bodyColorVariance: bodyColorVariance,
            limbColorVariance: limbColorVariance,
        }
        new Lizard(this.pos.x, this.pos.y, traitGenes, colorGenes, lizardBaseArr);
    }

    /**
     * removes a lizard if dead, after an amount of time
     */
    runDecay() {
        this.decayTimer++;
        if (this.decayTimer > this.decayTime) {
            this.remove();
        }
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
    static RollOffspringGene(thisGene,partnerGene) {
        return random(
            min(thisGene, partnerGene) / Lizard.MUTATION_MULT,
            max(thisGene, partnerGene) * Lizard.MUTATION_MULT
        );
    }

    static SpawnLizards(amt) {
        for (let i = 0; i < amt; i++) {
            const pos = Util.getRandomScreenPos();
            const traitGenes = {
                speed: random(0.25, 0.75),
                size: random(1, 1.5),
                generation: 1,
                perceptionSkill: random(0.95, 1.15),
            }
            const colorGenes = {
                color1: color(random(0, 255), random(0, 255), random(0, 255)),
                color2: color(random(0, 255), random(0, 255), random(0, 255)),
                bodyColorVariance: random(0.5, 2.5),
                limbColorVariance: random(0.5, 4),
            }
            new Lizard(pos.x,pos.y,traitGenes,colorGenes,lizardBaseArr);
        }
    }

    static RollGender() {
        const isFemale = Util.RollPercentChance(50);
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
        if (showPerception) this.drawPerceptionRadius();
        if (showStats) this.drawText();
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
        // text(`id: ${this.id}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`gen: ${this.generation}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`state: ${(this.alive) ? this.currentState.name : "deceased"}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`hunger: ${this.hunger.toFixed(0)}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`gender: ${this.gender}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`size: ${this.size.toFixed(2)}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`speed: ${this.speed.toFixed(2)}`, this.pos.x, this.pos.y + textHeight * textLine++);
        text(`perception: ${this.perceptionSkill.toFixed(2)}`, this.pos.x, this.pos.y + textHeight * textLine++);
    }


}

class LizardBreedState extends LizardBaseState {
    constructor() {
        super();
        this.name = "breeding"
        this.breedTime = random(100,150);
        this.breedTimer = 0;
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        lizard.isSprinting = false;
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        if (!lizard.breedTarget || !lizard.breedTarget.alive || lizard.hunger < lizard.breedHungerCost) {
            lizard.breedTarget = null;
            lizard.switchState(lizard.wanderState);
            return;
        }
        const shimmy = Util.getRandomVectorOfMag(200);
        lizard.targetVector = p5.Vector.add(lizard.breedTarget.pos, shimmy);
        this.checkBreedTarget(lizard);
    }

    /**
     * Checks if the target is in range to mate
     * @param {*} lizard 
     * @returns 
     */
    checkBreedTarget(lizard) {
        const partner = lizard.breedTarget;
        const toTarget = p5.Vector.sub(partner.pos, lizard.pos);
        const distToTarget = toTarget.mag();
        if (distToTarget > lizard.eatRange) return
        
        this.breedTimer++;
        
        const partnerState = partner.currentState;;
        if (this.isReadyToBreed() && partnerState instanceof LizardBreedState && partnerState.isReadyToBreed()) {
            //initiate reproduction, the first to reach this point will initiate for the both of them
            this.initiateReproduction(lizard);
            partnerState.initiateReproduction(partner);
        }
    }

    isReadyToBreed() {
        return this.breedTimer >= this.breedTime;
    }

    initiateReproduction(lizard) {
        lizard.breed();
        // lizard.breedTarget = null;
        this.breedTimer = 0;
        lizard.switchState(lizard.wanderState);
        return;
    }

}
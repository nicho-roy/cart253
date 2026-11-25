class LizardBreedState extends LizardBaseState {
    constructor() {
        super();
        this.name = "breeding"
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
        lizard.targetVector = lizard.breedTarget.pos;
        this.checkBreedTarget(lizard);
    }

    /**
     * Checks if the target is in range to mate
     * @param {*} lizard 
     * @returns 
     */
    checkBreedTarget(lizard) {
        const toTarget = p5.Vector.sub(lizard.targetVector, lizard.pos);
        const distToTarget = toTarget.mag();
        if (distToTarget <= lizard.eatRange) {
            lizard.breed();
            lizard.switchState(lizard.wanderState);
        }
    }

}
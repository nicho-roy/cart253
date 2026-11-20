
class LizardChaseState extends LizardBaseState {
    constructor() {
        super();
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        // console.log("entered chase state");
        lizard.isSprinting = true;
    }

    /**
     * to be called every frame of a state
     * checks if target is still eligable to be chased
     */
    updateState(lizard) {
        if (!lizard.chaseTarget || !lizard.chaseTarget.alive) {
            lizard.chaseTarget = null;
            lizard.switchState(lizard.wanderState);
            return;
        }
        lizard.targetVector = lizard.chaseTarget.pos;
        this.checkEatTarget(lizard);
    }

    /**
     * Checks if the target is in range to be eaten
     * @param {*} lizard 
     * @returns 
     */
    checkEatTarget(lizard) {
        const toTarget = p5.Vector.sub(lizard.targetVector, lizard.pos);
        const distToTarget = toTarget.mag();
        if (distToTarget <= lizard.eatRange) {
            lizard.eat(lizard.chaseTarget);
            lizard.switchState(lizard.wanderState);
        }
    }

    

}
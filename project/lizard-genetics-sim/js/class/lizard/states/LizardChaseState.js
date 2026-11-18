
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
     */
    updateState(lizard) {
        lizard.targetVector = lizard.chaseTarget.pos;
        this.checkEatTarget(lizard);
    }

    checkEatTarget(lizard) {
        const toTarget = p5.Vector.sub(lizard.targetVector, lizard.pos);
        const distToTarget = toTarget.mag();
        if (distToTarget <= lizard.eatRange) {
            lizard.eat(lizard.chaseTarget);
            lizard.switchState(lizard.wanderState);
        }
    }

    

}
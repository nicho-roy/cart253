class LizardRestState extends LizardBaseState {
    constructor() {
        super();
        this.name = "resting"
        this.restTime = random(600, 1200);
        this.restTimer = 0;
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        lizard.isSprinting = false;
        lizard.isResting = true;
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        this.restTimer++;
        if (this.restTimer >= this.restTime) {
            lizard.restTimer = 0;
            lizard.isResting = false;
            lizard.switchState(lizard.wanderState);
            return;
        }
    }

}
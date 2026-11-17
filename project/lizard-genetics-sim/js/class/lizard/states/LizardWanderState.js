class LizardWanderState extends LizardBaseState {
    constructor() {
        super();
        this.wanderAttentionTime = 100;
        this.wanderAttentionTimer = 0;
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        console.log("entered wander state");
        this.assignRandomWanderTarget(lizard);
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        this.wanderAttentionTimer++;
        if (this.wanderAttentionTimer >= this.wanderAttentionTime) {
            this.assignRandomWanderTarget(lizard);
            this.wanderAttentionTimer = 0;
        }
    }

    assignRandomWanderTarget(lizard) {
        const randX = random(0, width);
        const randY = random(0, height);
        const targetVector = createVector(randX, randY);
        lizard.targetVector = targetVector;
    }

}
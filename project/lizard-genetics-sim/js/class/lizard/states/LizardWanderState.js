class LizardWanderState extends LizardBaseState {
    constructor() {
        super();
        this.wanderAttentionTime = 200;
        this.wanderAttentionTimer = 0;
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        console.log("entered wander state");
        lizard.isSprinting = false;
        this.assignRandomWanderTarget(lizard);
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        //check if anything to chase
        this.detectChaseTarget(lizard);

        //else wander like normal
        this.wanderAttentionTimer++;
        if (this.wanderAttentionTimer >= this.wanderAttentionTime) {
            this.assignRandomWanderTarget(lizard);
            this.wanderAttentionTimer = 0;
        }
    }

    detectChaseTarget(lizard) {
        const objPos = createVector(mouseX, mouseY);
        if (dist(lizard.pos.x, lizard.pos.y, objPos.x, objPos.y) < lizard.perceptionRadius) {
            lizard.chaseTarget = objPos; //!SHOULD BE AN OBJECT WITH A POS
            lizard.switchState(lizard.chaseState);
        }
    }

    assignRandomWanderTarget(lizard) {
        const randX = random(0, width);
        const randY = random(0, height);
        const targetVector = createVector(randX, randY);
        lizard.targetVector = targetVector;
    }

}
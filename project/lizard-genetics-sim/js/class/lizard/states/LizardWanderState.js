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
        // console.log("entered wander state");
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
        for (const e of objArr) {
            if (e === this) continue;
            if (!lizard.preyTypes.some(T => e instanceof T)) continue;
            if (dist(lizard.pos.x, lizard.pos.y, e.pos.x, e.pos.y) > lizard.perceptionRadius) continue;

            lizard.chaseTarget = e;
            lizard.switchState(lizard.chaseState);
            return;
        }
    }

    assignRandomWanderTarget(lizard) {
        const randX = random(0, width);
        const randY = random(0, height);
        const targetVector = createVector(randX, randY);
        lizard.targetVector = targetVector;
    }

}
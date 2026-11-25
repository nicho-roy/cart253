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
        this.wanderAttentionTime = lizard.wanderAttentionTimer;
        this.assignRandomWanderTarget(lizard);
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        //check if anything to chase
        this.detectChaseTarget(lizard);
        // this.detectBreedTarget(lizard);

        //else wander like normal
        this.wanderAttentionTimer++;
        if (this.wanderAttentionTimer >= this.wanderAttentionTime) {
            this.assignRandomWanderTarget(lizard);
            this.wanderAttentionTimer = 0;
        }
    }

    /**
     * Finds the closest target to chase, sets it as the new chase target, and switches to the chase state
     * @param {*} lizard 
     * @returns 
     */
    detectChaseTarget(lizard) {
        //run every X frames for performance
        if (!((frameCount + lizard.id) % lizard.frameBuffer === 0)) return;

        let closest = {obj: null, dist: 99999};
        for (const e of objArr) {
            if (e === this) continue;
            if (!lizard.preyTypes.some(T => e instanceof T)) continue; //if the target is a desired food item

            //sets closest as current target if it tghe closest
            const distanceToCurrent = dist(lizard.pos.x, lizard.pos.y, e.pos.x, e.pos.y);
            if (distanceToCurrent > lizard.perceptionRadius) continue;
            if (distanceToCurrent < closest.dist) {
                closest = { obj: e, dist: distanceToCurrent };
            }
        }

        if (closest.obj) {
            lizard.chaseTarget = closest.obj;
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
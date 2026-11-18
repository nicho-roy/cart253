
class LizardChaseState extends LizardBaseState {
    constructor() {
        super();
    }

    /**
     * to be called on the first frame of entering a state
     */
    enterState(lizard) {
        console.log("entered chase state");
        lizard.isSprinting = true;
    }

    /**
     * to be called every frame of a state
     */
    updateState(lizard) {
        lizard.targetVector = lizard.chaseTarget; //! SHOULD BE OBJ WITH POSITION
    }

    

}
//apologies pippin, i didnt see that you wrote feedback in my last submissions. Ill try to comment better this time.



//TODON fix hind legs bending awkwardly

//TODON optimize setting limb position to target vector, by making it not set if already at target vector, same with body

//TODON implment alternative limbs for walking
// determine 2 sets of legs, 1: front left and back right, 2: front right and back left, 
// current set: determines which set of legs should advance, only after the current set of legs moves, can the next one move

//TODON test lizards wityh smaller sizes
//TODON tie speed to step distance



//lizards need, inital pos, 

/**
 * Functions as the behaviour and impluse controller of the lizard
 * Contains: a single bodyJointGroup
 * supplies the target position, and shares position with the body joint group
 */
class Lizard {
    static SPEED_LIMIT_MULT = 5; //5
    static DEFAULT_PERCEPTION_MULT = 3;
    static DEFAULT_MINANGLE = 150;
    constructor(x,y,speed,size) {
        this.pos = createVector(x,y);
        this.speed = speed; //0.5
        this.sprintMult = 3;
        this.isSprinting = false;
        this.velLimit = speed * Lizard.SPEED_LIMIT_MULT;
        this.targetVector = createVector(x,y);
        this.body = new BodyJointGroup(lizardSmallJointArr, size, this.pos, this.speed, this.velLimit, Lizard.DEFAULT_MINANGLE);
        this.perceptionRadius = this.body.getTotalLength() * Lizard.DEFAULT_PERCEPTION_MULT;
        
        //state machine manager
        this.currentState;
        this.wanderState = new LizardWanderState();
        this.chaseState = new LizardChaseState();
        this.chaseTarget;
        this.awake();


        objArr.push(this);
    }

    act() {
        this.updateState();
        this.moveToTarget();
        this.body.act();
    }

    moveToTarget() {
        const currentSpeedMult = (this.isSprinting) ? this.sprintMult : 1
        this.body.speedMult = currentSpeedMult;
        this.body.targetVector = this.targetVector;
    }


    //STATE MACHINE
    awake() {
        this.switchState(this.wanderState);
    }
    
    updateState() {
        this.currentState.updateState(this);
    }

    switchState(state) {
        this.currentState = state;
        this.currentState.enterState(this);
    }


}

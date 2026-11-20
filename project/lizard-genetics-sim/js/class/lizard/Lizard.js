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
    static PERCEPTIONRADUIS_MULT = 1.25;
    static DEFAULT_MINANGLE = 150;
    static EATRANGE_MULT = 10;
    constructor(x,y,speed,size) {
        this.pos = createVector(x,y);
        this.speed = speed; //0.5
        this.sprintMult = 3;
        this.isSprinting = false;
        this.velLimit = speed * Lizard.SPEED_LIMIT_MULT;
        this.size = size;
        this.targetVector = createVector(x,y);
        //body handles the drawing of lizard body and limbs
        this.body = new BodyJointGroup(lizardSmallJointArr, size, this.pos, this.speed, this.velLimit, Lizard.DEFAULT_MINANGLE);
        this.perceptionRadius = this.body.getTotalLength() * Lizard.PERCEPTIONRADUIS_MULT;

        //survival
        this.hunger = 100;
        
        //state machine manager
        this.currentState;
        this.wanderState = new LizardWanderState();
        this.chaseState = new LizardChaseState();
        this.chaseTarget;
        this.preyTypes = [Food];
        this.eatRange = this.size * Lizard.EATRANGE_MULT;
        this.awake();


        objArr.push(this);
    }

    act() {
        this.updateState();
        this.moveToTarget();
        this.body.act();
        this.DEBUG_DRAW();
    }

    moveToTarget() {
        const currentSpeedMult = (this.isSprinting) ? this.sprintMult : 1
        this.body.speedMult = currentSpeedMult;
        this.body.targetVector = this.targetVector;
    }

    /**
     * called in chase state
     * removes a food item from objArr
     * called when reached eatRange
     */
    eat(obj) {
        this.hunger += obj.nutrition;
        obj.remove();
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

    remove() {
        const i = objArr.indexOf(this);
        objArr.splice(i, 1);
    }


    //DEBUG

    /**
     * _DEBUG
     */
    DEBUG_DRAW() {
        this.DEBUG_drawPerceptionRadius()
    }

    DEBUG_drawPerceptionRadius() {
        push();
        noStroke();
        fill(color(255, 0, 0,30));
        ellipse(this.pos.x, this.pos.y, this.perceptionRadius*2, this.perceptionRadius*2);
        pop();
    }


}

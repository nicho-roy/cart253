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
    static DEFAULT_MINANGLE = 150;
    constructor(x,y,speed,size) {
        this.pos = createVector(x,y);
        this.speed = speed; //1
        this.velLimit = speed * Lizard.SPEED_LIMIT_MULT;
        this.targetVector = createVector(x,y);

        this.bodyJointGroup = new BodyJointGroup(lizardSmallJointArr, size, this.pos, this.speed, this.velLimit, Lizard.DEFAULT_MINANGLE);

        lizardArr.push(this);
    }

    act() {
        const targetVector = this.getTargetVector();
        this.moveTo(targetVector);
        this.bodyJointGroup.act();
    }

    getTargetVector() {
        const randX = random(0,width);
        const randY = random(0,height);
        const targetVector = createVector(randX,randY);
        this.targetVector = targetVector;
        return this.targetVector;
    }

    moveTo(targetPosition) {
        this.bodyJointGroup.setMoveTarget(targetPosition);
    }





}

//CLASS
class Segment {
    constructor(x,y,size,fill,previousSegment) {
        this.pos = createVector(x,y);
        this.vel = createVector(0, 0);
        this.velLimit = 20;
        this.acc = createVector(0, 0);
        this.size = size;
        this.fill = fill;
        this.isFirst = false;
        this.previousSegment;
        if (previousSegment) {
            this.previousSegment = previousSegment;
            this.isFirst = false;
        } else {
            this.isFirst = true;
        }
        segmentArr.push(this);
    }

    act() {
        if (this.isFirst) {
            this.runMouseControls();
        } else {
            this.acc = gravity
        }

        this.applyMotion();
    }

    applyMotion() {
        this.vel.add(gravity);
        this.vel.limit(this.velLimit)
        this.pos.add(this.vel);
    }

    runMouseControls() {
        if (mouseIsPressed) {
            console.log("click");
            //TODON smooth mouse drag
            this.pos = createVector(mouseX,mouseY);
        }
    }

    draw() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.size, this.size); 
        pop();
    }
}
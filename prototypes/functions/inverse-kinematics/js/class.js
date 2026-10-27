//CLASS
class Segment {
    constructor(x, y, size, fill, previous) {
        this.pos = createVector(x,y);
        this.vel = createVector(0, 0);
        this.velLimit = 100;
        this.acc = createVector(0, 0);
        this.size = size;
        this.fill = fill;
        this.isFirst = false;
        this.previous;
        if (previous) {
            this.previous = previous;
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
            this.applyMotion();
        }

    }

    applyMotion() {
        const couplingRaduis = this.previous.size/2
        const vectorToPrev = p5.Vector.sub(this.previous.pos,this.pos);
        const distance = vectorToPrev.mag();

        //if inside coupling radius
        if (distance <= couplingRaduis) {
            this.acc = gravity;
        } else {
            const magToCoupling = distance - couplingRaduis;
            this.acc = vectorToPrev.setMag(magToCoupling * PULL_STRENGTH);
        }


        this.vel.add(this.acc);
        this.vel.limit(this.velLimit)
        this.pos.add(this.vel);

        // console.log("acc",this.acc.x,this.acc.y);
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
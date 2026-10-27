//CLASS
class Segment {
    constructor(x,y,size,fill,previousSegment) {
        this.pos = createVector(x,y);
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
            
        }
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
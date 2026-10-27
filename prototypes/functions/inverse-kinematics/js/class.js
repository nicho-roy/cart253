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
        //effects of gravity and update position, move by mouse if first
    }

    draw(xOffset,yOffset) {
        push();
        fill(this.fill);
        ellipse(this.pos.x - (this.size / 2), this.pos.y - (this.size / 2), this.size, this.size); 
        pop();
    }
}
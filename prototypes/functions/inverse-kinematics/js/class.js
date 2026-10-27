//CLASS
class Segment {
    constructor(x,y,size,previousSegment) {
        this.pos = createVector(x,y);
        this.size = size;
        this.isFirst = false;
        this.previousSegment;
        if (previousSegment) {
            this.previousSegment = previousSegment;
            this.isFirst = false;
        } else {
            this.isFirst = true;
        }
    }

    act() {
        //effects of gravity and update position, move by mouse if first
    }

    draw(xOffset,yOffset) {
        push();
        //TODON account for scale and probs fix in general
        const dimensions = getChunkDimensions();
        image(this.image, (this.chunkX * dimensions.x) + xOffset, (this.chunkY * dimensions.y) + yOffset, CANVAS.x * worldScale, CANVAS.y * worldScale); 
        pop();
    }
}
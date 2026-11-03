//CLASS

const exampleJointArray = [
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
    { jointRadius: 50, drawSize: 50, fill: "#2496c7" },
];

//joint controller
class JointGroup {
    constructor(jointArr,startX,startY) {

    }

    act() {

    }

    drawjoints() {

    }
}

class Joint {
    constructor(x, y, jointRadius, drawSize, fill) {
        this.pos = createVector(x,y);
        this.jointRadius = jointRadius;
        this.drawSize = drawSize;
        this.fill = fill;
    }

    draw() {
        push();
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize); 
        pop();
    }
}
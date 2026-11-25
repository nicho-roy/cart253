/**
 * Joints act as the individual segments, used by both BodyJointGroups and LimbJointGroups
 * They give the lizard a visual appearance
 */
class Joint {
    constructor(x, y, jointRadius, drawSize, fill) {
        this.pos = createVector(x, y);
        this.jointRadius = jointRadius;
        this.drawSize = drawSize;
        this.fill = fill;
    }

    draw() {
        if (isFastForwarding()) return; //do not draw joints if fast forwarding sim
        noStroke();
        fill(this.fill);
        ellipse(this.pos.x, this.pos.y, this.drawSize, this.drawSize);
    }
}
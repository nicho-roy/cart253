class Cell {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.material = "";
        blocksArr.push(this);
    }

    draw() {
        push();
        noStroke();
        fill(100);
        rect(this.pos.x + (cellSize / 2), this.pos.y + (cellSize / 2), cellSize, cellSize);
        pop();
    }
}


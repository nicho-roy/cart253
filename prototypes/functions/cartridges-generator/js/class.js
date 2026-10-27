class Cell {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.material = "";
        cellsArr.push(this);
    }

    draw() {
        push();
        noStroke();
        fill(48, 98, 48);
        rect(this.pos.x*cellSize, this.pos.y*cellSize, cellSize, cellSize);
        pop();
    }

    destroy() {
        let index = cellsArr.indexOf(this);
        cellsArr.splice(index, 1);
    }
}


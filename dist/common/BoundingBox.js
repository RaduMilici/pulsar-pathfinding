import Vector from './Vector';
import Line from './Line';
import { immutableObjectSort } from '../util';
/*
* !WARNING!
* This class regards its point of origin at the top left corner.
* */
export default class BoundingBox {
    constructor(points) {
        this.points = points;
        this.findCorners();
        this.makeLines();
        this.findLimits();
    }
    get midpoints() {
        return this.limits;
    }
    get area() {
        return this.top.length * this.right.length;
    }
    get lines() {
        return [this.top, this.right, this.bottom, this.left];
    }
    findCorners() {
        const sortedX = immutableObjectSort(this.points, 'x');
        const sortedY = immutableObjectSort(this.points, 'y');
        const firstX = sortedX[0];
        const firstY = sortedY[0];
        const lastX = sortedX[sortedX.length - 1];
        const lastY = sortedY[sortedY.length - 1];
        this.topLeft = new Vector({ x: firstX.x, y: firstY.y });
        this.topRight = new Vector({ x: lastX.x, y: firstY.y });
        this.bottomRight = new Vector({ x: lastX.x, y: lastY.y });
        this.bottomLeft = new Vector({ x: firstX.x, y: lastY.y });
    }
    makeLines() {
        this.top = new Line(this.topLeft, this.topRight);
        this.right = new Line(this.topRight, this.bottomRight);
        this.bottom = new Line(this.bottomRight, this.bottomLeft);
        this.left = new Line(this.bottomLeft, this.topLeft);
    }
    findLimits() {
        const top = this.topLeft.midpoint(this.topRight);
        const bottom = this.bottomLeft.midpoint(this.bottomRight);
        const left = this.topLeft.midpoint(this.bottomLeft);
        const right = this.topRight.midpoint(this.bottomRight);
        this.limits = { top, bottom, left, right };
    }
}
//# sourceMappingURL=BoundingBox.js.map
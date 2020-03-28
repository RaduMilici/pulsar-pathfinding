import Vector from '../Vector';
import { I_Line, Line } from '../Line';
import BoundingBox from '../BoundingBox';
import { isOdd } from '../../util';

export default class Shape {
  readonly lines: I_Line[];

  constructor(public readonly points: Vector[]) {
    this.lines = Shape.makeLines(points);
  }

  get boundingBox(): BoundingBox {
    return new BoundingBox(this.points);
  }

  containsPoint(point: Vector): boolean {
    let intersects: number = 0;
    const checkPoint: Vector = new Vector({
      x: point.x,
      y: Number.MAX_SAFE_INTEGER,
    });
    const checkLine: I_Line = new Line(point, checkPoint);

    this.lines.forEach((line: I_Line) => {
      if (line.intersects(checkLine)) {
        intersects++;
      }
    });

    return isOdd(intersects);
  }

  get centroid(): Vector {
    return Vector.FindPolyCentroid(this.points);
  }

  private static makeLines(points: Vector[]): Line[] {
    const lines: I_Line[] = [];
    const ccwPoints: Vector[] = Vector.ArrangePointsCCW(points);

    for (let i = 1; i < ccwPoints.length; i++) {
      const a: Vector = ccwPoints[i - 1];
      const b: Vector = ccwPoints[i];
      const ab: I_Line = new Line(a, b);
      lines.push(ab);
    }

    const firstPoint: Vector = ccwPoints[0];
    const lastPoint: Vector = ccwPoints[ccwPoints.length - 1];
    const closingLine: I_Line = new Line(firstPoint, lastPoint);

    lines.push(closingLine);

    return lines;
  }
}
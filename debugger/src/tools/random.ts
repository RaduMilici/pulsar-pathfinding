import { boundingBox } from '../../../src/interfaces';
import { Vector, randomInt } from '../../../src';

const random = {
  color(): string {
    const r = randomInt(0, 255);
    const g = 0; //randomInt(0, 255);
    const b = 0; //randomInt(0, 255);
    return `rgb(${r},${g},${b})`;
  },

  point({ top, bottom, left, right }: boundingBox): Vector {
    const x = randomInt(left, right);
    const y = randomInt(top, bottom);
  
    return new Vector({ x, y });
  },

  points(count: number, box: boundingBox): Vector[] {
    const points: Vector[] = [];
  
    for (let i = 0; i < count; i++) {
      points.push(this.point(box));
    }
  
    return points;
  }
}

export { random };

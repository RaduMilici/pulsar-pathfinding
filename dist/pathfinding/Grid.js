import { Vector } from '../common';
import Obstacles from './Obstacles';
import { int } from '../util/random';
import NavigatorTile from './NavigatorTile';
const defaultSize = { width: 10, height: 10 };
export default class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.tiles = [];
        this.rows = [];
        this.obstacles = new Obstacles(this);
        this.makeGrid();
    }
    /** Returns a random tile, can be an obstacle or not. */
    randomTile() {
        const x = int(0, this.size.width - 1);
        const y = int(0, this.size.height - 1);
        return this.findTile({ x, y });
    }
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile() {
        return this.obstacles.getRandomOpen();
    }
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }) {
        const row = this.rows[y];
        return row && row.length > x ? row[x] : null;
    }
    makeGrid() {
        for (let y = 0; y < this.size.height; y++) {
            const row = [];
            for (let x = 0; x < this.size.width; x++) {
                const position = new Vector({ x, y });
                const tile = new NavigatorTile(position);
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}
//# sourceMappingURL=Grid.js.map
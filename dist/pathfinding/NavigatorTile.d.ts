import { id, point } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
export default class NavigatorTile implements id {
    readonly position: point;
    id: number;
    isObstacle: boolean;
    private navigators;
    constructor(position: point);
    registerNavigatorData(navigator: Navigator): boolean;
    getNavigatorData(navigator: Navigator): NavigatorData | null;
    isDiagonal({ position }: NavigatorTile): boolean;
}
//# sourceMappingURL=NavigatorTile.d.ts.map
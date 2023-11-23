import { Params } from "../params";
import { DirectionType } from "../type/directionType";
import { DirectionUtil } from "../util/directionUtil";

/**
 * 座標を表すクラス
 */
export class Coord {
    public x: integer;
    public y: integer;

    /**
     * 座標を生成する（マップ外の座標の場合は例外を投げる）
     * @param x x座標
     * @param y y座標
     */
    constructor(x: integer = 0, y: integer = 0) {
        if ((x < 0 || Params.MAP_COLUMN <= x) || (y < 0 || Params.MAP_ROW <= y)) {
            throw new Error('invalid coord');
        }
        this.x = x;
        this.y = y;
    }

    /**
     * 移動先の座標を返す
     * @param direction 座標の移動方向
     * @returns 移動先の座標
     */
    public getMoveToCoord(direction: DirectionType): Coord {
        const [dx, dy] = DirectionUtil.get(direction);
        return new Coord(this.x + dx, this.y + dy);
    }
}
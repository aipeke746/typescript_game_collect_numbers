import { Params } from "../params";
import { DirectionType } from "../type/directionType";
import { DirectionDiffUtil } from "../util/directionDiffUtil";

/**
 * タイルマップの座標を表すクラス
 */
export class Coord {
    /**
     * タイルマップのx座標
     */
    public readonly x: integer;
    /**
     * タイルマップのｙ座標
     */
    public readonly y: integer;

    /**
     * タイルマップの座標を生成する（マップ外の座標の場合は例外を投げる）
     * @param coord タイルマップの座標
     */
    constructor(coord: Coord);
    /**
     * タイルマップの座標を生成する（マップ外の座標の場合は例外を投げる）
     * @param x x座標
     * @param y y座標
     */
    constructor(x: integer, y: integer);
    constructor(coordOrX: Coord | number, y?: number) {
        if (coordOrX instanceof Coord) {
            this.x = coordOrX.x;
            this.y = coordOrX.y;
        } else {
            this.x = coordOrX;
            this.y = y!;
        }

        if ((this.x < 0 || Params.MAP_COLUMN <= this.x) || (this.y < 0 || Params.MAP_ROW <= this.y)) {
            throw new Error('invalid coord');
        }
    }

    /**
     * 移動先の座標を返す
     * @param direction 座標の移動方向
     * @returns 移動先の座標
     */
    public getMoveToCoord(direction: DirectionType): Coord {
        const [dx, dy] = DirectionDiffUtil.get(direction);
        return new Coord(this.x + dx, this.y + dy);
    }

    /**
     * 対象の座標と等しいかどうかを返す
     * @param coord 対象の座標
     * @returns 対象の座標と等しい場合はtrue
     */
    public equals(coord: Coord): boolean {
        return this.x === coord.x && this.y === coord.y;
    }
}
import { Params } from "../params";
import { Coord } from "../vo/coord";

/**
 * タイルマップの座標を生成するクラス
 */
export class CoordFactory {
    /**
     * ランダムな座標を返す
     * @returns ランダムな座標
     */
    public static randomCoord(): Coord {
        const x = Phaser.Math.Between(0, Params.MAP_COLUMN - 1);
        const y = Phaser.Math.Between(0, Params.MAP_ROW - 1);
        const pos = new Phaser.Math.Vector2(x, y);
        return new Coord(pos);
    }
}
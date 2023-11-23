import { DirectionType } from "../type/directionType";

/**
 * 移動方向のユーティリティクラス
 */
export class DirectionUtil {
    /**
     * 移動方向の差分
     */
    private static readonly DX: number[] = [1, -1, 0, 0];
    private static readonly DY: number[] = [0, 0, 1, -1];

    /**
     * 移動方向の差分を返す
     * @param direction 座標の移動方向
     * @returns 移動方向の差分
     */
    public static get(direction: DirectionType): [x: number, y: number] {
        return [
            DirectionUtil.DX[direction],
            DirectionUtil.DY[direction]
        ];
    }
}
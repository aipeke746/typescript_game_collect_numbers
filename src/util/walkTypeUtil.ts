import { DirectionType } from "../type/directionType";
import { WalkType } from "../type/walkType";

/**
 * 移動方向から歩行タイプを取得するユーティリティ
 */
export class WalkTypeUtil {

    /**
     * 移動方向から歩行タイプを取得する
     * @param direction 移動方向
     * @returns 歩行タイプ
     */
    public static get(direction: DirectionType): WalkType {
        switch (direction) {
            case DirectionType.UP:
                return 'walk_back';
            case DirectionType.DOWN:
                return 'walk_front';
            case DirectionType.LEFT:
                return 'walk_left';
            case DirectionType.RIGHT:
                return 'walk_right';
            default:
                return 'idle';
        }
    }
}
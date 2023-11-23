import { Tilemap } from "../../entity/tilemap";
import { DirectionType } from "../../type/directionType";

/**
 * プレイヤーの操作を表すインターフェース
 */
export interface OperationService {
    /**
     * プレイヤーの移動方向を返す
     * @param tilemap タイルマップ
     * @returns プレイヤーの移動方向
     */
    getDirection(tilemap: Tilemap): DirectionType;
}
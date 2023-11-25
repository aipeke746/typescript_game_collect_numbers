import { Character } from "../../entity/character";
import { Tilemap } from "../../entity/tilemap";
import { DirectionType } from "../../type/directionType";

/**
 * キャラクターの操作を表すインターフェース
 */
export interface OperationService {
    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    getDirection(character: Character, tilemap: Tilemap): DirectionType;
}
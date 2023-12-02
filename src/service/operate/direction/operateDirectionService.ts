import { Character } from "../../../entity/character";
import { MapState } from "../../../entity/mapState";
import { DirectionType } from "../../../type/directionType";

/**
 * キャラクターの移動方向の操作を表すインターフェース
 */
export interface OperateDirectionService {
    /**
     * キャラクターの移動方向を返す
     * @param characters キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    getDirection(characters: Character, mapState: MapState): DirectionType;
}
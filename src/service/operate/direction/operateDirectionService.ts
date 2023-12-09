import { Character } from "../../../entity/character";
import { MapState } from "../../../entity/mapState";
import { DirectionType } from "../../../type/directionType";

/**
 * キャラクターの移動方向の操作を表すインターフェース
 */
export interface OperateDirectionService {
    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @param opponent 相手のキャラクター（対戦モードのみで必要）
     * @returns キャラクターの移動方向
     */
    getDirection(character: Character, mapState: MapState, opponent?: Character): DirectionType;
}
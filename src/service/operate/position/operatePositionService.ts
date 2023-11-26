import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";

/**
 * キャラクターの初期位置の操作を表すインターフェース
 */
export interface OperatePositionService {
    /**
     * キャラクターの移動先座標を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動先座標
     */
    getCharacters(tilemap: Tilemap): Character[];
}
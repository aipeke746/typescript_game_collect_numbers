import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";

/**
 * キャラクターの初期位置の操作を表すクラス
 */
export interface OperatePositionService {
    /**
     * キャラクターを返す
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    getCharacters(tilemap: Tilemap): Character[];
}
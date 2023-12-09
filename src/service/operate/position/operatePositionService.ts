import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";

/**
 * キャラクター生成（初期位置）の操作を表すクラス
 */
export interface OperatePositionService {
    /**
     * キャラクターを返す
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    getCharacters(tilemap: Tilemap): Character[];
}
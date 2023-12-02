import { Character } from "../../../entity/character";
import { MapState } from "../../../entity/mapState";
import { Tilemap } from "../../../entity/tilemap";
import { Coord } from "../../../vo/coord";

/**
 * キャラクターの初期位置を操作するクラスの共通処理
 */
export class OperatePositionCommonService {

    /**
     * キャラクターの初期位置のポイントとターンを0にする
     * @param tilemap タイルマップ
     * @param characters キャラクター
     */
    protected initializations(tilemap:Tilemap, characters: Character[]): void {
        for (const character of characters) {
            this.initialization(tilemap, character.getCoord());
        }
    }

    /**
     * キャラクターの初期位置のポイントとターンを0にする
     * @param tilemap タイルマップ
     * @param coord タイルマップの座標
     */
    private initialization(tilemap: Tilemap, coord: Coord): void {
        tilemap.mapState.setPoint(coord, MapState.ZERO_POINT);
        tilemap.advance(coord);
        tilemap.mapState.resetTurn();
    }
}
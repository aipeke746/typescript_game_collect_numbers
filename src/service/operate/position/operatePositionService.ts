import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";
import { CharacterFactory } from "../../../factory/characterFactory";
import { Coord } from "../../../vo/coord";

/**
 * キャラクターの初期位置の操作を表すクラス
 */
export abstract class OperatePositionService {
    /**
     * シーン
     */
    protected scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }
    /**
     * キャラクターの移動先座標を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動先座標
     */
    public abstract getCharacters(tilemap: Tilemap): Character[];

    /**
     * キャラクターを生成とタイルマップの更新を行う
     * タイルマップの更新は、キャラクターの初期位置のポイントを0にする
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param characters キャラクター
     * @param coord タイルマップの座標
     * @returns 
     */
    protected getCharactersUpdateTilemap(scene: Phaser.Scene, tilemap: Tilemap, characters: Character[], coord: Coord): Character[] {
        if (characters.every(character => !character.getCoord().equals(coord))) {
            // 同じ座標にない場合、キャラクターを生成する
            characters.push(CharacterFactory.createForTargetPos(scene, tilemap, coord));
            // キャラクターの初期位置のポイントを0にする
            tilemap.mapState.setPoint(coord, 0);
            tilemap.advance(coord);
        }
        return characters;
    }
}
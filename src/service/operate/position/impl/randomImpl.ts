import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CharacterFactory } from "../../../../factory/characterFactory";
import { CoordFactory } from "../../../../factory/coordFactory";
import { Coord } from "../../../../vo/coord";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置をランダムにセットしてキャラクターを生成するクラス
 */
export class RandomImpl implements OperatePositionService {
    /**
     * シーン
     */
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * キャラクターの初期位置をランダムにセットしてキャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクターの初期位置
     */
    getCharacters(tilemap: Tilemap): Character[] {
        let characters: Character[] = [];
        while (characters.length < 3) {
            const coord: Coord = CoordFactory.randomCoord();
            if (characters.every(character => !character.getCoord().equals(coord))) {
                // 同じ座標にない場合にキャラクターを生成する
                characters.push(CharacterFactory.createForTargetPos(this.scene, tilemap, coord));
                // キャラクターの初期位置のポイントを0にする
                tilemap.mapState.setPoint(coord, 0);
                tilemap.advance(coord);
            }
        }
        return characters;
    }
}
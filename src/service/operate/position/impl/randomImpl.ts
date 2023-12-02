import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CharacterFactory } from "../../../../factory/characterFactory";
import { CoordFactory } from "../../../../factory/coordFactory";
import { Params } from "../../../../params";
import { Coord } from "../../../../vo/coord";
import { OperatePositionCommonService } from "../operatePositionCommonService";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置をランダムにセットしてキャラクターを生成するクラス
 */
export class RandomImpl extends OperatePositionCommonService implements OperatePositionService {
    /**
     * シーン
     */
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        super();
        this.scene = scene;
    }

    /**
     * キャラクターの初期位置をランダムにセットしてキャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    public getCharacters(tilemap: Tilemap): Character[] {
        const characters: Character[] = this.create(tilemap);
        this.initializations(tilemap, characters);
        return characters;
    }

    /**
     * キャラクターの初期位置をランダムにセットする
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    public create(tilemap: Tilemap, characters: Character[] = []): Character[] {
        while (characters.length < Params.CHARACTER_NUM) {
            const coord: Coord = CoordFactory.randomCoord();
            if (characters.every(character => !character.getCoord().equals(coord))) {
                // 同じ座標にない場合、キャラクターを生成する
                characters.push(CharacterFactory.createForTargetPos(this.scene, tilemap, coord));
            }
        }
        return characters;
    }
}
import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CoordFactory } from "../../../../factory/coordFactory";
import { Coord } from "../../../../vo/coord";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置をランダムにセットしてキャラクターを生成するクラス
 */
export class RandomImpl extends OperatePositionService {

    constructor(scene: Phaser.Scene) {
        super(scene);
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
            characters = this.getCharactersUpdateTilemap(this.scene, tilemap, characters, coord);
        }
        return characters;
    }
}
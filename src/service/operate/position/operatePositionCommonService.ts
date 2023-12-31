import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";
import { CharacterFactory } from "../../../factory/characterFactory";
import { CoordFactory } from "../../../factory/coordFactory";
import { Coord } from "../../../vo/coord";

/**
 * キャラクターの生成（初期位置）を操作するクラスの共通処理
 */
export class OperatePositionCommonService {
    /**
     * シーン
     */
    protected scene: Phaser.Scene;

    /**
     * コンストラクタ
     * @param scene シーンP
     */
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * ベストスコアの座標から指定の座標を変更したキャラクターを生成する
     * @param tilemap タイルマップ
     * @param bestCoords べストな座標
     * @param targetIndex 座標を変更する配列のインデックス
     * @returns キャラクター
     */
    protected createRandomCharactersByCoords(tilemap: Tilemap, bestCoords: Coord[], targetIndex: number): Character[] {
        const nextCoords: Coord[] = this.createRandomCoord(bestCoords, targetIndex);
        return this.createCharactersByCoords(tilemap, nextCoords);
    }

    /**
     * 指定の座標を変更する
     * @param coords 座標
     * @param targetIndex 特定の座標のインデックス
     * @returns 座標
     */
    protected createRandomCoord(coords: Coord[], targetIndex: number): Coord[] {
        let nextCoord: Coord[] = [...coords];
        let randomCoord: Coord;

        do {
            randomCoord = CoordFactory.randomCoord();
        } while (nextCoord.includes(randomCoord));

        nextCoord[targetIndex] = randomCoord;
        return nextCoord;
    }

    /**
     * 座標からキャラクターを生成する
     * @param tilemap タイルマップ
     * @param coords 座標
     * @returns キャラクター
     */
    protected createCharactersByCoords(tilemap: Tilemap, coords: Coord[]): Character[] {
        let characters: Character[] = [];
        for (const coord of coords) {
            characters.push(CharacterFactory.createTargetPos(this.scene, tilemap, coord));
        }
        return characters;
    }
}
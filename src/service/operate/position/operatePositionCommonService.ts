import { Character } from "../../../entity/character";
import { MapState } from "../../../entity/mapState";
import { Tilemap } from "../../../entity/tilemap";
import { CharacterFactory } from "../../../factory/characterFactory";
import { CoordFactory } from "../../../factory/coordFactory";
import { Coord } from "../../../vo/coord";

/**
 * キャラクターの初期位置を操作するクラスの共通処理
 */
export class OperatePositionCommonService {
    /**
     * シーン
     */
    protected scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

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
    protected initialization(tilemap: Tilemap, coord: Coord): void {
        tilemap.mapState.setPoint(coord, MapState.ZERO_POINT);
        tilemap.advance(coord);
        tilemap.mapState.resetTurn();
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
            characters.push(CharacterFactory.createForTargetPos(this.scene, tilemap, coord));
        }
        return characters;
    }
}
import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CharacterFactory } from "../../../../factory/characterFactory";
import { Coord } from "../../../../vo/coord";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置を手動でセットしてキャラクターを生成するクラス
 */
export class ManualImpl implements OperatePositionService {
    /**
     * シーン
     */
    private scene: Phaser.Scene;
    /**
     * ポインター
     */
    private pointer: Phaser.Input.Pointer;
    /**
     * キャラクター
     */
    private characters: Character[] = [];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.pointer = scene.input.activePointer;
    }

    /**
     * キャラクターの初期位置を手動でセットしてキャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    getCharacters(tilemap: Tilemap): Character[] {
        this.pointer.downElement.addEventListener('pointerdown', () => {
            this.create(tilemap);
        });
        return this.characters;
    }

    /**
     * キャラクターを生成する
     * @param tilemap タイルマップ
     */
    private create(tilemap: Tilemap): void {
        if (this.characters.length >= 3) return;

        const pos = this.pointer.position;
        const coord = new Coord(tilemap.getTilePos(pos));

        if (this.characters.every(character => !character.getCoord().equals(coord))) {
            // 同じ座標にない場合にキャラクターを生成する
            this.characters.push(CharacterFactory.createForTargetPos(this.scene, tilemap, coord));
            // キャラクターの初期位置のポイントを0にする
            tilemap.mapState.setPoint(coord, 0);
            tilemap.advance(coord);
        }
    }
}
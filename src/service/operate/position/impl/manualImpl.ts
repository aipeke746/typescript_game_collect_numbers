import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CharacterFactory } from "../../../../factory/characterFactory";
import { Coord } from "../../../../vo/coord";
import { OperatePositionCommonService } from "../operatePositionCommonService";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置を手動でセットしてキャラクターを生成するクラス
 */
export class ManualImpl extends OperatePositionCommonService implements OperatePositionService {
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
        super();
        this.scene = scene;
        this.pointer = scene.input.activePointer;
    }

    /**
     * キャラクターの初期位置を手動でセットしてキャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    public getCharacters(tilemap: Tilemap): Character[] {
        this.pointer.downElement.addEventListener('pointerdown', () => {
            this.create(tilemap);
        });
        this.initializations(tilemap, this.characters);
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
            // 同じ座標にない場合、キャラクターを生成する
            this.characters.push(CharacterFactory.createForTargetPos(this.scene, tilemap, coord));
        }
    }
}
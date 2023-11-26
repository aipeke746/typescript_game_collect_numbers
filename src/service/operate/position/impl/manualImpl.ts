import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { Coord } from "../../../../vo/coord";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置を手動でセットしてキャラクターを生成するクラス
 */
export class ManualImpl extends OperatePositionService {
    /**
     * ポインター
     */
    private pointer: Phaser.Input.Pointer;
    /**
     * キャラクター
     */
    private characters: Character[] = [];

    constructor(scene: Phaser.Scene) {
        super(scene);
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
        this.characters = this.getCharactersUpdateTilemap(this.scene, tilemap, this.characters, coord);
    }
}
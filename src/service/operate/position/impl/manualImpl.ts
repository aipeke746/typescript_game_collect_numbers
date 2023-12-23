import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { CharacterFactory } from "../../../../factory/characterFactory";
import { Coord } from "../../../../vo/coord";
import { MapService } from "../../../map/mapService";
import { OperatePositionCommonService } from "../operatePositionCommonService";
import { OperatePositionService } from "../operatePositionService";

/**
 * キャラクターの初期位置を手動でセットしてキャラクターを生成するクラス
 */
/**
 * 手動で初期位置を決めてキャラクターを生成するクラス
 */
export class ManualImpl extends OperatePositionCommonService implements OperatePositionService {
    /**
     * ポインター
     */
    private pointer: Phaser.Input.Pointer;
    /**
     * キャラクター
     */
    private characters: Character[] = [];

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.pointer = scene.input.activePointer;
    }

    /**
     * キャラクターの初期位置を手動でセットしてキャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    public getCharacters(tilemap: Tilemap): Character[] {
        this.pointer.downElement.addEventListener('pointerdown', () => {
            console.log(this.pointer.position)
            this.create(tilemap);
        });
        MapService.initializations(tilemap, this.characters);
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
            this.characters.push(CharacterFactory.createTargetPos(this.scene, tilemap, coord));
        }
    }
}
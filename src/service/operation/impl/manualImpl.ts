import { Character } from "../../../entity/character";
import { DirectionType } from "../../../type/directionType";
import { OperationService } from "../operationService";

/**
 * キャラクターを手動で動かすクラス
 */
export class ManualImpl implements OperationService {
    /**
     * キー入力
     */
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    /**
     * キャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character): DirectionType {
        character.idle();
        return this.getManualDirection();
    }

    /**
     * 方向キーの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getManualDirection(): DirectionType {
        let direction = DirectionType.NONE;
        if (this.cursors.right.isDown) {
            direction = DirectionType.RIGHT;
        } else if (this.cursors.left.isDown) {
            direction = DirectionType.LEFT;
        } else if (this.cursors.down.isDown) {
            direction = DirectionType.DOWN;
        } else if (this.cursors.up.isDown) {
            direction = DirectionType.UP;
        }

        return direction;
    }
}
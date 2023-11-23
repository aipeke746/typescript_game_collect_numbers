import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { DirectionType } from "../../../type/directionType";
import { OperationService } from "../operationService";

/**
 * キャラクターを手動で動かすクラス
 */
export class ManualImpl implements OperationService {
    /**
     * 時間遅延管理
     */
    private timeDelayManager: TimeDelayManager;
    /**
     * キー入力
     */
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        this.timeDelayManager = new TimeDelayManager(scene);
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    /**
     * キャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    public getDirection(): DirectionType {
        if (!this.timeDelayManager.isDelayPassed())
            return DirectionType.NONE;

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

        if (direction !== DirectionType.NONE) 
            this.timeDelayManager.update();

        return direction;
    }
}
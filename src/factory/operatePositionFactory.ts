import { ManualImpl } from "../service/operate/position/impl/manualImpl";
import { RandomImpl } from "../service/operate/position/impl/randomImpl";
import { OperatePositionType } from "../type/operatePositionType";

/**
 * キャラクターの初期位置を生成するクラス
 */
export class OperatePositionFactory {
    public static create(scene: Phaser.Scene, operationType: OperatePositionType) {
        switch (operationType) {
            case OperatePositionType.MANUAL:
                return new ManualImpl(scene);
            case OperatePositionType.RANDOM:
                return new RandomImpl(scene);
            default:
                throw new Error(`Not implemented operation type: ${operationType}`);
        }
    }
}
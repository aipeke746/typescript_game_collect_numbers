import { AnnelingImpl as AnnealingImpl } from "../service/operate/position/impl/annealingImpl";
import { HillClimbImpl } from "../service/operate/position/impl/hillClimbImpl";
import { ManualImpl } from "../service/operate/position/impl/manualImpl";
import { RandomImpl } from "../service/operate/position/impl/randomImpl";
import { OperatePositionType } from "../type/operatePositionType";

/**
 * キャラクターの生成位置の操作方法タイプから操作位置サービスを生成するファクトリークラス
 */
export class OperatePositionFactory {
    public static create(scene: Phaser.Scene, operationType: OperatePositionType) {
        switch (operationType) {
            case OperatePositionType.MANUAL:
                return new ManualImpl(scene);
            case OperatePositionType.RANDOM:
                return new RandomImpl(scene);
            case OperatePositionType.HILL_CLIMB:
                return new HillClimbImpl(scene);
            case OperatePositionType.ANNEALING:
                return new AnnealingImpl(scene);
            default:
                throw new Error(`Not implemented operation type: ${operationType}`);
        }
    }
}
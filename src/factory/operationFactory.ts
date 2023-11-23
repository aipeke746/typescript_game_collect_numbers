import { GreedyImpl } from "../service/operation/impl/greedyImpl";
import { ManualImpl } from "../service/operation/impl/manualImpl";
import { RandomImpl } from "../service/operation/impl/randomImpl";
import { OperationService } from "../service/operation/operationService";
import { OperationType } from "../type/operationType";

/**
 * キャラクターの操作方法を生成するクラス
 */
export class OperationFactory {
    public static create(scene: Phaser.Scene, operationType: OperationType): OperationService {
        switch (operationType) {
            case OperationType.MANUAL:
                return new ManualImpl(scene);
            case OperationType.RANDOM:
                return new RandomImpl(scene);
            case OperationType.GREEDY:
                return new GreedyImpl(scene);
        }
    }
}
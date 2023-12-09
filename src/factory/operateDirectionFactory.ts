import { BeamSearchImpl } from "../service/operate/direction/impl/beamSearchImpl";
import { GreedyImpl } from "../service/operate/direction/impl/greedyImpl";
import { ManualImpl } from "../service/operate/direction/impl/manualImpl";
import { MiniMaxImpl } from "../service/operate/direction/impl/miniMaxImpl";
import { RandomImpl } from "../service/operate/direction/impl/randomImpl";
import { OperateDirectionService } from "../service/operate/direction/operateDirectionService";
import { OperateDirectionType } from "../type/operateDirectionType";

/**
 * キャラクターの操作方法を生成するクラス
 */
export class OperateDirectionFactory {
    public static create(scene: Phaser.Scene, operationType: OperateDirectionType): OperateDirectionService {
        switch (operationType) {
            case OperateDirectionType.MANUAL:
                return new ManualImpl(scene);
            case OperateDirectionType.RANDOM:
                return new RandomImpl();
            case OperateDirectionType.GREEDY:
                return new GreedyImpl();
            case OperateDirectionType.BEAM_SEARCH:
                return new BeamSearchImpl();
            case OperateDirectionType.MINIMAX:
                return new MiniMaxImpl();
            default:
                throw new Error(`Not implemented operation type: ${operationType}`);
        }
    }
}
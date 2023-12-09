import { AlphaBetaImpl } from "../service/operate/direction/impl/alphaBetaImpl";
import { BeamSearchImpl } from "../service/operate/direction/impl/beamSearchImpl";
import { GreedyImpl } from "../service/operate/direction/impl/greedyImpl";
import { ManualImpl } from "../service/operate/direction/impl/manualImpl";
import { MiniMaxImpl } from "../service/operate/direction/impl/miniMaxImpl";
import { MonteCarloImpl } from "../service/operate/direction/impl/monteCarloImpl";
import { RandomImpl } from "../service/operate/direction/impl/randomImpl";
import { OperateDirectionService } from "../service/operate/direction/operateDirectionService";
import { OperateDirectionType } from "../type/operateDirectionType";

/**
 * キャラクターの操作方向タイプから操作方向サービスを生成するファクトリークラス
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
            case OperateDirectionType.ALPHA_BETA:
                return new AlphaBetaImpl();
            case OperateDirectionType.MONTE_CARLO:
                return new MonteCarloImpl();
            default:
                throw new Error(`Not implemented operation type: ${operationType}`);
        }
    }
}
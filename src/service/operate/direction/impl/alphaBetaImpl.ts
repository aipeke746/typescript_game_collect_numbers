import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { Params } from "../../../../params";
import { DirectionType } from "../../../../type/directionType";
import { MapService } from "../../../map/mapService";
import { SimulateMiniMaxOrAlphaBetaImpl } from "../../../simulate/direction/impl/simulateMiniMaxOrAlphaBetaImpl";
import { SimulateDirectionService } from "../../../simulate/direction/simulateDirectionService";
import { OperateDirectionService } from "../operateDirectionService";

/**
 * αβ法でキャラクターの移動方向を返すクラス
 */
export class AlphaBetaImpl implements OperateDirectionService {
    /**
     * 無限大を表す定数
     */
    private readonly INF: number = 1000000000;
    /**
     * ミニマックス法の探索深さ
     */
    private depth: number = Params.END_TURN;

    /**
     * キャラクターの移動方向を返す
     * @param character 自分のキャラクター
     * @param mapState マップの状態
     * @param opponent 相手のキャラクター
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, mapState: MapState, opponent: Character): DirectionType {
        const simulate: SimulateDirectionService = new SimulateMiniMaxOrAlphaBetaImpl(character, opponent, mapState);
        return this.getAlphaBetaDirection(simulate);
    }

    /**
     * αβ法で最善の移動方向を返す
     * @param simulate シミュレーション
     * @returns 最善の移動方向
     */
    private getAlphaBetaDirection(simulate: SimulateDirectionService): DirectionType {
        let bestDirection = DirectionType.NONE;
        let alpha = -this.INF;
        let beta = this.INF;

        for (const direction of MapService.possibleDirections(simulate.character)) {
            const nextState = simulate.clone();
            MapService.simulateDirection(nextState, direction);

            const score = this.alphaBetaScore(nextState, this.depth, alpha, beta, false);
            if (score > alpha) {
                alpha = score;
                bestDirection = direction;
            }
        }
        return bestDirection;
    }

    /**
     * αβ法で最良の評価値を返す
     * @param simulate シミュレーション
     * @param depth 探索深さ
     * @param alpha 現在のノードのスコアから探索を打ち切るかを判定
     * @param beta 1つ下のノードのスコアから探索を打ち切るかを判定
     * @param myTurn 自分のターンかどうか
     * @returns 最良の評価値
     */
    private alphaBetaScore(simulate: SimulateDirectionService, depth: number, alpha: number, beta: number, myTurn: boolean): number {
        if (!simulate.opponent) {
            throw new Error("opponent is undefined");
        }

        if (simulate.isDone() || depth === 0) {
            simulate.evaluate();
            return simulate.evaluatedScore;
        }

        if (myTurn) {
            // 自分のターン
            let value = -this.INF;
            for (const direction of MapService.possibleDirections(simulate.character)) {
                const childScore = this.getChildScore(simulate, direction, depth, alpha, beta, myTurn);
                value = Math.max(value, childScore);
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return value;
        } else {
            // 相手のターン
            let value = this.INF;
            for (const direction of MapService.possibleDirections(simulate.opponent)) {
                const childScore = this.getChildScore(simulate, direction, depth, alpha, beta, myTurn);
                value = Math.min(value, childScore);
                beta = Math.min(beta, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return value;
        }
    }

    /**
     * αβ法で子ノードの最良の評価値を返す
     * @param simulate シミュレーション
     * @param direction 移動方向
     * @param depth 探索深さ
     * @param alpha 現在のノードのスコアから探索を打ち切るかを判定
     * @param beta 1つ下のノードのスコアから探索を打ち切るかを判定
     * @param myTurn 自分のターンかどうか
     * @returns 評価値
     */
    private getChildScore(simulate: SimulateDirectionService, direction: DirectionType, depth: number, alpha: number, beta: number, myTurn: boolean): number {
        const nextState = simulate.clone();
        MapService.simulateDirection(nextState, direction, myTurn);
        return this.alphaBetaScore(nextState, depth - 1, alpha, beta, !myTurn);
    }
}
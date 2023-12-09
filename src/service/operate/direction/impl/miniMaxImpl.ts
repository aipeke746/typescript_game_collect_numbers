import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { Params } from "../../../../params";
import { DirectionType } from "../../../../type/directionType";
import { MapService } from "../../../map/mapService";
import { AlternateImpl } from "../../../simulate/direction/impl/alternateImpl";
import { SimulateDirectionService } from "../../../simulate/direction/simulateDirectionService";
import { OperateDirectionService } from "../operateDirectionService";

export class MiniMaxImpl implements OperateDirectionService {
    /**
     * 無限大を表す定数
     */
    private readonly INF: number = 1000000000;
    /**
     * ミニマックス法の探索深さ
     */
    private depth: number = Params.END_TURN / 2;

    /**
     * キャラクターの移動方向を返す
     * @param character 自分のキャラクター
     * @param mapState マップの状態
     * @param opponent 相手のキャラクター
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, mapState: MapState, opponent: Character): DirectionType {
        const simulate: SimulateDirectionService = new AlternateImpl(character, opponent, mapState);
        return this.getMiniMaxDirection(simulate);
    }

    /**
     * ミニマックス法で最善の移動方向を返す
     * @param simulate シミュレーション
     * @returns 最善の移動方向
     */
    private getMiniMaxDirection(simulate: SimulateDirectionService): DirectionType {
        let bestDirection = DirectionType.NONE;
        let bestScore = -this.INF;

        for (const direction of MapService.legalDirections(simulate.character)) {
            const nextState = simulate.clone();
            MapService.simulate(nextState, direction);

            const score = this.miniMaxScore(nextState, this.depth, false);
            if (score > bestScore) {
                bestDirection = direction;
                bestScore = score;
            }
        }
        return bestDirection;
    }

    /**
     * ミニマックス法で最善の評価値を返す
     * @param simulate シミュレーション
     * @param depth 探索深さ
     * @param myTurn 自分のターンかどうか
     * @returns 最善の評価値
     */
    private miniMaxScore(simulate: SimulateDirectionService, depth: number, myTurn: boolean): number {
        if (!simulate.opponent) {
            throw new Error("opponent is undefined");
        }

        if (simulate.isDone() || depth === 0) {
            simulate.evaluate();
            return simulate.evaluatedScore;
        }

        let bestScore;
        if (myTurn) {
            // 自分のターン
            bestScore = -this.INF;
            for (const direction of MapService.legalDirections(simulate.character)) {
                const score = this.getMiniMaxScore(simulate, direction, depth, myTurn);
                if (score > bestScore) {
                    bestScore = score;
                }
            }
        } else {
            // 相手のターン
            bestScore = this.INF;
            for (const direction of MapService.legalDirections(simulate.opponent)) {
                const score = this.getMiniMaxScore(simulate, direction, depth, myTurn);
                if (score < bestScore) {
                    bestScore = score;
                }
            }
        }
        return bestScore;
    }

    /**
     * ミニマックス法で評価値を返す
     * @param simulate シミュレーション
     * @param direction 移動方向
     * @param depth 探索深さ
     * @param myTurn 自分のターンかどうか
     * @returns 評価値
     */
    private getMiniMaxScore(simulate: SimulateDirectionService, direction: DirectionType, depth: number, myTurn: boolean): number {
        const nextState = simulate.clone();
        MapService.simulate(nextState, direction);
        return this.miniMaxScore(nextState, depth - 1, !myTurn);
    }
}
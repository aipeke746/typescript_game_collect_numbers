import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { DirectionType } from "../../../../type/directionType";
import { MapService } from "../../../map/mapService";
import { SimulateMonteCarloImpl } from "../../../simulate/direction/impl/simulateMonteCarloImpl";
import { SimulateDirectionService } from "../../../simulate/direction/simulateDirectionService";
import { OperateDirectionService } from "../operateDirectionService";
import { RandomImpl } from "./randomImpl";

/**
 * モンテカルロ法でキャラクターの移動方向を返すクラス
 */
export class MonteCarloImpl implements OperateDirectionService {
    /**
     * モンテカルロ法の試行回数
     */
    private count: number = 100;
    /**
     * ランダムでキャラクターの移動方向を返すクラス
     */
    private randomImpl: RandomImpl = new RandomImpl();

    /**
     * キャラクターの移動方向を返す
     * @param character 自分のキャラクター
     * @param mapState マップ状態
     * @param opponent 相手のキャラクター
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, mapState: MapState, opponent: Character): DirectionType {
        const simulate: SimulateDirectionService = new SimulateMonteCarloImpl(character, opponent, mapState);
        return this.getMonteCarloDirection(simulate);
    }

    /**
     * モンテカルロ法で最善の移動方向を返す
     * @param simulate シミュレーション
     * @returns 最善の移動方向
     */
    private getMonteCarloDirection(simulate: SimulateDirectionService): DirectionType {
        let bestScore = -1;
        let bestDirection = DirectionType.NONE;

        for (const direction of MapService.possibleDirections(simulate.character)) {
            const nextState = simulate.clone();
            MapService.simulateDirection(nextState, direction);

            const score = this.monteCarloScore(nextState);
            console.log(direction, score);
            if (score > bestScore) {
                console.log("best : ", direction, score);
                bestScore = score;
                bestDirection = direction;
            }
        }

        return bestDirection;
    }

    /**
     * モンテカルロ法で最善の評価値を返す
     * @param simulate シミュレーション
     * @returns 最善の評価値
     */
    private monteCarloScore(simulate: SimulateDirectionService): number {
        let score = 0;
        for (let i = 0; i < this.count; i++) {
            let myTurn = false;
            const state = simulate.clone();
            if (!state.opponent) {
                throw new Error("Opponent is not found");
            }

            while (!state.isDone()) {
                const nowTurnCharacter = myTurn ? state.character : state.opponent;
                const direction = this.randomImpl.getDirection(nowTurnCharacter);
                MapService.simulateDirection(state, direction, myTurn);
                myTurn = !myTurn;
            }
            state.evaluate();
            score += state.evaluatedScore;
        }
        return score;
    }
}
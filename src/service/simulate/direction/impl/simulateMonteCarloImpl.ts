import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { DirectionType } from "../../../../type/directionType";
import { CharacterFactory } from '../../../../factory/characterFactory';
import { SimulateDirectionService } from "../simulateDirectionService";

/**
 * モンテカルロ法でキャラクターの移動方向のシミュレーションを行うクラス
 */
export class SimulateMonteCarloImpl implements SimulateDirectionService {
    /**
     * 自分のキャラクター
     */
    public character: Character;
    /**
     * 相手のキャラクター
     */
    public opponent: Character;
    /**
     * マップの状態
     */
    public mapState: MapState;
    /**
     * キャラクターの最初の移動方向（必要ないため未使用）
     */
    public firstDirection: DirectionType = DirectionType.NONE;
    /** 
     * シミュレーションの評価値
     */
    public evaluatedScore: number;

    /**
     * コンストラクタ
     * @param character 自分のキャラクター
     * @param opponent 相手のキャラクター
     * @param mapState マップの状態
     * @param evaluatedScore シミュレーションの評価値
     */
    constructor(character: Character, opponent: Character, mapState: MapState, evaluatedScore: number = 0) {
        this.character = CharacterFactory.clone(character);
        this.opponent = CharacterFactory.clone(opponent);
        this.mapState = mapState.clone();
        this.evaluatedScore = evaluatedScore;
    }

    /**
     * シミュレーションを複製する
     * @returns シミュレーションの複製
     */
    public clone(): SimulateMonteCarloImpl {
        return new SimulateMonteCarloImpl(this.character, this.opponent, this.mapState, this.evaluatedScore);
    }

    /**
     * シミュレーションを評価する
     */
    public evaluate(): void {
        const score = this.character.getScore() - this.opponent.getScore();
        if (score > 0) {
            this.evaluatedScore = 1;
        } else if (score < 0) {
            this.evaluatedScore = 0;
        } else {
            this.evaluatedScore = 0.5;
        }
    }

    /**
     * シミュレーションが終了したかどうかを返す
     * @returns シミュレーションが終了したかどうか
     */
    public isDone(): boolean {
        return this.mapState.isDone();
    }
}
import { CharacterFactory } from "../../../../factory/characterFactory";
import { DirectionType } from "../../../../type/directionType";
import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { SimulateDirectionService } from "../simulateDirectionService";

/**
 * ビームサーチ法で使用するシミュレーション用のクラス
 * ゲームで使用するタイルマップとキャラクターの複製を持ち、
 */
export class SimulateDirectionImpl implements SimulateDirectionService {
    /**
     * キャラクター
     */
    public character: Character;
    /**
     * マップの状態
     */
    public mapState: MapState;
    /**
     * キャラクターの最初の移動方向
     */
    public firstDirection: DirectionType;
    /**
     * シミュレーションの評価値
     */
    public evaluatedScore: number;

    /**
     * キャラクターとタイルマップを複製してシミュレーションを作成する
     * @param character キャラクター
     * @param mapState マップ状態
     * @param firstDirection キャラクターの最初の移動方向
     * @param evaluatedScore シミュレーションの評価値
     */
    constructor(character: Character, mapState: MapState, firstDirection: DirectionType = DirectionType.NONE, evaluatedScore: number = 0) {
        this.character = CharacterFactory.clone(character);
        this.mapState = mapState.clone();
        this.firstDirection = firstDirection;
        this.evaluatedScore = evaluatedScore;
    }

    /**
     * シミュレーションを複製する
     * @returns シミュレーションの複製
     */
    public clone(): SimulateDirectionImpl {
        return new SimulateDirectionImpl(this.character, this.mapState, this.firstDirection, this.evaluatedScore);
    }

    /**
     * シミュレーションを評価する
     */
    public evaluate(): void {
        this.evaluatedScore = this.mapState.getScore();
    }

    /**
     * シミュレーションが終了したかどうかを返す
     * @returns シミュレーションが終了したかどうか
     */
    public isDone(): boolean {
        return this.mapState.isDone();
    }
}
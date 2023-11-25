import { Character } from "../../entity/character";
import { MapState } from "../../entity/mapState";
import { DirectionType } from "../../type/directionType";

export interface Simulate {
    /**
     * キャラクター
     */
    character: Character;
    /**
     * マップの状態
     */
    mapState: MapState;
    /**
     * キャラクターの最初の移動方向
     */
    firstDirection: DirectionType;
    /**
     * シミュレーションの評価値
     */
    evaluatedScore: number;

    /**
     * シミュレーションを評価する
     */
    evaluate(): void;
    /**
     * シミュレーションが終了したかどうかを返す
     * @returns シミュレーションが終了したかどうか
     */
    isDone(): boolean;
    /**
     * シミュレーションを複製する
     * @returns シミュレーションの複製
     */
    clone(): Simulate;
}
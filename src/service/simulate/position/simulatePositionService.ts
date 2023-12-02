import { Character } from "../../../entity/character";
import { MapState } from "../../../entity/mapState";
import { Coord } from "../../../vo/coord";

export interface SimulatePositionService {
    /**
     * キャラクター
     */
    characters: Character[];
    /**
     * マップの状態
     */
    mapState: MapState;
    /**
     * 初期のマップの状態
     */
    initMapState: MapState;
    /**
     * シミュレーションの評価値
     */
    evaluatedScore: number;
    /**
     * 最初に設定したキャラクターの座標
     */
    firstCoords: Coord[];

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
     * シミュレーションの初期化
     */
    init(characters: Character[]): void;
    /**
     * キャラクターのスプライトを全て削除する
     */
    deleteAllCharacters(): void;
}
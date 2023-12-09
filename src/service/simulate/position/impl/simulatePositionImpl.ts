import { Character } from "../../../../entity/character";
import { MapState } from "../../../../entity/mapState";
import { Coord } from "../../../../vo/coord";
import { SimulatePositionService } from "../simulatePositionService";

/**
 * 初期位置を決めてキャラクターの生成のシミュレーションを表すクラス
 */
export class SimulatePositionImpl implements SimulatePositionService {
    /**
     * キャラクター
     */
    public characters: Character[];
    /**
     * マップの状態
     */
    public mapState: MapState;
    /**
     * 初期のマップの状態
     */
    public initMapState: MapState;
    /**
     * シミュレーションの評価値
     */
    public evaluatedScore: number;
    /**
     * 最初に設定したキャラクターの座標
     */
    public firstCoords: Coord[];

    constructor(characters: Character[], mapState: MapState, evaluatedScore: number = 0) {
        this.characters = characters;
        this.firstCoords = this.getCoords();
        this.mapState = mapState.clone();
        this.initMapState = mapState.clone();
        this.evaluatedScore = evaluatedScore;
        this.setZeroPoint();
    }

    /**
     * シミュレーションの初期化
     */
    public init(characters: Character[]): void {
        this.characters = characters;
        this.firstCoords = this.getCoords();
        this.mapState = this.initMapState.clone();
        this.evaluatedScore = 0;
        this.setZeroPoint();
    }

    /**
     * シミュレーションを評価する
     */
    public evaluate(): void {
        this.evaluatedScore = this.characters.reduce(
            (scoreSum, character) => scoreSum + character.getScore(), 0
        );
    }

    /**
     * シミュレーションが終了したかどうかを返す
     * @returns シミュレーションが終了したかどうか
     */
    public isDone(): boolean {
        return this.mapState.isDone();
    }

    /**
     * キャラクターのスプライトを全て削除する
     */
    public deleteAllCharacters(): void {
        for (const character of this.characters) {
            character.getSprite().destroy();
        }
        this.characters = [];
    }

    /**
     * キャラクターの座標のポイントを0にする
     */
    private setZeroPoint(): void {
        for (const character of this.characters) {
            this.mapState.setPoint(character.getCoord(), 0);
        }
    }

    /**
     * キャラクターの座標を取得する
     * @returns キャラクターの座標
     */
    private getCoords(): Coord[] {
        const coords: Coord[] = [];
        for (const character of this.characters) {
            coords.push(character.getCoord());
        }
        return coords;
    }
}
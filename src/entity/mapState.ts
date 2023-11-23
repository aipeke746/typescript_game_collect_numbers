import { Params } from "../params";
import { DirectionType } from "../type/directionType";
import { Coord } from "./coord";

/**
 * マップの状態を表すクラス
 */
export class MapState {
    /**
     * タイルのサイズ
     */
    public static readonly SIZE: number = 64;
    /**
     * 0から9までの数字の数
     */
    private static readonly ALL_NUMBERS_COUNT: number = 10;
    /**
     * プレイヤーの数字
     */
    private static readonly PLAYER_NUMBER = 10;
    /**
     * 0の数字
     */
    private static readonly ZERO_NUMBER = 0;

    /**
     * マップの状態
     */
    private points: number[][] = Array.from(Array(Params.MAP_ROW), () => new Array(Params.MAP_COLUMN).fill(0));
    /**
     * プレイヤーの座標
     */
    private character: Coord;
    /**
     * ターン数
     */
    private turn: number = 0;
    /**
     * ゲームのスコア
     */
    private score: number = 0;

    /**
     * マップの状態を生成する
     * プレイヤーの初期位置とマップの数字をランダムに生成する
     */
    constructor() {
        const cx: number = Math.floor(Math.random() * Params.MAP_COLUMN);
        const cy: number = Math.floor(Math.random() * Params.MAP_ROW);
        this.character = new Coord(cx, cy);

        for (let y=0; y<Params.MAP_ROW; y++) {
            for (let x=0; x<Params.MAP_COLUMN; x++) {
                if (cx === x && cy === y) {
                    this.setPoint(this.character, MapState.PLAYER_NUMBER);
                } else {
                    this.setPoint(new Coord(x, y), Math.floor(Math.random() * MapState.ALL_NUMBERS_COUNT));
                }
            }
        }
    }

    /**
     * マップの状態を返す
     * @returns マップの状態
     */
    public getMain(): number[][] {
        return this.points;
    }

    /**
     * ゲームが終了しているかどうかを返す
     * @returns ゲーム終了
     */
    public isDone(): boolean {
        return this.turn === Params.END_TURN;
    }

    /**
     * ゲームのスコアを返す
     * @returns ゲームのスコア
     */
    public getScore(): number {
        return this.score;
    }

    /**
     * プレイヤーが移動できる方向を返す
     * @returns プレイヤーが移動できる方向
     */
    public legalDirections(): DirectionType[] {
        const directions: DirectionType[] = [];
        for (let direction=0; direction<4; direction++) {
            try {
                this.getMoveToCoordFromCharacter(direction);
                directions.push(direction);
            } catch {
                continue;
            }
        }
        return directions;
    }

    /**
     * プレイヤーの移動処理を行う
     * @param direction 移動方向
     */
    public advance(direction: DirectionType): void {
        try {
            const nextCoord: Coord = this.getMoveToCoordFromCharacter(direction);
            this.moveCharacterWithPoint(nextCoord);
        } catch {
            return;
        }
    }

    /**
     * 指定された移動方向から移動先のポイントを返す
     * @param direction 移動方向
     * @returns プレイヤーの移動先のポイント
     */
    public getPointByDirection(direction: DirectionType): number {
        try {
            const nextCoord: Coord = this.getMoveToCoordFromCharacter(direction);
            return this.getPoint(nextCoord);
        } catch {
            return 0;
        }
    }

    /**
     * 指定された移動方向からプレイヤーの移動先の座標を返す
     * @param direction 移動方向
     * @returns プレイヤーの移動先の座標
     */
    private getMoveToCoordFromCharacter(direction: DirectionType): Coord {
        const currentCoord: Coord = new Coord(this.character.x, this.character.y);
        return currentCoord.getMoveToCoord(direction);
    }

    /**
     * プレイヤーの移動処理とスコアの更新を行う
     * @param nextCoord プレイヤーの移動先の座標
     */
    private moveCharacterWithPoint(nextCoord: Coord): void {
        this.score += this.getPoint(nextCoord);
        this.setPoint(this.character, MapState.ZERO_NUMBER);
        this.character = nextCoord;
        this.setPoint(this.character, MapState.PLAYER_NUMBER);
        this.turn++;
    }

    /**
     * 指定された座標のポイントを返す
     * @param coord 座標
     * @returns ポイント
     */
    private getPoint(coord: Coord): number {
        return this.points[coord.y][coord.x];
    }

    /**
     * 指定された座標のポイントを設定する
     * @param coord 座標
     * @param point ポイント
     */
    private setPoint(coord: Coord, point: number): void {
        this.points[coord.y][coord.x] = point;
    }
}
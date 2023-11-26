import { Params } from "../params";
import { Coord } from "../vo/coord";

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
    public static readonly ALL_NUMBERS_COUNT: number = 10;
    /**
     * 0の数字
     */
    public static readonly ZERO_NUMBER = 0;

    /**
     * マップの状態
     */
    private points: number[][] = Array.from(Array(Params.MAP_ROW), () => new Array(Params.MAP_COLUMN).fill(0));
    /**
     * ターン数
     * ゲーム開始時にプレイヤー位置の初期化で1ターン使用する
     */
    private turn: number = 0;
    /**
     * ゲームのスコア
     */
    private score: number = 0;

    /**
     * マップ上にランダムな数字を設定してマップの状態を生成する
　     */
    constructor() {
        for (let y=0; y<Params.MAP_ROW; y++) {
            for (let x=0; x<Params.MAP_COLUMN; x++) {
                const pos = new Phaser.Math.Vector2(x, y);
                const coord = new Coord(pos);
                this.setPoint(coord, Math.floor(Math.random() * MapState.ALL_NUMBERS_COUNT));
            }
        }
    }

    /**
     * キャラクターが移動した時の処理を行う
     * @param nextCoord 移動先の座標
     */
    public advance(nextCoord: Coord): void {
        this.score += this.getPoint(nextCoord);
        this.setPoint(nextCoord, MapState.ZERO_NUMBER);
        this.turn++;
    }


    /**
     * マップの状態を返す
     * @returns マップの状態
     */
    public getMain(): number[][] {
        return this.points;
    }

    /**
     * マップの状態を複製して返す
     * @returns マップの状態
     */
    public clone(): MapState {
        const mapState: MapState = new MapState();
        mapState.points = JSON.parse(JSON.stringify(this.points));
        mapState.turn = this.turn;
        mapState.score = this.score;
        return mapState;
    }

    /**
     * ゲームが終了しているかどうかを返す
     * @returns ゲーム終了
     */
    public isDone(): boolean {
        return this.turn > Params.END_TURN;
    }

    /**
     * ゲームのスコアを返す
     * @returns ゲームのスコア
     */
    public getScore(): number {
        return this.score;
    }

    /**
     * 指定された座標のポイントをスコアに加算する
     * @param coord 座標
     */
    public setScore(coord: Coord): void {
        this.score = this.getPoint(coord);
    }

    /**
     * 指定された座標のポイントを返す
     * @param coord 座標
     * @returns ポイント
     */
    public getPoint(coord: Coord): number {
        return this.points[coord.y][coord.x];
    }

    /**
     * 指定された座標のポイントを設定する
     * @param coord 座標
     * @param point ポイント
     */
    public setPoint(coord: Coord, point: number): void {
        this.points[coord.y][coord.x] = point;
    }
}
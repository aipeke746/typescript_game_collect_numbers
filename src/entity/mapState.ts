import { Params } from "../params";
import { Coord } from "../vo/coord";
import { Character } from "./character";

/**
 * マップの状態を表すクラス
 * 
 * ポイントやターン数を管理する
 * 画面上にマップの状態を反映する場合は、Tilemapクラスに反映して更新する
 * シミュレーションなどでを行う場合は　、MapStateクラスのみを更新する
 */
export class MapState {
    /**
     * タイルのピクセルサイズ
     */
    public static readonly SIZE: number = 64;
    /**
     * 0から9までの数字の数
     */
    public static readonly ALL_NUMBERS_COUNT: number = 10;
    /**
     * 0の数字を表す定数
     */
    public static readonly ZERO_POINT = 0;

    /**
     * マップ上のポイントを表す二次元配列
     */
    private points: number[][] = Array.from(Array(Params.MAP_ROW), () => new Array(Params.MAP_COLUMN).fill(0));
    /**
     * ターン数
     */
    private turn: number = 0;

    /**
     * マップ上にランダムなポイントを設定してマップの状態を生成する
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
     * キャラクター時の移動処理を行う
     * @param character キャラクター
     * @param nextCoord 移動先の座標
     */
    public advance(character: Character, nextCoord: Coord): void {
        character.addPoint(this.getPoint(nextCoord));
        this.setPoint(nextCoord, MapState.ZERO_POINT);
        this.turn++;
    }

    /**
     * マップのポイントの状態を返す
     * @returns マップの状態
     */
    public getPoints(): number[][] {
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
        return mapState;
    }

    /**
     * 現在のターン数を返す
     * @returns ターン数
     */
    public getTurn(): number {
        return this.turn;
    }

    /**
     * ターン数をリセットする
     */
    public resetTurn(): void {
        this.turn = 0;
    }

    /**
     * ゲームが終了しているかどうかを返す
     * @returns ゲーム終了
     */
    public isDone(): boolean {
        return this.turn >= Params.END_TURN
            || this.isAllZero();
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

    /**
     * 全てのポイントが0かどうかを返す
     * @returns 全てのポイントが0の場合はtrue
     */
    private isAllZero(): boolean {
        for (let y=0; y<Params.MAP_ROW; y++) {
            for (let x=0; x<Params.MAP_COLUMN; x++) {
                if (this.points[y][x] !== MapState.ZERO_POINT) {
                    return false;
                }
            }
        }
        return true;
    }
}
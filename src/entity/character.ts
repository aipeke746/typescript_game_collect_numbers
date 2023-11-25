import { DirectionType } from "../type/directionType";
import { WalkType } from "../type/walkType";
import { WalkTypeUtil } from "../util/walkTypeUtil";
import { Coord } from "../vo/coord";

export class Character {
    /**
     * キャラクターのスプライト
     */
    private sprite: Phaser.GameObjects.Sprite;
    /**
     * キャラクターのタイルマップの座標
     */
    private coord: Coord;
    /**
     * キャラクターが歩いているかどうか
     */
    private walking: boolean = false;

    /**
     * タイルマップのランダムな位置にキャラクターを生成する
     * @param sprite スプライト
     * @param coord タイルマップの座標
     * @param walking キャラクターが歩いているかどうか
     */
    public constructor(sprite: Phaser.GameObjects.Sprite, coord: Coord, walking: boolean = false) {
        this.sprite = sprite;
        this.coord = coord;
        this.walking = walking;
    }

    /**
     * キャラクターのスプライトを取得する
     * @returns キャラクターのスプライト
     */
    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    /**
     * キャラクターのタイルマップの座標を取得する
     * @returns キャラクターの座標
     */
    public getCoord(): Coord {
        return this.coord;
    }

    /**
     * キャラクターのワールド（画面）の座標を取得する
     * @returns キャラクターのワールド（画面）の座標
     */
    public getPos(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    /**
     * キャラクターが歩いているかどうかを返す
     * @returns キャラクターが歩いているかどうか
     */
    public isWalking(): boolean {
        return this.walking;
    }

    /**
     * キャラクターを移動させる
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    public startWalk(nextCoord: Coord, direction: DirectionType): void {
        this.walking = true;
        this.coord = nextCoord;
        this.playAnimation(WalkTypeUtil.get(direction));
    }

    /**
     * キャラクターが歩いていない状態にする
     */
    public stopWalk(): void {
        this.walking = false;
    }

    /**
     * キャラクターのアニメーションを停止する
     */
    public idle(): void {
        this.sprite.anims.stop();
    }

    /**
     * キャラクターのアニメーションを再生する
     * @param walkType 歩行タイプ
     */
    public playAnimation(walkType: WalkType): void {
        this.sprite.anims.play(walkType);
    }
}
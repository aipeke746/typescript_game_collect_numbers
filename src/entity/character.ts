import { Params } from "../params";
import { DirectionType } from "../type/directionType";
import { WalkType } from "../type/walkType";
import { WalkTypeUtil } from "../util/walkTypeUtil";
import { Coord } from "./coord";
import { Tilemap } from "./tilemap";

export class Character {
    private SIZE: number = 60;
    /**
     * キャラクターのスプライト
     */
    private sprite: Phaser.GameObjects.Sprite;
    /**
     * キャラクターのタイルマップの座標
     */
    private coord: Coord;
    /**
     * タイルマップ
     */
    private tilemap: Tilemap;
    /**
     * アニメーションの状態
     */
    private animState: WalkType = 'idle';
    /**
     * アニメーションの設定
     */
    private anims: { key: WalkType, frameStart: number, frameEnd: number }[] = [
        { key: 'walk_front', frameStart: 0, frameEnd: 2 },
        { key: 'walk_left', frameStart: 3, frameEnd: 5 },
        { key: 'walk_right', frameStart: 6, frameEnd: 8 },
        { key: 'walk_back', frameStart: 9, frameEnd: 11 },
    ];

    /**
     * タイルマップのランダムな位置にキャラクターを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     */
    constructor(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string) {
        this.coord = this.randomCoord();
        this.tilemap = tilemap;

        const pos = this.getWorldPos();
        this.sprite = scene.add.sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(this.SIZE, this.SIZE);

        for (let anim of this.anims) {
            if (scene.anims.create(this.animConfig(scene, anim, spriteName)) === false) continue;
            this.sprite.anims.playReverse(anim.key);
        }
    }

    /**
     * キャラクターを移動させる
     * @param nextCoord 移動先の座標
     * @param direction 移動方向
     */
    public moveTo(nextCoord: Coord, direction: DirectionType): void {
        this.coord = nextCoord;
        const pos = this.getWorldPos();
        this.sprite.setPosition(pos.x, pos.y);

        const walkType: WalkType = WalkTypeUtil.get(direction);
        this.playAnimation(walkType);
    }

    /**
     * キャラクターの座標を取得する
     * @returns キャラクターの座標
     */
    public getCoord(): Coord {
        return this.coord;
    }

    /**
     * キャラクターのアニメーションを再生する
     * @param walkType 歩行タイプ
     */
    public playAnimation(walkType: WalkType): void {
        if (this.animState === walkType) return;
        this.sprite.anims.play(walkType);
        this.animState = walkType;
    }

    /**
     * ランダムなタイルマップの座標を取得する
     * @returns ランダムなタイルマップの座標
     */
    private randomCoord(): Coord {
        const x = Phaser.Math.Between(0, Params.MAP_COLUMN - 1);
        const y = Phaser.Math.Between(0, Params.MAP_ROW - 1);
        return new Coord(x, y);
    }

    /**
     * タイルマップの座標からキャラクターのワールド（画面）の座標を取得する
     * @returns キャラクターのワールドの座標
     */
    private getWorldPos(): Phaser.Math.Vector2 {
        return this.tilemap.getWorldPos(this.coord.x, this.coord.y);
    }

    /**
     * アニメーションの設定を返す
     * @param scene シーン
     * @param config アニメーションの設定
     * @param spriteName スプライト名
     * @returns アニメーションの設定
     */
    private animConfig(scene: Phaser.Scene, config: {key: string, frameStart: number, frameEnd: number}, spriteName: string): Phaser.Types.Animations.Animation {
        return {
            key: config.key,
            frames: scene.anims.generateFrameNumbers(
                spriteName,
                {
                    start: config.frameStart,
                    end: config.frameEnd
                }
            ),
            frameRate: 8,
            repeat: -1
        }
    }
}
import { Character } from "../entity/character";
import { Tilemap } from "../entity/tilemap";
import { WalkType } from "../type/walkType";
import { Coord } from "../vo/coord";
import { CoordFactory } from "./coordFactory";

export class CharacterFactory {
    /**
     * キャラクターのサイズ
     */
    private static readonly SIZE: number = 60;
    /**
     * アニメーションの設定
     */
    private static readonly ANIMS: { key: WalkType, frameStart: number, frameEnd: number }[] = [
        { key: 'walk_front', frameStart: 0, frameEnd: 2 },
        { key: 'walk_left', frameStart: 3, frameEnd: 5 },
        { key: 'walk_right', frameStart: 6, frameEnd: 8 },
        { key: 'walk_back', frameStart: 9, frameEnd: 11 },
    ];

    /**
     * キャラクターをランダムな位置に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns キャラクター
     */
    public static createForRandomPos(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string = 'character'): Character {
        const coord: Coord = CoordFactory.randomCoord();
        const pos: Phaser.Math.Vector2 = tilemap.getWorldPos(coord);
        const sprite: Phaser.GameObjects.Sprite = this.createSprite(scene, pos, spriteName);
        this.playAnims(scene, sprite, spriteName);

        return new Character(sprite, coord);
    }

    /**
     * キャラクターを指定した位置に生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param coord タイルマップの座標
     * @param spriteName スプライト名
     * @returns キャラクター
     */
    public static createForTargetPos(scene: Phaser.Scene, tilemap: Tilemap, coord: Coord, spriteName: string = 'character'): Character {
        const pos: Phaser.Math.Vector2 = tilemap.getWorldPos(coord);
        const sprite: Phaser.GameObjects.Sprite = this.createSprite(scene, pos, spriteName);
        this.playAnims(scene, sprite, spriteName);

        return new Character(sprite, coord);
    }

    /**
     * キャラクターを複製する
     * @param character キャラクター
     * @returns 複製したキャラクター
     */
    public static clone(character: Character): Character {
        return new Character(character.getSprite(), character.getCoord(), character.getScore(), character.isWalking());
    }

    /**
     * キャラクターのスプライトを生成する
     * @param scene シーン
     * @param pos ワールドの座標
     * @param spriteName スプライト名
     * @returns キャラクターのスプライト
     */
    private static createSprite(scene: Phaser.Scene, pos: Phaser.Math.Vector2, spriteName: string): Phaser.GameObjects.Sprite {
        return scene.add.sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(this.SIZE, this.SIZE);
    }

    /**
     * キャラクターのアニメーションを再生する
     * @param scene シーン
     * @param sprite スプライト
     * @param spriteName スプライト名
     */
    private static playAnims(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, spriteName: string): void {
        for (let anim of this.ANIMS) {
            if (!scene.anims.exists(anim.key)) {
                scene.anims.create(this.animConfig(scene, anim, spriteName));
            }
            sprite.anims.play(anim.key);
        }
        sprite.anims.play('walk_front');
        sprite.anims.stop();
    }

    /**
     * アニメーションの設定を返す
     * @param scene シーン
     * @param config アニメーションの設定
     * @param spriteName スプライト名
     * @returns アニメーションの設定
     */
    private static animConfig(scene: Phaser.Scene, config: {key: string, frameStart: number, frameEnd: number}, spriteName: string): Phaser.Types.Animations.Animation {
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
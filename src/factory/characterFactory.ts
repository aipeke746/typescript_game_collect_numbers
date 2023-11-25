import { Character } from "../entity/character";
import { Tilemap } from "../entity/tilemap";
import { Params } from "../params";
import { WalkType } from "../type/walkType";
import { Coord } from "../vo/coord";

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
     * キャラクターを生成する
     * @param scene シーン
     * @param tilemap タイルマップ
     * @param spriteName スプライト名
     * @returns キャラクター
     */
    public static create(scene: Phaser.Scene, tilemap: Tilemap, spriteName: string = 'character'): Character {
        const coord: Coord = this.randomCoord();
        const pos = this.getWorldPos(tilemap, coord);
        const sprite: Phaser.GameObjects.Sprite = scene.add.sprite(pos.x, pos.y, spriteName)
            .setOrigin(0, 0)
            .setDisplaySize(this.SIZE, this.SIZE);
        
        for (let anim of this.ANIMS) {
            if (scene.anims.create(this.animConfig(scene, anim, spriteName)) === false) continue;
            sprite.anims.play(anim.key);
        }
        sprite.anims.play('walk_front');

        return new Character(sprite, coord);
    }

    /**
     * キャラクターを複製する
     * @param character キャラクター
     * @returns 複製したキャラクター
     */
    public static clone(character: Character): Character {
        return new Character(character.getSprite(), character.getCoord(), character.isWalking());
    }

    /**
     * ランダムなタイルマップの座標を取得する
     * @returns ランダムなタイルマップの座標
     */
    private static randomCoord(): Coord {
        const x = Phaser.Math.Between(0, Params.MAP_COLUMN - 1);
        const y = Phaser.Math.Between(0, Params.MAP_ROW - 1);
        return new Coord(x, y);
    }

    /**
     * タイルマップの座標からキャラクターのワールド（画面）の座標を取得する
     * @returns キャラクターのワールドの座標
     */
    private static getWorldPos(tilemap: Tilemap, coord: Coord): Phaser.Math.Vector2 {
        return tilemap.getWorldPos(coord.x, coord.y);
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
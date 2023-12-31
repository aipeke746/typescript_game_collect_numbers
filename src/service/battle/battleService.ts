import { Character } from "../../entity/character";

/**
 * バトルに関するサービス
 */
export class BattleService {
    /**
     * 結果を表示する
     * @param scene シーン
     * @param tilemap タイルマップ
     */
    public static showResult(scene: Phaser.Scene, character: Character): void {
        const score: number = character.getScore();
        this.createScoreText(scene, score);
    }

    public static showResult2(scene: Phaser.Scene, character: Character[]): void {
        const score: number = character.reduce(
            (total, char) => total + char.getScore(), 0
        );
        this.createScoreText(scene, score);
    }

    public static showResult3(scene: Phaser.Scene, character: Character[]): void {
        const score1: number = character[0].getScore();
        const score2: number = character[1].getScore();
        this.createScoreText(scene, score1);
        scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height-20, `Score: ${score2}`)
            .setOrigin(0.5);
    }

    private static createScoreText(scene: Phaser.Scene, score: number): void {
        scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height-50, `Score: ${score}`)
            .setOrigin(0.5);
    }
}
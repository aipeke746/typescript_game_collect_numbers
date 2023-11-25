export class TimeDelayManager {
    /**
     * シーン
     */
    private scene: Phaser.Scene;
    /**
     * 最後に移動した時間
     */
    private lastMoveTime: number;
    /**
     * 移動する間隔
     */
    private moveDelay: number;

    /**
     * 移動する間隔の時間を設定する
     * @param scene シーン
     * @param delay 移動する間隔（秒）
     */
    constructor(scene: Phaser.Scene, delay: number = 0.7) {
        this.scene = scene;
        this.lastMoveTime = this.scene.time.now + 2000; // 開始時は　2秒後に移動する
        this.moveDelay = delay * 1000;
    }

    /**
     * 移動する間隔が経過しているかどうかを返す
     * @returns 移動する間隔が経過している場合はtrue
     */
    public isDelayPassed(): boolean {
        return this.scene.time.now - this.lastMoveTime > this.moveDelay;
    }

    /**
     * 最後に移動した時間を更新する
     */
    public update(): void {
        this.lastMoveTime = this.scene.time.now;
    }
}
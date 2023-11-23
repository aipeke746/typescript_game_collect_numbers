export class TimeDelayManager {
    /**
     * シーン
     */
    private scene: Phaser.Scene;
    /**
     * 最後に移動した時間
     */
    private lastMoveTime: number = 0;
    /**
     * 移動する間隔
     */
    private MOVE_DELAY: number = 500;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    /**
     * 移動する間隔が経過しているかどうかを返す
     * @returns 移動する間隔が経過している場合はtrue
     */
    public isDelayPassed(): boolean {
        return this.scene.time.now - this.lastMoveTime > this.MOVE_DELAY;
    }

    public update(): void {
        this.lastMoveTime = this.scene.time.now;
    }
}
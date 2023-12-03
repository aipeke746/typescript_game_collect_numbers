import { GameType } from "../../type/gameType";

/**
 * タイトル画面のシーン
 */
export class SelectGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'selectGameScene' });
    }

    create() {
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '数字集め迷路', GameType.COLLECT_NUMBER);
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2, 'オート数字集め迷路', GameType.COLLECT_NUMBER_AUTO);
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '交互着手数字集め迷路', GameType.COLLECT_NUMBER_ALTERNATE);
    }

    /**
     * テキストを生成して、クリック時のイベントを設定する
     * イベント：操作方法
     * @param x ワールドのｘ座標
     * @param y ワールドのｙ座標
     * @param content 表示内容
     * @param gameType ゲームタイプ
     */
    private createText(x: number, y: number, content: string, gameType: GameType): void {
        const text = this.add.text(x, y, content)
            .setOrigin(0.5)
            .setInteractive()
        text.on('pointerdown', () => {
            this.scene.start('selectOperationScene', { type: gameType });
        });
    }
}
import { GameType } from "../../type/gameType";
import { OperationType } from "../../type/operationType";

/**
 * タイトル画面のシーン
 */
export class SelectOperationScene extends Phaser.Scene {
    private gameType?: GameType;

    constructor() {
        super({ key: 'selectOperationScene' });
    }

    init (data: any) {
        this.gameType = data.type as GameType;
    }

    create() {
        if (this.gameType === GameType.COLLECT_NUMBER) {
            this.createTextToMazeCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperationType.MANUAL);
            this.createTextToMazeCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperationType.RANDOM);
            this.createTextToMazeCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '貪欲法でプレイする', OperationType.GREEDY);
            this.createTextToMazeCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+60, 'ビームサーチでプレイする', OperationType.BEAM_SEARCH);
        } else if (this.gameType === GameType.COLLECT_NUMBER_AUTO) {
        }
    }

    /**
     * テキストを生成して、クリック時のイベントを設定する
     * イベント：操作方法
     * @param x ワールドのｘ座標
     * @param y ワールドのｙ座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     */
    private createTextToMazeCollectNumberScene(x: number, y: number, content: string, operationType: OperationType): void {
        const text = this.add.text(x, y, content)
            .setOrigin(0.5)
            .setInteractive()
        text.on('pointerdown', () => {
            this.scene.start('collectNumberScene', { type: operationType });
        });
    }
}
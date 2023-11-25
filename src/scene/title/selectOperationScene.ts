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
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperationType.MANUAL);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperationType.RANDOM);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '貪欲法でプレイする', OperationType.GREEDY);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+60, 'ビームサーチでプレイする', OperationType.BEAM_SEARCH);
        } else if (this.gameType === GameType.COLLECT_NUMBER_AUTO) {
            this.createTextToCollectNumberAutoScene(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperationType.RANDOM);
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
    private createTextToCollectNumberScene(x: number, y: number, content: string, operationType: OperationType): void {
        this.createText(x, y, content, operationType, 'collectNumberScene');
    }

    /**
     * 
     * @param x ワールドのx座標
     * @param y ワールドのy座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     */
    private createTextToCollectNumberAutoScene(x: number, y: number, content: string, operationType: OperationType): void {
        this.createText(x, y, content, operationType, 'collectNumberAutoScene');
    }

    /**
     * 
     * @param x ワールドのｘ座標
     * @param y ワールドのｙ座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     * @param nextScene 次のシーン
     */
    private createText(x: number, y: number, content: string, operationType: OperationType, nextScene: string): void {
        const text = this.add.text(x, y, content)
            .setOrigin(0.5)
            .setInteractive()
        text.on('pointerdown', () => {
            this.scene.start(nextScene, { type: operationType });
        });
    }
}
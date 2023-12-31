import { GameType } from "../../type/gameType";
import { OperateDirectionType } from "../../type/operateDirectionType";
import { OperatePositionType } from "../../type/operatePositionType";

/**
 * ゲームの操作方法を選択するシーン
 */
export class SelectOperationScene extends Phaser.Scene {
    /**
     * ゲームタイプ
     */
    private gameType?: GameType;

    /**
     * コンストラクタ
     */
    constructor() {
        super({ key: 'selectOperationScene' });
    }

    /**
     * 初期設定
     * @param data ゲームタイプ
     */
    init (data: any) {
        this.gameType = data.type as GameType;
    }

    /**
     * ゲームの操作方法を選択するテキストを生成する
     */
    create() {
        if (this.gameType === GameType.COLLECT_NUMBER) {
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperateDirectionType.MANUAL);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperateDirectionType.RANDOM);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '貪欲法でプレイする', OperateDirectionType.GREEDY);
            this.createTextToCollectNumberScene(this.sys.canvas.width/2, this.sys.canvas.height/2+60, 'ビームサーチでプレイする', OperateDirectionType.BEAM_SEARCH);
        } else if (this.gameType === GameType.COLLECT_NUMBER_AUTO) {
            this.createTextToCollectNumberAutoScene(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperatePositionType.MANUAL);
            this.createTextToCollectNumberAutoScene(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperatePositionType.RANDOM);
            this.createTextToCollectNumberAutoScene(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '山登り法でプレイする', OperatePositionType.HILL_CLIMB);
            this.createTextToCollectNumberAutoScene(this.sys.canvas.width/2, this.sys.canvas.height/2+60, '焼きなまし法でプレイする', OperatePositionType.ANNEALING);
        } else if (this.gameType === GameType.COLLECT_NUMBER_ALTERNATE) {
            this.createTextToCollectNumberAlternateScene(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperateDirectionType.MANUAL);
        }
    }

    /**
     * テキストを生成して、クリック時の『数字集め迷路』を設定する
     * イベント：操作方法
     * @param x ワールドのｘ座標
     * @param y ワールドのｙ座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     */
    private createTextToCollectNumberScene(x: number, y: number, content: string, operationType: OperateDirectionType): void {
        this.createText(x, y, content, operationType, 'collectNumberScene');
    }

    /**
     * テキストを生成して、クリック時の『オート数字集め迷路』を設定する
     * @param x ワールドのx座標
     * @param y ワールドのy座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     */
    private createTextToCollectNumberAutoScene(x: number, y: number, content: string, operationType: OperatePositionType): void {
        this.createText(x, y, content, operationType, 'collectNumberAutoScene');
    }

    private createTextToCollectNumberAlternateScene(x: number, y: number, content: string, operationType: OperateDirectionType): void {
        this.createText(x, y, content, operationType, 'collectNumberAlternateScene');
    }

    /**
     * 
     * @param x ワールドのｘ座標
     * @param y ワールドのｙ座標
     * @param content 表示内容
     * @param operationType 操作タイプ
     * @param nextScene 次のシーン
     */
    private createText(x: number, y: number, content: string, operationType: OperateDirectionType | OperatePositionType, nextScene: string): void {
        const text = this.add.text(x, y, content)
            .setOrigin(0.5)
            .setInteractive()
        text.on('pointerdown', () => {
            this.scene.start(nextScene, { type: operationType });
        });
    }
}
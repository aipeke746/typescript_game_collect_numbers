import { OperationType } from "../type/operationType";

/**
 * タイトル画面のシーン
 */
export class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    create() {
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2-30, '手動でプレイする', OperationType.MANUAL);
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2, 'ランダムでプレイする', OperationType.RANDOM);
        this.createText(this.sys.canvas.width/2, this.sys.canvas.height/2+30, '貪欲法でプレイする', OperationType.GREEDY);
    }

    private createText(x: number, y: number, content: string, operationType: OperationType): void {
        const text = this.add.text(x, y, content)
            .setOrigin(0.5)
            .setInteractive()
        text.on('pointerdown', () => {
            this.scene.start('gameScene', { operationType: operationType });
        });
    }
}
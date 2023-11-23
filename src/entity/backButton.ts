/**
 * 前の画面に戻るボタン
 */
export class BackButton {
    /**
     * ボタンの画像
     */
    private button: Phaser.GameObjects.Image;

    /**
     * 移動先のシーンを指定して、クリックすると移動するボタンを生成する
     * @param nowScene シーン
     * @param destinationScene 移動先のシーン
     */
    constructor(nowScene: Phaser.Scene, destinationScene: string) {
        this.button = nowScene.add.image(40, nowScene.sys.canvas.height-30, 'backButton')
            .setScale(0.5)
            .setInteractive();
        this.button.on('pointerdown', () => {
            nowScene.scene.start(destinationScene);
        });
    }
}
export class BackButton {
    private button: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, destination: string) {
        this.button = scene.add.image(40, scene.sys.canvas.height-30, 'backButton')
            .setScale(0.5)
            .setInteractive();
        this.button.on('pointerdown', () => {
            scene.scene.start(destination);
        });
    }

    public setPosition(x: number, y: number): void {
        this.button.setPosition(x, y);
    }
}
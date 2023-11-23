import { Tilemap } from "../entity/tilemap";
import { OperationFactory } from "../factory/operationFactory";
import { OperationService } from "../service/operation/operationService";
import { DirectionType } from "../type/directionType";

/**
 * ゲーム画面のシーン
 */
export class GameScene extends Phaser.Scene {
    private tilemap?: Tilemap;
    private operation?: OperationService;

    constructor() {
        super({ key: 'gameScene' });
    }

    init(data: any) {
        this.operation = OperationFactory.create(this, data.operationType);
    }

    preload() {
        this.load.image('mapTiles', 'assets/images/numbers.png');
    }

    create() {
        this.tilemap = new Tilemap(this, 'mapTiles');
    }

    update() {
        if (!this.operation || !this.tilemap) return;

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            this.add.text(this.sys.canvas.width/2, this.sys.canvas.height/2, 'Done!')
                .setOrigin(0.5)
                .setInteractive();
        } else {
            // ゲームプレイ中
            const direction: DirectionType = this.operation.getDirection(this.tilemap);
            if (direction === DirectionType.NONE) return;

            this.tilemap.advance(direction);
        }
    }
}
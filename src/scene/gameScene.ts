import { BackButton } from "../entity/backButton";
import { Tilemap } from "../entity/tilemap";
import { OperationFactory } from "../factory/operationFactory";
import { BattleService } from "../service/battle/battleService";
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
        this.load.image('backButton', 'assets/images/backButton.png')
    }

    create() {
        this.tilemap = new Tilemap(this, 'mapTiles');
        new BackButton(this, 'titleScene');
    }

    update() {
        if (!this.operation || !this.tilemap) return;

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.tilemap);
        } else {
            // ゲームプレイ中
            const direction: DirectionType = this.operation.getDirection(this.tilemap);
            if (direction === DirectionType.NONE) return;

            this.tilemap.advance(direction);
        }
    }
}
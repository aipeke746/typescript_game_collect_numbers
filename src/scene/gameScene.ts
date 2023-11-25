import { BackButton } from "../entity/backButton";
import { Character } from "../entity/character";
import { MapState } from "../entity/mapState";
import { Tilemap } from "../entity/tilemap";
import { CharacterFactory } from "../factory/characterFactory";
import { OperationFactory } from "../factory/operationFactory";
import { BattleService } from "../service/battle/battleService";
import { MapService } from "../service/map/mapService";
import { OperationService } from "../service/operation/operationService";
import { DirectionType } from "../type/directionType";

/**
 * ゲーム画面のシーン
 */
export class GameScene extends Phaser.Scene {
    private character?: Character;
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
        this.load.spritesheet('character', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('backButton', 'assets/images/backButton.png');
    }

    create() {
        new BackButton(this, 'titleScene');
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.character = CharacterFactory.create(this, this.tilemap);
        // キャラクターの初期位置のポイントを0にする
        this.tilemap.mapState.setPoint(this.character.getCoord(), MapState.ZERO_NUMBER);
        this.tilemap.advance(this.character.getCoord());
    }

    update() {
        if (!this.character || !this.operation || !this.tilemap) return;
        if (this.character.isWalking()) return;

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.tilemap);
        } else {
            // ゲームプレイ中
            const direction: DirectionType = this.operation.getDirection(this.character, this.tilemap);
            if (direction === DirectionType.NONE) return;

            MapService.advance(this.character, this.tilemap, direction);
        }
    }
}
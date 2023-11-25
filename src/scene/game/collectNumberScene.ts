import { BackButton } from "../../entity/backButton";
import { Character } from "../../entity/character";
import { MapState } from "../../entity/mapState";
import { Tilemap } from "../../entity/tilemap";
import { CharacterFactory } from "../../factory/characterFactory";
import { OperationFactory } from "../../factory/operationFactory";
import { BattleService } from "../../service/battle/battleService";
import { MapService } from "../../service/map/mapService";
import { OperationService } from "../../service/operation/operationService";
import { DirectionType } from "../../type/directionType";

/**
 * ゲーム画面のシーン
 */
export class CollectNumberScene extends Phaser.Scene {
    private character?: Character;
    private tilemap?: Tilemap;
    private operationType?: OperationService;

    constructor() {
        super({ key: 'collectNumberScene' });
    }

    init(data: any) {
        this.operationType = OperationFactory.create(this, data.type);
    }

    preload() {
        this.load.image('mapTiles', 'assets/images/numbers.png');
        this.load.spritesheet('character', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('backButton', 'assets/images/backButton.png');
    }

    create() {
        new BackButton(this, 'selectGameScene');
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.character = CharacterFactory.create(this, this.tilemap);
        // キャラクターの初期位置のポイントを0にする
        this.tilemap.mapState.setPoint(this.character.getCoord(), MapState.ZERO_NUMBER);
        this.tilemap.advance(this.character.getCoord());
    }

    update() {
        if (!this.character || !this.operationType || !this.tilemap) return;
        if (this.character.isWalking()) return;

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.tilemap);
        } else {
            // ゲームプレイ中
            const direction: DirectionType = this.operationType.getDirection(this.character, this.tilemap);
            if (direction === DirectionType.NONE) return;

            MapService.advance(this.character, this.tilemap, direction);
        }
    }
}
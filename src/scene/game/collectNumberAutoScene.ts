import { BackButton } from "../../entity/backButton";
import { Character } from "../../entity/character";
import { Tilemap } from "../../entity/tilemap";
import { CharacterFactory } from "../../factory/characterFactory";
import { OperationFactory } from "../../factory/operationFactory";
import { TimeDelayManager } from "../../manager/timeDelayManager";
import { BattleService } from "../../service/battle/battleService";
import { MapService } from "../../service/map/mapService";
import { OperationService } from "../../service/operation/operationService";
import { DirectionType } from "../../type/directionType";
import { OperationType } from "../../type/operationType";

export class CollectNumberAutoScene extends Phaser.Scene {
    private readonly CHARACTER_NUM: number = 3;
    private character?: Character[];
    private tilemap?: Tilemap;
    private operationType?: OperationService;
    private greedyOperation?: OperationService;
    private timeDelayManager?: TimeDelayManager;

    constructor() {
        super({ key: 'collectNumberAutoScene' });
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
        this.timeDelayManager = new TimeDelayManager(this);
        this.greedyOperation = OperationFactory.create(this, OperationType.GREEDY);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.character = [];
        for (let i=0; i<3; i++) {
            this.character.push(CharacterFactory.create(this, this.tilemap));
            // キャラクターの初期位置のポイントを0にする
            this.tilemap.mapState.setPoint(this.character[i].getCoord(), 0);
            this.tilemap.advance(this.character[i].getCoord());
        }
    }

    update() {
        if (!this.character || !this.operationType || !this.tilemap || !this.greedyOperation || !this.timeDelayManager) return;
        if (!this.timeDelayManager.isDelayPassed()) return;
        for (let i=0; i<this.CHARACTER_NUM; i++) {
            if (this.character[i].isWalking()) return;
        }

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.tilemap);
        } else {
            // ゲームプレイ中
            for (let i=0; i<this.CHARACTER_NUM; i++) {
                const direction: DirectionType = this.greedyOperation.getDirection(this.character[i], this.tilemap);
                if (direction === DirectionType.NONE) return;

                this.timeDelayManager.update();
                MapService.advance(this.character[i], this.tilemap, direction);
            }
        }
    }
}
import { BackButton } from "../../entity/backButton";
import { Character } from "../../entity/character";
import { MapState } from "../../entity/mapState";
import { Tilemap } from "../../entity/tilemap";
import { CharacterFactory } from "../../factory/characterFactory";
import { OperateDirectionFactory } from "../../factory/operateDirectionFactory";
import { TimeDelayManager } from "../../manager/timeDelayManager";
import { BattleService } from "../../service/battle/battleService";
import { MapService } from "../../service/map/mapService";
import { OperateDirectionService } from "../../service/operate/direction/operateDirectionService";
import { DirectionType } from "../../type/directionType";

/**
 * 数字集め迷路のプレイシーン
 */
export class CollectNumberScene extends Phaser.Scene {
    private character?: Character;
    private tilemap?: Tilemap;
    private operationType?: OperateDirectionService;
    private timeDelayManager?: TimeDelayManager;

    constructor() {
        super({ key: 'collectNumberScene' });
    }

    init(data: any) {
        this.operationType = OperateDirectionFactory.create(this, data.type);
    }

    preload() {
        this.load.image('mapTiles', 'assets/images/numbers.png');
        this.load.spritesheet('character', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('backButton', 'assets/images/backButton.png');

        this.load.audio('moveSound', 'assets/sounds/damage.mp3');
    }

    create() {
        new BackButton(this, 'selectGameScene');
        this.timeDelayManager = new TimeDelayManager(this);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.character = CharacterFactory.createRandomPos(this, this.tilemap);

        // キャラクターの初期位置のポイントを0にする
        this.tilemap.mapState.setPoint(this.character.getCoord(), MapState.ZERO_POINT);
        this.tilemap.advance(this.character, this.character.getCoord());
        this.tilemap.mapState.resetTurn();


        const moveSound = this.sound.add('moveSound');
        this.input.on('pointerup', function() {
            moveSound.play();
        });
    }

    update() {
        if (!this.character || !this.operationType || !this.tilemap || !this.timeDelayManager) return;
        if (!this.timeDelayManager.isDelayPassed()) return;
        if (this.character.isWalking()) return;

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.character);
        } else {
            // ゲームプレイ中
            const direction: DirectionType = this.operationType.getDirection(this.character, this.tilemap.mapState, undefined);
            if (direction === DirectionType.NONE) return;

            this.timeDelayManager.update();
            MapService.advance(this.character, this.tilemap, direction);
        }
    }
}
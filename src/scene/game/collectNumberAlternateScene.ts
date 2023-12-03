import { BackButton } from "../../entity/backButton";
import { Character } from "../../entity/character";
import { Tilemap } from "../../entity/tilemap";
import { CharacterFactory } from "../../factory/characterFactory";
import { OperateDirectionFactory } from "../../factory/operateDirectionFactory";
import { TimeDelayManager } from "../../manager/timeDelayManager";
import { BattleService } from "../../service/battle/battleService";
import { MapService } from "../../service/map/mapService";
import { OperateDirectionService } from "../../service/operate/direction/operateDirectionService";
import { DirectionType } from "../../type/directionType";
import { OperateDirectionType } from "../../type/operateDirectionType";

export class CollectNumberAlternateScene extends Phaser.Scene {
    private characters?: Character[];
    private tilemap?: Tilemap;
    private operationType?: OperateDirectionService[];
    private timeDelayManager?: TimeDelayManager;

    constructor() {
        super({ key: 'collectNumberAlternateScene' });
    }

    init(data: any) {
        this.operationType = [];
        this.operationType.push(OperateDirectionFactory.create(this, OperateDirectionType.MANUAL));
        this.operationType.push(OperateDirectionFactory.create(this, OperateDirectionType.MANUAL));
    }

    preload() {
        this.load.image('mapTiles', 'assets/images/numbers.png');
        this.load.spritesheet('character', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('backButton', 'assets/images/backButton.png');
    }

    create() {
        console.log('CollectNumberAlternateScene')
        new BackButton(this, 'selectGameScene');
        this.timeDelayManager = new TimeDelayManager(this);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.characters = [];
        this.characters.push(CharacterFactory.createForRandomPos(this, this.tilemap));
        this.characters.push(CharacterFactory.createForRandomPos(this, this.tilemap));
        // キャラクターの初期位置のポイントを0にする
        for (const character of this.characters) {
            this.tilemap.mapState.setPoint(character.getCoord(), 0);
            this.tilemap.advance(character, character.getCoord());
        }
        this.tilemap.mapState.resetTurn();
    }

    update() {
        if (!this.characters || !this.operationType || !this.tilemap || !this.timeDelayManager) return;
        if (!this.timeDelayManager.isDelayPassed()) return;
        for (const character of this.characters) {
            if (character.isWalking()) return;
        }

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult3(this, this.characters);
        } else {
            // ゲームプレイ中
            const turn = this.tilemap.mapState.getTurn() % this.characters.length;
            const direction = this.operationType[turn].getDirection(this.characters[turn], this.tilemap.mapState);
            if (direction === DirectionType.NONE) return;

            this.timeDelayManager.update();
            MapService.advance(this.characters[turn], this.tilemap, direction);
        }
    }
}
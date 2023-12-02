import { BackButton } from "../../entity/backButton";
import { Character } from "../../entity/character";
import { Tilemap } from "../../entity/tilemap";
import { OperateDirectionFactory } from "../../factory/operateDirectionFactory";
import { OperatePositionFactory } from "../../factory/operatePositionFactory";
import { TimeDelayManager } from "../../manager/timeDelayManager";
import { BattleService } from "../../service/battle/battleService";
import { MapService } from "../../service/map/mapService";
import { OperateDirectionService } from "../../service/operate/direction/operateDirectionService";
import { OperatePositionService } from "../../service/operate/position/operatePositionService";
import { DirectionType } from "../../type/directionType";
import { OperateDirectionType } from "../../type/operateDirectionType";
import { Params } from '../../params';

export class CollectNumberAutoScene extends Phaser.Scene {
    private characters?: Character[];
    private tilemap?: Tilemap;
    private operationType?: OperatePositionService;
    private greedyOperation?: OperateDirectionService;
    private timeDelayManager?: TimeDelayManager;

    constructor() {
        super({ key: 'collectNumberAutoScene' });
    }

    init(data: any) {
        this.operationType = OperatePositionFactory.create(this, data.type);
    }

    preload() {
        this.load.image('mapTiles', 'assets/images/numbers.png');
        this.load.spritesheet('character', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('backButton', 'assets/images/backButton.png');
    }

    create() {
        new BackButton(this, 'selectGameScene');
        this.timeDelayManager = new TimeDelayManager(this);
        this.tilemap = new Tilemap(this, 'mapTiles');
        this.greedyOperation = OperateDirectionFactory.create(this, OperateDirectionType.GREEDY);

        if (!this.operationType || !this.tilemap) return;
        this.characters = this.operationType.getCharacters(this.tilemap);
        for (const character of this.characters) {
            console.log("ok: ", character.getCoord());
        }
    }

    update() {
        if (!this.characters || !this.operationType || !this.tilemap || !this.greedyOperation || !this.timeDelayManager) return;
        if (!this.timeDelayManager.isDelayPassed()) return;
        if (this.characters.length < Params.CHARACTER_NUM) return;
        for (let i=0; i<Params.CHARACTER_NUM; i++) {
            if (this.characters[i].isWalking()) return;
        }

        if (this.tilemap.mapState.isDone()) {
            // ゲーム終了
            BattleService.showResult(this, this.tilemap);
        } else {
            // ゲームプレイ中
            for (let i=0; i<Params.CHARACTER_NUM; i++) {
                const direction: DirectionType = this.greedyOperation.getDirection(this.characters[i], this.tilemap.mapState);
                if (direction === DirectionType.NONE) return;

                this.timeDelayManager.update();
                MapService.advance(this.characters[i], this.tilemap, direction);
            }
        }
    }
}
import { Tilemap } from "../../../entity/tilemap";
import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { DirectionType } from "../../../type/directionType";
import { OperationService } from "../operationService";

/**
 * プレイヤーのランダムで動かすすクラス
 */
export class RandomImpl implements OperationService {
    /**
     * 時間遅延管理
     */
    private timeDelayManager: TimeDelayManager;

    constructor(scene: Phaser.Scene) {
        this.timeDelayManager = new TimeDelayManager(scene);
    }

    /**
     * プレイヤーの移動方向を返す
     * @param tilemap タイルマップ
     * @returns プレイヤーの移動方向
     */
    public getDirection(tilemap: Tilemap): DirectionType {
        if (!this.timeDelayManager.isDelayPassed())
            return DirectionType.NONE;
        this.timeDelayManager.update();

        return this.getRandomDirection(tilemap);
    }

    /**
     * ランダムにプレイヤーの移動方向を返す
     * @param tilemap タイルマップ
     * @returns ランダムに選択されたプレイヤーの移動方向
     */
    private getRandomDirection(tilemap: Tilemap): DirectionType {
        const directions: DirectionType[] = tilemap.mapState.legalDirections();
        return directions[Math.floor(Math.random() * directions.length)];
    }
}
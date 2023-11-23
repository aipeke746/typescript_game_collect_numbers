import { Tilemap } from "../../../entity/tilemap";
import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { DirectionType } from "../../../type/directionType";
import { OperationService } from "../operationService";
import { RandomImpl } from "./randomImpl";

/**
 * 貪欲法を使ってプレイヤーの移動方向を決定するクラス
 * 
 * 1.4方向のうち最もポイントが高い方向を選択する
 * 2.全て0ポイントの場合はランダムに選択する
 */
export class GreedyImpl implements OperationService {
    /**
     * 時間遅延管理
     */
    private timeDelayManager: TimeDelayManager;
    /**
     * ランダムで動かすクラス
     */
    private randomImpl: RandomImpl;

    constructor(scene: Phaser.Scene) {
        this.timeDelayManager = new TimeDelayManager(scene);
        this.randomImpl = new RandomImpl(scene);
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

        const direction = this.getGreedyDirection(tilemap);
        return direction !== DirectionType.NONE
            ? direction
            : this.randomImpl.getDirection(tilemap);
    }

    /**
     * 貪欲法を使ってプレイヤーの移動方向を決定する
     * @param tilemap タイルマップ
     * @returns プレイヤーの移動方向
     */
    private getGreedyDirection(tilemap: Tilemap): DirectionType {
        const directions: DirectionType[] = tilemap.mapState.legalDirections();
        let best: [number, DirectionType] = [0, DirectionType.NONE];

        for (let direction of directions) {
            const point = tilemap.mapState.getPointByDirection(direction);
            if (point > best[0]) {
                best = [point, direction];
            }
        }
        return best[1];
    }
}
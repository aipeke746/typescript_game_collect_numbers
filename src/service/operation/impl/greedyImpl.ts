import { Character } from "../../../entity/character";
import { Tilemap } from "../../../entity/tilemap";
import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { DirectionType } from "../../../type/directionType";
import { MapService } from "../../map/mapService";
import { OperationService } from "../operationService";
import { RandomImpl } from "./randomImpl";

/**
 * 貪欲法を使ってキャラクターの移動方向を決定するクラス
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
     * キャラクターの移動方向を返す
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, tilemap: Tilemap): DirectionType {
        if (!this.timeDelayManager.isDelayPassed())
            return DirectionType.NONE;
        this.timeDelayManager.update();

        const direction = this.getGreedyDirection(character, tilemap);
        return direction !== DirectionType.NONE
            ? direction
            : this.randomImpl.getDirection(character);
    }

    /**
     * 貪欲法を使ってキャラクターの移動方向を決定する
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    private getGreedyDirection(character: Character, tilemap: Tilemap): DirectionType {
        const directions: DirectionType[] = MapService.legalDirections(character);
        let best: [number, DirectionType] = [0, DirectionType.NONE];

        for (let direction of directions) {
            const point = MapService.getPointByDirection(character, tilemap, direction);
            if (point > best[0]) {
                best = [point, direction];
            }
        }
        return best[1];
    }
}
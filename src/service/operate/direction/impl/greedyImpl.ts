import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { DirectionType } from "../../../../type/directionType";
import { MapService } from "../../../map/mapService";
import { OperateDirectionService } from "../operateDirectionService";

/**
 * 貪欲法を使ってキャラクターの移動方向を決定するクラス
 * 
 * 1.4方向のうち最もポイントが高い方向を選択する
 * 2.最もポイントが高い方向が複数ある場合は、右、左、下、上の順で優先する
 */
export class GreedyImpl implements OperateDirectionService {
    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, tilemap: Tilemap): DirectionType {
        return this.getGreedyDirection(character, tilemap);
    }

    /**
     * 貪欲法を使ってキャラクターの移動方向を決定する
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    private getGreedyDirection(character: Character, tilemap: Tilemap): DirectionType {
        const directions: DirectionType[] = MapService.legalDirections(character);
        let best: [number, DirectionType] = [-1, DirectionType.NONE];

        for (let direction of directions) {
            const point = MapService.getPointByDirection(character, tilemap, direction);
            if (point > best[0]) {
                best = [point, direction];
            }
        }
        return best[1];
    }
}
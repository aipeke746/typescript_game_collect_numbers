import { Character } from "../../../entity/character";
import { DirectionType } from "../../../type/directionType";
import { MapService } from "../../map/mapService";
import { OperationService } from "../operationService";

/**
 * キャラクターのランダムで動かすすクラス
 */
export class RandomImpl implements OperationService {
    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character): DirectionType {
        return this.getRandomDirection(character);
    }

    /**
     * ランダムにキャラクターの移動方向を返す
     * @param character キャラクター
     * @returns ランダムに選択されたキャラクターの移動方向
     */
    private getRandomDirection(character: Character): DirectionType {
        const directions: DirectionType[] = MapService.legalDirections(character);
        return directions[Math.floor(Math.random() * directions.length)];
    }
}
import { Character } from "../../entity/character";
import { Coord } from "../../entity/coord";
import { Tilemap } from "../../entity/tilemap";
import { DirectionType } from "../../type/directionType";

export class MapService {
    /**
     * 指定された移動方向に進めるかどうかを返す
     * @param direction 移動方向
     * @returns 進めるかどうか
     */
    public static advance(character: Character, tilemap: Tilemap, direction: DirectionType): void {
        try {
            const nextCoord: Coord = this.getMoveToCoordFromCharacter(character, direction);
            character.moveTo(nextCoord, tilemap, direction);
        } catch {
            return;
        }
    }

    public static legalDirections(character: Character) {
        const directions: DirectionType[] = [];
        for (let direction=0; direction<4; direction++) {
            try {
                // 座標が取得できるということは移動できるため、移動方向を追加する
                this.getMoveToCoordFromCharacter(character, direction);
                directions.push(direction);
            } catch {
                continue;
            }
        }
        return directions;
    }

    /**
     * 指定された移動方向から移動先のポイントを返す
     * @param direction 移動方向
     * @returns キャラクターの移動先のポイント
     */
    public static getPointByDirection(character: Character, tilemap: Tilemap, direction: DirectionType): number {
        try {
            const nextCoord: Coord = this.getMoveToCoordFromCharacter(character, direction);
            return tilemap.mapState.getPoint(nextCoord);
        } catch {
            return 0;
        }
    }

    /**
     * 指定された移動方向からキャラクターの移動先の座標を返す
     * @param direction 移動方向
     * @returns キャラクターの移動先の座標
     */
    private static getMoveToCoordFromCharacter(character: Character, direction: DirectionType): Coord {
        return character.getCoord().getMoveToCoord(direction);
    }
}
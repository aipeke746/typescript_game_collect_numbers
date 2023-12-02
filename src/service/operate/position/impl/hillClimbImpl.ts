import { Character } from "../../../../entity/character";
import { Tilemap } from "../../../../entity/tilemap";
import { Params } from "../../../../params";
import { Coord } from "../../../../vo/coord";
import { MapService } from "../../../map/mapService";
import { SimulatePositionImpl } from "../../../simulate/position/impl/simulatePositionImpl";
import { SimulatePositionService } from "../../../simulate/position/simulatePositionService";
import { OperatePositionCommonService } from "../operatePositionCommonService";
import { OperatePositionService } from "../operatePositionService";
import { RandomImpl } from "./randomImpl";

export class HillClimbImpl extends OperatePositionCommonService implements OperatePositionService {
    /**
     * ランダムにキャラクターの初期位置をセットするクラス
     */
    private randomImpl: RandomImpl;
    /**
     * 繰り返し回数
     */
    private repeat: number = 1000;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.randomImpl = new RandomImpl(scene);
    }

    /**
     * キャラクターを生成する
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    public getCharacters(tilemap: Tilemap): Character[] {
        const characters: Character[] = this.createRandomCharacters(tilemap);
        const simulate: SimulatePositionService = new SimulatePositionImpl(characters, tilemap.mapState);

        return this.getHillClimbCharacters(simulate, tilemap);
    }

    /**
     * キャラクターを山登り法で生成する
     * @param simulate シミュレーション
     * @param tilemap タイルマップ
     * @returns キャラクター
     */
    private getHillClimbCharacters(simulate: SimulatePositionService, tilemap: Tilemap): Character[] {
        let bestScore: [number, Coord[]] = [-1, []];
        let nowBeam: SimulatePositionService = simulate;

        for (let i=0; i<this.repeat; i++) {
            while(!nowBeam.isDone()) {
                MapService.simulatePosition(nowBeam);
            }

            nowBeam.evaluate();
            if (nowBeam.evaluatedScore > bestScore[0]) {
                bestScore[0] = nowBeam.evaluatedScore;
                bestScore[1] = nowBeam.firstCoords;
            }

            const characters = this.createRandomCharactersByCoords(tilemap, bestScore[1], i % Params.CHARACTER_NUM);
            nowBeam.deleteAllCharacters();
            nowBeam.init(characters);
        }
        nowBeam.deleteAllCharacters();

        const bestCharacters: Character[] = this.createCharactersByCoords(tilemap, bestScore[1]);
        this.initializations(tilemap, bestCharacters);

        return bestCharacters;
    }

    /**
     * キャラクターの初期位置をランダムにセットする
     * @param tilemap タイルマップ
     * @param characters キャラクター
     * @returns キャラクター
     */
    protected createRandomCharacters( tilemap: Tilemap, characters: Character[] = []): Character[] {
        return this.randomImpl.create(tilemap, characters);
    }
}
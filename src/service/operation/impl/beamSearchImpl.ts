import { Character } from "../../../entity/character";
import { BeamSearchSimulateImpl } from "../../simulate/impl/beamSearchSimulateImpl";
import { Tilemap } from "../../../entity/tilemap";
import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { Params } from "../../../params";
import { DirectionType } from "../../../type/directionType";
import { MapService } from "../../map/mapService";
import { OperationService } from "../operationService";

/**
 * ビームサーチ法を使ってキャラクターの移動方向を決定するクラス
 */
export class BeamSearchImpl implements OperationService {
    /**
     * 時間遅延管理
     */
    private timeDelayManager: TimeDelayManager;

    constructor(scene: Phaser.Scene) {
        this.timeDelayManager = new TimeDelayManager(scene, 1);
    }

    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @param tilemap タイルマップ
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, tilemap: Tilemap): DirectionType {
        if (!this.timeDelayManager.isDelayPassed())
            return DirectionType.NONE;
        this.timeDelayManager.update();

        const simulation: BeamSearchSimulateImpl = new BeamSearchSimulateImpl(character, tilemap.mapState);
        return this.getBeamSearchDirection(simulation, 2, Params.END_TURN);
    }

    /**
     * ビームサーチ法を使ってキャラクターの移動方向を決定する
     * @param simulation シミュレーション
     * @param beamWidth 探索幅
     * @param beamDepth 探索深さ
     * @returns 移動方向
     */
    private getBeamSearchDirection(simulation: BeamSearchSimulateImpl, beamWidth: number, beamDepth: number): DirectionType {
        const nowBeam: BeamSearchSimulateImpl[] = [simulation];
        let bestState: BeamSearchSimulateImpl = simulation;

        for (let t=0; t<beamDepth; t++) {
            const nextBeam: BeamSearchSimulateImpl[] = [];

            for (let i=0; i<beamWidth; i++) {
                if (nowBeam.length === 0) break;
                const index = this.topBestIndex(nowBeam);
                const nowState: BeamSearchSimulateImpl = nowBeam[index];
                nowBeam.splice(index, 1);
                const legalDirections: DirectionType[] = MapService.legalDirections(nowState.character);

                for (const direction of legalDirections) {
                    const nextState = nowState.clone();
                    MapService.simulate(nextState, direction);
                    nextState.evaluate();
                    if (t === 0) nextState.firstDirection = direction;
                    nextBeam.push(nextState);
                }
            }

            nowBeam.push(...nextBeam);
            bestState = this.getBest(nowBeam);

            if (bestState.isDone()) {
                break;
            }
        }
        return bestState.firstDirection;
    }

    /**
     * シミュレーションの中で最も評価値が高いものを返す
     * @param simulation シミュレーション
     * @returns 最も評価値が高いシミュレーション
     */
    private getBest(simulation: BeamSearchSimulateImpl[]): BeamSearchSimulateImpl {
        return simulation[this.topBestIndex(simulation)];
    }

    /**
     * シミュレーションの中で最も評価値が高いもののインデックスを返す
     * @param simulation シミュレーション
     * @returns 最も評価値が高いシミュレーションのインデックス
     */
    private topBestIndex(simulation: BeamSearchSimulateImpl[]): number {
        let index = 0;
        for (const i in simulation) {
            if (simulation[i].evaluatedScore > simulation[index].evaluatedScore) {
                index = Number(i);
            }
        }
        return index;
    }


}
import { Character } from "../../../entity/character";
import { SimulateImpl } from "../../simulate/impl/simulateImpl";
import { Tilemap } from "../../../entity/tilemap";
import { TimeDelayManager } from "../../../manager/timeDelayManager";
import { Params } from "../../../params";
import { DirectionType } from "../../../type/directionType";
import { MapService } from "../../map/mapService";
import { OperationService } from "../operationService";
import { Simulate } from "../../simulate/simulate";

/**
 * ビームサーチ法を使ってキャラクターの移動方向を決定するクラス
 */
export class BeamSearchImpl implements OperationService {
    /**
     * 時間遅延管理
     */
    private timeDelayManager: TimeDelayManager;
    /**
     * 探索幅
     */
    private beamDepth: number = 2;
    /**
     * 探索深さ
     */
    private beamWidth: number = Params.END_TURN;

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

        const simulate: Simulate = new SimulateImpl(character, tilemap.mapState);
        return this.getBeamSearchDirection(simulate);
    }

    /**
     * ビームサーチ法を使ってキャラクターの移動方向を決定する
     * @param simulate シミュレーション
     * @returns 移動方向
     */
    private getBeamSearchDirection(simulate: Simulate): DirectionType {
        const nowBeam: Simulate[] = [simulate];
        let bestState: Simulate = simulate;

        for (let t=0; t<this.beamDepth; t++) {
            const nextBeam: Simulate[] = [];

            for (let i=0; i<this.beamWidth; i++) {
                if (nowBeam.length === 0) break;
                const index = this.topBestIndex(nowBeam);
                const nowState: Simulate = nowBeam[index];
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
     * @param simulate シミュレーション
     * @returns 最も評価値が高いシミュレーション
     */
    private getBest(simulate: Simulate[]): Simulate {
        return simulate[this.topBestIndex(simulate)];
    }

    /**
     * シミュレーションの中で最も評価値が高いもののインデックスを返す
     * @param simulate シミュレーション
     * @returns 最も評価値が高いシミュレーションのインデックス
     */
    private topBestIndex(simulate: Simulate[]): number {
        let index = 0;
        for (const i in simulate) {
            if (simulate[i].evaluatedScore > simulate[index].evaluatedScore) {
                index = Number(i);
            }
        }
        return index;
    }


}
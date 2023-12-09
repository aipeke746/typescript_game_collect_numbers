import { Character } from "../../../../entity/character";
import { SimulateDirectionImpl } from "../../../simulate/direction/impl/simulateDirectionImpl";
import { Params } from "../../../../params";
import { DirectionType } from "../../../../type/directionType";
import { MapService } from "../../../map/mapService";
import { OperateDirectionService } from "../operateDirectionService";
import { SimulateDirectionService } from "../../../simulate/direction/simulateDirectionService";
import { MapState } from '../../../../entity/mapState';

/**
 * ビームサーチ法を使ってキャラクターの移動方向を決定するクラス
 */
export class BeamSearchImpl implements OperateDirectionService {
    /**
     * 探索幅
     */
    private beamDepth: number = 2;
    /**
     * 探索深さ
     */
    private beamWidth: number = Params.END_TURN;

    /**
     * キャラクターの移動方向を返す
     * @param character キャラクター
     * @param mapState タイルマップ
     * @returns キャラクターの移動方向
     */
    public getDirection(character: Character, mapState: MapState): DirectionType {
        const simulate: SimulateDirectionService = new SimulateDirectionImpl(character, mapState);
        return this.getBeamSearchDirection(simulate);
    }

    /**
     * ビームサーチ法を使ってキャラクターの移動方向を決定する
     * @param simulate シミュレーション
     * @returns 移動方向
     */
    private getBeamSearchDirection(simulate: SimulateDirectionService): DirectionType {
        const nowBeam: SimulateDirectionService[] = [simulate];
        let bestState: SimulateDirectionService = simulate;

        for (let t=0; t<this.beamDepth; t++) {
            const nextBeam: SimulateDirectionService[] = [];

            for (let i=0; i<this.beamWidth; i++) {
                if (nowBeam.length === 0) break;
                const index = this.topBestIndex(nowBeam);
                const nowState: SimulateDirectionService = nowBeam[index];
                nowBeam.splice(index, 1);
                const legalDirections: DirectionType[] = MapService.legalDirections(nowState.character);

                for (const direction of legalDirections) {
                    const nextState = nowState.clone();
                    MapService.simulateDirection(nextState, direction);
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
    private getBest(simulate: SimulateDirectionService[]): SimulateDirectionService {
        return simulate[this.topBestIndex(simulate)];
    }

    /**
     * シミュレーションの中で最も評価値が高いもののインデックスを返す
     * @param simulate シミュレーション
     * @returns 最も評価値が高いシミュレーションのインデックス
     */
    private topBestIndex(simulate: SimulateDirectionService[]): number {
        let index = 0;
        for (const i in simulate) {
            if (simulate[i].evaluatedScore > simulate[index].evaluatedScore) {
                index = Number(i);
            }
        }
        return index;
    }


}
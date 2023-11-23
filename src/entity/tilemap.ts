import { Params } from '../params';
import { DirectionType } from '../type/directionType';
import { MapState } from './mapState';

/**
 * タイルマップを表すクラス
 */
export class Tilemap {
    /**
     * タイルマップの状態
     */
    public mapState: MapState;
    /**
     * タイルマップ
     */
    private map: Phaser.Tilemaps.Tilemap;
    /**
     * タイルセット
     */
    private tileset: Phaser.Tilemaps.Tileset;
    /**
     * レイヤー
     */
    private layer: Phaser.Tilemaps.TilemapLayer;

    constructor(scene: Phaser.Scene, tilesetName: string) {
        this.mapState = new MapState();
        this.map = scene.make.tilemap({ data: this.mapState.getMain(), tileWidth: MapState.SIZE, tileHeight: MapState.SIZE });
        this.tileset = this.getTileset(tilesetName, this.map);
        this.layer = this.getLayer(this.tileset);
    }

    /**
     * プレイヤーを移動させる
     * @param direction 移動方向
     */
    public advance(direction: DirectionType): void {
        this.mapState.advance(direction);
        this.update();
    }

    /**
     * マップを更新する
     */
    private update() {
        for (let y=0; y<Params.MAP_ROW; y++) {
            for (let x=0; x<Params.MAP_COLUMN; x++) {
                this.layer.putTileAt(this.mapState.getMain()[y][x], x, y);
            }
        }
    }

    /**
     *　タイルセットを取得する
     * @param name タイルセットの名前
     * @param map タイルマップ
     * @returns　タイルセット
     */
    private getTileset(name: string, map: Phaser.Tilemaps.Tilemap) {
        const tileset = map.addTilesetImage(name);
        if (tileset == null)  {
            throw new Error('tileset is null');
        }
        return tileset;
    }

    /**
     * レイヤーを取得する
     * @param tileset タイルセット
     * @returns レイヤー
     */
    private getLayer(tileset: Phaser.Tilemaps.Tileset) {
        const layer = this.map?.createLayer(0, tileset, 0, 0);
        if (layer == null)  {
            throw new Error('layer is null');
        }
        return layer;
    }
}
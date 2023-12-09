import { Params } from '../params';
import { Coord } from '../vo/coord';
import { Character } from './character';
import { MapState } from './mapState';

/**
 * タイルマップを表すクラス
 * 
 * MapStateをTilemapに反映することで画面上に反映される
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

    /**
     * タイルマップを生成する
     * @param scene シーン
     * @param tilesetName タイルセットの名前
     */
    constructor(scene: Phaser.Scene, tilesetName: string) {
        this.mapState = new MapState();
        this.map = scene.make.tilemap({ data: this.mapState.getPoints(), tileWidth: MapState.SIZE, tileHeight: MapState.SIZE });
        this.tileset = this.getTileset(tilesetName, this.map);
        this.layer = this.getLayer(this.tileset);
    }

    /**
     * キャラクターの移動処理とMapStateの更新とTilemapの更新を行う
     * @param character キャラクター
     * @param direction 移動方向
     */
    public advance(character: Character, nextCoord: Coord): void {
        this.mapState.advance(character, nextCoord);
        this.update();
    }

    /**
     * MapStateの内容をTilemapに反映する
     */
    private update() {
        for (let y=0; y<Params.MAP_ROW; y++) {
            for (let x=0; x<Params.MAP_COLUMN; x++) {
                this.layer.putTileAt(this.mapState.getPoints()[y][x], x, y);
            }
        }
    }

    /**
     * タイルマップの座標からワールド（画面）の座標を取得する
     * @params pos ワールドの座標
     * @returns ワールドの座標
     */
    public getTilePos(pos: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        return this.layer.worldToTileXY(pos.x, pos.y);
    }

    /**
     * ワールド（画面）の座標からタイルマップの座標を取得する
     * @params coord タイルマップの座標
     * @returns タイルマップの座標
     */
    public getWorldPos(coord: Coord): Phaser.Math.Vector2 {
        return this.layer.tileToWorldXY(coord.x, coord.y);
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
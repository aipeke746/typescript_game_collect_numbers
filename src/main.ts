import Phaser from 'phaser';

import { GameScene } from './scene/gameScene';
import { TitleScene } from './scene/titleScene';
import { MapState } from './entity/mapState';
import { Params } from './params';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: MapState.SIZE * Params.MAP_COLUMN,
    height: MapState.SIZE * Params.MAP_ROW,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [TitleScene, GameScene],
};

new Phaser.Game(config);

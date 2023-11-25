import Phaser from 'phaser';

import { CollectNumberScene } from './scene/game/collectNumberScene';
import { SelectOperationScene } from './scene/title/selectOperationScene';
import { MapState } from './entity/mapState';
import { Params } from './params';
import { SelectGameScene } from './scene/title/selectGameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: MapState.SIZE * Params.MAP_COLUMN,
    height: MapState.SIZE * Params.MAP_ROW + 100,
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
    scene: [SelectGameScene, SelectOperationScene, CollectNumberScene],
};

new Phaser.Game(config);

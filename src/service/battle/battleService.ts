import { Tilemap } from "../../entity/tilemap";

export class BattleService {
    public static showResult(scene: Phaser.Scene, tilemap: Tilemap): void {
        const score: number = tilemap.mapState.getScore();
        scene.add.text(scene.sys.canvas.width/2, scene.sys.canvas.height-50, `Score: ${score}`)
            .setOrigin(0.5);
    }
}
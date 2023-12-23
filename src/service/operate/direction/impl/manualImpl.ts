import { DirectionType } from "../../../../type/directionType";
import { OperateDirectionService } from "../operateDirectionService";

/**
 * 手動でキャラクターを移動するクラス
 */
export class ManualImpl implements OperateDirectionService {
    /**
     * キー入力
     */
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    /**
     * ポインター
     */
    private pointer: Phaser.Input.Pointer;
    /**
     * スワイプ入力用： ポインターがアップされたことを記録するフラグ
     */
    private isPointerUp: boolean = false;
    /**
     * スワイプ入力用： キャラクターが移動可能かどうかを記録するフラグ
     */
    private canMove: boolean = true;

    /**
     * コンストラクタ
     * @param scene シーン
     */
    constructor(scene: Phaser.Scene) {
        if (scene.input.keyboard == null) throw new Error('keyboard is null');
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.pointer = scene.input.activePointer;

        // 酢ワイプ用のイベントハンドラを登録する
        scene.input.on('pointerup', this.onPointerUp, this);
        scene.input.on('pointerdown', this.onPointerDown, this);
    }

    /**
     * キャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    public getDirection(): DirectionType {
        return this.getManualDirection();
    }

    /**
     * 方向キーとスワイプの入力のいずれかからキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getManualDirection(): DirectionType {
        const keyDirection = this.getKeyDirection();
        const swipeDirection = this.getSwipeDirection();
        return keyDirection !== DirectionType.NONE
            ? keyDirection
            : swipeDirection;
    }

    /**
     * 方向キーの入力からキャラクターの移動方向を返す
     * @returns キャラクターの移動方向
     */
    private getKeyDirection(): DirectionType {
        let direction = DirectionType.NONE;

        if (this.cursors.right.isDown) {
            direction = DirectionType.RIGHT;
        } else if (this.cursors.left.isDown) {
            direction = DirectionType.LEFT;
        } else if (this.cursors.down.isDown) {
            direction = DirectionType.DOWN;
        } else if (this.cursors.up.isDown) {
            direction = DirectionType.UP;
        }

        return direction;
    }

    /**
     * スワイプの入力からキャラクターの移動方向を返す
     * タッチした後に離した場合のみスワイプと判定する
     * @returns キャラクターの移動方向
     */
    private getSwipeDirection(): DirectionType {
        if (this.canMove && this.isPointerUp) {
            return this.onSwipe();
        }
        return DirectionType.NONE;
    }

    /**
     * スワイプの入力から移動方向を返す
     * タッチした位置から離した位置までの距離と時間から移動方向を判定する
     * @returns キャラクターの移動方向
     */
    private onSwipe(): DirectionType {
        const swipeTime = this.pointer.upTime - this.pointer.downTime;
        const swipe = new Phaser.Geom.Point(this.pointer.upX - this.pointer.downX, this.pointer.upY - this.pointer.downY);
        const swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        const swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        const swipeNormalAbsolute = new Phaser.Geom.Point(Math.abs(swipeNormal.x), Math.abs(swipeNormal.y));

        if (swipeTime > 1000 || swipeMagnitude < 20)
            return DirectionType.NONE;

        this.canMove = false;
        if (swipeNormalAbsolute.x > swipeNormalAbsolute.y) {
            return swipeNormal.x > 0
                ? DirectionType.RIGHT
                : DirectionType.LEFT;
        } else {
            return swipeNormal.y > 0
                ? DirectionType.DOWN
                : DirectionType.UP;
        }
    }

    /**
     * ポインターのアップイベントハンドラ
     */
    private onPointerUp(): void {
        this.isPointerUp = true;
    }

    /**
     * ポインターのダウンイベントハンドラ
     */
    private onPointerDown(): void {
        console.log(this.pointer.position);
        this.isPointerUp = false;
        this.canMove = true;
    }
}
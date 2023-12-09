/**
 * キャラクターの生成位置の操作方法タイプ
 */
export enum OperatePositionType {
    /**
     * 手動
     */
    MANUAL,
    /**
     * ランダム
     */
    RANDOM,
    /**
     * 山登り法
     */
    HILL_CLIMB,
    /**
     * 焼きなまし法
     */
    ANNEALING,
}
/**
 * 操作方向タイプ
 */
export enum OperateDirectionType {

    // 一人プレイ・対戦プレイ用

    /**
     * 手動
     */
    MANUAL,
    /**
     * ランダム
     */
    RANDOM,
    /**
     * 貪欲法
     */
    GREEDY,
    /**
     * ビームサーチ
     */
    BEAM_SEARCH,
    /**
     * MINIMAX法
     */
    MINIMAX,

    // 対戦プレイ用

    /**
     * αβ法
     */
    ALPHA_BETA,
    /**
     * モンテカルロ法
     */
    MONTE_CARLO,
}
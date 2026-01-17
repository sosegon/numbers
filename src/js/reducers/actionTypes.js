/**
 * Type of actions to be dispatched.
 * @module actionTypes
 */
module.exports = {
    /**
     * The {@link Token} has been moved. This action is dispatched
     * when a selectable {@link Cell} in the {@link Board}
     * has been chosen.
     */
    TOKEN_MOVED: 'game.TOKEN_MOVED',
    /**
     * The scores of {@link Player|Players} has been updated.
     * This action is dispatched when the value of a selected
     * {@link Cell} has been taken after the token was moved
     * to the position of a {@link Cell}.
     */
    SCORES_UPDATED: 'game.SCORES_UPDATED',
    /**
     * The {@link Game} has been reset.
     * This action is dispatched when a {@link Player}
     * resets the {@link Game}.
     */
    GAME_RESET: 'game.GAME_RESET'
};
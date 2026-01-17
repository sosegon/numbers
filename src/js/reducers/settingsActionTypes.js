/**
 * Type of settings actions to be dispatched.
 * @module settingsActionTypes
 */
module.exports = {
    /**
     * The sound setting has been toggled.
     * This action is dispatched when the user enables or disables sound.
     */
    SOUND_TOGGLE: 'settings.SOUND_TOGGLE',

    /**
     * The sound has been locked.
     * This action is dispatched when the sequence of moves has been completed.
     */
    LOCK_SOUND: 'settings.LOCK_SOUND',

    /**
     * The sound has been unlocked.
     * This action is dispatched when the user makes a move.
     */
    UNLOCK_SOUND: 'settings.UNLOCK_SOUND',

    /**
     * The controls have been locked.
     * This action is dispatched when the user start moves. This
     * prevents changing settings during moves.
     */
    LOCK_CONTROLS: 'settings.LOCK_CONTROLS',

    /**
     * The controls have been unlocked.
     * This action is dispatched when moves have ended. This
     * allows changing settings while no moves are in progress.
     */
    UNLOCK_CONTROLS: 'settings.UNLOCK_CONTROLS',
};

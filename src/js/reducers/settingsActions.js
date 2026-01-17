const types = require('@reducers/settingsActionTypes.js');

/**
 * Settings actions to be dispatched.
 * @module settingsActions
 */
module.exports = {
    /**
     * Dispatch {@link settingsActionTypes.SOUND_TOGGLE}.
     */
    toggleSound() {
        const type = types.SOUND_TOGGLE;
        return { type };
    },

    /**
     * Dispatch {@link settingsActionTypes.LOCK_SOUND}.
     */
    lockSound() {
        const type = types.LOCK_SOUND;
        return { type };
    },

    /**
     * Dispatch {@link settingsActionTypes.UNLOCK_SOUND}.
     */
    unlockSound() {
        const type = types.UNLOCK_SOUND;
        return { type };
    },

    /**
     * Dispatch {@link settingsActionTypes.LOCK_CONTROLS}.
     */
    lockControls() {
        const type = types.LOCK_CONTROLS;
        return { type };
    },

    /**
     * Dispatch {@link settingsActionTypes.UNLOCK_CONTROLS}.
     */
    unlockControls() {
        const type = types.UNLOCK_CONTROLS;
        return { type };
    },
};

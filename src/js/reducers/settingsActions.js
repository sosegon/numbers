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
};

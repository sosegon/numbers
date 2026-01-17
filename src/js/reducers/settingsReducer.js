const {
    SOUND_TOGGLE,
    LOCK_SOUND,
    UNLOCK_SOUND,
    LOCK_CONTROLS,
    UNLOCK_CONTROLS,
} = require('./settingsActionTypes.js');

const initialState = {
    soundEnabled: true,
    soundLocked: true,
    controlsLocked: false,
};

/**
 * Update settings state.
 * on the received {@link settingsActions}
 * @param {*} state - Settings state of the application.
 * @param {*} action - Action to update the state.
 * @returns {Object} New settings state after applying the action.
 */
const reduce = (state = initialState, action) => {
    switch (action.type) {
        case SOUND_TOGGLE:
            return {
                ...state,
                soundEnabled: !state.soundEnabled,
            };

        case LOCK_SOUND:
            return {
                ...state,
                soundLocked: true,
            };

        case UNLOCK_SOUND:
            return {
                ...state,
                soundLocked: false,
            };

        case LOCK_CONTROLS:
            return {
                ...state,
                controlsLocked: true,
            };

        case UNLOCK_CONTROLS:
            return {
                ...state,
                controlsLocked: false,
            };

        default:
            return state;
    }
};

module.exports = {
    initialState,
    reduce,
};

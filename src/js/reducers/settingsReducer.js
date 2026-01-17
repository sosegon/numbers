const { SOUND_TOGGLE } = require('./settingsActionTypes.js');

const initialState = {
    soundEnabled: true,
};

const reduce = (state = initialState, action) => {
    switch (action.type) {
        case SOUND_TOGGLE:
            return {
                ...state,
                soundEnabled: !state.soundEnabled,
            };

        default:
            return state;
    }
};

module.exports = {
    initialState,
    reduce,
};

const deepFreeze = require('deep-freeze');
const { reduce } = require('@reducers/settingsReducer');
const { toggleSound } = require('@reducers/settingsActions');
const redux = require('redux');

describe('settings reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            soundEnabled: true,
        };
    });

    it('should toggle sound setting', () => {
        const store = redux.createStore(reduce, initialState);
        const action = toggleSound();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            soundEnabled: false,
        };

        store.dispatch(action);
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
    });
});

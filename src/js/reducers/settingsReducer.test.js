const deepFreeze = require('deep-freeze');
const { reduce } = require('@reducers/settingsReducer');
const {
    toggleSound,
    lockSound,
    unlockSound,
    lockControls,
    unlockControls,
} = require('@reducers/settingsActions');
const redux = require('redux');

describe('settings reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            soundEnabled: true,
            soundLocked: true,
            controlsLocked: false,
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

    it('should lock sound setting', () => {
        const store = redux.createStore(reduce, {
            ...initialState,
            soundLocked: false,
        });
        const action = lockSound();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            soundLocked: true,
        };

        store.dispatch(action);
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
    });

    it('should unlock sound setting', () => {
        const store = redux.createStore(reduce, {
            ...initialState,
            soundLocked: true,
        });
        const action = unlockSound();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            soundLocked: false,
        };

        store.dispatch(action);
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
    });

    it('should lock controls setting', () => {
        const store = redux.createStore(reduce, {
            ...initialState,
            controlsLocked: false,
        });
        const action = lockControls();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            controlsLocked: true,
        };

        store.dispatch(action);
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
    });

    it('should unlock controls setting', () => {
        const store = redux.createStore(reduce, {
            ...initialState,
            controlsLocked: true,
        });
        const action = unlockControls();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            controlsLocked: false,
        };

        store.dispatch(action);
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
    });
});

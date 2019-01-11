// from https://github.com/gabrielecirulli/2048/blob/master/js/local_storage_manager.js

window.fakeStorage = {
    _data: {},

    setItem: function(id, val) {
        return this._data[id] = String(val);
    },

    getItem: function(id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },

    removeItem: function(id) {
        return delete this._data[id];
    },

    clear: function() {
        return this._data = {};
    }
};

/**
 * Class to save and retrieve the state of the application in
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage|local storage}.
 * It is based on {@link https://github.com/gabrielecirulli/2048/blob/master/js/local_storage_manager.js|this code}.
 */
class LocalStorageManager {
    constructor() {
        this.gameStateKey = "gameNumbersState";
        const supported = this.localStorageSupported();
        this.storage = supported ? window.localStorage : window.fakeStorage;
    }

    localStorageSupported = () => {
        const testKey = "test";
        try {
            const storage = window.localStorage;
            storage.setItem(testKey, "1");
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    };

    /**
     * Get the state from local storage.
     */
    getGameState() {
        const stateJSON = this.storage.getItem(this.gameStateKey);
        return stateJSON ? JSON.parse(stateJSON) : null;
    }

    /**
     * Save the state in local storage.
     *
     * @param {object} gameState - The serialized {@link Game}.
     */
    setGameState(gameState) {
        this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
    };

    /**
     * Remove the item to store the state of the application
     * from local storage.
     */
    clearGameState() {
        this.storage.removeItem(this.gameStateKey);
    };
}

module.exports = {
    LocalStorageManager
};
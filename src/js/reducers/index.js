import { combineReducers } from 'redux';
import settingsReducer from '@reducers/settingsReducer';
import gameReducer from '@reducers/gameReducer';

export const rootReducer = combineReducers({
    settings: settingsReducer.reduce,
    game: gameReducer.reduce,
});

export const gameInitialState = gameReducer.initialState;
export const settingsInitialState = settingsReducer.initialState;

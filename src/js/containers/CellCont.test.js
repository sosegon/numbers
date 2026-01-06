const React = require('react');
const { mount } = require('enzyme');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;
const configureStore = require('redux-mock-store').default;
const { CellComp } = require('@components/CellComp');
const { CellCont } = require('@containers/CellCont');
const { moveToken } = require('@root/actions');
const { GAME_STATUSES } = require('@model/flags');
const {
    initialState,
    verticalPosition,
    horizontalPosition,
    otherPosition,
    verticalPositionHid,
    horizontalPositionHid,
    otherPositionHid,
} = require('@test/utilsTests.js');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CellCont', () => {
    let wrapper, store;
    let containerVertical, containerHorizontal, containerOther;
    let componentVertical, componentHorizontal, componentOther;
    let containerVerticalHid, containerHorizontalHid, containerOtherHid;
    let componentVerticalHid, componentHorizontalHid, componentOtherHid;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <CellCont
                    rowIndex={verticalPosition.rowIndex}
                    colIndex={verticalPosition.colIndex}
                    value={verticalPosition.value}
                />
                <CellCont
                    rowIndex={horizontalPosition.rowIndex}
                    colIndex={horizontalPosition.colIndex}
                    value={horizontalPosition.value}
                />
                <CellCont
                    rowIndex={otherPosition.rowIndex}
                    colIndex={otherPosition.colIndex}
                    value={otherPosition.value}
                />
                <CellCont
                    rowIndex={verticalPositionHid.rowIndex}
                    colIndex={verticalPositionHid.colIndex}
                    value={verticalPositionHid.value}
                />
                <CellCont
                    rowIndex={horizontalPositionHid.rowIndex}
                    colIndex={horizontalPositionHid.colIndex}
                    value={horizontalPositionHid.value}
                />
                <CellCont
                    rowIndex={otherPositionHid.rowIndex}
                    colIndex={otherPositionHid.colIndex}
                    value={otherPositionHid.value}
                />
            </Provider>
        );

        containerVertical = wrapper.find(CellCont).at(0);
        containerHorizontal = wrapper.find(CellCont).at(1);
        containerOther = wrapper.find(CellCont).at(2);
        containerVerticalHid = wrapper.find(CellCont).at(3);
        containerHorizontalHid = wrapper.find(CellCont).at(4);
        containerOtherHid = wrapper.find(CellCont).at(5);

        componentVertical = containerVertical.find(CellComp).at(0);
        componentHorizontal = containerHorizontal.find(CellComp).at(0);
        componentOther = containerOther.find(CellComp).at(0);
        componentVerticalHid = containerVerticalHid.find(CellComp).at(0);
        componentHorizontalHid = containerHorizontalHid.find(CellComp).at(0);
        componentOtherHid = containerOtherHid.find(CellComp).at(0);
    });

    it('should render container and component', () => {
        expect(containerVertical.length).toBeTruthy();
        expect(componentVertical.length).toBeTruthy();

        expect(containerHorizontal.length).toBeTruthy();
        expect(componentHorizontal.length).toBeTruthy();

        expect(containerOther.length).toBeTruthy();
        expect(componentOther.length).toBeTruthy();

        expect(containerVerticalHid.length).toBeTruthy();
        expect(componentVerticalHid.length).toBeTruthy();

        expect(containerHorizontalHid.length).toBeTruthy();
        expect(componentHorizontalHid.length).toBeTruthy();

        expect(containerOtherHid.length).toBeTruthy();
        expect(componentOtherHid.length).toBeTruthy();
    });

    it('should map to container props', () => {
        const expectedPropKeys = ['rowIndex', 'colIndex', 'value'];
        expect(Object.keys(containerVertical.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(containerHorizontal.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(containerOther.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );

        expect(Object.keys(containerVerticalHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(containerHorizontalHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(containerOtherHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
    });

    it('should map to component props', () => {
        const expectedPropKeys = [
            'rowIndex',
            'colIndex',
            'style',
            'isSelectable',
            'gameStatus',
            'value',
            'onClick',
        ];
        expect(Object.keys(componentVertical.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(componentHorizontal.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(componentOther.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );

        expect(Object.keys(componentVerticalHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(componentHorizontalHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
        expect(Object.keys(componentOtherHid.props())).toEqual(
            expect.arrayContaining(expectedPropKeys)
        );
    });

    it('should have props with correct values', () => {
        expect(componentVertical.props().rowIndex).toEqual(verticalPosition.rowIndex);
        expect(componentVertical.props().colIndex).toEqual(verticalPosition.colIndex);
        expect(componentVertical.props().style).toEqual('cell selectable cell-value-7');
        expect(componentVertical.props().isSelectable).toEqual(true);
        expect(componentVertical.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentVertical.props().value).toEqual(verticalPosition.value);

        expect(componentHorizontal.props().rowIndex).toEqual(horizontalPosition.rowIndex);
        expect(componentHorizontal.props().colIndex).toEqual(horizontalPosition.colIndex);
        expect(componentHorizontal.props().style).toEqual('cell selectable cell-value-5');
        expect(componentHorizontal.props().isSelectable).toEqual(true);
        expect(componentHorizontal.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentHorizontal.props().value).toEqual(horizontalPosition.value);

        expect(componentOther.props().rowIndex).toEqual(otherPosition.rowIndex);
        expect(componentOther.props().colIndex).toEqual(otherPosition.colIndex);
        expect(componentOther.props().style).toEqual('cell cell-value-6');
        expect(componentOther.props().isSelectable).toEqual(false);
        expect(componentOther.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentOther.props().value).toEqual(otherPosition.value);

        expect(componentVerticalHid.props().rowIndex).toEqual(verticalPositionHid.rowIndex);
        expect(componentVerticalHid.props().colIndex).toEqual(verticalPositionHid.colIndex);
        expect(componentVerticalHid.props().style).toEqual('cell hid');
        expect(componentVerticalHid.props().isSelectable).toEqual(false);
        expect(componentVerticalHid.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentVerticalHid.props().value).toEqual(verticalPositionHid.value);

        expect(componentHorizontalHid.props().rowIndex).toEqual(horizontalPositionHid.rowIndex);
        expect(componentHorizontalHid.props().colIndex).toEqual(horizontalPositionHid.colIndex);
        expect(componentHorizontalHid.props().style).toEqual('cell hid');
        expect(componentHorizontalHid.props().isSelectable).toEqual(false);
        expect(componentHorizontalHid.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentHorizontalHid.props().value).toEqual(horizontalPositionHid.value);

        expect(componentOtherHid.props().rowIndex).toEqual(otherPositionHid.rowIndex);
        expect(componentOtherHid.props().colIndex).toEqual(otherPositionHid.colIndex);
        expect(componentOtherHid.props().style).toEqual('cell hid');
        expect(componentOtherHid.props().isSelectable).toEqual(false);
        expect(componentOtherHid.props().gameStatus).toEqual(GAME_STATUSES.RESTING);
        expect(componentOtherHid.props().value).toEqual(otherPositionHid.value);
    });

    it('should dispatch moveToken action when clicked', async () => {
        expect(store.getActions()).toEqual([]);

        await componentVertical.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([moveToken(0, 3)]);
        store.clearActions();

        await componentHorizontal.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([moveToken(3, 0)]);
        store.clearActions();

        await componentOther.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        await componentVerticalHid.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        await componentHorizontalHid.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([]);
        store.clearActions();

        await componentOtherHid.find('span').at(0).simulate('click');
        expect(store.getActions()).toEqual([]);
        store.clearActions();
    });
});

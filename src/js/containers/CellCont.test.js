const React = require('react');
const { shallow, mount } = require('enzyme');
const { Provider } = require('react-redux');
const { CellComp } = require('../components/CellComp.js');
const { CellCont } = require('./CellCont.js')
const { storeFake, initialState } = require('../utilsTests.js');

describe("CellCont", () => {
    let wrapper;
    let component;
    let container;

    beforeEach(() => {
        jest.resetAllMocks();

        const store = storeFake(initialState);

        wrapper = mount(
            <Provider store={store}>
                <CellCont />
            </Provider>
        );

        container = wrapper.find(CellCont);
        component = container.find(CellComp);
    });

    it("should render container and component", () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it("should map to props", () => {
        const expectedPropKeys = [
            'rowIndex',
            'colIndex',
            'style',
            'isSelectable',
            'gameStatus',
            'value',
            'onClick'
        ];

        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });
});
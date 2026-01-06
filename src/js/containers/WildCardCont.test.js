const React = require('react');
const { Provider } = require('react-redux');
const { mount } = require('enzyme');
const configureStore = require('redux-mock-store').default;
const { WildCardCont } = require('@containers/WildCardCont');
const { WildCardComp } = require('@components/WildCardComp');

const { initialState } = require('@test/utilsTests');

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('WildCardCont', () => {
    let wrapper, store, container, component;

    beforeEach(() => {
        jest.resetAllMocks();

        store = mockStore(initialState);

        wrapper = mount(
            <Provider store={store}>
                <WildCardCont />
            </Provider>
        );

        container = wrapper.find(WildCardCont).at(0);
        component = container.find(WildCardComp).at(0);
    });

    it('should render container and component', () => {
        expect(container.length).toBeTruthy();
        expect(component.length).toBeTruthy();
    });

    it('should map to component props', () => {
        const expectedPropKeys = ['style'];
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
    });

    it('should have props with correct values', () => {
        const style = 'wild-card position_3_3 row_from_3_to_3 column_from_3_to_3';
        expect(component.props().style).toEqual(style);
    });
});

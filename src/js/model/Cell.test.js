const { Cell } = require('./Cell.js');

const setup = () => {
    const cell = new Cell(9, 1, 2);
    return { cell };
}

describe('Cell', () => {
    it('should start a new object properly', () => {
        const { cell } = setup();
        expect(cell.value).toEqual(9);
        expect(cell.rowIndex).toEqual(1);
        expect(cell.colIndex).toEqual(2);
    });

    it('should update value properly', () => {
        const { cell } = setup();
        cell.update(8);
        expect(cell.value).toEqual(8);
    });

    it('should check selectability', () => {
        const { cell } = setup();
        expect(cell.isSelectable()).toEqual(true);
        cell.update(-1);
        expect(cell.isSelectable()).toEqual(false);
    });

    it("should update from object (ideal)", () => {
        const { cell } = setup();
        const object = {
            rowIndex: 10,
            colIndex: 20,
            value: 30
        };
        cell.updateFromObject(object);
        expect(cell.rowIndex).toEqual(10);
        expect(cell.colIndex).toEqual(20);
        expect(cell.value).toEqual(30);
    });

    it("should update from object (empty)", () => {
        const { cell } = setup();
        const object = {};
        cell.updateFromObject(object);
        expect(cell.rowIndex).toEqual(1);
        expect(cell.colIndex).toEqual(2);
        expect(cell.value).toEqual(9);
    });

    it("should update from object (undefined)", () => {
        const { cell } = setup();
        let object;
        const update = () => { cell.updateFromObject(object); };
        expect(update).toThrowError(/Undefined/);
    });

    it("should update from object (invalid keys)", () => {
        const { cell } = setup();
        const object = {
            rowINdex: 10,
            colINdex: 20,
            vAlue: 30
        };
        cell.updateFromObject(object);
        expect(cell.rowIndex).toEqual(1);
        expect(cell.colIndex).toEqual(2);
        expect(cell.value).toEqual(9);
    });

    it("should update from object (invalid types)", () => {
        const { cell } = setup();
        const object = {
            rowIndex: "10",
            colIndex: true,
            value: []
        };
        cell.updateFromObject(object);
        expect(cell.rowIndex).toEqual(1);
        expect(cell.colIndex).toEqual(2);
        expect(cell.value).toEqual(9);
    });
});
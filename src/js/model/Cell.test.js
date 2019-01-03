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
    })
})
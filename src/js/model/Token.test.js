const { Token } = require('./Token.js');

const setup = () => {
    const token = new Token(9);
    return { token };
};

describe("Token", () => {
    it('should create token correctly', () => {
        const { token } = setup();
        expect(token.rowIndex).toBeGreaterThanOrEqual(0);
        expect(token.colIndex).toBeGreaterThanOrEqual(0);
        expect(token.oldRowIndex).toBeGreaterThanOrEqual(0);
        expect(token.oldColIndex).toBeGreaterThanOrEqual(0);
    });

    it('should set token correctly', () => {
        const { token } = setup();
        token.set(1, 2);

        expect(token.rowIndex).toEqual(1);
        expect(token.colIndex).toEqual(2);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);
    });

    it('should move token correctly', () => {
        const { token } = setup();
        token.set(1, 2);
        token.moveTo(3, 4);

        expect(token.rowIndex).toEqual(3);
        expect(token.colIndex).toEqual(4);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);
    });

    it('should serialize', () => {
        const { token } = setup();
        token.set(1, 2);
        expect(token.serialize()).toEqual({
            rowIndex: 1,
            colIndex: 2,
            oldRowIndex: 1,
            oldColIndex: 2
        });
    });

    it('should convert to string', () => {
        const { token } = setup();
        token.set(1, 2);
        expect(token.toString()).toEqual(
            "{\"rowIndex\":1," +
            "\"colIndex\":2," +
            "\"oldRowIndex\":1," +
            "\"oldColIndex\":2}"
        );
    });


});
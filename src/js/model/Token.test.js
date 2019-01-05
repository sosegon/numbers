const { Token } = require('./Token.js');

const setup = () => {
    const token = new Token(9);
    return { token };
};

describe("Token", () => {
    it('should create token', () => {
        const { token } = setup();
        expect(token.rowIndex).toBeGreaterThanOrEqual(0);
        expect(token.colIndex).toBeGreaterThanOrEqual(0);
        expect(token.oldRowIndex).toBeGreaterThanOrEqual(0);
        expect(token.oldColIndex).toBeGreaterThanOrEqual(0);
    });

    it('should set token', () => {
        const { token } = setup();
        token.set(1, 2);

        expect(token.rowIndex).toEqual(1);
        expect(token.colIndex).toEqual(2);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);

        const _set = () => {
            token.set(-1, 0);
        };
        expect(_set).toThrowError(/Invalid/);
    });

    it('should move token', () => {
        const { token } = setup();
        token.set(1, 2);
        token.moveTo(3, 4);

        expect(token.rowIndex).toEqual(3);
        expect(token.colIndex).toEqual(4);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);

        const moveTo = () => {
            token.moveTo(-1, 0);
        };
        expect(moveTo).toThrowError(/Invalid/);
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

    it("should update from object (ideal)", () => {
        const { token } = setup();
        token.set(1, 2);
        const object = {
            rowIndex: 10,
            colIndex: 20,
            oldRowIndex: 100,
            oldColIndex: 200
        };
        token.updateFromObject(object);
        expect(token.rowIndex).toEqual(10);
        expect(token.colIndex).toEqual(20);
        expect(token.oldRowIndex).toEqual(100);
        expect(token.oldColIndex).toEqual(200);
    });

    it("should update from object (empty)", () => {
        const { token } = setup();
        token.set(1, 2);
        const object = {};
        token.updateFromObject(object);
        expect(token.rowIndex).toEqual(1);
        expect(token.colIndex).toEqual(2);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);
    });

    it("should update from object (undefined)", () => {
        const { token } = setup();
        token.set(1, 2);
        let object;
        const update = () => { token.updateFromObject(object); };
        expect(update).toThrowError(/Undefined/);
    });

    it("should update from object (invalid keys)", () => {
        const { token } = setup();
        token.set(1, 2);
        const object = {
            rowINdex: 10,
            colINdex: 20,
            oldRowINdex: 100,
            oldColINdex: 200
        };
        token.updateFromObject(object);
        expect(token.rowIndex).toEqual(1);
        expect(token.colIndex).toEqual(2);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);
    });

    it("should update from object (invalid types)", () => {
        const { token } = setup();
        token.set(1, 2);
        const object = {
            rowIndex: "10",
            colIndex: true,
            oldRowIndex: [],
            oldColIndex: {}
        };
        token.updateFromObject(object);
        expect(token.rowIndex).toEqual(1);
        expect(token.colIndex).toEqual(2);
        expect(token.oldRowIndex).toEqual(1);
        expect(token.oldColIndex).toEqual(2);
    });
});
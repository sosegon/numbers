const {
    rotateClockwise,
    rotateCounterClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getGainsMatrix,
    getBestGain,
    randomInteger,
    updateObjectFromJsonString,
    updateObjectFromLiteral
} = require('./utils.js');

const setup = () => {
    const matrix = [
        [2, 3, 4, 7, 8],
        [1, 0, 3, 5, 6],
        [2, 7, 6, 4, 1],
        [5, 2, 9, 0, 2],
        [8, 7, 9, 2, 1]
    ];
    const tokenColIndex = 3;
    const tokenRowIndex = 3;

    return { matrix, tokenColIndex, tokenRowIndex };
}
describe("Utils", () => {
    it("should rotate matrix clockwise", () => {
        const { matrix } = setup();
        const newMatrix = rotateClockwise(matrix);
        expect(newMatrix).toEqual([
            [8, 5, 2, 1, 2],
            [7, 2, 7, 0, 3],
            [9, 9, 6, 3, 4],
            [2, 0, 4, 5, 7],
            [1, 2, 1, 6, 8]
        ]);
    });

    it("should rotate matrix counter-clockwise", () => {
        const { matrix } = setup();
        const newMatrix = rotateCounterClockwise(matrix);
        expect(newMatrix).toEqual([
            [8, 6, 1, 2, 1],
            [7, 5, 4, 0, 2],
            [4, 3, 6, 9, 9],
            [3, 0, 7, 2, 7],
            [2, 1, 2, 5, 8]
        ]);
    });

    it("should rotate indices clockwise", () => {
        // 0x0 matrix
        const emptyMatrix = () => { rotateIndicesClockwise(2, 3, 0); };
        expect(emptyMatrix).toThrowError(/greater than 0/);

        // rowIndex > size
        const rowIndexGreaterThanSize = () => { rotateIndicesClockwise(4, 3, 3); };
        expect(rowIndexGreaterThanSize).toThrowError(/less than size/);

        // colIndex > size
        const colIndexGreaterThanSize = () => { rotateIndicesClockwise(3, 4, 3); };
        expect(colIndexGreaterThanSize).toThrowError(/less than size/);

        // 1x1 matrix
        expect(rotateIndicesClockwise(0, 0, 1)).toEqual([0, 0]);

        // 5x5 matrix | center
        expect(rotateIndicesClockwise(2, 2, 5)).toEqual([2, 2]);

        // 5x5 matrix | top-left corner
        expect(rotateIndicesClockwise(0, 0, 5)).toEqual([0, 4]);

        // 5x5 matrix | top-right corner
        expect(rotateIndicesClockwise(0, 4, 5)).toEqual([4, 4]);

        // 5x5 matrix | bottom-left corner
        expect(rotateIndicesClockwise(4, 0, 5)).toEqual([0, 0]);

        // 5x5 matrix | bottom-right corner
        expect(rotateIndicesClockwise(4, 4, 5)).toEqual([4, 0]);
    });

    it("should rotate indices counter-clockwise", () => {
        // 0x0 matrix
        const emptyMatrix = () => { rotateIndicesCounterClockwise(2, 3, 0); };
        expect(emptyMatrix).toThrowError(/greater than 0/);

        // rowIndex > size
        const rowIndexGreaterThanSize = () => { rotateIndicesCounterClockwise(4, 3, 3); };
        expect(rowIndexGreaterThanSize).toThrowError(/less than size/);

        // colIndex > size
        const colIndexGreaterThanSize = () => { rotateIndicesCounterClockwise(3, 4, 3); };
        expect(colIndexGreaterThanSize).toThrowError(/less than size/);

        // 1x1 matrix
        expect(rotateIndicesCounterClockwise(0, 0, 1)).toEqual([0, 0]);

        // 5x5 matrix | center
        expect(rotateIndicesCounterClockwise(2, 2, 5)).toEqual([2, 2]);

        // 5x5 matrix | top-left corner
        expect(rotateIndicesCounterClockwise(0, 4, 5)).toEqual([0, 0]);

        // 5x5 matrix | top-right corner
        expect(rotateIndicesCounterClockwise(4, 4, 5)).toEqual([0, 4]);

        // 5x5 matrix | bottom-left corner
        expect(rotateIndicesCounterClockwise(0, 0, 5)).toEqual([4, 0]);

        // 5x5 matrix | bottom-right corner
        expect(rotateIndicesCounterClockwise(4, 0, 5)).toEqual([4, 4]);
    });

    it("should get the gains matrix", () => {
        const { matrix, tokenColIndex } = setup();
        const gains = getGainsMatrix(tokenColIndex, matrix);
        expect(gains).toEqual([
            [5, 4, 3, 0, -1],
            [4, 5, 2, 0, -1],
            [2, -3, -2, 0, 3],
            [0, 0, 0, 0, 0],
            [-6, -5, -7, 0, 1],
        ]);
    });

    it("should get the best gain", () => {
        const { matrix, tokenColIndex, tokenRowIndex } = setup();
        const gains = getGainsMatrix(tokenColIndex, matrix);
        const rowIndex = getBestGain(tokenRowIndex, tokenColIndex, gains, matrix);

        expect(rowIndex).toEqual(0);
    });

    it("shoudl create random integer", () => {
        expect(randomInteger(0, 5)).toBeLessThanOrEqual(5);
        expect(randomInteger(0, 5)).toBeGreaterThanOrEqual(0);
    });

    it("should update object from json string", () => {
        const object = {
            a: 1,
            b: "2",
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: "3"
            }
        };

        const jsonString = "{" +
            "\"a\":\"1\"," +
            "\"b\":2," +
            "\"c\":{\"a\":3}" +
            "}";

        const expected = {
            a: "1",
            b: 2,
            c: {
                a: 3
            },
            d: [1, 2],
            e: {
                a: 2,
                b: "3"
            }
        };

        updateObjectFromJsonString(object, jsonString);
        expect(object).toEqual(expected);
    });

    it("should update object from literal", () => {
        const object = {
            a: 1,
            b: "2",
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: "3"
            }
        };

        const literal = {
            a: "1",
            b: 2,
            c: {
                a: 3
            }
        };

        const expected = {
            a: "1",
            b: 2,
            c: {
                a: 3
            },
            d: [1, 2],
            e: {
                a: 2,
                b: "3"
            }
        };

        updateObjectFromLiteral(object, literal);
        expect(object).toEqual(expected);
    });
});
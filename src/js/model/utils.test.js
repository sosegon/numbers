const {
    rotateClockwise,
    rotateCounterClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getRowsReadinessToEndGame,
    getGainsMatrix,
    getRowsIndicesByOrderedGain,
    getAvailableCellsPerColumn,
    randomInteger,
    updateObjectFromJsonString,
    updateObjectFromLiteral,
    vectorToMatrix,
} = require('@model/utils');

const setup = () => {
    const matrix = [
        [2, 3, 4, 7, 8],
        [1, 0, 3, 5, 6],
        [2, 7, 6, 4, 1],
        [5, 2, 9, 0, 2],
        [8, 7, 9, 2, 1],
    ];
    const tokenColIndex = 3;
    const tokenRowIndex = 3;

    return { matrix, tokenColIndex, tokenRowIndex };
};
describe('Utils', () => {
    it('should rotate matrix clockwise', () => {
        const { matrix } = setup();
        const newMatrix = rotateClockwise(matrix);
        expect(newMatrix).toEqual([
            [8, 5, 2, 1, 2],
            [7, 2, 7, 0, 3],
            [9, 9, 6, 3, 4],
            [2, 0, 4, 5, 7],
            [1, 2, 1, 6, 8],
        ]);
    });

    it('should rotate matrix counter-clockwise', () => {
        const { matrix } = setup();
        const newMatrix = rotateCounterClockwise(matrix);
        expect(newMatrix).toEqual([
            [8, 6, 1, 2, 1],
            [7, 5, 4, 0, 2],
            [4, 3, 6, 9, 9],
            [3, 0, 7, 2, 7],
            [2, 1, 2, 5, 8],
        ]);
    });

    it('should rotate indices clockwise', () => {
        // 0x0 matrix
        const emptyMatrix = () => {
            rotateIndicesClockwise(2, 3, 0);
        };
        expect(emptyMatrix).toThrowError(/greater than 0/);

        // rowIndex > size
        const rowIndexGreaterThanSize = () => {
            rotateIndicesClockwise(4, 3, 3);
        };
        expect(rowIndexGreaterThanSize).toThrowError(/less than size/);

        // colIndex > size
        const colIndexGreaterThanSize = () => {
            rotateIndicesClockwise(3, 4, 3);
        };
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

    it('should rotate indices counter-clockwise', () => {
        // 0x0 matrix
        const emptyMatrix = () => {
            rotateIndicesCounterClockwise(2, 3, 0);
        };
        expect(emptyMatrix).toThrowError(/greater than 0/);

        // rowIndex > size
        const rowIndexGreaterThanSize = () => {
            rotateIndicesCounterClockwise(4, 3, 3);
        };
        expect(rowIndexGreaterThanSize).toThrowError(/less than size/);

        // colIndex > size
        const colIndexGreaterThanSize = () => {
            rotateIndicesCounterClockwise(3, 4, 3);
        };
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

    it('should get the rows readiness to end game', () => {
        const boardMatrix = [
            [2, 3, 4, 7, 8],
            [-1, -1, -1, -1, -1],
            [2, 7, 6, -1, 1],
            [5, 2, 1, 0, 2],
            [-1, -1, -1, 2, -1],
        ];
        const tokenColIndex = 3;

        const rowsReadiness = getRowsReadinessToEndGame(boardMatrix, tokenColIndex);
        expect(rowsReadiness).toEqual([
            [false, true],
            [true, false],
            [false, false],
            [false, false], // token row
            [true, true],
        ]);
    });

    it('should get the rows readiness to end game, token at top-left', () => {
        const boardMatrix = [
            [0, 3, 4, 7, 8],
            [-1, -1, -1, -1, -1],
            [2, 7, 6, -1, 1],
            [5, 2, 1, 1, 2],
            [2, -1, -1, -1, -1],
        ];
        const tokenColIndex = 0;

        const rowsReadiness = getRowsReadinessToEndGame(boardMatrix, tokenColIndex);
        expect(rowsReadiness).toEqual([
            [false, false], // token row
            [true, false],
            [false, true],
            [false, true],
            [true, true],
        ]);
    });

    it('should get the rows readiness to end game, token at top-right', () => {
        const boardMatrix = [
            [2, 3, 4, 7, 0],
            [-1, -1, -1, -1, -1],
            [2, 7, 6, -1, 1],
            [5, 2, 1, 1, 2],
            [-1, -1, -1, -1, 2],
        ];
        const tokenColIndex = 4;

        const rowsReadiness = getRowsReadinessToEndGame(boardMatrix, tokenColIndex);
        expect(rowsReadiness).toEqual([
            [false, false], // token row
            [true, false],
            [false, true],
            [false, true],
            [true, true],
        ]);
    });

    it('should get the rows readiness to end game, token at bottom-right', () => {
        const boardMatrix = [
            [2, 3, 4, 7, 8],
            [-1, -1, -1, -1, -1],
            [2, 7, 6, -1, 1],
            [5, 2, 1, 1, 2],
            [-1, -1, -1, -1, 0],
        ];
        const tokenColIndex = 4;

        const rowsReadiness = getRowsReadinessToEndGame(boardMatrix, tokenColIndex);
        expect(rowsReadiness).toEqual([
            [false, true],
            [true, false],
            [false, true],
            [false, true],
            [true, false], // token row
        ]);
    });

    it('should get the rows readiness to end game, token at bottom-left', () => {
        const boardMatrix = [
            [2, 3, 4, 7, 8],
            [-1, -1, -1, -1, -1],
            [2, 7, 6, -1, 1],
            [5, 2, 1, 1, 2],
            [0, -1, -1, -1, -1],
        ];
        const tokenColIndex = 0;

        const rowsReadiness = getRowsReadinessToEndGame(boardMatrix, tokenColIndex);
        expect(rowsReadiness).toEqual([
            [false, true],
            [true, false],
            [false, true],
            [false, true],
            [true, false], // token row
        ]);
    });

    it('should get the gains matrix', () => {
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

    it('should get the rows ordered by gain', () => {
        const matrix = [
            [2, 3, 4, 2, 8], // min gain -6
            [-1, -1, -1, -1, -1], // min gain 0
            [-1, 7, 6, 5, 1], // min gain -2
            [5, 2, 9, 0, 2], // token row
            [-1, -1, -1, 3, -1], // min gain 4
        ];
        const tokenColIndex = 3;
        const tokenRowIndex = 3;
        const gains = getGainsMatrix(tokenColIndex, matrix);
        const rowsReadiness = getRowsReadinessToEndGame(matrix, tokenColIndex);
        const rowIndices = getRowsIndicesByOrderedGain(
            tokenRowIndex,
            tokenColIndex,
            matrix,
            gains,
            rowsReadiness
        );

        expect(rowIndices).toEqual([
            {
                gain: 4,
                rowIndex: 4,
                isRowReadyToEndGame: true,
                isRowAvailable: true,
                availableColumns: [],
            },
            {
                gain: 0,
                rowIndex: 1,
                isRowReadyToEndGame: true,
                isRowAvailable: false,
                availableColumns: [],
            },
            {
                gain: -2,
                rowIndex: 2,
                isRowReadyToEndGame: false,
                isRowAvailable: true,
                availableColumns: [1, 2, 4],
            },
            {
                gain: -6,
                rowIndex: 0,
                isRowReadyToEndGame: false,
                isRowAvailable: true,
                availableColumns: [0, 1, 2, 4],
            },
        ]);
    });

    it('should get the available cells per column', () => {
        const matrix = [
            [2, 3, 4, 2, -1], // min gain -6
            [-1, 5, -1, -1, -1], // min gain 0
            [-1, 7, 6, 5, -1], // min gain -2
            [5, -1, -1, 0, 2], // token row
            [-1, 1, -1, 3, -1], // min gain 4
        ];
        const tokenColIndex = 3;
        const tokenRowIndex = 3;
        expect(getAvailableCellsPerColumn(tokenRowIndex, tokenColIndex, matrix)).toEqual([
            [0],
            [0, 1, 2, 4],
            [0, 2],
            [],
            [],
        ]);
    });

    it('should create random integer', () => {
        expect(randomInteger(0, 5)).toBeLessThanOrEqual(5);
        expect(randomInteger(0, 5)).toBeGreaterThanOrEqual(0);
    });

    it('should update object from json string', () => {
        const object = {
            a: 1,
            b: '2',
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: '3',
            },
        };

        const jsonString = '{' + '"a":"1",' + '"b":2,' + '"c":{"a":3}' + '}';

        const expected = {
            a: 1,
            b: '2',
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: '3',
            },
        };

        updateObjectFromJsonString(object, jsonString);
        expect(object).toEqual(expected);
    });

    it('should update object from literal', () => {
        const object = {
            a: 1,
            b: '2',
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: '3',
            },
        };

        const literal = {
            a: '1',
            b: 2,
            c: {
                a: 3,
            },
        };

        const expected = {
            a: 1,
            b: '2',
            c: true,
            d: [1, 2],
            e: {
                a: 2,
                b: '3',
            },
        };

        updateObjectFromLiteral(object, literal);
        expect(object).toEqual(expected);
    });

    it('should convert vector to matrix', () => {
        const vector = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25,
        ];
        const matrix = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ];

        expect(vectorToMatrix(vector)).toEqual(matrix);
    });

    it('should convert vector to matrix (invalid vector size)', () => {
        const vector = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        ];

        const convert = () => {
            vectorToMatrix(vector);
        };

        expect(convert).toThrowError(/Invalid/);
    });
});

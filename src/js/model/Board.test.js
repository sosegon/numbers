const { Board } = require('@model/Board');
const { Token } = require('@model/Token');
const { Player } = require('@model/Player');
const { PLAYER_DIRECTIONS } = require('@model/flags');
const setup = () => {
    const board = new Board(9);
    const token = new Token(9);
    token.set(3, 3);
    return { board, token };
};

describe('Board', () => {
    it('should create a board from scratch', () => {
        const board = new Board(7);
        expect(board.cells.length).toEqual(7);
        expect(board.cells[0].length).toEqual(7);
    });

    it('should create a board from matrix', () => {
        const board = new Board(100, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]);

        expect(board.cells.length).toEqual(5);
        expect(board.cells[0].length).toEqual(5);
    });

    it('should set initial position of token', () => {
        const { board, token } = setup();
        board.updateCellsByToken(token);
        const rowIndex = token.rowIndex;
        const colIndex = token.colIndex;

        for (const i in board.cells) {
            for (const j in board.cells[i]) {
                if (rowIndex == i && colIndex == j) {
                    expect(board.isCellSelectable(i, j)).toEqual(false);
                } else {
                    expect(board.isCellSelectable(i, j)).toEqual(true);
                }
            }
        }
    });

    it('should update cells in board based on token position', () => {
        const { board, token } = setup();

        expect(board.cells[token.rowIndex][token.colIndex].value).toBeGreaterThan(0);

        board.updateCellsByToken(token);
        expect(board.cells[token.rowIndex][token.colIndex].value).toEqual(0);

        token.moveTo(4, 4);
        board.updateCellsByToken(token);
        expect(board.cells[token.oldRowIndex][token.oldColIndex].value).toEqual(-1);
        expect(board.cells[token.rowIndex][token.colIndex].value).toEqual(0);
    });

    it('should get value from cell based on token position', () => {
        const board = new Board(100, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]);
        const token = new Token();
        token.set(2, 2);
        expect(board.getValueInCellByToken(token)).toEqual(13);

        token.moveTo(4, 4);
        expect(board.getValueInCellByToken(token)).toEqual(25);

        token.moveTo(5, 4);
        const take = () => {
            board.getValueInCellByToken(token);
        };
        expect(take).toThrowError(/Invalid/);
    });

    it('should check next vertical turn is not possible', () => {
        const player = new Player();
        player.direction = PLAYER_DIRECTIONS.VERTICAL;

        const token = new Token(5);
        token.set(3, 3);

        const board = new Board(1000, [
            [1, 1, 1, -1, 1],
            [1, 1, 1, -1, 1],
            [1, 1, 1, -1, 1],
            [1, 1, 1, 0, 1],
            [1, 1, 1, -1, 1],
        ]);

        expect(board.canPlayerMakeMove(player, token)).toEqual(false);
    });

    it('should check next vertical turn is possible', () => {
        const player = new Player();
        player.direction = PLAYER_DIRECTIONS.VERTICAL;

        const token = new Token(5);
        token.set(3, 3);

        const board = new Board(1000, [
            [1, 1, 1, -1, 1],
            [1, 1, 1, -1, 1],
            [1, 1, 1, -1, 1],
            [1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1],
        ]);

        expect(board.canPlayerMakeMove(player, token)).toEqual(true);
    });

    it('should check next horizontal turn is not possible', () => {
        const player = new Player();
        player.direction = PLAYER_DIRECTIONS.HORIZONTAL;

        const token = new Token(5);
        token.set(3, 3);

        const board = new Board(1000, [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [-1, -1, -1, 0, -1],
            [1, 1, 1, 1, 1],
        ]);

        expect(board.canPlayerMakeMove(player, token)).toEqual(false);
    });

    it('should check next horizontal turn is possible', () => {
        const player = new Player();
        player.direction = PLAYER_DIRECTIONS.HORIZONTAL;

        const token = new Token(5);
        token.set(3, 3);

        const board = new Board(1000, [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [-1, -1, 1, 0, -1],
            [1, 1, 1, 1, 1],
        ]);

        expect(board.canPlayerMakeMove(player, token)).toEqual(true);
    });

    it('should find the position of token', () => {
        let board = new Board(0, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 0, 20],
            [21, 22, 23, 24, 25],
        ]);
        expect(board.findTokenPosition()).toEqual([3, 3]);

        board = new Board(0, [
            [1, 2, 3, 4, 5],
            [6, 7, 0, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 0, 20],
            [21, 22, 23, 24, 25],
        ]);
        expect(board.findTokenPosition()).toEqual([1, 2]);

        board = new Board(0, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]);
        expect(board.findTokenPosition()).toEqual([-1, -1]);
    });

    it('should serialize board', () => {
        const board = new Board(0, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]);

        const values = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25,
        ];

        expect(board.serialize()).toEqual(values);
    });

    it('should convert board to matrix', () => {
        const matrix = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ];
        const board = new Board(0, matrix);

        expect(board.asMatrix()).toEqual(matrix);
    });

    it('should update from vector', () => {
        const board = new Board(2);
        const vector = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25,
        ];
        board.updateFromVector(vector);
        expect(board.serialize()).toEqual(vector);
    });

    it('should update from vector (invalid vector size)', () => {
        const board = new Board(100, [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
        ]);

        const vector = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        ];

        const update = () => {
            board.updateFromVector(vector);
        };

        expect(update).toThrowError(/Invalid/);
    });
});

const { Game } = require('./Game.js');
const { Board } = require('./Board.js');
const { Token } = require('./Token.js');
const { Player } = require('./Player.js');
const { PLAYER_DIRECTIONS, GAME_STATUSES, TURNS, GAME_CONTINUITY } = require('./flags.js');

describe("Game", () => {
    let game, literal;

    beforeEach(() => {
        const matrix = [
            [2, 3, 4, 7, 8],
            [1, 1, 3, 5, 6],
            [2, 7, 6, 4, 1],
            [5, 2, 9, 0, 2],
            [8, 7, 9, 2, 1]
        ];
        const board = new Board(100, matrix);
        const token = new Token(5);
        token.set(3, 3);

        game = new Game(5);
        game.board = board;
        game.token = token;

        literal = {
            token: {
                rowIndex: 2,
                colIndex: 2,
                oldRowIndex: 1,
                oldColIndex: 1
            },
            board: [
                2, 3, 4, -1,
                1, 1, 3, -1,
                2, 7, 6, -1,
                5, 2, 9, 0
            ],
            player1: {
                score: 10,
                direction: PLAYER_DIRECTIONS.VERTICAL
            },
            player2: {
                score: 20,
                direction: PLAYER_DIRECTIONS.HORIZONTAL
            },
            snap: {
                lastValue: 5,
                continuity: GAME_CONTINUITY.CONTINUE,
                turn: TURNS.PLAYER2,
                status: GAME_STATUSES.MOVING_TOKEN
            }
        };
    });

    it("should create a game from scratch", () => {
        const game = new Game(5);

        expect(game.token).not.toEqual(undefined);
        expect(game.board).not.toEqual(undefined);
        expect(game.player1).not.toEqual(undefined);
        expect(game.player2).not.toEqual(undefined);
        expect(game.snap).not.toEqual(undefined);
        expect(game.snap.lastValue).toEqual(0);
        expect(game.snap.continuity).toEqual(GAME_CONTINUITY.CONTINUE);
        expect(game.snap.turn).toEqual(TURNS.PLAYER1);
        expect(game.snap.status).toEqual(GAME_STATUSES.RESTING);
    });

    it("should define direction of players (player1 | vertical)", () => {
        game.moveToken(0, 3);
        expect(game.player1.direction).toEqual(PLAYER_DIRECTIONS.VERTICAL);
        expect(game.player2.direction).toEqual(PLAYER_DIRECTIONS.HORIZONTAL);
    });

    it("should define direction of players (player1 | horizontal)", () => {
        game.moveToken(3, 0);
        expect(game.player1.direction).toEqual(PLAYER_DIRECTIONS.HORIZONTAL);
        expect(game.player2.direction).toEqual(PLAYER_DIRECTIONS.VERTICAL);
    });

    it("should define direction of players (player2 | vertical)", () => {
        game.passToken();
        game.moveToken(0, 3);
        expect(game.player1.direction).toEqual(PLAYER_DIRECTIONS.HORIZONTAL);
        expect(game.player2.direction).toEqual(PLAYER_DIRECTIONS.VERTICAL);
    });

    it("should define direction of players (player2 | horizontal)", () => {
        game.passToken();
        game.moveToken(3, 0);
        expect(game.player1.direction).toEqual(PLAYER_DIRECTIONS.VERTICAL);
        expect(game.player2.direction).toEqual(PLAYER_DIRECTIONS.HORIZONTAL);
    });

    it("should take value of cell", () => {
        game.moveToken(3, 0);
        game.updateLastValueInCellWhereTokenIs();
        expect(game.snap.lastValue).toEqual(5);
    });

    it("should update scores (player1)", () => {
        game.moveToken(3, 0);
        game.updateLastValueInCellWhereTokenIs();
        game.updateCurrentPlayerScore();
        expect(game.player1.score).toEqual(5);
        expect(game.player2.score).toEqual(0);
    });

    it("should update scores (player2)", () => {
        game.passToken();
        game.moveToken(3, 0);
        game.updateLastValueInCellWhereTokenIs();
        game.updateCurrentPlayerScore();
        expect(game.player1.score).toEqual(0);
        expect(game.player2.score).toEqual(5);
    });

    it("should pass token to player2", () => {
        game.passToken();
        expect(game.snap.turn).toEqual(TURNS.PLAYER2);
    });

    it("should pass token to player1", () => {
        game.snap.turn = TURNS.PLAYER2;
        game.passToken();
        expect(game.snap.turn).toEqual(TURNS.PLAYER1);
    });

    it("shoud get current player (player1)", () => {
        expect(game.getCurrentPlayer()).toEqual(game.player1);
    });

    it("shoud get current player (player2)", () => {
        game.passToken();
        expect(game.getCurrentPlayer()).toEqual(game.player2);
    });

    it("shoud get next player (player1)", () => {
        game.passToken();
        expect(game.getNextPlayer()).toEqual(game.player1);
    });

    it("shoud get next player (player2)", () => {
        expect(game.getNextPlayer()).toEqual(game.player2);
    });

    it("should update from object", () => {
        game.updateFromObject(literal);
        const serialized = game.serialize();

        expect(serialized["token"]).toEqual(literal["token"]);
        expect(serialized["board"]).toEqual(literal["board"]);
        expect(serialized["player1"]).toEqual(literal["player1"]);
        expect(serialized["player2"]).toEqual(literal["player2"]);
        expect(serialized["snap"]).toEqual(literal["snap"]);
        expect(serialized).toEqual(literal);

    });
});
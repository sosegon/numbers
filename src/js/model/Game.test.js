const { Game, STATUSES, TURNS } = require('./Game.js');
const { Board } = require('./Board.js');
const { Token } = require('./Token.js');
const { Player, DIRECTIONS } = require('./Player.js');

const setup = () => {
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

    const game = new Game(5);
    game.board = board;
    game.token = token;

    return { game };
};

describe("Game", () => {
    it("should create a game from scratch", () => {
        const game = new Game(5);

        expect(game.token).not.toEqual(undefined);
        expect(game.board).not.toEqual(undefined);
        expect(game.player1).not.toEqual(undefined);
        expect(game.player2).not.toEqual(undefined);
        expect(game.snap).not.toEqual(undefined);
        expect(game.snap.lastValue).toEqual(0);
        expect(game.snap.isOver).toEqual(false);
        expect(game.snap.turn).toEqual(TURNS.PLAYER1);
        expect(game.snap.status).toEqual(STATUSES.RESTING);
    });

    it("should define directions of players (player1 | vertical)", () => {
        const { game } = setup();
        game.moveToken(0, 3);
        expect(game.player1.direction).toEqual(DIRECTIONS.VERTICAL);
        expect(game.player2.direction).toEqual(DIRECTIONS.HORIZONTAL);
    });

    it("should define directions of players (player1 | horizontal)", () => {
        const { game } = setup();
        game.moveToken(3, 0);
        expect(game.player1.direction).toEqual(DIRECTIONS.HORIZONTAL);
        expect(game.player2.direction).toEqual(DIRECTIONS.VERTICAL);
    });

    it("should define directions of players (player2 | vertical)", () => {
        const { game } = setup();
        game.passToken();
        game.moveToken(0, 3);
        expect(game.player1.direction).toEqual(DIRECTIONS.HORIZONTAL);
        expect(game.player2.direction).toEqual(DIRECTIONS.VERTICAL);
    });

    it("should define directions of players (player2 | horizontal)", () => {
        const { game } = setup();
        game.passToken();
        game.moveToken(3, 0);
        expect(game.player1.direction).toEqual(DIRECTIONS.VERTICAL);
        expect(game.player2.direction).toEqual(DIRECTIONS.HORIZONTAL);
    });

    it("should take value of cell", () => {
        const { game } = setup();
        game.moveToken(3, 0);
        game.takeCell();
        expect(game.lastValue).toEqual(5);
    });

    it("should update scores (player1)", () => {
        const { game } = setup();
        game.moveToken(3, 0);
        game.takeCell();
        game.updateScores();
        expect(game.player1.score).toEqual(5);
        expect(game.player2.score).toEqual(0);
    });

    it("should update scores (player2)", () => {
        const { game } = setup();
        game.passToken();
        game.moveToken(3, 0);
        game.takeCell();
        game.updateScores();
        expect(game.player1.score).toEqual(0);
        expect(game.player2.score).toEqual(5);
    });

    it("should pass token to player2", () => {
        const { game } = setup();
        game.passToken();
        expect(game.snap.turn).toEqual(TURNS.PLAYER2);
    });

    it("should pass token to player1", () => {
        const { game } = setup();
        game.snap.turn = TURNS.PLAYER2;
        game.passToken();
        expect(game.snap.turn).toEqual(TURNS.PLAYER1);
    });

    it("shoud get current player (player1)", () => {
        const { game } = setup();
        expect(game.getCurrentPlayer()).toEqual(game.player1);
    });

    it("shoud get current player (player2)", () => {
        const { game } = setup();
        game.passToken();
        expect(game.getCurrentPlayer()).toEqual(game.player2);
    });

    it("shoud get next player (player1)", () => {
        const { game } = setup();
        game.passToken();
        expect(game.getNextPlayer()).toEqual(game.player1);
    });

    it("shoud get next player (player2)", () => {
        const { game } = setup();
        expect(game.getNextPlayer()).toEqual(game.player2);
    });
});
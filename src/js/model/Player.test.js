const { Player } = require('@model/Player');
const { PLAYER_DIRECTIONS } = require('@model/flags');

const setup = () => {
    const player = new Player();

    return { player };
};

describe('Player', () => {
    it('should create player correctly', () => {
        const { player } = setup();
        expect(player.score).toEqual(0);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.NONE);
    });

    it('should increment score', () => {
        const { player } = setup();
        player.incrementScore(2);
        expect(player.score).toEqual(2);
    });

    it('should serialize', () => {
        const { player } = setup();
        expect(player.serialize()).toEqual({
            score: 0,
            direction: PLAYER_DIRECTIONS.NONE,
        });
    });

    it('should convert to string', () => {
        const { player } = setup();
        expect(player.toString()).toEqual('{' + '"score":0,' + '"direction":0' + '}');
    });

    it('should update from object (ideal)', () => {
        const { player } = setup();
        const object = {
            score: 10,
            direction: PLAYER_DIRECTIONS.HORIZONTAL,
        };
        player.updateFromObject(object);
        expect(player.score).toEqual(10);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.HORIZONTAL);
    });

    it('should update from object (empty)', () => {
        const { player } = setup();
        const object = {};
        player.updateFromObject(object);
        expect(player.score).toEqual(0);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.NONE);
    });

    it('should update from object (undefined)', () => {
        const { player } = setup();
        let object;
        const update = () => {
            player.updateFromObject(object);
        };
        expect(update).toThrowError(/Undefined/);
    });

    it('should update from object (invalid keys)', () => {
        const { player } = setup();
        const object = {
            sCore: 10,
            dIrection: PLAYER_DIRECTIONS.HORIZONTAL,
        };
        player.updateFromObject(object);
        expect(player.score).toEqual(0);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.NONE);
    });

    it('should update from object (invalid types)', () => {
        const { player } = setup();
        const object = {
            score: '10',
            direction: true,
        };
        player.updateFromObject(object);
        expect(player.score).toEqual(0);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.NONE);
    });
});

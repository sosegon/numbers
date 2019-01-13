const createArrayCsvWriter = require('csv-writer').createArrayCsvWriter;
const { Agent } = require('../js/model/Agent.js');
const { Game } = require('../js/model/Game.js');
const { PLAYER_DIRECTIONS, GAME_CONTINUITY } = require('../js/model/flags.js');

const agentMax = new Agent();
const agentGain = new Agent();
const agentAvg = new Agent();

const play = (game, agent1, agent2, first_direction, second_direction) => {
    agent1.direction = first_direction;
    agent2.direction = second_direction;
    game.player1 = agent1;
    game.player2 = agent2;

    const token = game.token;
    let movesPlayer1 = 0;
    let movesPlayer2 = 0;
    let timePlayer1 = 0;
    let timePlayer2 = 0;

    while (game.snap.continuity === GAME_CONTINUITY.CONTINUE) {
        const agent = game.getCurrentPlayer();
        const boardMatrix = game.board.asMatrix();
        let newTokenPosition;

        const start = new Date().getTime();
        if (agent === agentMax) {
            newTokenPosition = agent.getMaxValuePosition(token, boardMatrix);
        } else if (agent === agentGain) {
            newTokenPosition = agent.getMaxGainValuePosition(token, boardMatrix);
        } else if (agent === agentAvg) {
            newTokenPosition = agent.getBestAverageValuePosition(token, boardMatrix);
        } else {
            throw new Error("Invalid agent");
        }
        const end = new Date().getTime();
        const timeSpan = end - start;
        if (agent === game.player1) {
            movesPlayer1++;
            timePlayer1 += timeSpan;
        } else if (agent === game.player2) {
            movesPlayer2++;
            timePlayer2 += timeSpan;
        } else {
            throw new Error("Invalid agent");
        }

        game.moveToken(newTokenPosition[0], newTokenPosition[1]);
        game.updateLastValueInCellWhereTokenIs();
        game.updateCurrentPlayerScore();
        game.updateCellsWhereTokenIs();
        game.passToken();
        game.updateContinuity();
    }

    const score1 = game.player1.score;
    const score2 = game.player2.score;

    return [score1, score2, movesPlayer1, movesPlayer2, timePlayer1, timePlayer2];
};

const resetScores = () => {
    agentMax.score = 0;
    agentAvg.score = 0;
    agentGain.score = 0;
};

let records = [];
let result;
const totalGames = 1000;
const boardSize = 20;
const configs = [
    ["Max - Gain | HORIZONTAL - VERTICAL", agentMax, agentGain, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Max - Gain | VERTICAL - HORIZONTAL", agentMax, agentGain, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL],
    ["Gain - Max | HORIZONTAL - VERTICAL", agentGain, agentMax, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Gain - Max | VERTICAL - HORIZONTAL", agentGain, agentMax, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL],

    ["Avg - Gain | HORIZONTAL - VERTICAL", agentAvg, agentGain, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Avg - Gain | VERTICAL - HORIZONTAL", agentAvg, agentGain, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL],
    ["Gain - Avg | HORIZONTAL - VERTICAL", agentGain, agentAvg, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Gain - Avg | VERTICAL - HORIZONTAL", agentGain, agentAvg, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL],

    ["Avg - Max | HORIZONTAL - VERTICAL", agentAvg, agentMax, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Avg - Max | VERTICAL - HORIZONTAL", agentAvg, agentMax, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL],
    ["Max - Avg | HORIZONTAL - VERTICAL", agentMax, agentAvg, PLAYER_DIRECTIONS.HORIZONTAL, PLAYER_DIRECTIONS.VERTICAL],
    ["Max - Avg | VERTICAL - HORIZONTAL", agentMax, agentAvg, PLAYER_DIRECTIONS.VERTICAL, PLAYER_DIRECTIONS.HORIZONTAL]
];
for (let i = 0; i < totalGames; i++) {
    const gameTemplate = new Game(boardSize);
    const serialGame = gameTemplate.serialize();
    const gameToPlay = new Game(boardSize);

    for (let j = 0; j < configs.length; j++) {
    	resetScores();
        gameToPlay.updateFromObject(serialGame);

        const details = configs[j][0];
        const agent1 = configs[j][1];
        const agent2 = configs[j][2];
        const direction1 = configs[j][3];
        const direction2 = configs[j][4];

        result = play(gameToPlay, agent1, agent2, direction1, direction2);
        records.push([details,... result])
    }
}

const csvWriter = createArrayCsvWriter({
    header: ["name", "score1", "score2", "moves1", "moves2", "time1", "time2"],
    path: './running_agents.csv'
});

csvWriter.writeRecords(records) // returns a promise
    .then(() => {
        console.log('...Done');
    });

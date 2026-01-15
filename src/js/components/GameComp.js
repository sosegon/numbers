const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { TURNS, PLAYER_DIRECTIONS } = require('@model/flags');
const { CellCont } = require('@containers/CellCont');
const { WildCardCont } = require('@containers/WildCardCont');
const { GameEndCont } = require('@containers/GameEndCont');
const { ScoreCont } = require('@containers/ScoreCont');
const { ResetButton } = require('@components/GameEndComp');

const scan = styled.keyframes`
    0% {
        top: -100%;
    }
    100% {
        top: 100%;
    }
`;
const Wrapper = styled.default.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 16px;
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    border: 2px solid;
    border-color: ${({ theme }) => theme.colors.primaryLight};
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.tertiaryDark};
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(255, 0, 255, 0.2);
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%);
        animation: ${scan} 9s linear infinite;
        margin: 0 auto;
    }
`;

const FlexContainer = styled.default.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin: 0 auto;
    width: 400px;
    align-items: end;
    justify-content: center;
`;

const ScoresContainer = styled.default.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
    margin: 0 auto;
    gap: 16px;
`;

const TitleContainer = styled.default.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    width: auto;
    flex: 1 0 auto;
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
`;

const Board = styled.default.div`
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: ${({ theme }) => theme.sizes.boardPadding}px;
    display: table;
    margin: 0 auto;
    padding: ${({ theme }) => theme.sizes.boardPadding}px;
    position: relative;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(34 211 238 / 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.05);
`;

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders a {@link Game}.
 *
 * @param {object} props
 * @param {function} props.reset Function to reset a {@link Game}.
 * @param {array} props.board 2 dimensional array of numbers representing the
 * values of {@link Cell|Cells} in a {@link Board}.
 * @param {string} props.player1Direction Direction of player 1, one of {@link PLAYER_DIRECTIONS}.
 * @param {string} props.player2Direction Direction of player 2, one of {@link PLAYER_DIRECTIONS}.
 */
const GameComp = ({
    board,
    player1Direction,
    player2Direction,
    reset,
    'data-testid': dataTestId = 'game-comp',
}) => {
    let cells = board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
                <CellCont
                    key={`cell-${rowIndex}-${colIndex}`}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    value={col}
                />
            ))}
        </div>
    ));

    return (
        <Wrapper data-testid={dataTestId}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <FlexContainer>
                    <TitleContainer>
                        <h1 style={{ margin: 0 }}>Numbers</h1>
                        <p style={{ fontSize: '10px', margin: 0 }}>
                            {'// MAXIMIZE YOUR SCORE IN THE GRID //'}
                        </p>
                    </TitleContainer>
                    <ResetButton
                        style={{
                            maxWidth: 'fit-content',
                        }}
                        onClick={reset}
                    >
                        RESTART
                    </ResetButton>
                </FlexContainer>
                <ScoresContainer>
                    <ScoreCont playerName={TURNS.PLAYER1} direction={player1Direction} />
                    <ScoreCont playerName={TURNS.PLAYER2} direction={player2Direction} />
                </ScoresContainer>
            </div>
            <Board>
                <WildCardCont />
                {cells}
                <GameEndCont />
            </Board>
        </Wrapper>
    );
};

GameComp.propTypes = {
    reset: PropTypes.func.isRequired,
    board: PropTypes.array.isRequired,
    player1Direction: PropTypes.oneOf(Object.values(PLAYER_DIRECTIONS)).isRequired,
    player2Direction: PropTypes.oneOf(Object.values(PLAYER_DIRECTIONS)).isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    GameComp,
    ResetButton,
};

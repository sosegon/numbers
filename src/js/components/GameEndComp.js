const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { GAME_RESULT } = require('@model/flags');

const wonSound = require('@sound/won.mp3');
const lostSound = require('@sound/lost.mp3');
const drawSound = require('@sound/draw.mp3');

const ResetButton = styled.default.button`
    font-family: New Academy, Arial, sans-serif;
    padding: 6px 12px;
    border-width: 2px;
    border-style: solid;
    background-color: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    transition:
    border-color 0.3s,
    color 0.3s;
    &:hover {
        cursor: pointer;
        border-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.primary};
        transition:
            border-color 0.3s,
            color 0.3s;
    }
`;

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders an overlay when a {@link Game} ends.
 *
 * @param {object} props
 * @param {boolean} props.isOver Whether the game is over.
 * @param {number} props.result The result of the game.
 * @param {boolean} props.soundEnabled Whether sound is enabled.
 * @param {boolean} props.soundLocked Whether sound is locked.
 * @param {function} props.reset Function to reset the {@link Game}.
 */
const GameEndComp = ({
    isOver,
    result,
    soundEnabled,
    soundLocked,
    reset,
    'data-testid': dataTestId = 'game-end-comp',
}) => {
    const theme = styled.useTheme();

    React.useEffect(() => {
        if (!isOver) return;
        setTimeout(() => {
            if (soundEnabled && !soundLocked) {
                let endSound = new window.Audio(drawSound);
                if (result === GAME_RESULT.WON) {
                    endSound = new window.Audio(wonSound);
                } else if (result === GAME_RESULT.LOST) {
                    endSound = new window.Audio(lostSound);
                }
                endSound.volume = 0.5;
                endSound.play();
            }
        }, 500);
    }, [isOver]);

    return (
        <div
            style={{
                display: isOver ? 'flex' : 'none',
                pointerEvents: isOver ? 'auto' : 'none',
                opacity: isOver ? 1 : 0,
                transition: 'opacity 1.5s',
                animation: isOver ? 'fadeIn 1.5s' : 'fadeOut 1.5s',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                bottom: 0,
                flexDirection: 'column',
                fontSize: '32px',
                fontWeight: 'bolder',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                borderRadius: `${theme.sizes.boardPadding}px`,
            }}
            data-testid={dataTestId}
        >
            <p
                style={{
                    color: theme.colors.primary,
                    textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
                }}
            >
                {result === GAME_RESULT.WON && 'You Won!'}
                {result === GAME_RESULT.LOST && 'You Lost!'}
                {result === GAME_RESULT.DRAW && 'Draw!'}
            </p>
            <ResetButton onClick={reset} data-testid="reset-button">
                RESTART GAME
            </ResetButton>
        </div>
    );
};

GameEndComp.propTypes = {
    result: PropTypes.oneOf(Object.values(GAME_RESULT)).isRequired,
    isOver: PropTypes.bool.isRequired,
    soundEnabled: PropTypes.bool.isRequired,
    soundLocked: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    GameEndComp,
    ResetButton,
};

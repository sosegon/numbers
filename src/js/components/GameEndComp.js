const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');

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
 * @param {string} props.message Message to be displayed in the overlay.
 * @param {boolean} props.isOver Whether the game is over.
 * @param {function} props.reset Function to reset the {@link Game}.
 */
const GameEndComp = ({ isOver, message, reset, 'data-testid': dataTestId = 'game-end-comp' }) => {
    const theme = styled.useTheme();

    return (
        <div
            style={{
                display: isOver ? 'flex' : 'none',
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
                {message}
            </p>
            <ResetButton onClick={() => reset()}>RESTART GAME</ResetButton>
        </div>
    );
};

GameEndComp.propTypes = {
    message: PropTypes.string.isRequired,
    isOver: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    GameEndComp,
    ResetButton,
};

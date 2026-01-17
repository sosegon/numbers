const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const { Volume2, VolumeOff, RefreshCw } = require('lucide-react');

const Wrapper = styled.default.div`
    display: flex;
    gap: 12px;
`;

const ButtonContainer = styled.default.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    flex: 1 0 auto;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    padding: 4px 8px;
    transition: border-color 0.3s, color 0.3s;
    svg {
        color: ${({ theme }) => theme.colors.secondary};
        transition: color 0.3s;
    }
    &:hover {
        border-color: ${({ theme }) => theme.colors.secondary};
        svg {
            color: ${({ theme }) => theme.colors.primary};
            transition: color 0.3s;
        }
        transition:
            border-color 0.3s,
            color 0.3s;
    }
`;

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the game controls.
 *
 * @param {object} props
 * @param {boolean} props.soundEnabled Whether sound is enabled.
 * @param {boolean} props.controlsLocked Whether controls are locked.
 * @param {function} props.toggleSound Function to toggle sound.
 * @param {function} props.reset Function to reset the game.
 */
const ControlsComp = ({
    soundEnabled,
    controlsLocked,
    toggleSound,
    reset,
    'data-testid': dataTestId,
}) => {
    const iconSize = 24;
    const [refreshPressed, setRefreshPressed] = React.useState(false);
    const [volumePressed, setVolumePressed] = React.useState(false);
    return (
        <Wrapper data-testid={dataTestId}>
            <ButtonContainer
                onClick={() => {
                    toggleSound();
                    setVolumePressed(true);
                    setTimeout(() => setVolumePressed(false), 200);
                }}
                style={{
                    pointerEvents: controlsLocked ? 'none' : 'auto',
                    cursor: controlsLocked ? 'default' : 'pointer',
                }}
                data-testid={`${dataTestId}-sound-button`}
            >
                {soundEnabled ? (
                    <Volume2
                        size={iconSize}
                        style={{
                            transform: volumePressed ? 'rotateY(90deg)' : 'rotateY(0deg)',
                            transition: 'transform 0.3s',
                        }}
                        data-testid="volume-on-icon"
                    ></Volume2>
                ) : (
                    <VolumeOff
                        size={iconSize}
                        style={{
                            transform: volumePressed ? 'rotateY(90deg)' : 'rotateY(0deg)',
                            transition: 'transform 0.3s',
                        }}
                        data-testid="volume-off-icon"
                    ></VolumeOff>
                )}
            </ButtonContainer>
            <ButtonContainer
                onClick={() => {
                    setRefreshPressed(true);
                    reset();
                    setTimeout(() => setRefreshPressed(false), 200);
                }}
                style={{
                    pointerEvents: controlsLocked ? 'none' : 'auto',
                    cursor: controlsLocked ? 'default' : 'pointer',
                }}
                data-testid={`${dataTestId}-reset-button`}
            >
                <RefreshCw
                    size={iconSize}
                    style={{
                        transform: refreshPressed ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: refreshPressed ? 'transform 0.3s' : 'none',
                    }}
                ></RefreshCw>
            </ButtonContainer>
        </Wrapper>
    );
};

ControlsComp.propTypes = {
    reset: PropTypes.func.isRequired,
    toggleSound: PropTypes.func.isRequired,
    soundEnabled: PropTypes.bool.isRequired,
    controlsLocked: PropTypes.bool.isRequired,
    'data-testid': PropTypes.string,
};

module.exports = {
    ControlsComp,
};

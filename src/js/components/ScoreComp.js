const React = require('react');
const PropTypes = require('prop-types');
const styled = require('styled-components');
const HumanIcon = require('@icons/HumanIcon');
const AiIcon = require('@icons/AiIcon');

const ScoreWrapper = styled.default.div`
    flex: 1 1 auto;
    padding: 12px;
    border-width: 2px;
    border-style: solid;
    border-radius: 12px;
    font-weight: bold;
    font-size: 12px;
    width: 50%;
`;

const IconContainer = styled.default.div`
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    border-radius: 8px;
    padding: 4px;
    align-self: center;
    text-align: center;
    align-content: center;
    width: 40px;
    height: 40px;
`;
/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the score of a {@link Player}.
 *
 * @param {object} props
 * @param {number} props.score Score of a {@link Player}.
 * @param {string} props.name Name to identify the {@link Player}.
 * @param {string} props.direction Direction of the {@link Player}.
 */
const ScoreComp = ({ score, name, direction, 'data-testid': dataTestId = 'score-comp' }) => {
    const theme = styled.useTheme();
    const isAi = name.toLowerCase() !== 'you';

    const [displayedScore, setDisplayedScore] = React.useState(score);
    const [scoreIncrement, setScoreIncrement] = React.useState(0);
    const [displayedScoreIncrement, setDisplayedScoreIncrement] = React.useState(0);

    React.useEffect(() => {
        if (displayedScore < score) {
            const timeout = setTimeout(() => {
                setDisplayedScore(displayedScore + 1);
                setScoreIncrement((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else if (displayedScore === score) {
            setDisplayedScoreIncrement(scoreIncrement);
            setScoreIncrement(0);
            const incrementTimeout = setTimeout(() => {
                setDisplayedScoreIncrement(0);
            }, 900);
            return () => clearTimeout(incrementTimeout);
        } else if (displayedScore > score) {
            setDisplayedScore(score); // In case score decreases, sync immediately
            setScoreIncrement(0);
        }
    }, [score, displayedScore]);

    return (
        <ScoreWrapper
            style={{
                backgroundColor: theme.colors.black,
                borderColor: isAi ? theme.colors.secondaryLight : theme.colors.primaryLight,
                color: isAi ? theme.colors.secondary : theme.colors.primary,
                boxShadow: isAi
                    ? 'rgb(255, 0, 255) 0px 0px 10px, rgba(255, 0, 255, 0.2) 0px 0px 10px inset'
                    : 'rgb(0, 255, 255) 0px 0px 10px, rgba(0, 255, 255, 0.2) 0px 0px 10px inset',
            }}
            data-testid={dataTestId}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <div>
                    <div
                        style={{
                            textTransform: 'uppercase',
                        }}
                    >
                        {`// ${name} //`}
                    </div>
                    <div
                        style={{
                            position: 'relative',
                            fontSize: '32px',
                            textShadow: !isAi
                                ? '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff'
                                : '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
                        }}
                        data-testid={`${dataTestId}-value`}
                    >
                        {`${displayedScore}`.length < 2 ? `0${displayedScore}` : displayedScore}
                        <span
                            style={{
                                color: isAi ? theme.colors.secondary : theme.colors.primary,
                                position: 'absolute',
                                left: '0',
                                opacity: displayedScoreIncrement > 0 ? 1 : 0,
                                top: displayedScoreIncrement > 0 ? '-50px' : '0px',
                                transition: displayedScoreIncrement ? 'all 0.9s ease-out' : 'none',
                            }}
                        >
                            {` +${displayedScoreIncrement}`}
                        </span>
                    </div>
                </div>
                <IconContainer
                    style={{
                        borderColor: isAi ? theme.colors.secondary : theme.colors.primary,
                        boxShadow: isAi
                            ? 'rgb(255, 0, 255) 0px 0px 10px, rgba(255, 0, 255, 0.2) 0px 0px 10px inset'
                            : 'rgb(0, 255, 255) 0px 0px 10px, rgba(0, 255, 255, 0.2) 0px 0px 10px inset',
                    }}
                >
                    {isAi ? <AiIcon width="70%" /> : <HumanIcon width="70%" />}
                </IconContainer>
            </div>
            <div style={{ textTransform: 'uppercase' }}> {`> ${direction}`}</div>
        </ScoreWrapper>
    );
};

ScoreComp.propTypes = {
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    direction: PropTypes.string,
    'data-testid': PropTypes.string,
};

module.exports = {
    ScoreComp,
};

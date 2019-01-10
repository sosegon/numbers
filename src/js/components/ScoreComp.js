const React = require('react');
const PropTypes = require('prop-types');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the score of a {@link Player}.
 *
 * @param {object} props
 * @param {number} props.score Score of a {@link Player}.
 * @param {string} props.name Name to identify the {@link Player}.
 */
const ScoreComp = ({ score, name }) => {
    return (
        <div className="score-container">
			<span className="player-name">{name}</span>
			<span className="player-score">{score}</span>
		</div>
    );
};

ScoreComp.propTypes = {
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

module.exports = {
    ScoreComp
};
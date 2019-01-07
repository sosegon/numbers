const React = require('react');
const PropTypes = require('prop-types');

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
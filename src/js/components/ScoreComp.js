const React = require('react');
const PropTypes = require('prop-types');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders the score of a {@link Player}.
 *
 * @param {object} props
 * @param {number} props.score Score of a {@link Player}.
 * @param {string} props.name Name to identify the {@link Player}.
 * @param {string} props.style CSS class name for the score {@link Player}.
 */
const ScoreComp = ({ score, name, style }) => {
	let scoreClass = [style];
	scoreClass.push("player-score");
	scoreClass.push("ml-auto");
	scoreClass.push("my-auto");
	scoreClass = scoreClass.join(" ");

	// key in span for the scor is a workaround to create the element
	// every time the score changes, thus enabling the animation.
    return (
        <div className="score-container align-self-center d-flex">
			<div className="player-name mr-auto">
				<span className="align-middle">
					{name}
				</span>
			</div>
			<div className={scoreClass} >
				<span className="align-middle" key={score}>
					{score}
				</span>
			</div>
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
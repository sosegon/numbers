const ScoreComp = ({ score, name }) => {
    return (
        <div className="score-container">
			<span className="player-name">{name}</span>
			<span className="player-score">{score}</span>
		</div>
    );
};

module.exports = {
    ScoreComp
};
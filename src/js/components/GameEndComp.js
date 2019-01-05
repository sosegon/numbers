const GameEndComp = ({ game }) => {
    let content = '';
    let scoreA = game.player1.score;
    let scoreB = game.player2.score;
    let gameEnd = game.isOver;
    if (gameEnd) {
        if (scoreA > scoreB) {
            content = 'You won';
        } else if (scoreA < scoreB) {
            content = 'You lose';
        } else {
            content = 'Draw';
        }
    }
    if (!content) {
        return null;
    }

    return (
        <div className='overlay'>
			<p className='message'>{content}</p>
		</div>
    );
};

module.exports = {
    GameEndComp
};
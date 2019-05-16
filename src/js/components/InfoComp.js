const React = require('react');
const PropTypes = require('prop-types');

/**
 * Functional {@link https://reactjs.org/docs/react-component.html|Component}
 * that renders a {@link https://getbootstrap.com/docs/4.0/components/modal/|modal}
 * with information of the game.
 *
 * @param {object} props
 * @param {string} props.id Identifier of the modal.
 * @param {string} props.style CSS style.
 */
const InfoComp = ({
    id,
    style
}) => {
    let css = ['modal', 'fade', 'game-info'];
    css.push(style);
    css = css.join(' ');

    return (
        <div className={css} id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="exampleModalLabel">Information</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img src="./images/logo.png" />
                        <p>
                            Numberness is a fun casual game. It is a great time killer; you
                            can play it during breaks when working or studying.
                        </p>

                        <h4>How to play</h4>
                        <p>
                            The objective of the game is selecting numbers in the board
                            to increase your score and defeat the AI.
                        </p>
                        <p>
                            In the beginning, you select the direction of your moves,
                            either horizontal ↔ or vertical ↕.
                            The AI will select numbers in the other direction.
                        </p>
                        <p>
                            The game ends if there are no more numbers in the board or in
                            the direction of the next player.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoComp.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
};


module.exports = {
    InfoComp
};
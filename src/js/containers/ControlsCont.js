const { connect } = require('react-redux');
const PropTypes = require('prop-types');
const { ControlsComp } = require('@components/ControlsComp');
const { resetGame } = require('@reducers/gameActions');
const { toggleSound } = require('@reducers/settingsActions');

const mapStateToProps = (state, ownProps) => {
    return {
        'data-testid': ownProps['data-testid'],
        boardSize: ownProps.boardSize,
        soundEnabled: state.settings.soundEnabled,
        controlsLocked: state.settings.controlsLocked,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reset: () => {
            dispatch(resetGame(ownProps.boardSize));
        },
        toggleSound: () => {
            dispatch(toggleSound());
        },
    };
};

/**
 * Container to connect a {@link ControlsComp}.
 * @param {object} props
 */
const ControlsCont = connect(mapStateToProps, mapDispatchToProps)(ControlsComp);

ControlsCont.propTypes = {
    'data-testid': PropTypes.string,
    boardSize: PropTypes.number.isRequired,
};

module.exports = {
    ControlsCont,
};
